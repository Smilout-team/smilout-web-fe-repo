import React, { useState, useEffect } from 'react';
import { Input } from '@/shared/components/common/Input';
import CustomerCard, { type Customer } from '../components/CustomerCard';
import { Search, Loader2 } from 'lucide-react';
import CustomersManagementHeader from '../components/CustomersManagementHeader';

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    phone: '0901234567',
    checkInTime: '14:30',
    duration: '25 phút',
    avatarText: 'NV',
    avatarBgColor: 'bg-blue-100',
    avatarTextColor: 'text-blue-600',
    statusDotColor: 'bg-green-500',
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    phone: '0912345678',
    checkInTime: '14:45',
    duration: '10 phút',
    avatarText: 'TT',
    avatarBgColor: 'bg-green-100',
    avatarTextColor: 'text-green-600',
    statusDotColor: 'bg-green-500',
  },
  {
    id: '3',
    name: 'Lê Hoàng Cường',
    phone: '0923456789',
    checkInTime: '14:20',
    duration: '35 phút',
    avatarText: 'LH',
    avatarBgColor: 'bg-red-100',
    avatarTextColor: 'text-red-600',
    statusDotColor: 'bg-green-500',
  },
  {
    id: '4',
    name: 'Phạm Minh Đức',
    phone: '0934567890',
    checkInTime: '15:10',
    duration: '5 phút',
    avatarText: 'PM',
    avatarBgColor: 'bg-yellow-100',
    avatarTextColor: 'text-yellow-600',
    statusDotColor: 'bg-green-500',
  },
];

const fetchMockCustomersAPI = (): Promise<Customer[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CUSTOMERS);
    }, 800);
  });
};

const CustomerListPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadCustomers = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMockCustomersAPI();
        setCustomers(data);
      } catch (error) {
        console.error('Lỗi:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-[var(--bg-page)] pb-10">
      <CustomersManagementHeader
        total={customers.length}
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
          ) : filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <CustomerCard key={customer.id} customer={customer} />
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

export default CustomerListPage;
