import { useQuery } from '@tanstack/react-query';
import { walletService } from '../services/walletService';
import { WALLET_QUERY_KEYS } from '../constants/queryKeys';

interface BalanceResponse {
  balance: number;
  monthlyDeposit: number;
  monthlySpent: number;
}

type BalanceApiResponse =
  | BalanceResponse
  | {
      data: BalanceResponse;
    };

export const useWalletBalance = () => {
  return useQuery({
    queryKey: WALLET_QUERY_KEYS.balance,
    queryFn: async () => {
      const response = (await walletService.getBalance()) as BalanceApiResponse;

      if (!response) {
        throw new Error('Failed to fetch balance');
      }

      return 'data' in response ? response.data : response;
    },
  });
};
