import { type RouteObject } from 'react-router-dom';
import CustomerListPage from '../pages/CustomerListPage';

export const CustomerRoutes: RouteObject[] = [
  {
    path: '/store-staff/users',
    element: <CustomerListPage />,
  },
];
