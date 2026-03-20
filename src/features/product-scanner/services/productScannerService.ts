import { httpClient } from '@/core/api/httpClient.api';
import { ENDPOINTS } from '@/core/api/endpoints';
import type { ScanProductRequest, ScanProductResponse } from '../types';

export const productScannerService = {
  scanProduct: async (
    payload: ScanProductRequest
  ): Promise<ScanProductResponse> => {
    return httpClient.post<ScanProductResponse>(
      ENDPOINTS.SCAN_PRODUCT,
      payload
    );
  },
};
