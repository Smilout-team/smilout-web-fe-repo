import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { TopUpPayload } from '../types/wallet.types';
import { walletService } from '../services/walletService';

export const useCreateTopUp = () => {
  return useMutation({
    mutationFn: async (payload: TopUpPayload) => {
      const response = await walletService.createTopUp(payload);

      if (response.statusCode !== 200 || !response.data) {
        throw new Error(response.message || 'Failed to create top-up session');
      }

      return response.data;
    },
    onSuccess: (data) => {
      const { checkoutUrl, checkoutFields } = data;

      if (!checkoutUrl || !checkoutFields) {
        throw new Error('Missing payment information from server');
      }

      walletService.submitCheckoutForm(checkoutUrl, checkoutFields);
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Giao dịch thất bại. Vui lòng thử lại sau';
      toast.error(errorMessage);
    },
  });
};
