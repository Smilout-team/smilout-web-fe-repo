import Tag from '@/shared/components/common/Tag';

interface Props {
  active: string;
  counts: Record<string, number>;
  onChange: (tab: string) => void;
}

export default function OrderTabs({ active, counts, onChange }: Props) {
  const tabs = [
    { key: 'PENDING', label: 'Chờ xác nhận' },
    { key: 'PREPARING', label: 'Đang chuẩn bị' },
    { key: 'COMPLETED', label: 'Đã hoàn thành' },
    { key: 'REJECTED', label: 'Đã từ chối' },
    { key: 'ALL', label: 'Tất cả' },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => {
        const isActive = active === tab.key;

        return (
          <Tag
            key={tab.key}
            onClick={() => onChange(tab.key)}
            tone={isActive ? 'primary' : 'gray'}
            variant={isActive ? 'outline' : 'light'}
            rounded="full"
            size="sm"
            className="cursor-pointer font-normal transition"
          >
            {tab.label}
            {tab.key !== 'ALL' && ` (${counts[tab.key] || 0})`}
          </Tag>
        );
      })}
    </div>
  );
}
