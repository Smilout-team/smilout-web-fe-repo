import { Outlet } from 'react-router-dom';
import { BottomNav } from '@/shared/components/common/BottomNav';
const PrivateLayout = () => {
  return (
    <div>
      <Outlet />
      <BottomNav />
    </div>
  );
};

export default PrivateLayout;
