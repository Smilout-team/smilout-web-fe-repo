import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants';
import formatErrorMessage from '@/shared/utils/formatErrorMessage';
import { useForgotPassword } from '@/shared/hooks/useForgotPassword';

interface ForgotPasswordFormData {
  email: string;
}

export function ForgotPasswordForm() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  useEffect(() => {
    sessionStorage.removeItem('auth.fp.email');
    sessionStorage.removeItem('auth.fp.otp');
  }, []);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await mutateAsync({ email: data.email });

      sessionStorage.setItem('auth.fp.email', data.email);

      toast.success('Đã gửi mã xác thực!');
      navigate(ROUTES.VERIFY_CODE);
    } catch (error) {
      const message =
        error instanceof Error
          ? formatErrorMessage(error.message)
          : 'Gửi mã thất bại';
      toast.error(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex max-w-[440px] flex-col px-6 md:max-w-[700px] md:px-12"
      noValidate
    >
      <div className="mb-[24px]">
        <Input
          label="Email"
          type="email"
          placeholder="email@example.com"
          required
          error={errors.email?.message}
          inputSize="lg"
          className="h-[58.46px]"
          disabled={isPending}
          {...register('email', {
            required: 'Vui lòng nhập email',
            validate: (value) =>
              value?.trim() !== '' || 'Email không được chứa chỉ khoảng trắng',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email không hợp lệ',
            },
          })}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        loading={isPending}
        disabled={isPending}
        className="h-[67.96px] rounded-[16px] text-[18px] font-bold"
      >
        Gửi mã xác thực
      </Button>

      <div className="mt-[30px] text-center">
        <p className="font-sans text-[16px] text-[#4A5565]">
          Nhớ mật khẩu?{' '}
          <Link
            to={ROUTES.SIGN_IN}
            className="font-bold text-[var(--color-primary-button)] hover:underline"
          >
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
