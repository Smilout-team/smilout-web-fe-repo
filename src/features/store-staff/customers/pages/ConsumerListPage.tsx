import React, { useState } from 'react';
import { Input } from '@/shared/components/common/Input';
import ConsumerCard from '../components/ConsumerCard';
import { Search, Loader2 } from 'lucide-react';
import ConsumersManagementHeader from '../components/ConsumersManagementHeader';
import { useAuth } from '@/shared/hooks/useAuth';
import { useConsumersInStore } from '../hooks/useConsumersInStore';

const ConsumerListPage: React.FC = () => {
  const { user } = useAuth();
  const storeId = user?.store?.id;
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: consumers = [],
    isLoading,
    isError,
    error,
  } = useConsumersInStore(storeId || '');

  const filteredConsumers = consumers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phoneNumber || '').includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-10">
      <ConsumersManagementHeader
        total={consumers.length}
        isLoading={isLoading}
      />

      <div className="mt-6 px-6">
        <div className="mx-auto mb-8 max-w-xl overflow-hidden rounded-lg bg-white shadow-sm">
          <Input
            placeholder="Tìm kiếm khách hàng theo tên hoặc SĐT..."
            icon={<Search size={20} className="text-gray-400" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            className="border-0 focus:ring-0"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-1 flex flex-col items-center justify-center py-20 md:col-span-2 lg:col-span-3">
              <Loader2 className="mb-4 h-10 w-10 animate-spin text-[var(--color-primary)]" />
              <p className="text-lg text-gray-500">
                Đang tải dữ liệu từ máy chủ...
              </p>
            </div>
          ) : isError ? (
            <div className="col-span-1 mt-16 rounded-xl bg-white p-10 text-center text-red-500 shadow-sm md:col-span-2 lg:col-span-3">
              <p className="text-lg font-semibold">
                Lỗi tải dữ liệu khách hàng.
              </p>
              <p className="mt-1 text-sm">
                {(error as { message: string })?.message || 'Đã xảy ra lỗi.'}
              </p>
            </div>
          ) : filteredConsumers.length > 0 ? (
            filteredConsumers.map((consumer) => (
              <ConsumerCard key={consumer.id} consumer={consumer} />
            ))
          ) : (
            <div className="col-span-1 mt-16 rounded-xl bg-white p-10 text-center text-gray-500 shadow-sm md:col-span-2 lg:col-span-3">
              <Search size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-semibold">
                Không tìm thấy khách hàng nào.
              </p>
              <p className="mt-1 text-sm">
                Vui lòng thử tìm kiếm bằng từ khóa khác hoặc số điện thoại.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumerListPage;
