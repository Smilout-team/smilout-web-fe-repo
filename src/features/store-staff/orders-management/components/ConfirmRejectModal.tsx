import Button from '@/shared/components/common/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmRejectModal({
  open,
  onClose,
  onConfirm,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[320px] space-y-4 rounded-[var(--radius-card)] bg-[var(--bg-card)] p-6">
        <p className="text-lg font-semibold text-[var(--text-primary)]">
          Xác nhận từ chối đơn?
        </p>

        <p className="text-sm text-[var(--text-secondary)]">
          Bạn có chắc chắn muốn từ chối đơn hàng này không?
        </p>

        <div className="flex gap-3 pt-2">
          <Button variant="secondary" size="sm" fullWidth onClick={onClose}>
            Hủy
          </Button>

          <Button variant="danger" size="sm" fullWidth onClick={onConfirm}>
            Từ chối
          </Button>
        </div>
      </div>
    </div>
  );
}
