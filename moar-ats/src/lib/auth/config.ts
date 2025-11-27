// NextAuth v5 configuration
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db, withTenant } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';

/**
 * NextAuth.js v5 (Auth.js) configuration
 * 
 * Features:
 * - Email/password authentication with credentials provider
 * - JWT session strategy with 8-hour timeout
 * - Password hashing with bcrypt (minimum 10 rounds)
 * - Multi-tenant support (includes tenantId in session)
 * - CSRF protection (enabled by default in NextAuth v5)
 * - Secure cookie settings
 */

export const authConfig = {
  adapter: PrismaAdapter(db) as any,
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        const normalizedEmail = (credentials.email as string).trim().toLowerCase();

        // For MVP, authenticate within the MOAR Advisory tenant context
        const tenant = await db.tenant.findUnique({
          where: { slug: 'moar-advisory' },
        });

        if (!tenant) {
          throw new Error('Default tenant not configured');
        }

        const user = await withTenant(tenant.id, (prisma) =>
          prisma.user.findUnique({
            where: {
              tenantId_email: {
                tenantId: tenant.id,
                email: normalizedEmail,
              },
            },
          })
        );

        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );

        if (!isValidPassword) {
          throw new Error('Invalid email or password');
        }

        // Return user object for session
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          tenantId: user.tenantId,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 8 * 60 * 60, // 8 hours in seconds
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      // Include user data in token on first sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.tenantId = (user as any).tenantId;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Include user data in session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        (session.user as any).tenantId = token.tenantId as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

