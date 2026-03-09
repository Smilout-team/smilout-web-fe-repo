interface Props {
  name: string;
  quantity: number;
  price: number;
}

export default function OrderItem({ name, quantity, price }: Props) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border-muted)] py-3">
      <div>
        <p className="font-medium text-[var(--text-primary)]">{name}</p>
        <p className="text-sm text-[var(--text-secondary)]">SL: {quantity}</p>
      </div>

      <p className="font-medium text-[var(--text-primary)]">
        {price.toLocaleString()} đ
      </p>
    </div>
  );
}
