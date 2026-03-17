import {
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import { useLocation } from 'react-router-dom';
import {
  type QueryStatus,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { authService } from '../services/authService';
import { AUTH_QUERY_KEY, PUBLIC_PATHS } from '@/shared/constants';
import { type AuthUser, type SignInPayload } from '@/shared/types';

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: QueryStatus;
  isLoading: boolean;
  error: string | null;
  signIn: (payload: SignInPayload) => Promise<AuthUser>;
  googleSignIn: (authCode: string) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  refetchProfile: () => Promise<AuthUser | undefined>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const location = useLocation();

  const isPublicPath = PUBLIC_PATHS.some((path) =>
    location.pathname.startsWith(path)
  );

  const { data, status, error, refetch, isFetching } = useQuery<AuthUser>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authService.getMe,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
    enabled: false,
  });

  useEffect(() => {
    if (!isPublicPath) {
      refetch();
    }
  }, [isPublicPath]);

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
      refetch();
    },
  });

  const googleSignInMutation = useMutation({
    mutationFn: authService.googleSignIn,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
      refetch();
    },
  });

  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
      refetch();
    },
  });

  const { mutateAsync: signInAsync } = signInMutation;
  const { mutateAsync: googleSignInAsync } = googleSignInMutation;
  const { mutateAsync: signOutAsync } = signOutMutation;

  const refetchProfile = useCallback(async () => {
    const result = await refetch();
    return result.data;
  }, [refetch]);

  const value = useMemo<AuthContextValue>(() => {
    const authError = error instanceof Error ? error.message : null;
    const user = data ?? null;

    return {
      user,
      isAuthenticated: Boolean(user),
      status,
      isLoading: status === 'pending' || isFetching,
      error: authError,
      signIn: signInAsync,
      googleSignIn: googleSignInAsync,
      signOut: signOutAsync,
      refetchProfile,
    };
  }, [
    data,
    status,
    isFetching,
    error,
    signInAsync,
    googleSignInAsync,
    signOutAsync,
    refetchProfile,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
