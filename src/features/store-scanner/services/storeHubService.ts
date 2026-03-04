import { ENDPOINTS } from '@/core/api/endpoints';
import { httpClient } from '@/core/api/httpClient.api';
import { type ApiResponse } from '@/core/api/types';
import type { StoreDetail } from '../types';

export const storeHubService = {
  getStoreDetail: async (storeId: string): Promise<StoreDetail> => {
    const response = await httpClient.get<ApiResponse<StoreDetail>>(
      ENDPOINTS.GET_STORE_DETAIL(storeId)
    );

    return response.data;
  },
};
