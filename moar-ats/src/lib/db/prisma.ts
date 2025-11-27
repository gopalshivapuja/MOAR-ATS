/**
 * Prisma Client with Tenant Middleware
 * 
 * This module provides a tenant-aware Prisma client that automatically filters
 * all queries by tenant_id. It uses Prisma's $extends feature to add middleware
 * that injects tenant_id filters into all database operations.
 * 
 * Key features:
 * - Automatic tenant filtering on all queries (findMany, findUnique, create, update, delete)
 * - System admin bypass for tenant management operations
 * - Tenant context validation before queries
 * - Audit logging for tenant access attempts
 */

import { PrismaClient, Prisma } from '@prisma/client';
import { Pool, PoolClient } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { getTenantId, isSystemAdmin, requireTenantId } from '@/lib/tenant/context';

// Create PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const NO_TENANT_CONTEXT = '00000000-0000-0000-0000-000000000000';
const ENFORCED_ROLE = 'rls_enforced';
const PG_TENANT_CACHE_KEY = Symbol('pgTenantId');
const PG_BYPASS_CACHE_KEY = Symbol('pgBypassRls');
const PG_ROLE_PROMISE_KEY = Symbol('pgRolePromise');

type AugmentedPoolClient = PoolClient & {
  [PG_TENANT_CACHE_KEY]?: string;
  [PG_BYPASS_CACHE_KEY]?: string;
  [PG_ROLE_PROMISE_KEY]?: Promise<void>;
};

let ensureRolePromise: Promise<void> | null = null;
let ensurePoliciesPromise: Promise<void> | null = null;

pool.on('connect', (client: AugmentedPoolClient) => {
  const baseQuery = client.query.bind(client) as PoolClient['query'];

  if (!client[PG_ROLE_PROMISE_KEY]) {
    client[PG_ROLE_PROMISE_KEY] = Promise.all([
      ensureRlsRole(baseQuery),
      ensureRlsPolicies(baseQuery),
    ])
      .then(async () => {
        await baseQuery(`SET SESSION AUTHORIZATION ${ENFORCED_ROLE}`);
      })
      .catch((error) => {
        console.error('[db] Failed to initialize RLS role', error);
      });
  }

  client.query = (async (...args: Parameters<PoolClient['query']>) => {
    if (client[PG_ROLE_PROMISE_KEY]) {
      await client[PG_ROLE_PROMISE_KEY];
    }
    await applySessionContext(baseQuery, client);
    return baseQuery(...args);
  }) as PoolClient['query'];
});

async function applySessionContext(
  baseQuery: (queryText: any, values?: any) => Promise<any>,
  client: AugmentedPoolClient
): Promise<void> {
  const tenantId = getTenantId() ?? NO_TENANT_CONTEXT;
  const bypassFlag = isSystemAdmin() ? 'true' : 'false';

  if (client[PG_TENANT_CACHE_KEY] !== tenantId) {
    await baseQuery(
      `select set_config('app.tenant_id', $1, false)`,
      [tenantId]
    );
    client[PG_TENANT_CACHE_KEY] = tenantId;
  }

  if (client[PG_BYPASS_CACHE_KEY] !== bypassFlag) {
    await baseQuery(
      `select set_config('app.bypass_rls', $1, false)`,
      [bypassFlag]
    );
    client[PG_BYPASS_CACHE_KEY] = bypassFlag;
  }
}

async function ensureRlsRole(
  baseQuery: (queryText: any, values?: any) => Promise<any>
): Promise<void> {
  if (!ensureRolePromise) {
    ensureRolePromise = baseQuery(
      `
        DO $role$
        BEGIN
          IF NOT EXISTS (
            SELECT 1 FROM pg_roles WHERE rolname = '${ENFORCED_ROLE}'
          ) THEN
            CREATE ROLE ${ENFORCED_ROLE} NOLOGIN;
          END IF;

          GRANT USAGE ON SCHEMA public TO ${ENFORCED_ROLE};
          GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO ${ENFORCED_ROLE};
          GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO ${ENFORCED_ROLE};

          ALTER DEFAULT PRIVILEGES IN SCHEMA public
            GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO ${ENFORCED_ROLE};
          ALTER DEFAULT PRIVILEGES IN SCHEMA public
            GRANT USAGE, SELECT ON SEQUENCES TO ${ENFORCED_ROLE};
        END
        $role$;
      `
    ).then(() => undefined);
  }

  await ensureRolePromise;
}

async function ensureRlsPolicies(
  baseQuery: (queryText: any, values?: any) => Promise<any>
): Promise<void> {
  if (!ensurePoliciesPromise) {
    const statements = [
      `ALTER TABLE "users" ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE "users" FORCE ROW LEVEL SECURITY`,
      `DROP POLICY IF EXISTS "users_tenant_isolation" ON "users"`,
      `CREATE POLICY "users_tenant_isolation" ON "users"
        FOR ALL
        USING (
          current_setting('app.bypass_rls', true) = 'true'
          OR "tenant_id"::text = current_setting('app.tenant_id', true)
        )`,
      `ALTER TABLE "job_postings" ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE "job_postings" FORCE ROW LEVEL SECURITY`,
      `DROP POLICY IF EXISTS "job_postings_tenant_isolation" ON "job_postings"`,
      `CREATE POLICY "job_postings_tenant_isolation" ON "job_postings"
        FOR ALL
        USING (
          current_setting('app.bypass_rls', true) = 'true'
          OR "tenant_id"::text = current_setting('app.tenant_id', true)
        )`,
      `ALTER TABLE "candidates" ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE "candidates" FORCE ROW LEVEL SECURITY`,
      `DROP POLICY IF EXISTS "candidates_tenant_isolation" ON "candidates"`,
      `CREATE POLICY "candidates_tenant_isolation" ON "candidates"
        FOR ALL
        USING (
          current_setting('app.bypass_rls', true) = 'true'
          OR "tenant_id"::text = current_setting('app.tenant_id', true)
        )`,
      `ALTER TABLE "applications" ENABLE ROW LEVEL SECURITY`,
      `ALTER TABLE "applications" FORCE ROW LEVEL SECURITY`,
      `DROP POLICY IF EXISTS "applications_tenant_isolation" ON "applications"`,
      `CREATE POLICY "applications_tenant_isolation" ON "applications"
        FOR ALL
        USING (
          current_setting('app.bypass_rls', true) = 'true'
          OR "tenant_id"::text = current_setting('app.tenant_id', true)
        )`,
    ];

    ensurePoliciesPromise = (async () => {
      for (const statement of statements) {
        try {
          await baseQuery(statement);
        } catch (error: any) {
          // Ignore missing table errors (useful in early migrations)
          if (error?.code !== '42P01') {
            throw error;
          }
        }
      }
    })();
  }

  await ensurePoliciesPromise;
}

// Create Prisma adapter
const adapter = new PrismaPg(pool);

// Base Prisma client
const basePrisma = new PrismaClient({ adapter });

/**
 * Log tenant access attempt for audit purposes
 * In production, this would write to an audit log table or service
 */
function logTenantAccess(
  operation: string,
  model: string,
  tenantId: string | null,
  success: boolean,
  error?: Error
): void {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Tenant Access]', {
      operation,
      model,
      tenantId,
      success,
      error: error?.message,
      timestamp: new Date().toISOString(),
    });
  }
  // TODO: In Story 9 (Compliance), this will write to audit_logs table
}

/**
 * Get tenant-aware Prisma client with automatic tenant filtering
 * 
 * This extends the base Prisma client with middleware that:
 * 1. Automatically adds tenant_id filters to all queries
 * 2. Validates tenant context before executing queries
 * 3. Allows system admins to bypass tenant restrictions
 * 4. Logs all tenant access attempts
 */
const tenantAwareModels = ['User', 'JobPosting', 'Candidate', 'Application'];
const contextOptionalModels = ['Tenant', 'Account', 'Session', 'VerificationToken'];

const tenantPrisma = basePrisma.$extends({
  name: 'tenant-middleware',
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const modelName = model || 'unknown';
        const isTenantAwareModel = model ? tenantAwareModels.includes(model) : false;
        const isContextOptionalModel = model ? contextOptionalModels.includes(model) : false;
        const op = operation as string;
        const mutatedArgs = args as Record<string, any>;

        // Get tenant context
        const tenantId = getTenantId();
        const isAdmin = isSystemAdmin();

        // Note: RLS policies are enabled in the database (see migration: add_rls_policies)
        // However, setting PostgreSQL session variables (app.tenant_id, app.bypass_rls)
        // requires transaction-level or connection-level configuration, which is complex
        // with Prisma's connection pooling. For now, Prisma middleware provides the
        // primary tenant filtering. RLS policies provide defense-in-depth and will
        // be fully activated when we implement connection-level session variable setting.

        // System admins or context-optional models bypass tenant filtering
        if (isAdmin || !isTenantAwareModel || isContextOptionalModel) {
          logTenantAccess(op, modelName, tenantId, true);
          return query(mutatedArgs);
        }

        // For tenant-aware models, tenant context is required
        if (!tenantId) {
          const error = new Error(
            `Tenant context required for ${op} on ${modelName}. Ensure middleware has set tenant context.`
          );
          logTenantAccess(op, modelName, null, false, error);
          throw error;
        }

        // Only apply tenant filtering to tenant-aware models
        if (isTenantAwareModel) {
          // Inject tenant_id filter based on operation type
          if (op === 'findMany' || op === 'findFirst') {
            // Add tenant_id to where clause
            mutatedArgs.where = {
              ...mutatedArgs.where,
              tenantId,
            };
          } else if (op === 'findUnique' || op === 'findFirst') {
            // For findUnique, we need to ensure tenant_id matches
            // Prisma's findUnique requires unique fields, so we add tenantId to where
            if (mutatedArgs.where) {
              mutatedArgs.where = {
                ...mutatedArgs.where,
                tenantId,
              };
            } else {
              // If where is not provided, this is invalid for tenant-aware models
              const error = new Error(
                `findUnique on ${model} requires tenant_id in where clause`
              );
              logTenantAccess(op, model, tenantId, false, error);
              throw error;
            }
          } else if (op === 'create') {
            // Ensure tenant_id is set on create
            mutatedArgs.data = {
              ...mutatedArgs.data,
              tenantId,
            };
          } else if (op === 'update' || op === 'updateMany') {
            // Add tenant_id to where clause to prevent cross-tenant updates
            mutatedArgs.where = {
              ...mutatedArgs.where,
              tenantId,
            };
          } else if (op === 'delete' || op === 'deleteMany') {
            // Add tenant_id to where clause to prevent cross-tenant deletes
            mutatedArgs.where = {
              ...mutatedArgs.where,
              tenantId,
            };
          } else if (op === 'upsert') {
            // For upsert, ensure tenant_id in both where and create/update
            mutatedArgs.where = {
              ...mutatedArgs.where,
              tenantId,
            };
            if (mutatedArgs.create) {
              mutatedArgs.create = {
                ...mutatedArgs.create,
                tenantId,
              };
            }
            if (mutatedArgs.update) {
              mutatedArgs.update = {
                ...mutatedArgs.update,
                tenantId,
              };
            }
          }

          logTenantAccess(op, modelName, tenantId, true);
        }

        // Execute the query with modified args
        return query(mutatedArgs);
      },
    },
  },
}) as PrismaClient;

// Prevent multiple instances in development
declare global {
  // eslint-disable-next-line no-var
  var prisma: typeof tenantPrisma | undefined;
}

export const db = globalThis.prisma || tenantPrisma;

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

export async function shutdownDb(): Promise<void> {
  await db.$disconnect();
  await pool.end();
}

/**
 * Execute a query with a specific tenant context
 * 
 * This helper function is useful when you need to run a query in a different
 * tenant context (e.g., system admin operations, tenant management).
 * 
 * @param tenantId - The tenant ID to use for this query
 * @param queryFn - Function that receives the Prisma client and returns a query result
 * @returns Result of the query function
 * 
 * @example
 * ```typescript
 * const users = await withTenant('tenant-123', async (prisma) => {
 *   return prisma.user.findMany();
 * });
 * ```
 */
export async function withTenant<T>(
  tenantId: string,
  queryFn: (prisma: PrismaClient) => Promise<T>
): Promise<T> {
  // Validate tenant_id
  if (!tenantId) {
    throw new Error('tenantId is required for withTenant()');
  }

  // Import tenant context utilities
  const { withTenantContext, getUserId, getRole } = await import('@/lib/tenant/context');
  
  // Get current user context (if available)
  const userId = getUserId();
  const role = getRole();

  // Run query with tenant context
  return withTenantContext(
    tenantId,
    userId || undefined,
    role || undefined,
    async () => {
      return await queryFn(db);
    }
  );
}


