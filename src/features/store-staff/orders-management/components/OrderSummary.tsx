interface Props {
  subtotal: number;
  shipping: number;
}

export default function OrderSummary({ subtotal, shipping }: Props) {
  const total = subtotal + shipping;

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between text-[var(--text-secondary)]">
        <span>Tạm tính</span>
        <span>{subtotal.toLocaleString()}đ</span>
      </div>

      <div className="flex justify-between text-[var(--text-secondary)]">
        <span>Phí giao hàng</span>
        <span>{shipping.toLocaleString()}đ</span>
      </div>

      <div className="flex justify-between border-t border-[var(--border-muted)] pt-2 text-base font-semibold text-[var(--color-primary)]">
        <span>Tổng cộng</span>
        <span>{total.toLocaleString()}đ</span>
      </div>
    </div>
  );
}
