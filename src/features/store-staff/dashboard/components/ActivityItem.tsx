import { AlertTriangle, CheckCircle, ShoppingBag } from 'lucide-react';

interface Props {
  type: 'order' | 'fraud' | 'success' | 'other';
  name: string;
  description: string;
  time: string;
}

const typeConfig = {
  order: {
    icon: ShoppingBag,
    color: 'text-blue-500',
  },
  fraud: {
    icon: AlertTriangle,
    color: 'text-[var(--color-danger)]',
  },
  success: {
    icon: CheckCircle,
    color: 'text-[var(--color-success)]',
  },
  other: {
    icon: ShoppingBag,
    color: 'text-gray-400',
  },
};

export default function ActivityItem({ type, name, description, time }: Props) {
  const config = typeConfig[type] || typeConfig.other;
  const Icon = config.icon;

  return (
    <div className="flex items-start gap-3 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)]">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-muted)]">
        <Icon size={16} className={config.color} />
      </div>

      <div className="flex-1">
        <p className="text-sm font-medium text-[var(--text-primary)]">{name}</p>

        <p className="text-sm text-[var(--text-secondary)]">{description}</p>

        <p className="mt-1 text-xs text-[var(--text-muted)]">{time}</p>
      </div>
    </div>
  );
}
