export const WALLET_QUERY_KEYS = {
  all: ['wallet'] as const,
  balance: ['wallet', 'balance'] as const,
  transactionHistory: (
    page: number = 1,
    limit: number = 10,
    transactionType?: string
  ) =>
    [
      'wallet',
      'transactionHistory',
      { page, limit, ...(transactionType && { transactionType }) },
    ] as const,
} as const;
