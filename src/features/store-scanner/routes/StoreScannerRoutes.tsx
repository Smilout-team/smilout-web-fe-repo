import type { RouteObject } from 'react-router-dom';
import StoreScannerPage from '../pages/StoreScannerPage';
import NearbyStoresPage from '../pages/NearbyStoresPage';

export const StoreScannerRoutes: RouteObject[] = [
  {
    path: 'scan-store',
    element: <StoreScannerPage />,
  },
  {
    path: 'nearby-stores',
    element: <NearbyStoresPage />,
  },
];
