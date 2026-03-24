import React from 'react';
import clsx from 'clsx';
import { Clock3, Phone, UserRound, Check } from 'lucide-react';

export interface Consumer {
  id: string;
  name: string;
  phoneNumber: string;
  checkInTime?: string;
  duration?: string;
  avatarText?: string;
  avatarBgColor?: string;
  avatarTextColor?: string;
  statusDotColor?: string;
}

interface ConsumerCardProps {
  consumer: Consumer;
}

const ConsumerCard: React.FC<ConsumerCardProps> = ({ consumer }) => {
  return (
    <div
      className={clsx(
        'mb-3 p-5',
        'bg-white',
        'rounded-xl',
        'shadow-sm',
        'border border-gray-100',
        'transition-all duration-200 hover:shadow-md'
      )}
    >
      <div className="flex items-start gap-5">
        <div
          className={clsx(
            'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold',
            consumer.avatarBgColor || 'bg-blue-100',
            consumer.avatarTextColor || 'text-blue-600'
          )}
        >
          {consumer.avatarText || consumer.name.charAt(0)}
        </div>

        <div className="flex flex-grow flex-col">
          <div className="mb-1.5 flex items-center gap-2">
            <UserRound className="h-4 w-4 text-blue-500" />
            <span className="text-lg font-semibold text-gray-800">
              {consumer.name}
            </span>
            <div
              className={clsx(
                'h-2 w-2 rounded-full',
                consumer.statusDotColor || 'bg-green-500'
              )}
            />
          </div>

          <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{consumer.phoneNumber}</span>
          </div>

          <div className="mt-1 grid grid-cols-2 gap-4 border-t border-gray-100 pt-3 text-xs text-gray-500">
            <div className="flex items-center gap-1.5">
              <Check className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-600">
                {consumer.checkInTime}
              </span>
            </div>
            <div className="flex items-center justify-end gap-1.5">
              <Clock3 className="h-4 w-4 text-gray-400" />
              <span className="font-medium text-gray-600">
                {consumer.duration}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsumerCard;
