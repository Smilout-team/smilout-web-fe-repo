import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { Input } from '@/shared/components/common/Input';
import { Button } from '@/shared/components/common/Button';

interface ChangePasswordFormData {
  password: string;
  confirmPassword: string;
}

export function ChangePasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordFormData>();

  const password = watch('password');

  const onSubmit = (data: ChangePasswordFormData) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col"
      noValidate
    >
      <div className="mb-[24px]">
        <Input
          label="Mật khẩu mới"
          type={showPassword ? 'text' : 'password'}
          placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
          required
          error={errors.password?.message}
          inputSize="lg"
          className="h-[58.46px]"
          icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          onIconClick={() => setShowPassword(!showPassword)}
          {...register('password', {
            required: 'Vui lòng nhập mật khẩu mới',
            validate: (value) =>
              value?.trim() !== '' ||
              'Mật khẩu không được chứa chỉ khoảng trắng',
            minLength: {
              value: 6,
              message: 'Mật khẩu phải có ít nhất 6 ký tự',
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
        className="h-[67.96px] rounded-[16px] text-[18px] font-bold"
      >
        Đổi mật khẩu
      </Button>
    </form>
  );
}

export default ChangePasswordForm;
