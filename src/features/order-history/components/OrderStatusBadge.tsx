import Tag from '@/shared/components/common/Tag';

interface OrderStatusBadgeProps {
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  if (status === 'COMPLETED') {
    return (
      <Tag tone="green" variant="light" rounded="full" size="sm">
        Hoàn thành
      </Tag>
    );
  }

  return (
    <Tag tone="gray" variant="light" rounded="full" size="sm">
      {status}
    </Tag>
  );
}
