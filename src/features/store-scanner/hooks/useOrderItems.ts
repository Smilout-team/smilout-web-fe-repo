import { useQuery } from '@tanstack/react-query';
import { STORE_SCANNER_QUERY_KEYS } from '../constants/queryKeys';
import { storeHubService } from '../services/storeHubService';

export const useOrderItems = (orderId: string | null) => {
  return useQuery({
    queryKey: STORE_SCANNER_QUERY_KEYS.orderItems(orderId ?? 'unknown'),
    queryFn: async () => {
      if (!orderId) {
        throw new Error('Order ID is missing');
      }
      return storeHubService.getOrderItems(orderId);
    },
    enabled: Boolean(orderId),
  });
};
