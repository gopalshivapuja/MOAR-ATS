-- Enable Row-Level Security (RLS) on all tenant-aware tables
-- This migration implements database-level tenant isolation
-- 
-- RLS Policies:
-- 1. All tenant-aware tables have RLS enabled
-- 2. Policies check tenant_id matches authenticated user's tenant
-- 3. System admins can bypass RLS (for tenant management)
-- 4. Policies prevent cross-tenant data access at database level
--
-- Note: Prisma middleware also filters queries, but RLS provides
-- defense-in-depth security at the database layer.

-- Enable RLS on users table
ALTER TABLE "users" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see users in their tenant
-- System admins can see all users (bypass via app.bypass_rls setting)
CREATE POLICY "users_tenant_isolation" ON "users"
  FOR ALL
  USING (
    -- System admin bypass (set by application when role = SYSTEM_ADMIN)
    current_setting('app.bypass_rls', true) = 'true'
    OR
    -- Tenant isolation: user's tenant_id matches authenticated tenant
    "tenant_id" = current_setting('app.tenant_id', true)::uuid
  );

-- Enable RLS on job_postings table
ALTER TABLE "job_postings" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see job postings in their tenant
CREATE POLICY "job_postings_tenant_isolation" ON "job_postings"
  FOR ALL
  USING (
    current_setting('app.bypass_rls', true) = 'true'
    OR
    "tenant_id" = current_setting('app.tenant_id', true)::uuid
  );

-- Enable RLS on candidates table
ALTER TABLE "candidates" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see candidates in their tenant
CREATE POLICY "candidates_tenant_isolation" ON "candidates"
  FOR ALL
  USING (
    current_setting('app.bypass_rls', true) = 'true'
    OR
    "tenant_id" = current_setting('app.tenant_id', true)::uuid
  );

-- Enable RLS on applications table
ALTER TABLE "applications" ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see applications in their tenant
CREATE POLICY "applications_tenant_isolation" ON "applications"
  FOR ALL
  USING (
    current_setting('app.bypass_rls', true) = 'true'
    OR
    "tenant_id" = current_setting('app.tenant_id', true)::uuid
  );

-- Note: tenants table does NOT have RLS enabled
-- System admins need to manage tenants, and tenant lookup
-- is needed before RLS context can be set.

-- Note: accounts, sessions, verification_tokens tables do NOT have RLS
-- These are NextAuth.js tables and are not tenant-aware.
-- Access is controlled by NextAuth.js and application logic.

