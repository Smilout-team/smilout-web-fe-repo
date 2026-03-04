import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/shared/hooks/useAuth';
import {
  HomeGreetingCard,
  StartShoppingSection,
  QuickReorderSection,
  HomeShortcutGrid,
} from '../components';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleStorePurchase = () => {
    toast.info('Tính năng quét QR đang được cập nhật');
  };

  const handleOnlinePurchase = () => {
    toast.info('Tính năng mua sắm online đang được cập nhật');
  };

  const handleViewAllReorders = () => {
    toast.info('Danh sách mua lại sẽ sớm có');
  };

  const handleReorder = () => {
    toast.success('Đang xử lý mua lại đơn hàng');
  };

  const handleFindStore = () => {
    toast.info('Tính năng tìm cửa hàng đang được cập nhật');
  };

  const handleOrders = () => {
    toast.info('Tính năng đơn hàng đang được cập nhật');
  };

  const handleWallet = () => {
    navigate('/wallet');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-page)] px-4 py-4 pb-24">
      <div className="mx-auto space-y-4">
        <HomeGreetingCard
          userName={user?.name || user?.email || 'Khách hàng'}
          walletBalance="88.000đ"
        />

        <StartShoppingSection
          onStorePurchase={handleStorePurchase}
          onOnlinePurchase={handleOnlinePurchase}
        />

        <QuickReorderSection
          onViewAll={handleViewAllReorders}
          onReorder={handleReorder}
        />

        <HomeShortcutGrid
          onFindStore={handleFindStore}
          onOrders={handleOrders}
          onWallet={handleWallet}
        />
      </div>
    </div>
  );
}
