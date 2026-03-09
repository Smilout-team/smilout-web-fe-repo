import { useMutation } from '@tanstack/react-query';
import { orderHistoryService } from '../services/orderHistoryService';
import type {
  RepurchaseOrderRequest,
  RepurchaseOrderResponse,
  RepurchaseToCartRequest,
  RepurchaseToCartResponse,
} from '../types/order';

export const useRepurchaseRecommendations = () => {
  return useMutation<RepurchaseOrderResponse, Error, RepurchaseOrderRequest>({
    mutationFn: (request) =>
      orderHistoryService.getRepurchaseRecommendations(request),
  });
};

export const useCreateCartFromStore = () => {
  return useMutation<RepurchaseToCartResponse, Error, RepurchaseToCartRequest>({
    mutationFn: (request) => orderHistoryService.repurchaseToCart(request),
  });
};
