import { type RouteObject } from 'react-router-dom';
import OrderHistoryPage from '@/features/order-history/pages/OrderHistoryPage';
import StoreRecommendationsPage from '@/features/order-history/pages/StoreRecommendationsPage';

export const OrderHistoryRoutes: RouteObject[] = [
  {
    path: 'order-history',
    element: <OrderHistoryPage />,
  },
  {
    path: 'orders/:orderId/repurchase',
    element: <StoreRecommendationsPage />,
  },
];
