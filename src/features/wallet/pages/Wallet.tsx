import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import WalletBalance from '../components/WalletBalance';
import BalanceStats from '../components/BalanceStats';
import BalanceHistory from '../components/BalanceHistory';
import TopUpModal from '../components/TopUpModal';
import type {
  Transaction,
  WalletTransactionHistoryItem,
} from '../types/wallet.types';
import { useWalletBalance, useTransactionHistoryInfinite } from '../hooks';
import { walletService } from '../services/walletService';

export const Wallet = () => {
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);

  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useWalletBalance();

  useEffect(() => {
    const loadInitialTransactions = async () => {
      try {
        setIsLoadingInitial(true);
        const response = await walletService.getTransactionHistory(1, 10);

        if (!response || !Array.isArray(response.data)) {
          throw new Error('Failed to load transaction history');
        }

        const transformed = response.data.map(
          (item: WalletTransactionHistoryItem) => ({
            id: item.id,
            type: item.transactionType === 'DEPOSIT' ? 'IN' : 'OUT',
            description:
              item.transactionType === 'DEPOSIT'
                ? 'Nạp tiền vào ví'
                : 'Thanh toán',
            amount: item.amount,
            balance: 0,
            date: new Date(item.createdAt).toISOString().split('T')[0],
            time: new Date(item.createdAt).toLocaleTimeString('vi-VN', {
              hour: '2-digit',
              minute: '2-digit',
            }),
          })
        ) as Transaction[];

        setTransactions(transformed);
      } catch {
        toast.error('Không thể tải lịch sử giao dịch');
      } finally {
        setIsLoadingInitial(false);
      }
    };

    loadInitialTransactions();
  }, []);

  const {
    transactions: moreTransactions,
    isLoadingMore,
    loadMore,
  } = useTransactionHistoryInfinite({ limit: 10 });

  const allTransactions = [...transactions, ...moreTransactions];

  const isLoading = balanceLoading || isLoadingInitial;
  const error = balanceError;

  const handleTopUpClick = () => {
    setIsTopUpModalOpen(true);
  };

  const handleTopUpClose = () => {
    setIsTopUpModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] pb-20">
        <div className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white px-4 py-4">
          <h1 className="text-center text-xl font-bold text-[#1F2937]">
            Ví của tôi
          </h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#FF6B6B]" />
            <p className="text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !balanceData) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] pb-20">
        <div className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white px-4 py-4">
          <h1 className="text-center text-xl font-bold text-[#1F2937]">
            Ví của tôi
          </h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="font-medium text-red-600">
              {error instanceof Error
                ? error.message
                : 'Không thể tải dữ liệu ví'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <div className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white px-4 py-4">
        <h1 className="text-center text-xl font-bold text-[#1F2937]">
          Ví của tôi
        </h1>
      </div>

      <div className="space-y-6 px-4 py-6">
        <WalletBalance
          balance={balanceData.balance}
          onTopUpClick={handleTopUpClick}
        />

        <BalanceStats
          monthlySpent={balanceData.monthlySpent}
          monthlyDeposit={balanceData.monthlyDeposit}
        />

        <TopUpModal
          isOpen={isTopUpModalOpen}
          onClose={handleTopUpClose}
          onSuccess={handleTopUpClose}
        />

        <BalanceHistory
          transactions={allTransactions}
          onLoadMore={loadMore}
          isLoadingMore={isLoadingMore}
          hasMore={transactions.length >= 10 || moreTransactions.length > 0}
        />
      </div>
    </div>
  );
};

export default Wallet;
