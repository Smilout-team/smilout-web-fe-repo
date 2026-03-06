import { useQuery } from '@tanstack/react-query';
import { STORE_HUB_QUERY_KEYS } from '@/shared/constants';
import { storeHubService } from '@/shared/services/storeHubService';

export const useStoreDetail = (storeId: string | null) => {
  return useQuery({
    queryKey: STORE_HUB_QUERY_KEYS.storeDetail(storeId ?? 'unknown'),
    queryFn: async () => {
      if (!storeId) {
        throw new Error('Store ID is missing');
      }

      return storeHubService.getStoreDetail(storeId);
    },
    enabled: Boolean(storeId),
  });
};
