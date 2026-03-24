import { type RouteObject } from 'react-router-dom';
import CustomerListPage from '../pages/ConsumerListPage';

export const CustomerRoutes: RouteObject[] = [
  {
    path: '/store-staff/users',
    element: <CustomerListPage />,
  },
];
