// 'use client';

// import React, { useEffect } from 'react';
// import { refreshToken } from './auth/refresh/refresh';
// import { useAuthStore } from './stores/authStore/useCartStore';

// export default function TokenRefreshWrapper({ children }: { children: React.ReactNode }) {
//   const { tokenRefreshed, setTokenRefreshed } = useAuthStore();

//   useEffect(() => {
//     async function refresh() {
//       try {
//         await refreshToken();
//         console.log('Token refreshed successfully');
//         setTokenRefreshed(true);
//       } catch (e) {
//         console.error('Refresh failed', e);
//         setTokenRefreshed(false);
//       }
//     }
//     refresh();
//   }, [setTokenRefreshed]);

//   if (!tokenRefreshed) {
//     return <div>🔄 Refreshing token...</div>;
//   }

//   return <>{children}</>;
// }
