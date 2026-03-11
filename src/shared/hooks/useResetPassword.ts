import { useMutation } from '@tanstack/react-query';
import { authService } from '@/shared/services/authService';

export const useResetPassword = () =>
  useMutation({
    mutationFn: authService.resetPassword,
  });
