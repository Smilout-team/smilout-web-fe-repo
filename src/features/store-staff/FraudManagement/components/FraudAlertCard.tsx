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
      className={`rounded-xl border-l-[6px] bg-white shadow-sm ${data.borderColor} overflow-hidden`}
    >
      <div className="p-6">
        <div className="mb-3 flex gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-2xl shadow-inner">
            {data.avatar}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-base leading-tight font-bold text-gray-900">
              {data.name}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
              <User size={12} /> {data.phone}
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between border-b border-gray-100 pb-4 text-xs text-gray-500">
          <span>{data.id}</span>
          <span className="flex items-center gap-1.5">
            <Clock size={14} /> {data.time}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <AlertTriangle size={18} className="text-red-500" /> {data.type}
          </div>

          <div className="rounded-lg bg-red-50 p-3 text-sm text-gray-700">
            {data.description}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Camera size={16} /> Vị trí: {data.location}
            </div>
            <div className="flex w-fit cursor-pointer items-center gap-2 text-red-500 hover:underline">
              <Eye size={16} /> Xem sản phẩm liên quan
            </div>
          </div>

          {data.showVideo && (
            <div className="mt-6 flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-transparent bg-gray-100/80 py-10 transition-colors hover:border-red-200">
              <Video size={36} className="mb-2 text-gray-400" />
              <p className="text-sm font-medium text-gray-500">
                Camera: camera_feed_2
              </p>
              <p className="mt-1 text-xs text-red-500">Xem video ghi hình</p>
            </div>
          )}
        </div>

        {showActions && (
          <div className="mt-6 flex gap-4">
            <Button
              variant="success"
              className="flex-1 py-3"
              leftIcon={<CheckCircle2 size={18} />}
              onClick={() => onProcess(data.id)}
            >
              Xử lý
            </Button>
            <Button
              variant="primary"
              className="flex-1 py-3"
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
