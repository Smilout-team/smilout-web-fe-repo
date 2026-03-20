export const UserRole = {
  CONSUMER: 'CONSUMER',
  STORE_STAFF: 'STORE_STAFF',
  STORE_OWNER: 'STORE_OWNER',
  SYSTEM_ADMIN: 'SYSTEM_ADMIN',
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
