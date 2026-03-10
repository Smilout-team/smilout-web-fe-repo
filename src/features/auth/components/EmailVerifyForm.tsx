import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants';
import { useVerifyOtp } from '@/shared/hooks/useVerifyOtp';

export function EmailVerifyForm() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState<number>(60);

  const navigate = useNavigate();
  const email = sessionStorage.getItem('auth.fp.email');

  const { verifyOtp, resendOtp, isVerifying, isResending } = useVerifyOtp();

  const isDisabled = isVerifying || isResending;

  useEffect(() => {
    if (!email) {
      toast.error('Phiên làm việc đã hết. Vui lòng nhập email lại');
      navigate(ROUTES.FORGOT_PASSWORD);
    }
  }, [email, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');

    if (!email) {
      toast.error('Thiếu email xác thực');
      navigate(ROUTES.FORGOT_PASSWORD);
      return;
    }

    if (otpCode.length !== 6) {
      toast.error('Vui lòng nhập đủ 6 số OTP');
      return;
    }

    try {
      await verifyOtp({ email, otp: otpCode });
      sessionStorage.setItem('auth.fp.otp', otpCode);
      toast.success('Xác thực thành công!');
      navigate(ROUTES.CHANGE_PASSWORD);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'OTP không hợp lệ';
      toast.error(message);
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Thiếu email');
      return;
    }

    if (countdown > 0) {
      toast.error(`Vui lòng đợi ${countdown}s trước khi gửi lại mã`);
      return;
    }

    try {
      await resendOtp({ email });
      toast.success('Đã gửi lại mã OTP');

      setCountdown(60);
      setOtp(Array(6).fill(''));
      document.getElementById('otp-0')?.focus();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Gửi lại mã thất bại';
      toast.error(message);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-[32px] flex gap-[6px] px-12">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="h-[56px] w-[56px] rounded-[12px] border border-[#E2E8F0] text-center text-[20px] font-semibold outline-none focus:border-[var(--color-primary)]"
            disabled={isDisabled}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="primary"
        size="lg"
        fullWidth
        loading={isVerifying}
        disabled={isDisabled}
        onClick={handleSubmit}
        className="h-[67.96px] rounded-[16px] text-[18px] font-bold"
      >
        Xác nhận
      </Button>

      <div className="mt-[24px] text-center">
        <p className="text-[16px] text-[#4A5565]">Không nhận được mã?</p>

        <button
          type="button"
          onClick={handleResend}
          disabled={countdown > 0 || isResending}
          className={`mt-[4px] font-semibold ${
            countdown > 0
              ? 'cursor-not-allowed text-gray-400'
              : 'text-[#FF6B6B]'
          }`}
        >
          {countdown > 0 ? `Gửi lại sau ${countdown}s` : 'Gửi lại mã'}
        </button>
      </div>
    </div>
  );
}

export default EmailVerifyForm;
