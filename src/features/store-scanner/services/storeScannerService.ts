import { httpClient } from '@/core/api/httpClient.api';
import { type ApiResponse } from '@/core/api/types';
import { ENDPOINTS } from '@/core/api/endpoints';
import type {
  NearbyStore,
  ScanStoreRequest,
  ScanStoreResponse,
} from '../types';

export const storeScannerService = {
  scanStore: async (
    payload: ScanStoreRequest
  ): Promise<ApiResponse<ScanStoreResponse>> => {
    return httpClient.post<ApiResponse<ScanStoreResponse>>(
      ENDPOINTS.SCAN_STORE,
      payload
    );
  },

  getNearbyStores: async (
    latitude: number,
    longitude: number,
    limit = 4
  ): Promise<ApiResponse<NearbyStore[]>> => {
    return httpClient.get<ApiResponse<NearbyStore[]>>(
      ENDPOINTS.GET_NEARBY_STORES(latitude, longitude, limit)
    );
  },
};
