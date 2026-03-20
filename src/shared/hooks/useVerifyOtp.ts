import { useMutation } from '@tanstack/react-query';
import { authService } from '@/shared/services/authService';

export const useVerifyOtp = () => {
  const verifyMutation = useMutation({
    mutationFn: authService.verifyOtp,
  });

  const resendMutation = useMutation({
    mutationFn: authService.forgotPassword,
  });

  return {
    verifyOtp: verifyMutation.mutateAsync,
    resendOtp: resendMutation.mutateAsync,

    isVerifying: verifyMutation.isPending,
    isResending: resendMutation.isPending,
  };
};
