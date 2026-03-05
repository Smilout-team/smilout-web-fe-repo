export const API_PATHS = {
  WALLET: '/wallet',
  TOP_UP: '/wallet/top-up',
  STORES: '/stores',
  ORDERS: '/orders',
};

export const ENDPOINTS = {
  GET_WALLET_BALANCE: `${API_PATHS.WALLET}/balance`,
  GET_TRANSACTION_HISTORY: `${API_PATHS.WALLET}/transactions`,
  CREATE_TOP_UP: `${API_PATHS.TOP_UP}`,
  GET_TOP_UP_STATUS: (invoiceNumber: string) =>
    `${API_PATHS.TOP_UP}/${invoiceNumber}`,
  SCAN_STORE: `${API_PATHS.STORES}/scan`,
  GET_STORE_DETAIL: (storeId: string) => `${API_PATHS.STORES}/${storeId}`,
  SCAN_PRODUCT: `${API_PATHS.ORDERS}/scan-product`,
  GET_ORDER_ITEMS: (orderId: string) => `${API_PATHS.ORDERS}/${orderId}/items`,
  DELETE_ORDER_ITEM: (orderId: string, itemId: string) =>
    `${API_PATHS.ORDERS}/${orderId}/items/${itemId}`,
  UPDATE_ORDER_ITEM: (orderId: string, itemId: string) =>
    `${API_PATHS.ORDERS}/${orderId}/items/${itemId}`,
};
