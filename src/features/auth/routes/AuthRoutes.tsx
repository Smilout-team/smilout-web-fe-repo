import { type RouteObject } from 'react-router-dom';
import Welcome from '@/features/auth/pages/Welcome';
import SignIn from '@/features/auth/pages/SignIn';
import SignUp from '@/features/auth/pages/SignUp';
import Unauthorized from '@/features/auth/pages/Unauthorized';
import StoreStaffSignIn from '@/features/auth/pages/StoreStaffSignIn';

export const AuthRoutes: RouteObject[] = [
  {
    path: 'welcome',
    element: <Welcome />,
  },
  {
    path: 'sign-in',
    element: <SignIn />,
  },
  {
    path: 'sign-up',
    element: <SignUp />,
  },
  {
    path: 'unauthorized',
    element: <Unauthorized />,
  },
  {
    path: 'store-staff/sign-in',
    element: <StoreStaffSignIn />,
  },
];
