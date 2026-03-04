export interface Transaction {
  id: string;
  type: 'IN' | 'OUT';
  description: string;
  amount: number;
  balance: number;
  date: string;
  time: string;
}

export interface WalletData {
  balance: number;
  monthlySpent: number;
  monthlyDeposit: number;
  transactions: Transaction[];
}

export type WalletTransactionType =
  | 'DEPOSIT'
  | 'PAYMENT'
  | 'WITHDRAWAL'
  | 'REFUND';

export interface WalletTransactionHistoryItem {
  id: string;
  transactionType: WalletTransactionType;
  amount: number;
  referenceId: string;
  createdAt: string;
}

export interface WalletTransactionHistoryMeta {
  currentPage: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface WalletTransactionHistoryResponse {
  statusCode: number;
  message: string;
  data: WalletTransactionHistoryItem[];
  meta: WalletTransactionHistoryMeta;
  timestamp: string;
}

export interface TopUpPayload {
  amount: number;
  paymentMethod: 'BANK_TRANSFER';
  description?: string;
}

export interface CheckoutFields {
  [key: string]: string | number;
}

export interface TopUpResponseData {
  topUpRequestId: string;
  invoiceNumber: string;
  amount: number;
  currency: string;
  status: TopUpStatus;
  checkoutUrl: string;
  checkoutFields: CheckoutFields;
  expiresInMinutes: number;
  createdAt: string;
}

export interface TopUpResponse {
  statusCode: number;
  message: string;
  data: TopUpResponseData;
  timestamp: string;
}

export type TopUpStatus = 'PENDING' | 'PAID' | 'FAILED' | 'CANCELLED';

export interface TopUpStatusData {
  invoiceNumber: string;
  status: TopUpStatus;
  amount: number;
  currency: string;
}

export interface TopUpStatusResponse {
  statusCode: number;
  message: string;
  data: TopUpStatusData;
  timestamp: string;
}
