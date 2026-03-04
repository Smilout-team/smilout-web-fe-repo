import type { RouteObject } from 'react-router-dom';
import StoreScannerPage from '../pages/StoreScannerPage';

export const StoreScannerRoutes: RouteObject[] = [
  {
    path: 'scan-store',
    element: <StoreScannerPage />,
  },
];
