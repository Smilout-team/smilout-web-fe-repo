import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants';
import { useNavigate } from 'react-router-dom';

interface ForgotPasswordFormData {
  email: string;
}

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setIsLoading(true);

      console.log(data);

      toast.success('Đã gửi mã xác thực!');
      navigate(ROUTES.VERIFY_CODE);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Gửi mã thất bại';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
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
          disabled={isLoading}
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
        loading={isLoading}
        disabled={isLoading}
        className="h-[67.96px] rounded-[16px] text-[18px] font-bold"
      >
        Gửi mã xác thực
      </Button>

      <div className="mt-[30px] text-center">
        <p className="font-sans text-[16px] text-[#4A5565]">
          Nhớ mật khẩu?{' '}
          <Link
            to={ROUTES.SIGN_IN}
            className="font-bold text-[#FF6B6B] hover:underline"
          >
            Quay lại đăng nhập
          </Link>
        </p>
      </div>
    </form>
  );
}

export default ForgotPasswordForm;
