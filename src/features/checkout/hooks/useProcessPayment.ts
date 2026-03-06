import { useMutation } from '@tanstack/react-query';
import { checkoutService } from '../services/checkoutService';
import type { ProcessPaymentRequest, ProcessPaymentResponse } from '../types';

export const useProcessPayment = () => {
  return useMutation<ProcessPaymentResponse, Error, ProcessPaymentRequest>({
    mutationFn: checkoutService.processPayment,
  });
};
