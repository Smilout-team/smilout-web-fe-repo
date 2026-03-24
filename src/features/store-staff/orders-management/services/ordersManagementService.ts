import { httpClient } from '@/core/api/httpClient.api';
import type { ApiResponse } from '@/core/api/types';
import type { Order, OrderStatus, OrderType } from '../types/order.type';

export interface BackendOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
  imageUrls: string[] | Record<string, unknown>;
}

export interface BackendOrder {
  id: string;
  orderType: OrderType;
  status: OrderStatus;
  deliveryAddress: string | null;
  deliveryPhoneNumber: string | null;
  deliveryOption: 'ASAP' | 'SCHEDULED' | null;
  scheduledDeliveryAt: string | null;
  createdAt: string;
  totalAmount: number;
  consumer: {
    id: string;
    name: string;
    phoneNumber: string | null;
  };
  items: BackendOrderItem[];
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMinutes = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );

  if (diffInMinutes < 1) return 'Vừa xong';
  if (diffInMinutes < 60) return `${diffInMinutes} phút trước`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} giờ trước`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} ngày trước`;
}

function getFirstImageUrl(
  imageUrls: string[] | Record<string, unknown>
): string {
  if (Array.isArray(imageUrls) && imageUrls.length > 0) {
    return imageUrls[0];
  }
  return '/placeholder.png';
}

export const mapBackendOrderToFrontend = (
  backendOrder: BackendOrder
): Order => {
  const subtotal = backendOrder.items.reduce(
    (sum, item) => sum + item.priceAtPurchase * item.quantity,
    0
  );

  const shippingFee =
    backendOrder.orderType === 'DELIVERY'
      ? Math.max(backendOrder.totalAmount - subtotal, 0)
      : 0;

  const scheduledTimeText = backendOrder.scheduledDeliveryAt
    ? new Date(backendOrder.scheduledDeliveryAt).toLocaleString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : null;

  const deliveryNote =
    (backendOrder.deliveryOption === 'SCHEDULED' && scheduledTimeText
      ? `Thời gian giao: ${scheduledTimeText} `
      : backendOrder.deliveryOption === 'ASAP'
        ? 'Thời gian giao: Giao ngay'
        : '') +
    ` - Số điện thoại giao hàng: ${backendOrder.deliveryPhoneNumber}`;

  return {
    id: backendOrder.id,
    customerName: backendOrder.consumer.name,
    phone: backendOrder.consumer.phoneNumber || 'Không có',
    deliveryPhoneNumber: backendOrder.deliveryPhoneNumber || undefined,
    address: backendOrder.deliveryAddress || undefined,
    items: backendOrder.items.map((item) => ({
      id: item.id,
      name: item.productName,
      price: item.priceAtPurchase,
      quantity: item.quantity,
      image: getFirstImageUrl(item.imageUrls),
    })),
    subtotal,
    shippingFee,
    total: backendOrder.totalAmount,
    time: formatTimeAgo(backendOrder.createdAt),
    status: backendOrder.status,
    orderType: backendOrder.orderType,
    paymentMethod: 'Ví SMILOUT',
    isPaid: backendOrder.status !== 'PENDING',
    note: deliveryNote,
  };
};

export const ordersManagementService = {
  getOrders: async (): Promise<Order[]> => {
    const response = await httpClient.get<ApiResponse<BackendOrder[]>>(
      '/orders/staff/orders'
    );
    return response.data.map(mapBackendOrderToFrontend);
  },

  acceptOrder: async (orderId: string): Promise<void> => {
    await httpClient.patch(`/orders/${orderId}/status`, {
      status: 'PREPARING',
    });
  },

  completeOrder: async (orderId: string): Promise<void> => {
    await httpClient.patch(`/orders/${orderId}/status`, {
      status: 'COMPLETED',
    });
  },

  rejectOrder: async (orderId: string): Promise<void> => {
    await httpClient.patch(`/orders/${orderId}/status`, { status: 'REJECTED' });
  },
};
