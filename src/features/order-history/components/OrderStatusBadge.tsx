import Tag from '@/shared/components/common/Tag';

interface OrderStatusBadgeProps {
  status: 'PENDING' | 'PAID' | 'PREPARING';
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  if (status === 'PAID') {
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

  return (
    <Tag tone="gray" variant="light" rounded="full" size="sm">
      Chờ thanh toán
    </Tag>
  );
}
