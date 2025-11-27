import { withTenantContext } from '@/lib/tenant/context';

const SYSTEM_ADMIN_TENANT = 'test-system-admin-tenant';
const SYSTEM_ADMIN_USER = 'test-system-admin-user';

export function runAsSystemAdmin<T>(fn: () => Promise<T>): Promise<T> {
  return withTenantContext(
    SYSTEM_ADMIN_TENANT,
    SYSTEM_ADMIN_USER,
    'SYSTEM_ADMIN',
    fn
  );
}

