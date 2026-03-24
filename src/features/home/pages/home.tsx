import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/shared/hooks/useAuth';
import { ROUTES } from '@/shared/constants/routes';
import {
  HomeGreetingCard,
  StartShoppingSection,
  QuickReorderSection,
  HomeShortcutGrid,
} from '../components';
import { useWalletBalance } from '@/features/wallet/hooks/useWalletBalance';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useWalletBalance();

  const handleStorePurchase = () => {
    navigate(ROUTES.SCAN_STORE);
  };

  const handleOnlinePurchase = () => {
    navigate(ROUTES.ONLINE_SHOPPING);
  };

  const handleViewAllReorders = () => {
    navigate(ROUTES.ORDER_HISTORY);
  };

  const handleReorder = (orderId: string) => {
    navigate(`/orders/${orderId}/repurchase`);
  };

  const handleFindStore = () => {
    navigate(ROUTES.NEARBY_STORES);
  };

  const handleOrders = () => {
    navigate(ROUTES.ORDER_HISTORY);
  };

  const handleWallet = () => {
    navigate(ROUTES.WALLET);
  };

  if (balanceLoading) {
    return null;
  }
  if (balanceError) {
    toast.error('Không thể tải thông tin ví. Vui lòng thử lại sau.');
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)] px-4 py-4 pb-24">
      <div className="mx-auto space-y-4">
        <HomeGreetingCard
          userName={user?.name || user?.email || 'Khách hàng'}
          walletBalance={balanceData?.balance}
        />

        <StartShoppingSection
          onStorePurchase={handleStorePurchase}
          onOnlinePurchase={handleOnlinePurchase}
        />

        <QuickReorderSection
          onViewAll={handleViewAllReorders}
          onReorder={(orderId) => handleReorder(orderId)}
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
