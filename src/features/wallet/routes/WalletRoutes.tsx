import { type RouteObject } from 'react-router-dom';
import Wallet from '../pages/Wallet';
import TopUpResult from '../pages/TopUpResult';

export const WalletRoutes: RouteObject[] = [
  {
    path: 'wallet',
    element: <Wallet />,
  },
  {
    path: 'wallet/top-up/result',
    element: <TopUpResult />,
  },
];
