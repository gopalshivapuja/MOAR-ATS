/**
 * @jest-environment node
 */
import { db } from '@/lib/db/prisma';
import {
  clearTenantContext,
  withTenantContext,
} from '@/lib/tenant/context';
import { runAsSystemAdmin } from '../utils/system-admin';

describe('Postgres RLS session context', () => {
  const slugTimestamp = Date.now();
  const tenantSlugs = {
    a: `rls-a-${slugTimestamp}`,
    b: `rls-b-${slugTimestamp}`,
  };

  let tenantA: { id: string };
  let tenantB: { id: string };
  let userA: { id: string };
  let userB: { id: string };

  beforeAll(async () => {
    tenantA = await runAsSystemAdmin(() =>
      db.tenant.create({
        data: {
          name: 'RLS Tenant A',
          slug: tenantSlugs.a,
        },
      })
    );

    tenantB = await runAsSystemAdmin(() =>
      db.tenant.create({
        data: {
          name: 'RLS Tenant B',
          slug: tenantSlugs.b,
        },
      })
    );

    userA = await withTenantContext(
      tenantA.id,
      'rls-user-a',
      'recruiter',
      async () =>
        db.user.create({
          data: {
            email: `${tenantSlugs.a}@example.com`,
            name: 'Tenant A User',
            passwordHash: 'hash-a',
            tenantId: tenantA.id,
            role: 'recruiter',
          },
          select: { id: true },
        })
    );

    userB = await withTenantContext(
      tenantB.id,
      'rls-user-b',
      'recruiter',
      async () =>
        db.user.create({
          data: {
            email: `${tenantSlugs.b}@example.com`,
            name: 'Tenant B User',
            passwordHash: 'hash-b',
            tenantId: tenantB.id,
            role: 'recruiter',
          },
          select: { id: true },
        })
    );
  });

  afterAll(async () => {
    await withTenantContext(
      tenantA.id,
      'cleanup-a',
      'SYSTEM_ADMIN',
      async () =>
        db.user.deleteMany({
          where: { tenantId: tenantA.id },
        })
    );

    await withTenantContext(
      tenantB.id,
      'cleanup-b',
      'SYSTEM_ADMIN',
      async () =>
        db.user.deleteMany({
          where: { tenantId: tenantB.id },
        })
    );

    await runAsSystemAdmin(() =>
      db.tenant.deleteMany({
        where: {
          slug: {
            in: [tenantSlugs.a, tenantSlugs.b],
          },
        },
      })
    );
  });

  it('sets session variables based on tenant context', async () => {
    const rows = await withTenantContext(
      tenantA.id,
      'tenant-a-reader',
      'recruiter',
      async () =>
        db.$queryRawUnsafe<
          Array<{ tenant: string | null; bypass: string | null }>
        >(
          `select
             current_setting('app.tenant_id', true) as tenant,
             current_setting('app.bypass_rls', true) as bypass`
        )
    );

    expect(rows).toHaveLength(1);
    expect(rows[0]?.tenant).toBe(tenantA.id);
    expect(rows[0]?.bypass).toBe('false');

    const roleRows = await withTenantContext(
      tenantA.id,
      'tenant-a-reader',
      'recruiter',
      async () =>
        db.$queryRawUnsafe<
          Array<{ current_user: string; session_user: string }>
        >('select current_user, session_user')
    );

    expect(roleRows).toHaveLength(1);
    expect(roleRows[0]?.current_user).toBe('rls_enforced');

    const policyRows = await db.$queryRawUnsafe<
      Array<{ policyname: string }>
    >(
      `select policyname from pg_policies where schemaname = 'public' and tablename = 'users'`
    );
    expect(policyRows.length).toBeGreaterThan(0);
  });

  it('allows tenant to read only its own rows via raw queries', async () => {
    const rows = await withTenantContext(
      tenantA.id,
      'tenant-a-reader',
      'recruiter',
      async () =>
        db.$queryRawUnsafe<Array<{ id: string }>>(
          'select id from "users" where id = $1',
          userB.id
        )
    );

    expect(rows).toHaveLength(0);

    const ownRows = await withTenantContext(
      tenantA.id,
      'tenant-a-reader',
      'recruiter',
      async () =>
        db.$queryRawUnsafe<Array<{ id: string }>>(
          'select id from "users" where id = $1',
          userA.id
        )
    );

    expect(ownRows).toHaveLength(1);
    expect(ownRows[0].id).toBe(userA.id);
  });

  it('allows system admins to bypass RLS when flag is set', async () => {
    const rows = await withTenantContext(
      tenantA.id,
      'sys-admin',
      'SYSTEM_ADMIN',
      async () =>
        db.$queryRawUnsafe<Array<{ id: string; tenant_id: string }>>(
          'select id, tenant_id from "users" where id = $1',
          userB.id
        )
    );

    expect(rows).toHaveLength(1);
    expect(rows[0].id).toBe(userB.id);
  });

  it('clears previous tenant context when no context is provided', async () => {
    clearTenantContext();
    const rows = await db.$queryRawUnsafe<Array<{ id: string }>>(
      'select id from "users" where id = $1',
      userA.id
    );

    expect(rows).toHaveLength(0);
  });
});

