interface DeliveryOptionSectionProps {
  deliveryOption: 'ASAP' | 'SCHEDULED';
  scheduledDeliveryAt: string;
  onChangeDeliveryOption: (value: 'ASAP' | 'SCHEDULED') => void;
  onChangeScheduledAt: (value: string) => void;
}

const MIN_SCHEDULED_DELIVERY_AT = new Date(Date.now() + 5 * 60 * 1000)
  .toISOString()
  .slice(0, 16);

export function DeliveryOptionSection({
  deliveryOption,
  scheduledDeliveryAt,
  onChangeDeliveryOption,
  onChangeScheduledAt,
}: DeliveryOptionSectionProps) {
  return (
    <div className="mb-4 rounded-lg bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-sm font-medium text-gray-700">
        Hình thức giao hàng
      </h2>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => onChangeDeliveryOption('ASAP')}
          className={`w-full rounded-lg border p-3 text-left transition-colors ${
            deliveryOption === 'ASAP'
              ? 'border-[var(--color-primary)] bg-blue-100'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="text-sm font-semibold text-gray-900">
            Ngay bây giờ
          </div>
          <div className="mt-1 text-sm text-gray-600">15-30 phút</div>
        </button>

        <button
          type="button"
          onClick={() => onChangeDeliveryOption('SCHEDULED')}
          className={`w-full rounded-lg border p-3 text-left transition-colors ${
            deliveryOption === 'SCHEDULED'
              ? 'border-[var(--color-primary)] bg-blue-100'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="text-sm font-semibold text-gray-900">Hẹn giờ</div>
        </button>

        {deliveryOption === 'SCHEDULED' && (
          <input
            type="datetime-local"
            value={scheduledDeliveryAt}
            min={MIN_SCHEDULED_DELIVERY_AT}
            onChange={(e) => onChangeScheduledAt(e.target.value)}
            className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        )}
      </div>
    </div>
  );
}
