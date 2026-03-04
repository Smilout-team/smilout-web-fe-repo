export const API_PATHS = {
  WALLET: '/wallet',
  TOP_UP: '/wallet/top-up',
};

export const ENDPOINTS = {
  GET_WALLET_BALANCE: `${API_PATHS.WALLET}/balance`,
  GET_TRANSACTION_HISTORY: `${API_PATHS.WALLET}/transactions`,
  CREATE_TOP_UP: `${API_PATHS.TOP_UP}`,
  GET_TOP_UP_STATUS: (invoiceNumber: string) =>
    `${API_PATHS.TOP_UP}/${invoiceNumber}`,
};
