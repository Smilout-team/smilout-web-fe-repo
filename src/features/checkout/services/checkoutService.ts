import { ENDPOINTS } from '@/core/api/endpoints';
import { type ApiResponse } from '@/core/api/types';
import { httpClient } from '@/core/api/httpClient.api';
import type { ProcessPaymentRequest, ProcessPaymentResponse } from '../types';

export const checkoutService = {
  processPayment: async (
    payload: ProcessPaymentRequest
  ): Promise<ProcessPaymentResponse> => {
    const response = await httpClient.post<ApiResponse<ProcessPaymentResponse>>(
      ENDPOINTS.PROCESS_PAYMENT,
      payload
    );

    return response.data;
  },
};
