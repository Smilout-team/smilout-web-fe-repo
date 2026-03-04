import { useEffect, useState } from 'react';
import WalletBalance from '../components/WalletBalance';
import BalanceStats from '../components/BalanceStats';
import BalanceHistory from '../components/BalanceHistory';
import TopUpModal from '../components/TopUpModal';
import {
  useWalletBalance,
  useTransactionHistory,
  useTransactionHistoryInfinite,
} from '../hooks';

export const Wallet = () => {
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);

  const {
    data: balanceData,
    isLoading: balanceLoading,
    error: balanceError,
  } = useWalletBalance();

  const {
    data: initialTransactions = [],
    isLoading: transactionsLoading,
    error: transactionsError,
    dataUpdatedAt,
  } = useTransactionHistory({ page: 1, limit: 10 });

  const {
    transactions: moreTransactions,
    hasMore,
    isLoadingMore,
    loadMore,
    reset,
  } = useTransactionHistoryInfinite({ limit: 10 });

  useEffect(() => {
    reset();
  }, [dataUpdatedAt, reset]);

  const allTransactions = [...initialTransactions, ...moreTransactions];
  const canLoadMore = initialTransactions.length >= 10 && hasMore;

  const isLoading = balanceLoading || transactionsLoading;
  const error = balanceError || transactionsError;

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
          hasMore={canLoadMore}
        />
      </div>
    </div>
  );
};

export default Wallet;
