'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * Logout button component
 * 
 * Features:
 * - Uses NextAuth signOut() function
 * - Redirects to login page after logout
 * - Clears session
 */

interface LogoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function LogoutButton({ className, children }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: true,
      callbackUrl: '/login',
    });
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className={className}
      style={
        !className
          ? {
              padding: '0.5rem 1rem',
              backgroundColor: '#1e3a5f', // Trust Navy primary
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
            }
          : undefined
      }
    >
      {children || 'Sign Out'}
    </button>
  );
}

