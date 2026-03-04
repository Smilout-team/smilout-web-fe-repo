import type {
  TopUpPayload,
  TopUpResponse,
  TopUpStatusResponse,
  WalletTransactionHistoryResponse,
} from '../types/wallet.types';
import { httpClient } from '@/core/api/httpClient.api';
import { ENDPOINTS } from '@/core/api/endpoints';

export const walletService = {
  getBalance: async () => {
    return httpClient.get<{ balance: number }>(ENDPOINTS.GET_WALLET_BALANCE);
  },

  getTransactionHistory: async (
    page = 1,
    limit = 10,
    transactionType?: string
  ): Promise<WalletTransactionHistoryResponse> => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (transactionType) {
      params.append('transactionType', transactionType);
    }
    return httpClient.get<WalletTransactionHistoryResponse>(
      `${ENDPOINTS.GET_TRANSACTION_HISTORY}?${params.toString()}`
    );
  },

  createTopUp: async (payload: TopUpPayload): Promise<TopUpResponse> => {
    return httpClient.post<TopUpResponse>(ENDPOINTS.CREATE_TOP_UP, payload);
  },

  getTopUpStatus: async (
    invoiceNumber: string
  ): Promise<TopUpStatusResponse> => {
    const endpoint = ENDPOINTS.GET_TOP_UP_STATUS(invoiceNumber);
    return httpClient.get<TopUpStatusResponse>(endpoint);
  },

  submitCheckoutForm: (
    checkoutUrl: string,
    checkoutFields: Record<string, string | number>
  ): void => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = checkoutUrl;
    form.style.display = 'none';

    Object.entries(checkoutFields).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = String(value);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  },
};
