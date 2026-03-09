export const PUBLIC_PATHS = [
  '/welcome',
  '/sign-in',
  '/sign-up',
  '/unauthorized',
  '/store-staff/sign-in',
  '/forgot-password',
  '/email-verification',
] as const;

export const ROUTES = {
  WELCOME: '/welcome',
  HOME: '/home',
  SIGN_IN: '/sign-in',
  SIGN_UP: '/sign-up',
  UNAUTHORIZED: '/unauthorized',
  STORE_STAFF_SIGN_IN: '/store-staff/sign-in',
  STORE_STAFF_DASHBOARD: '/store-staff/dashboard',
  WALLET: '/wallet',
  TOP_UP_RESULT: '/wallet/top-up/result',
  SCAN_STORE: '/scan-store',
  STORE_HUB: '/store-hub',
  SCAN_PRODUCT: '/scan-product',
  CART: '/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_SUCCESS: '/checkout/success',
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_CODE: '/email-verification',
} as const;
