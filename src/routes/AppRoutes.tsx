import { type RouteObject, Navigate, useRoutes } from 'react-router-dom';
import PrivateLayout from '@/core/layouts/PrivateLayout';
import PublicLayout from '@/core/layouts/PublicLayout';
import NotFound from '@/features/auth/pages/NotFound';
import { AuthRoutes } from '@/features/auth/routes/AuthRoutes';
import { FraudRoutes } from '@/features/store-staff/FraudManagement/routes/FraudManagementRoutes';
import { DashboardRoutes } from '@/features/store-staff/dashboard/routes/DashboardRoutes';
import { OrdersManagementRoutes } from '@/features/store-staff/orders-management/routes/OrdersManagementRoutes';
import { WalletRoutes } from '@/features/wallet/routes/WalletRoutes';
import { StoreScannerRoutes } from '@/features/store-scanner/routes/StoreScannerRoutes';
import { ProductScannerRoutes } from '@/features/product-scanner/routes/ProductScannerRoutes';
import StoreHubPage from '@/features/store-scanner/pages/StoreHubPage';
import CartPage from '@/features/store-scanner/pages/CartPage';
import { CheckoutPage, CheckoutSuccessPage } from '@/features/checkout/pages';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import Home from '@/features/home/pages/home';
import { OrderHistoryRoutes } from '@/features/order-history/routes/OrderHistoryRoutes';
import SearchProductRoutes from '@/features/search-product/routes/SearchProductRoutes';

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
          ...ProductScannerRoutes,
          ...OrderHistoryRoutes,
          {
            path: 'shop/*',
            element: <SearchProductRoutes />,
          },

          {
            path: 'store-hub',
            element: <StoreHubPage />,
          },
          {
            path: 'cart',
            element: <CartPage />,
          },
          {
            path: 'checkout',
            element: <CheckoutPage />,
          },
          {
            path: 'checkout/success',
            element: <CheckoutSuccessPage />,
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
        children: [
          ...DashboardRoutes,
          ...OrdersManagementRoutes,
          ...FraudRoutes,
        ],
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
