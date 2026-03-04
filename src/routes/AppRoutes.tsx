import { type RouteObject, Navigate, useRoutes } from 'react-router-dom';
import PrivateLayout from '@/core/layouts/PrivateLayout';
import PublicLayout from '@/core/layouts/PublicLayout';
import NotFound from '@/features/auth/pages/NotFound';
import { AuthRoutes } from '@/features/auth/routes/AuthRoutes';
import { StoreStaffRoutes } from '@/features/store-staff/routes/StoreStaffRoutes';
import { WalletRoutes } from '@/features/wallet/routes/WalletRoutes';
import { StoreScannerRoutes } from '@/features/store-scanner/routes/StoreScannerRoutes';
import StoreHubPage from '@/features/store-scanner/pages/StoreHubPage';
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
          ...StoreScannerRoutes,
          {
            path: 'store-hub',
            element: <StoreHubPage />,
          },
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
