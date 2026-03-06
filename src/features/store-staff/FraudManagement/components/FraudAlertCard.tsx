import React from 'react';
import {
  AlertTriangle,
  Eye,
  Video,
  User,
  Clock,
  Camera,
  CheckCircle2,
  Ban,
} from 'lucide-react';
import Button from '@/shared/components/common/Button';

export interface FraudAlertData {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  type: string;
  description: string;
  location: string;
  time: string;
  borderColor: string;
  showVideo: boolean;
  status: 'active' | 'processed' | 'ignored';
}

interface FraudAlertCardProps {
  data: FraudAlertData;
  onProcess: (id: string) => void;
  onIgnore: (id: string) => void;
}

const FraudAlertCard: React.FC<FraudAlertCardProps> = ({
  data,
  onProcess,
  onIgnore,
}) => {
  const showActions = data.status === 'active';

  return (
    <div
      className={`rounded-[var(--radius-card)] border-l-[6px] bg-[var(--bg-card)] shadow-[var(--shadow-card)] ${data.borderColor} overflow-hidden`}
    >
      <div className="p-6">
        <div className="mb-3 flex gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--text-2xl)] text-[var(--text-on-primary)] shadow-[var(--shadow-sm)]">
            {data.avatar}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="leading-[var(--line-height-tight)] font-[var(--font-bold)] text-[var(--text-md)] text-[var(--text-primary)]">
              {data.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-[var(--text-secondary)] text-[var(--text-xs)]">
              <User size={12} /> {data.phone}
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-[var(--border-muted)] pb-4 text-[var(--text-secondary)] text-[var(--text-xs)]">
          <span>{data.id}</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {data.time}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 font-[var(--font-bold)] text-[var(--text-primary)] text-[var(--text-sm)]">
            <AlertTriangle size={18} className="text-[var(--color-danger)]" />{' '}
            {data.type}
          </div>

          <div className="rounded-[var(--radius-md)] bg-[var(--color-primary-light)] p-3 text-[var(--text-primary)] text-[var(--text-sm)]">
            {data.description}
          </div>

          <div className="space-y-3 text-[var(--text-sm)]">
            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
              <Camera size={16} /> Vị trí: {data.location}
            </div>
            <div className="flex w-fit cursor-pointer items-center gap-2 text-[var(--color-primary)] hover:underline">
              <Eye size={16} /> Xem sản phẩm liên quan
            </div>
          </div>

          {data.showVideo && (
            <div className="mt-6 flex w-full cursor-pointer flex-col items-center justify-center rounded-[var(--radius-md)] border border-transparent bg-[var(--bg-muted)] py-10 transition-colors hover:border-[var(--color-primary-light)]">
              <Video size={36} className="mb-2 text-[var(--text-muted)]" />
              <p className="font-[var(--font-medium)] text-[var(--text-secondary)] text-[var(--text-sm)]">
                Camera: camera_feed_2
              </p>
              <p className="mt-1 text-[var(--color-primary)] text-[var(--text-xs)]">
                Xem video ghi hình
              </p>
            </div>
          )}
        </div>

        {showActions && (
          <div className="mt-6 flex gap-4">
            <Button
              variant="success"
              className="flex-1 py-3 font-[var(--font-medium)]"
              leftIcon={<CheckCircle2 size={18} />}
              onClick={() => onProcess(data.id)}
            >
              Xử lý
            </Button>
            <Button
              variant="primary"
              className="flex-1 py-3 font-[var(--font-medium)]"
              leftIcon={<Ban size={18} />}
              onClick={() => onIgnore(data.id)}
            >
              Bỏ qua
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudAlertCard;
