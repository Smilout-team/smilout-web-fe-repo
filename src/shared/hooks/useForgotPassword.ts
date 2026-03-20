import { useMutation } from '@tanstack/react-query';
import { authService } from '@/shared/services/authService';

export const useForgotPassword = () =>
  useMutation({
    mutationFn: authService.forgotPassword,
  });
