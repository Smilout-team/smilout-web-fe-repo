import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Store,
  Truck,
  Package,
  Clock,
  MapPin,
  RotateCcw,
  ChevronDown,
} from 'lucide-react';
import { type Order } from '../types/order';
import Button from '@/shared/components/common/Button';
import OrderStatusBadge from './OrderStatusBadge';

interface OrderCardProps {
  order: Order;
  onRepurchase: (e: React.MouseEvent, id: string) => void;
}

export default function OrderCard({ order, onRepurchase }: OrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getOrderTypeStyle = () => {
    switch (order.orderType) {
      case 'INSTORE':
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
    }
  };

  const typeStyle = getOrderTypeStyle();

  return (
    <div className="mb-4 rounded-[var(--radius-card)] border border-[var(--border-default)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)] transition-transform">
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
        <OrderStatusBadge orderType={order.orderType} status={order.status} />
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

      <div className="mb-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsExpanded(!isExpanded);
          }}
          className="flex w-full items-center gap-2 rounded-[var(--radius-sm)] px-2 py-2 text-[length:var(--text-sm)] font-[var(--font-medium)] text-[var(--color-primary)]"
        >
          <div className="">
            <Package size={14} />
          </div>
          <span>{order.items.length} sản phẩm</span>
          <span className="text-[length:var(--text-xs)] text-[var(--text-secondary)]">
            ({order.totalItems} cái)
          </span>
          <ChevronDown
            size={16}
            className={clsx(
              'ml-auto transition-transform duration-200',
              isExpanded && 'rotate-180'
            )}
          />
        </button>

        {isExpanded && (
          <div className="mt-2 space-y-2 rounded-[var(--radius-sm)] bg-[var(--bg-page)] p-3">
            {order.items.map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between rounded-[var(--radius-sm)] bg-[var(--bg-card)] p-2.5 text-[length:var(--text-sm)]"
              >
                <div className="flex-1 pr-2">
                  <p className="font-[var(--font-medium)] text-[var(--text-primary)]">
                    {item.productName}
                  </p>
                  <p className="mt-1 text-[length:var(--text-xs)] text-[var(--text-secondary)]">
                    × {item.quantity}
                  </p>
                </div>
                <p className="font-[var(--font-medium)] text-[var(--color-primary)]">
                  {item.priceAtPurchase.toLocaleString('vi-VN')}đ
                </p>
              </div>
            ))}
          </div>
        )}
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
