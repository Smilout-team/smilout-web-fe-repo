import { useQuery } from '@tanstack/react-query';
import { STORE_SCANNER_QUERY_KEYS } from '../constants/queryKeys';
import { storeHubService } from '../services/storeHubService';

export const useStoreDetail = (storeId: string | null) => {
  return useQuery({
    queryKey: STORE_SCANNER_QUERY_KEYS.storeDetail(storeId ?? 'unknown'),
    queryFn: async () => {
      if (!storeId) {
        throw new Error('Store ID is missing');
      }
      return storeHubService.getStoreDetail(storeId);
    },
    enabled: Boolean(storeId),
  });
};
