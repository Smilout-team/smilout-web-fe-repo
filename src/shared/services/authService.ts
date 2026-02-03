import { httpClient } from '@/core/api/httpClient.api';
import { type ApiResponse } from '@/core/api/types';
import {
  type AuthUser,
  type SignInPayload,
  type SignUpPayload,
} from '@/shared/types';

export type { AuthUser, SignInPayload, SignUpPayload };

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

  signUp: async (payload: SignUpPayload): Promise<AuthUser> => {
    const response = await httpClient.post<
      ApiResponse<AuthUser> | AuthResponse | AuthUser
    >('/auth/sign-up', payload);

    return parseAuthUser(response);
  },

  signOut: async (): Promise<void> => {
    await httpClient.get<void>('/auth/sign-out', {});
  },
};
