'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'worker' | 'event_team' | 'admin'>;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to unauthorized or home if role doesn't match
        router.push('/');
      }
    }
  }, [isMounted, isAuthenticated, user, allowedRoles, router]);

  // Prevent flash of content during server-side render or hydration
  if (!isMounted || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center font-sans">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-gray-500">Checking credentials...</p>
        </div>
      </div>
    );
  }

  // If role checks out or no roles specified
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
};
