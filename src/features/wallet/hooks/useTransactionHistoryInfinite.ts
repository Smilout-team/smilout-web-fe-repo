import { useState, useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import type {
  WalletTransactionHistoryItem,
  Transaction,
} from '../types/wallet.types';
import { walletService } from '../services/walletService';

const transformTransaction = (
  item: WalletTransactionHistoryItem
): Transaction => ({
  id: item.id,
  type: item.transactionType === 'DEPOSIT' ? 'IN' : 'OUT',
  description:
    item.transactionType === 'DEPOSIT' ? 'Nạp tiền vào ví' : 'Thanh toán',
  amount: item.amount,
  balance: 0,
  date: new Date(item.createdAt).toISOString().split('T')[0],
  time: new Date(item.createdAt).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  }),
});

export interface UseTransactionHistoryInfiniteParams {
  limit?: number;
  transactionType?: string;
}

export const useTransactionHistoryInfinite = ({
  limit = 10,
  transactionType,
}: UseTransactionHistoryInfiniteParams = {}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { mutate: loadMore, isPending: isLoadingMore } = useMutation({
    mutationFn: async (nextPage: number) => {
      const response = await walletService.getTransactionHistory(
        nextPage,
        limit,
        transactionType
      );

      if (!response || !Array.isArray(response.data)) {
        throw new Error('Failed to load transaction history');
      }

      const newTransactions = response.data.map(transformTransaction);
      return { newTransactions, count: response.data.length };
    },
    onSuccess: (data) => {
      setTransactions((prev) => [...prev, ...data.newTransactions]);
      setPage((prev) => prev + 1);
      setHasMore(data.count === limit);
    },
  });

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadMore(page + 1);
    }
  }, [loadMore, page, isLoadingMore, hasMore]);

  const reset = useCallback(() => {
    setTransactions([]);
    setPage(1);
    setHasMore(true);
  }, []);

  return {
    transactions,
    hasMore,
    isLoadingMore,
    loadMore: handleLoadMore,
    reset,
  };
};
