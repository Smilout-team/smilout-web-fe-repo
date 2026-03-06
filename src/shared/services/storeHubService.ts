import { ENDPOINTS } from '@/core/api/endpoints';
import { httpClient } from '@/core/api/httpClient.api';
import { type ApiResponse } from '@/core/api/types';
import type { OrderItem, StoreDetail } from '@/shared/types';

export const storeHubService = {
  getStoreDetail: async (storeId: string): Promise<StoreDetail> => {
    const response = await httpClient.get<ApiResponse<StoreDetail>>(
      ENDPOINTS.GET_STORE_DETAIL(storeId)
    );

    if (!response.data) {
      throw new Error('Failed to fetch store detail: No data in response');
    }

    return response.data;
  },

  getOrderItems: async (orderId: string): Promise<OrderItem[]> => {
    const response = await httpClient.get<ApiResponse<OrderItem[]>>(
      ENDPOINTS.GET_ORDER_ITEMS(orderId)
    );

    return response.data;
  },

  deleteOrderItem: async (orderId: string, itemId: string): Promise<void> => {
    await httpClient.delete<ApiResponse<null>>(
      ENDPOINTS.DELETE_ORDER_ITEM(orderId, itemId)
    );
  },

  updateOrderItemQuantity: async (
    orderId: string,
    itemId: string,
    quantity: number
  ): Promise<OrderItem> => {
    const response = await httpClient.patch<ApiResponse<OrderItem>>(
      ENDPOINTS.UPDATE_ORDER_ITEM(orderId, itemId),
      { quantity }
    );

    return response.data;
  },
};
