import { type RouteObject } from 'react-router-dom';
import FraudManagementPage from '@/features/store-staff/FraudManagement/pages/FraudManagementPage';
export const FraudRoutes: RouteObject[] = [
  {
    path: 'store-staff/fraud-management',
    element: <FraudManagementPage />,
  },
];
