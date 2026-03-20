import type { RouteObject } from 'react-router-dom';
import { ProductScanPage } from '../pages/ProductScanPage';

export const ProductScannerRoutes: RouteObject[] = [
  {
    path: 'scan-product',
    element: <ProductScanPage />,
  },
];
