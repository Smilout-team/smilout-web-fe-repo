import { Button } from '@/shared/components/common/Button';

export function EmailVerifyForm() {
  return (
    <div className="flex flex-col items-center">
      <p className="mb-[24px] text-center text-[16px] text-[#FF6B6B]">
        voductaitxq123@gmail.com
      </p>

      <div className="mb-[32px] flex gap-[12px]">
        {Array.from({ length: 6 }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="h-[56px] w-[56px] rounded-[12px] border border-[#E2E8F0] text-center text-[20px] font-semibold outline-none"
          />
        ))}
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        fullWidth
        className="h-[67.96px] rounded-[16px] text-[18px] font-bold"
      >
        Xác nhận
      </Button>

      <div className="mt-[24px] text-center">
        <p className="text-[16px] text-[#4A5565]">Không nhận được mã?</p>

        <button type="button" className="mt-[4px] font-semibold text-[#FF6B6B]">
          Gửi lại mã
        </button>
      </div>
    </div>
  );
}

export default EmailVerifyForm;
