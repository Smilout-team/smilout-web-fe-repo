import { httpClient } from '@/core/api/httpClient.api';
import { type ApiResponse } from '@/core/api/types';
import { ENDPOINTS } from '@/core/api/endpoints';
import type { ScanStoreRequest, ScanStoreResponse } from '../types';

export const storeScannerService = {
  scanStore: async (
    payload: ScanStoreRequest
  ): Promise<ApiResponse<ScanStoreResponse>> => {
    return httpClient.post<ApiResponse<ScanStoreResponse>>(
      ENDPOINTS.SCAN_STORE,
      payload
    );
  },
};
