import { createBrowserRouter, Navigate } from 'react-router-dom';

import DashboardLayout from '@/components/layout/DashboardLayout';
import RouteError from '@/components/common/RouteError';

// Pages are loaded on demand (code splitting) via React Router's `lazy`.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      {
        path: 'dashboard',
        lazy: async () => ({
          Component: (await import('@/pages/Dashboard')).default,
        }),
      },
      {
        path: 'users',
        lazy: async () => ({
          Component: (await import('@/pages/Users')).default,
        }),
      },
      {
        // Inside the layout, so the sidebar is still available on a 404.
        path: '*',
        lazy: async () => ({
          Component: (await import('@/pages/NotFound')).default,
        }),
      },
    ],
  },
]);
