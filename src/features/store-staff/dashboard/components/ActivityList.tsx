import ActivityItem from './ActivityItem';

export interface Activity {
  id?: string;
  type: 'order' | 'fraud' | 'success';
  name: string;
  description: string;
  time: string;
}

export default function ActivityList({
  activities,
}: {
  activities: Activity[];
}) {
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
        {activities.map((item) => (
          <ActivityItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
