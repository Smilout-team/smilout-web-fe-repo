export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const parseCurrencyInput = (input: string): number => {
  const cleaned = input.replace(/\D/g, '');
  return parseInt(cleaned) || 0;
};

export const WALLET_CONSTANTS = {
  MIN_AMOUNT: 10000,
  MAX_AMOUNT: 5000000,
  DEFAULT_PRESET_AMOUNTS: [50000, 100000, 200000, 500000],
} as const;
