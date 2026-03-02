import { type RouteObject } from 'react-router-dom';
import StoreStaffDashboard from '@/features/store-staff/pages/Dashboard';

export const StoreStaffRoutes: RouteObject[] = [
  {
    path: 'store-staff/dashboard',
    element: <StoreStaffDashboard />,
  },
];
