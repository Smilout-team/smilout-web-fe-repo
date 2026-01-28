import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/shared/hooks/useAuth';

type ProtectedRoutesProps = {
  allowedRoles?: string[];
};

const ProtectedRoutes = ({ allowedRoles = [] }: ProtectedRoutesProps) => {
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  const roles = user?.roles ?? [];
  const isAuthorized =
    allowedRoles.length === 0 || roles.some((role) => allowedRoles.includes(role));

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
