import { type RouteObject } from 'react-router-dom';
import OrdersPage from '../pages/OrdersManagementPage';
import OrderDetailPage from '../pages/OrderDetailPage';

export const OrdersManagementRoutes: RouteObject[] = [
  {
    path: 'store-staff/orders',
    element: <OrdersPage />,
  },
  {
    path: 'store-staff/orders/:id',
    element: <OrderDetailPage />,
  },
];
