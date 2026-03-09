import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from '@/shared/components/common/BottomNav';
import { useAuth } from '@/shared/hooks/useAuth';
import { UserRole } from '@/shared/types/user.type';

const PrivateLayout = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return null;

  const isConsumer = user?.roles?.includes(UserRole.CONSUMER) || true;

  const isStoreStaffSite = location.pathname.startsWith('/store-staff');

  const showBottomNav = isConsumer && !isStoreStaffSite;

  return (
    <div>
      <Outlet />
      {showBottomNav && <BottomNav />}
    </div>
  );
};

export default PrivateLayout;
