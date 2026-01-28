import { type RouteObject, Navigate, useRoutes } from 'react-router-dom';
import PrivateLayout from '@/core/layouts/PrivateLayout';
import PublicLayout from '@/core/layouts/PublicLayout';
import NotFound from '@/features/auth/pages/NotFound';
import { AuthRoutes } from '@/features/auth/routes/AuthRoutes';
import ProtectedRoutes from '@/routes/ProtectedRoutes';

const routes: RouteObject[] = [
  {
    element: <PublicLayout />,
    children: [
      { path: '/', element: <Navigate to="/sign-in" replace /> },
      ...AuthRoutes,
    ],
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        element: <PrivateLayout />,
        children: [],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default function AppRoutes() {
  return useRoutes(routes);
}
