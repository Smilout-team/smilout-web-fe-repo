import React from 'react';
import ReturnButton from '@/shared/components/common/ReturnButton';

interface CustomersManagementHeaderProps {
  total: number;
  isLoading?: boolean;
}

const CustomersManagementHeader: React.FC<CustomersManagementHeaderProps> = ({
  total,
  isLoading,
}) => {
  return (
    <div className="bg-[var(--color-primary)] px-4 pt-5 pb-6 text-white shadow-md">
      <div className="flex items-center gap-3">
        <ReturnButton
          variant="web"
          className="border-0 bg-white/20 text-white hover:bg-white/30"
        />

        <div>
          <p className="text-xl font-semibold text-white">Quản lý khách hàng</p>
          <p className="mt-0.5 text-sm text-white opacity-90">
            {isLoading
              ? 'Đang cập nhật...'
              : `Hiện có ${total} khách hàng trong cửa hàng`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomersManagementHeader;
