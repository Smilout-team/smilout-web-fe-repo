import type { OrderItem } from '@/shared/types/storeHub.types';

interface OrderSummarySectionProps {
  orderItems: OrderItem[];
  subtotalAmount: number;
  deliveryFee: number;
  totalAmount: number;
  isOnlineDelivery: boolean;
  formatCurrency: (amount: number) => string;
}

export function OrderSummarySection({
  orderItems,
  subtotalAmount,
  deliveryFee,
  totalAmount,
  isOnlineDelivery,
  formatCurrency,
}: OrderSummarySectionProps) {
  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-medium text-gray-700">
        Chi tiết đơn hàng
      </h2>
      <div className="space-y-3">
        {orderItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <div className="text-gray-700">
              {item.name} x{item.quantity}
            </div>
            <div className="font-medium text-gray-900">
              {formatCurrency(item.price * item.quantity)}đ
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 border-t border-gray-200" />

      {isOnlineDelivery && (
        <div>
          <div className="flex justify-between text-sm">
            <div className="text-gray-700">Tạm tính</div>
            <div className="font-medium text-gray-900">
              {formatCurrency(subtotalAmount)}đ
            </div>
          </div>

          <div className="mt-3 flex justify-between text-sm">
            <div className="text-gray-700">Phí giao hàng</div>
            <div className="font-medium text-gray-900">
              {formatCurrency(deliveryFee)}đ
            </div>
          </div>
        </div>
      )}

      <div className="mt-3 flex justify-between text-base">
        <div className="font-semibold text-gray-900">Tổng cộng</div>
        <div className="text-lg font-bold text-[#FF5252]">
          {formatCurrency(totalAmount)}đ
        </div>
      </div>
    </div>
  );
}
