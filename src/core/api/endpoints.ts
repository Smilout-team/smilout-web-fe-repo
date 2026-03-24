export const API_PATHS = {
  WALLET: '/wallet',
  TOP_UP: '/wallet/top-up',
  STORES: '/stores',
  ORDERS: '/orders',
  PAYMENT: '/payment',
};

export const ENDPOINTS = {
  GET_WALLET_BALANCE: `${API_PATHS.WALLET}/balance`,
  GET_TRANSACTION_HISTORY: `${API_PATHS.WALLET}/transactions`,
  CREATE_TOP_UP: `${API_PATHS.TOP_UP}`,
  GET_TOP_UP_STATUS: (invoiceNumber: string) =>
    `${API_PATHS.TOP_UP}/${invoiceNumber}`,
  SCAN_STORE: `${API_PATHS.STORES}/scan`,
  GET_NEARBY_STORES: (latitude: number, longitude: number, limit = 4) =>
    `${API_PATHS.STORES}/nearby?latitude=${latitude}&longitude=${longitude}&limit=${limit}`,
  GET_STORE_DETAIL: (storeId: string) => `${API_PATHS.STORES}/${storeId}`,
  SCAN_PRODUCT: `${API_PATHS.ORDERS}/scan-product`,
  GET_MY_ORDERS: `${API_PATHS.ORDERS}/me`,
  GET_MY_LATEST_ORDER: `${API_PATHS.ORDERS}/me/latest`,
  GET_ORDER_ITEMS: (orderId: string) => `${API_PATHS.ORDERS}/${orderId}/items`,
  DELETE_ORDER_ITEM: (orderId: string, itemId: string) =>
    `${API_PATHS.ORDERS}/${orderId}/items/${itemId}`,
  UPDATE_ORDER_ITEM: (orderId: string, itemId: string) =>
    `${API_PATHS.ORDERS}/${orderId}/items/${itemId}`,
  REPURCHASE_ORDER: `${API_PATHS.ORDERS}/repurchase`,
  REPURCHASE_TO_CART: `${API_PATHS.ORDERS}/repurchase-to-cart`,
  GET_DELIVERY_ADDRESSES: `${API_PATHS.PAYMENT}/delivery-addresses`,
  SEARCH_DELIVERY_ADDRESSES: `${API_PATHS.PAYMENT}/delivery-addresses/search`,
  PROCESS_PAYMENT: `${API_PATHS.PAYMENT}`,
};
