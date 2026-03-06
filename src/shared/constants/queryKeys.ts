export const AUTH_QUERY_KEY = ['auth', 'me'] as const;

export const STORE_HUB_QUERY_KEYS = {
  all: ['store-hub'] as const,
  storeDetail: (storeId: string) =>
    ['store-hub', 'store-detail', storeId] as const,
  orderItems: (orderId: string) =>
    ['store-hub', 'order-items', orderId] as const,
} as const;
