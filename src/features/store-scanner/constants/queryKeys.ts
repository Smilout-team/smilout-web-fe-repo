export const STORE_SCANNER_QUERY_KEYS = {
  all: ['store-scanner'] as const,
  scan: ['store-scanner', 'scan'] as const,
  storeDetail: (storeId: string) =>
    ['store-scanner', 'store-detail', storeId] as const,
} as const;
