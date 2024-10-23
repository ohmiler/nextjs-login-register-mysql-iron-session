'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useUser({
  redirectTo = '',
  redirectIfFound = false,
} = {}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch('/api/auth/user');
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          if (redirectIfFound && redirectTo) {
            router.push(redirectTo);
          }
        } else {
          setUser(null);
          if (redirectTo && !redirectIfFound) {
            router.push(redirectTo);
          }
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, [redirectTo, redirectIfFound, router]);

  return { user, loading };
}