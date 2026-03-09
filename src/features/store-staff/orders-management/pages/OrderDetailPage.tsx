import { useParams } from 'react-router-dom';
import OrderDetailHeader from '@/features/store-staff/orders-management/components/OrderDetailHeader';
import OrderItemsCard from '@/features/store-staff/orders-management/components/OrderItemsCard';
import OrderSummaryCard from '@/features/store-staff/orders-management/components/OrderSummaryCard';
import type { Order } from '@/features/store-staff/orders-management/types/order.type';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();

  const mockOrders: Order[] = [
    {
      id: '123456',
      customerName: 'Nguyễn Văn B',
      phone: '0912345678',
      address: '123 Nguyễn Huệ, Q1',
      note: 'Giao nhanh giúp em',

      items: [
        {
          id: '1',
          name: 'Phở Bò Đặc Biệt',
          price: 20000,
          quantity: 1,
          image: 'https://picsum.photos/80',
        },
        {
          id: '2',
          name: 'Trà Sữa Trân Châu',
          price: 19000,
          quantity: 1,
          image: 'https://picsum.photos/81',
        },
      ],

      subtotal: 39000,
      shippingFee: 15000,
      total: 54000,
      time: '5 phút trước',
      status: 'PENDING',
      paymentMethod: 'Ví SMILOUT',
      isPaid: true,
    },
    {
      id: '123457',
      customerName: 'Trần Thị C',
      phone: '0909123456',
      address: '45 Lê Lợi, Q3',

      items: [
        {
          id: '3',
          name: 'Bánh Mì Thịt Nướng',
          price: 50000,
          quantity: 1,
          image: 'https://picsum.photos/82',
        },
      ],

      subtotal: 50000,
      shippingFee: 15000,
      total: 65000,
      time: '10 phút trước',
      status: 'PREPARING',
      paymentMethod: 'Ví SMILOUT',
      isPaid: true,
    },
  ];

  const order = mockOrders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="p-4 text-sm text-[var(--text-secondary)]">
        Không tìm thấy đơn hàng
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-page)]">
      <OrderDetailHeader order={order} />

      <div className="space-y-4 p-4">
        <OrderItemsCard items={order.items} />

        <OrderSummaryCard
          subtotal={order.subtotal}
          shippingFee={order.shippingFee}
          total={order.total}
          paymentMethod={order.paymentMethod}
          isPaid={order.isPaid}
          itemCount={order.items.length}
        />
      </div>
    </div>
  );
}
