import Tag from '@/shared/components/common/Tag';

interface OrderStatusBadgeProps {
  orderType: 'DELIVERY' | 'INSTORE';
  status: 'PENDING' | 'PAID' | 'PREPARING' | 'COMPLETED';
}

export default function OrderStatusBadge({
  orderType,
  status,
}: OrderStatusBadgeProps) {
  if (status === 'PAID') {
    if (orderType === 'DELIVERY') {
      return (
        <Tag tone="primary" variant="light" rounded="full" size="sm">
          Chờ xác nhận
        </Tag>
      );
    }

    return (
      <Tag tone="green" variant="light" rounded="full" size="sm">
        Hoàn thành
      </Tag>
    );
  }

  if (status === 'PREPARING') {
    return (
      <Tag tone="blue" variant="light" rounded="full" size="sm">
        Đang chuẩn bị
      </Tag>
    );
  }

  if (status === 'COMPLETED') {
    return (
      <Tag tone="green" variant="light" rounded="full" size="sm">
        Hoàn thành
      </Tag>
    );
  }

  return (
    <Tag tone="gray" variant="light" rounded="full" size="sm">
      Chờ thanh toán
    </Tag>
  );
}
