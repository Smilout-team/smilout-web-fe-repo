import React from 'react';
import clsx from 'clsx';
import { Store, Truck, Package, Clock, MapPin, RotateCcw } from 'lucide-react';
import { type Order } from '../types/order';
import Button from '@/shared/components/common/Button';
import OrderStatusBadge from './OrderStatusBadge';

interface OrderCardProps {
  order: Order;
  onClick: (id: string) => void;
  onRepurchase: (e: React.MouseEvent, id: string) => void;
}

export default function OrderCard({
  order,
  onClick,
  onRepurchase,
}: OrderCardProps) {
  const getOrderTypeStyle = () => {
    switch (order.type) {
      case 'STORE':
        return {
          icon: <Store size={18} />,
          text: 'Mua tại cửa hàng',
          color: 'text-blue-500',
        };
      case 'DELIVERY':
        return {
          icon: <Truck size={18} />,
          text: 'Giao hàng',
          color: 'text-[var(--color-success)]',
        };
      case 'PICKUP':
        return {
          icon: <Package size={18} />,
          text: 'Đến lấy',
          color: 'text-amber-600',
        };
    }
  };

  const typeStyle = getOrderTypeStyle();

  return (
    <div
      onClick={() => onClick(order.id)}
      className="mb-4 cursor-pointer rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)] transition-transform active:scale-[0.98]"
    >
      <div className="mb-3 flex items-center justify-between">
        <div
          className={clsx(
            'flex items-center gap-2 text-[length:var(--text-sm)] font-[var(--font-medium)]',
            typeStyle.color
          )}
        >
          {typeStyle.icon}
          <span>{typeStyle.text}</span>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mb-2.5 flex items-center gap-2 text-[length:var(--text-sm)] text-[var(--text-secondary)]">
        <Clock size={16} />
        <span>{order.orderDate}</span>
      </div>

      <hr className="mb-3 border-[var(--border-muted)]" />

      <div className="mb-3 flex items-start gap-2 text-[length:var(--text-sm)] text-[var(--text-primary)]">
        <MapPin size={16} className="mt-0.5 text-[var(--text-secondary)]" />
        <div>
          <p className="font-[var(--font-medium)]">{order.storeName}</p>
          {order.deliveryAddress && (
            <p className="mt-1 text-[length:var(--text-xs)] text-[var(--text-secondary)]">
              Giao đến: {order.deliveryAddress}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2 text-[length:var(--text-sm)] font-[var(--font-medium)] text-[var(--color-primary)]">
        <div className="rounded-[var(--radius-sm)] bg-[var(--color-primary-light)] p-1">
          <Package size={14} />
        </div>
        <span>{order.totalItems} sản phẩm</span>
      </div>

      <hr className="mb-3 border-[var(--border-muted)]" />

      <div className="flex items-center justify-between">
        <div>
          <p className="mb-0.5 text-[length:var(--text-xs)] text-[var(--text-secondary)]">
            Tổng cộng
          </p>
          <p className="text-[length:var(--text-lg)] font-[var(--font-bold)] text-[var(--color-primary)]">
            {order.totalPrice.toLocaleString('vi-VN')}đ
          </p>
        </div>

        <Button
          variant="primary"
          shape="pill"
          size="sm"
          className="!px-4"
          leftIcon={<RotateCcw size={16} />}
          onClick={(e) => onRepurchase(e, order.id)}
        >
          Mua lại
        </Button>
      </div>
    </div>
  );
}
