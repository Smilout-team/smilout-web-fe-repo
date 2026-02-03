import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface SignInFormData {
  email: string;
  password: string;
}

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const onSubmit = (data: SignInFormData) => {
    console.log('Sign In submitted:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      {/* Email Field */}
      <div className="mb-[24px] flex flex-col gap-y-[8px]">
        <label className="font-sans text-[14px] font-medium text-[#0A0A0A]">
          Email <span className="text-[#FB2C36]">*</span>
        </label>
        <input
          type="email"
          placeholder="email@example.com"
          {...register('email', {
            required: 'Vui lòng nhập email',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Email không hợp lệ',
            },
          })}
          className={`h-[58.46px] w-full rounded-[14px] border-[1.25px] px-[16px] font-sans text-[16px] transition-colors placeholder:text-[#0A0A0A] placeholder:opacity-50 focus:outline-none ${
            errors.email
              ? 'border-[#FB2C36]'
              : 'border-[#E5E7EB] focus:border-[#FF6B6B]'
          }`}
        />
        {errors.email && (
          <span className="mt-[4px] font-sans text-[12px] text-[#FB2C36]">
            {errors.email.message}
          </span>
        )}
      </div>

      {/* Password Field */}
      <div className="flex flex-col gap-y-[8px]">
        <label className="font-sans text-[14px] font-medium text-[#0A0A0A]">
          Mật khẩu <span className="text-[#FB2C36]">*</span>
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Nhập mật khẩu"
            {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
            className={`h-[58.46px] w-full rounded-[14px] border-[1.25px] px-[16px] pr-12 font-sans text-[16px] transition-colors focus:outline-none ${
              errors.password
                ? 'border-[#FB2C36]'
                : 'border-[#E5E7EB] focus:border-[#FF6B6B]'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6A7282]"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {errors.password && (
          <span className="mt-[4px] font-sans text-[12px] text-[#FB2C36]">
            {errors.password.message}
          </span>
        )}
      </div>

      {/* Quên mật khẩu */}
      <div className="mt-[20px] mb-[20px]">
        <a
          href="#"
          className="font-sans text-[14px] text-[#FF6B6B] hover:underline"
        >
          Quên mật khẩu?
        </a>
      </div>

      {/* Nút Đăng nhập */}
      <button
        type="submit"
        className="h-[67.96px] w-full rounded-[16px] bg-[#FF6B6B] font-sans text-[18px] font-bold text-white transition-all active:scale-[0.98]"
      >
        Đăng nhập
      </button>

      {/* Divider */}
      <div className="mt-[24px] mb-[24px] flex items-center gap-x-[12px]">
        <div className="h-[1px] flex-1 bg-[#E5E7EB]" />
        <span className="font-sans text-[14px] text-[#6A7282]">hoặc</span>
        <div className="h-[1px] flex-1 bg-[#E5E7EB]" />
      </div>

      {/* Nút Tiếp tục với Google */}
      <button
        type="button"
        className="mb-[30px] flex h-[58.46px] w-full items-center justify-center gap-x-[12px] rounded-[14px] border-[1.25px] border-[#E5E7EB] bg-white transition-all active:scale-[0.98]"
      >
        <a
          href="#"
          className="font-sans text-[16px] font-medium text-[#0A0A0A]"
        >
          Tiếp tục với Google
        </a>
      </button>

      {/* Link Đăng ký */}
      <div className="text-center">
        <p className="font-sans text-[16px] text-[#4A5565]">
          Chưa có tài khoản?{' '}
          <a href="#" className="font-bold text-[#FF6B6B] hover:underline">
            Đăng ký ngay
          </a>
        </p>
      </div>
    </form>
  );
}

export default SignInForm;
