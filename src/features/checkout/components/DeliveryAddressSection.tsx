import { MapPin, Search } from 'lucide-react';
import type { DeliveryAddressOption } from '../types';

interface DeliveryAddressSectionProps {
  addressKeyword: string;
  onChangeKeyword: (value: string) => void;
  options: DeliveryAddressOption[];
  selectedAddressId: string | null;
  isSearching: boolean;
  onSelectAddress: (id: string) => void;
}

export function DeliveryAddressSection({
  addressKeyword,
  onChangeKeyword,
  options,
  selectedAddressId,
  isSearching,
  onSelectAddress,
}: DeliveryAddressSectionProps) {
  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-medium text-gray-700">
        Địa chỉ giao hàng
      </h2>

      <div className="relative mb-3">
        <Search
          size={16}
          className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={addressKeyword}
          onChange={(e) => onChangeKeyword(e.target.value)}
          placeholder="Tìm địa chỉ để thay đổi nơi giao hàng"
          className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-9 text-sm"
        />
      </div>

      <div className="mb-3 rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-xs text-blue-700">
        Địa chỉ mặc định được lấy từ tọa độ hiện tại bằng Goong Reverse
        Geocoding.
      </div>

      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelectAddress(option.id)}
            className={`w-full rounded-lg border p-3 text-left transition-colors ${
              selectedAddressId === option.id
                ? 'border-[#FF5252] bg-red-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <MapPin size={14} className="text-[#FF5252]" />
              <span>{option.label}</span>
            </div>
            <div className="mt-1 text-sm text-gray-600">{option.address}</div>
          </button>
        ))}
      </div>

      {options.length === 0 && !isSearching && (
        <p className="mt-2 text-xs text-gray-500">
          Không tìm thấy địa chỉ phù hợp, hãy thử từ khóa khác.
        </p>
      )}

      {isSearching && (
        <p className="mt-2 text-xs text-gray-500">
          Đang tìm địa chỉ từ Goong...
        </p>
      )}
    </div>
  );
}
