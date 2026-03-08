import { type RouteObject } from 'react-router-dom';
import OrderHistoryPage from '@/features/order-history/pages/OrderHistoryPage';

export const OrderHistoryRoutes: RouteObject[] = [
  {
    path: 'orders',
    element: <OrderHistoryPage />,
  },
];
