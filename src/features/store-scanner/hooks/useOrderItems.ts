import { useQuery } from '@tanstack/react-query';
import { STORE_HUB_QUERY_KEYS } from '@/shared/constants';
import { storeHubService } from '@/shared/services/storeHubService';

export const useOrderItems = (orderId: string | null) => {
  return useQuery({
    queryKey: STORE_HUB_QUERY_KEYS.orderItems(orderId ?? 'unknown'),
    queryFn: async () => {
      if (!orderId) {
        throw new Error('Order ID is missing');
      }
      return storeHubService.getOrderItems(orderId);
    },
    enabled: Boolean(orderId),
  });
};
