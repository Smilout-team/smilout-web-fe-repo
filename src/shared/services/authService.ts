import { httpClient } from '@/core/api/httpClient.api';
import { type ApiResponse } from '@/core/api/types';
import {
  type AuthUser,
  type SignInPayload,
  type SignUpPayload,
  type ForgotPasswordPayload,
  type VerifyOtpPayload,
  type ResetPasswordPayload,
} from '@/shared/types';

export type {
  AuthUser,
  SignInPayload,
  SignUpPayload,
  ForgotPasswordPayload,
  VerifyOtpPayload,
  ResetPasswordPayload,
};

type AuthResponse = {
  user: AuthUser;
};

const parseAuthUser = (
  payload: AuthResponse | AuthUser | ApiResponse<AuthUser>
): AuthUser => {
  if ((payload as ApiResponse<AuthUser>).data && 'statusCode' in payload) {
    return (payload as ApiResponse<AuthUser>).data;
  }
  if ((payload as AuthResponse).user) {
    return (payload as AuthResponse).user;
  }

  return payload as AuthUser;
};

export const authService = {
  getMe: async (): Promise<AuthUser> => {
    const response = await httpClient.get<ApiResponse<AuthUser> | AuthUser>(
      '/auth/me'
    );
    return parseAuthUser(response);
  },

  signIn: async (payload: SignInPayload): Promise<AuthUser> => {
    const response = await httpClient.post<
      ApiResponse<AuthUser> | AuthResponse | AuthUser
    >('/auth/sign-in', payload);

    return parseAuthUser(response);
  },

  googleSignIn: async (authCode: string): Promise<AuthUser> => {
    await httpClient.post('/auth/google', { authCode });

    const response = await httpClient.get<ApiResponse<AuthUser> | AuthUser>(
      '/auth/me'
    );

    return parseAuthUser(response);
  },

  signUp: async (payload: SignUpPayload): Promise<AuthUser> => {
    const response = await httpClient.post<
      ApiResponse<AuthUser> | AuthResponse | AuthUser
    >('/auth/sign-up', payload);

    return parseAuthUser(response);
  },

  forgotPassword: async (payload: ForgotPasswordPayload): Promise<void> => {
    await httpClient.post('/auth/forgot-password', payload);
  },

  verifyOtp: async (payload: VerifyOtpPayload): Promise<void> => {
    await httpClient.post('/auth/verify-otp', payload);
  },

  resetPassword: async (payload: ResetPasswordPayload): Promise<void> => {
    await httpClient.post('/auth/reset-password', payload);
  },

  signOut: async (): Promise<void> => {
    await httpClient.get<void>('/auth/sign-out', {});
  },
};
