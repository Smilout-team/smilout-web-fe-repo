import { httpClient } from '@/core/api/httpClient.api';

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  roles: string[];
};

export type SignInPayload = {
  email: string;
  password: string;
};

type AuthResponse = {
  user: AuthUser;
};

const parseAuthUser = (payload: AuthResponse | AuthUser): AuthUser => {
  if ((payload as AuthResponse).user) {
    return (payload as AuthResponse).user;
  }

  return payload as AuthUser;
};

export const authService = {
  getMe: async (): Promise<AuthUser> => {
    return httpClient.get<AuthUser>('/auth/me');
  },

  signIn: async (payload: SignInPayload): Promise<AuthUser> => {
    const response = await httpClient.post<AuthResponse | AuthUser>(
      '/auth/sign-in',
      payload
    );

    return parseAuthUser(response);
  },

  signOut: async (): Promise<void> => {
    await httpClient.post<void>('/auth/sign-out', {});
  },
};
