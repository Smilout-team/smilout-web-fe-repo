import { Users, ShoppingCart, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Tone = 'blue' | 'orange' | 'red' | 'green';

interface Props {
  title: string;
  value: number;
  tone: Tone;
  to?: string;
}

const toneConfig = {
  blue: {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    icon: Users,
  },
  orange: {
    bg: 'bg-orange-100',
    text: 'text-orange-600',
    icon: ShoppingCart,
  },
  red: {
    bg: 'bg-red-100',
    text: 'text-red-600',
    icon: AlertTriangle,
  },
  green: {
    bg: 'bg-green-100',
    text: 'text-green-600',
    icon: CheckCircle,
  },
};

export default function StatCard({ title, value, tone, to }: Props) {
  const config = toneConfig[tone];
  const Icon = config.icon;
  const navigate = useNavigate();

  const handleClick = () => {
    if (to == '') {
      return;
    }
    if (to) navigate(to);
  };

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-between rounded-[var(--radius-card)] bg-[var(--bg-card)] p-4 shadow-[var(--shadow-card)] ${to ? 'cursor-pointer transition hover:shadow-md' : ''} `}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] ${config.bg}`}
        >
          <Icon size={18} className={config.text} />
        </div>

        <p className="text-sm text-[var(--text-secondary)]">{title}</p>
      </div>

      <p className={`text-lg font-semibold ${config.text}`}>{value}</p>
    </div>
  );
}
