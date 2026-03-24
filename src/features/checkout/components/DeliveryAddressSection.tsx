import { MapPin, Search } from 'lucide-react';
import type { DeliveryAddressOption } from '../types';
import { useReverseGeocode } from '../hooks';

interface DeliveryAddressSectionProps {
  addressKeyword: string;
  onChangeKeyword: (value: string) => void;
  options: DeliveryAddressOption[];
  selectedAddressId: string | null;
  isSearching: boolean;
  onSelectAddress: (id: string) => void;
}

function isRawCoordinateFallback(address: string): boolean {
  return (
    address.startsWith('Gần tọa độ') ||
    /^\(\d+\.\d+,\s*\d+\.\d+\)$/.test(address.trim())
  );
}

function CoordinateAddressLabel({ option }: { option: DeliveryAddressOption }) {
  const needsGeocode = isRawCoordinateFallback(option.address);
  const geocoded = useReverseGeocode(
    needsGeocode ? option.latitude : undefined,
    needsGeocode ? option.longitude : undefined
  );

  if (!needsGeocode) {
    return <div className="mt-1 text-sm text-gray-600">{option.address}</div>;
  }

  if (geocoded === null) {
    return (
      <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-400">
        <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
        Đang lấy địa chỉ...
      </div>
    );
  }

  if (geocoded === undefined) {
    return (
      <div className="mt-1 text-sm text-gray-500">Vị trí GPS hiện tại</div>
    );
  }

  return <div className="mt-1 text-sm text-gray-600">{geocoded}</div>;
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

      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => onSelectAddress(option.id)}
            className={`w-full rounded-lg border p-3 text-left transition-colors ${
              selectedAddressId === option.id
                ? 'border-[var(--color-primary)] bg-blue-100'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <MapPin size={14} className="text-[var(--color-primary)]" />
              <span>{option.label}</span>
            </div>

            {option.source === 'COORDINATE' ? (
              <CoordinateAddressLabel option={option} />
            ) : (
              <div className="mt-1 text-sm text-gray-600">{option.address}</div>
            )}
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
