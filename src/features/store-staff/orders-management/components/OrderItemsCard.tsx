interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Props {
  items: Item[];
}

export default function OrderItemsCard({ items }: Props) {
  return (
    <div className="space-y-4 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
      <p className="text-sm font-semibold text-[var(--text-primary)]">
        Chi tiết sản phẩm ({items.length} món)
      </p>
      {items.map((item, index) => (
        <div key={item.id}>
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <img
                src={item.image}
                className="h-14 w-14 rounded-[var(--radius-sm)] object-cover"
              />
              <div className="space-y-1">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {item.name}
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  {item.price.toLocaleString()}đ x {item.quantity}
                </p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-primary)]">
              {(item.price * item.quantity).toLocaleString()}đ
            </p>
          </div>

          {index !== items.length - 1 && (
            <div className="mt-4 border-t border-[var(--border-default)]" />
          )}
        </div>
      ))}
    </div>
  );
}
