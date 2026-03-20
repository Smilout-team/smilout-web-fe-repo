import { type RouteObject } from 'react-router-dom';
import OrderHistoryPage from '@/features/order-history/pages/OrderHistoryPage';
import StoreRecommendationsPage from '@/features/order-history/pages/StoreRecommendationsPage';

export const OrderHistoryRoutes: RouteObject[] = [
  {
    path: 'orders',
    element: <OrderHistoryPage />,
  },
  {
    path: 'orders/:orderId/repurchase',
    element: <StoreRecommendationsPage />,
  },
];
