import { ENDPOINTS } from '@/core/api/endpoints';
import { httpClient } from '@/core/api/httpClient.api';
import type { ApiResponse } from '@/core/api/types';
import type {
  Order,
  RepurchaseOrderRequest,
  RepurchaseOrderResponse,
  RepurchaseToCartRequest,
  RepurchaseToCartResponse,
} from '../types/order';

interface OrderHistoryApiItem {
  id: string;
  orderType: 'DELIVERY' | 'INSTORE';
  status: 'PENDING' | 'PAID' | 'PREPARING';
  deliveryAddress: string | null;
  deliveryOption: 'ASAP' | 'SCHEDULED' | null;
  scheduledDeliveryAt: string | null;
  createdAt: string;
  totalAmount: number;
  totalItems: number;
  store: {
    id: string;
    storeName: string;
    address: string;
  };
  items: Array<{
    productName: string;
    quantity: number;
    priceAtPurchase: number;
  }>;
}

const mapOrderItem = (item: OrderHistoryApiItem): Order => ({
  id: item.id,
  orderType: item.orderType,
  status: item.status,
  deliveryOption: item.deliveryOption,
  scheduledDeliveryAt: item.scheduledDeliveryAt,
  orderDate: item.createdAt,
  storeName: item.store.storeName,
  storeAddress: item.store.address,
  deliveryAddress: item.deliveryAddress ?? undefined,
  totalItems: item.totalItems,
  totalPrice: item.totalAmount,
  storeId: item.store.id,
  items: item.items,
});

export const orderHistoryService = {
  getMyOrders: async (): Promise<Order[]> => {
    const response = await httpClient.get<ApiResponse<OrderHistoryApiItem[]>>(
      ENDPOINTS.GET_MY_ORDERS
    );

    return (response.data ?? []).map(mapOrderItem);
  },

  getRepurchaseRecommendations: async (
    request: RepurchaseOrderRequest
  ): Promise<RepurchaseOrderResponse> => {
    const response = await httpClient.post<
      ApiResponse<RepurchaseOrderResponse>
    >(ENDPOINTS.REPURCHASE_ORDER, request);

    return response.data;
  },

  repurchaseToCart: async (
    request: RepurchaseToCartRequest
  ): Promise<RepurchaseToCartResponse> => {
    const response = await httpClient.post<
      ApiResponse<RepurchaseToCartResponse>
    >(ENDPOINTS.REPURCHASE_TO_CART, request);

    return response.data;
  },
};
