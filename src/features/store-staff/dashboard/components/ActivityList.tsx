import ActivityItem from './ActivityItem';

interface Activity {
  id: string;
  type: 'order' | 'fraud' | 'success';
  name: string;
  description: string;
  time: string;
}

const mockData: Activity[] = [
  {
    id: '1',
    type: 'order',
    name: 'Nguyễn Văn B',
    description: 'Đơn hàng mới #12345',
    time: '2 phút trước',
  },
  {
    id: '2',
    type: 'fraud',
    name: 'Trần Thị C',
    description: 'Cảnh báo gian lận',
    time: '5 phút trước',
  },
  {
    id: '3',
    type: 'success',
    name: 'Lê Văn D',
    description: 'Thanh toán thành công',
    time: '8 phút trước',
  },
];

export default function ActivityList() {
  return (
    <div className="space-y-4 pb-6">
      <div className="flex items-center justify-between">
        <p className="text-md font-semibold text-[var(--text-primary)]">
          Hoạt động gần đây
        </p>

        <button className="text-sm text-[var(--color-primary)] hover:underline">
          Xem tất cả
        </button>
      </div>

      <div className="space-y-3">
        {mockData.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
