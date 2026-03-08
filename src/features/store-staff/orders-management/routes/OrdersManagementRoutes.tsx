import { type RouteObject } from 'react-router-dom';
import OrdersManagementPage from '../pages/OrdersManagementPage';
import OrderDetailPage from '../pages/OrderDetailPage';

export const OrdersManagementRoutes: RouteObject[] = [
  {
    path: 'store-staff/orders',
    element: <OrdersManagementPage />,
  },
  {
    path: 'store-staff/orders/:id',
    element: <OrderDetailPage />,
  },
];
