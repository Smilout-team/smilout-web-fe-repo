import { type RouteObject } from 'react-router-dom';
import StoreStaffDashboard from '@/features/store-staff/dashboard/pages/StoreStaffDashboard';

export const DashboardRoutes: RouteObject[] = [
  {
    path: 'store-staff/dashboard',
    element: <StoreStaffDashboard />,
  },
];
