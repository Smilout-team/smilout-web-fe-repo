import { useState } from 'react';
import { useWatch } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/components/common/Button';
import { ROUTES } from '@/shared/constants';
import { useResetPassword } from '@/shared/hooks/useResetPassword';

interface ChangePasswordFormData {
  password: string;
  confirmPassword: string;
}

export function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const email = sessionStorage.getItem('auth.fp.email');
  const otp = sessionStorage.getItem('auth.fp.otp');

  const { mutateAsync: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ChangePasswordFormData>();

  const password = useWatch({
    control,
    name: 'password',
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    if (!email || !otp) {
      toast.error('Thiếu thông tin xác thực');
      navigate(ROUTES.FORGOT_PASSWORD);
      return;
    }

    try {
      await resetPassword({
        email,
        otp,
        newPassword: data.password.trim(),
        confirmPassword: data.confirmPassword.trim(),
      });

      sessionStorage.removeItem('auth.fp.email');
      sessionStorage.removeItem('auth.fp.otp');

      toast.success('Đổi mật khẩu thành công!');
      navigate(ROUTES.CHANGE_PASSWORD_SUCCESS);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Đổi mật khẩu thất bại';
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
          label="Mật khẩu mới"
          type={showPassword ? 'text' : 'password'}
          placeholder="Nhập mật khẩu mới"
          required
          error={errors.password?.message}
          inputSize="lg"
          className="h-[58.46px]"
          icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowPassword(!showPassword)}
          disabled={isPending}
          {...register('password', {
            required: 'Vui lòng nhập mật khẩu mới',
            validate: (value) =>
              value?.trim() !== '' ||
              'Mật khẩu không được chứa chỉ khoảng trắng',
            minLength: {
              value: 8,
              message: 'Mật khẩu phải có ít nhất 8 ký tự',
            },
          })}
        />
      </div>

      <div className="mb-[24px]">
        <Input
          label="Xác nhận mật khẩu"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Nhập lại mật khẩu mới"
          required
          error={errors.confirmPassword?.message}
          inputSize="lg"
          className="h-[58.46px]"
          icon={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          disabled={isPending}
          {...register('confirmPassword', {
            required: 'Vui lòng xác nhận mật khẩu',
            validate: (value) => {
              if (value?.trim() === '')
                return 'Xác nhận mật khẩu không được chứa chỉ khoảng trắng';
              return value === password || 'Mật khẩu không khớp';
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
        Đổi mật khẩu
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
