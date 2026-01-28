import { type ReactNode, createContext, useMemo } from 'react';
import {
  type QueryStatus,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  authService,
  type AuthUser,
  type SignInPayload,
} from '../services/authService';

export const AUTH_QUERY_KEY = ['auth', 'me'] as const;

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  status: QueryStatus;
  isLoading: boolean;
  error: string | null;
  signIn: (payload: SignInPayload) => Promise<AuthUser>;
  signOut: () => Promise<void>;
  refetchProfile: () => Promise<AuthUser | undefined>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data, status, error, refetch, isFetching } = useQuery<AuthUser>({
    queryKey: AUTH_QUERY_KEY,
    queryFn: authService.getMe,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: false,
  });

  const signInMutation = useMutation({
    mutationFn: authService.signIn,
    onSuccess: (user) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, user);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });

  const signOutMutation = useMutation({
    mutationFn: authService.signOut,
    onSuccess: () => {
      queryClient.setQueryData(AUTH_QUERY_KEY, null);
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });

  const { mutateAsync: signInAsync } = signInMutation;
  const { mutateAsync: signOutAsync } = signOutMutation;

  const value = useMemo<AuthContextValue>(() => {
    const authError = error instanceof Error ? error.message : null;
    const user = data ?? null;

    return {
      user,
      isAuthenticated: Boolean(user),
      status,
      isLoading: status === 'pending' || isFetching,
      error: authError,
      signIn: async (payload: SignInPayload) => signInAsync(payload),
      signOut: async () => signOutAsync(),
      refetchProfile: async () => {
        const result = await refetch();
        return result.data;
      },
    };
  }, [data, status, isFetching, error, signInAsync, signOutAsync, refetch]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
