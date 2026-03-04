export const API_PATHS = {
  WALLET: '/wallet',
  TOP_UP: '/wallet/top-up',
  STORES: '/stores',
};

export const ENDPOINTS = {
  GET_WALLET_BALANCE: `${API_PATHS.WALLET}/balance`,
  GET_TRANSACTION_HISTORY: `${API_PATHS.WALLET}/transactions`,
  CREATE_TOP_UP: `${API_PATHS.TOP_UP}`,
  GET_TOP_UP_STATUS: (invoiceNumber: string) =>
    `${API_PATHS.TOP_UP}/${invoiceNumber}`,
  SCAN_STORE: `${API_PATHS.STORES}/scan`,
  GET_STORE_DETAIL: (storeId: string) => `${API_PATHS.STORES}/${storeId}`,
};
