import { type RouteObject, Navigate, useRoutes } from 'react-router-dom';
import PrivateLayout from '@/core/layouts/PrivateLayout';
import PublicLayout from '@/core/layouts/PublicLayout';
import NotFound from '@/features/auth/pages/NotFound';
import { AuthRoutes } from '@/features/auth/routes/AuthRoutes';
import { StoreStaffRoutes } from '@/features/store-staff/routes/StoreStaffRoutes';
import { WalletRoutes } from '@/features/wallet/routes/WalletRoutes';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import Home from '@/features/home/pages/home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    element: <PublicLayout />,
    children: [...AuthRoutes],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          ...WalletRoutes,
        ],
      },
    ],
  },
  {
    element: <ProtectedRoutes allowedRoles={['STORE_STAFF']} />,
    children: [
      {
        element: <PrivateLayout />,
        children: [...StoreStaffRoutes],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
