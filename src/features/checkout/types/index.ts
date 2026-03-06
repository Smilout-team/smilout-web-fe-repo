export interface ProcessPaymentRequest {
  orderId: string;
}

export interface ProcessPaymentResponse {
  orderId: string;
  storeId: string;
  status: 'PAID';
  totalAmount: number;
}
