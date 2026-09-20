import { createBrowserRouter } from 'react-router-dom';

import DashboardLayout from '@/layouts/dashboard/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/NotFound';
import Users from '@/pages/Users';
import { Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },

      {
        path: 'users',
        element: <Users />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFound />,
  },
]);
