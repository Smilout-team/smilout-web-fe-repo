import { ArrowLeft } from 'lucide-react';

interface CheckoutHeaderProps {
  onBack: () => void;
}

export function CheckoutHeader({ onBack }: CheckoutHeaderProps) {
  return (
    <div className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="mr-3 -ml-2 rounded-full p-2 hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 pr-10 text-center text-lg font-semibold">
          Thanh toán
        </h1>
      </div>
    </div>
  );
}
