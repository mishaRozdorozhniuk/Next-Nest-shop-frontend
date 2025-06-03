'use client';

import React, { useEffect, useState } from 'react';
import { refreshToken } from './auth/refresh/refresh';
import { useRouter } from 'next/navigation';

export default function TokenRefreshWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function refresh() {
      try {
      await refreshToken();


        console.log('Token refreshed successfully');
        setReady(true);
      } catch (e) {
        console.error('Refresh failed', e);
      }
    }

    refresh();
  }, []);

  if (!ready) {
    return <div>🔄 Refreshing token...</div>;
  }

  return <>{children}</>;
}
