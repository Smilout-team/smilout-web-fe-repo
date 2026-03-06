export interface ScanProductRequest {
  barcode: string;
}

export interface ScanProductResponse {
  message: string;
  productId: string;
  quantity: number;
}
