import { ENDPOINTS } from '@/core/api/endpoints';
import { type ApiResponse } from '@/core/api/types';
import { httpClient } from '@/core/api/httpClient.api';
import type {
  DeliveryAddressOption,
  ProcessPaymentRequest,
  ProcessPaymentResponse,
} from '../types';

export const checkoutService = {
  getDeliveryAddressOptions: async (
    userLatitude: number,
    userLongitude: number
  ): Promise<DeliveryAddressOption[]> => {
    const response = await httpClient.get<ApiResponse<DeliveryAddressOption[]>>(
      `${ENDPOINTS.GET_DELIVERY_ADDRESSES}?userLatitude=${userLatitude}&userLongitude=${userLongitude}`
    );

    return response.data ?? [];
  },

  searchDeliveryAddressOptions: async (
    keyword: string,
    userLatitude: number,
    userLongitude: number
  ): Promise<DeliveryAddressOption[]> => {
    const response = await httpClient.get<ApiResponse<DeliveryAddressOption[]>>(
      `${ENDPOINTS.SEARCH_DELIVERY_ADDRESSES}?keyword=${encodeURIComponent(keyword)}&userLatitude=${userLatitude}&userLongitude=${userLongitude}`
    );

    return response.data ?? [];
  },

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
