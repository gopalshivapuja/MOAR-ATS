import 'next-auth';
import 'next-auth/jwt';

/**
 * NextAuth type extensions
 * 
 * Extends the default NextAuth types to include tenantId and role in session
 */

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      tenantId: string;
      role: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    tenantId: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    name: string;
    tenantId: string;
    role: string;
  }
}

