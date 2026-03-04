import { useQuery } from '@tanstack/react-query';
import type {
  WalletTransactionHistoryItem,
  Transaction,
} from '../types/wallet.types';
import { walletService } from '../services/walletService';
import { WALLET_QUERY_KEYS } from '../constants/queryKeys';

export interface UseTransactionHistoryParams {
  page?: number;
  limit?: number;
  transactionType?: string;
}

export const useTransactionHistory = ({
  page = 1,
  limit = 10,
  transactionType,
}: UseTransactionHistoryParams = {}) => {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.transactionHistory(
      page,
      limit,
      transactionType
    ),
    queryFn: async () => {
      const response = await walletService.getTransactionHistory(
        page,
        limit,
        transactionType
      );

      if (!response || !Array.isArray(response.data)) {
        throw new Error('Failed to load transaction history');
      }

      const transactions = response.data || [];

      return transactions.map((item: WalletTransactionHistoryItem) => ({
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
      })) as Transaction[];
    },
  });
};
