import { Store } from 'lucide-react';

export function StoreStaffSignInHeader() {
  return (
    <div className="flex flex-col items-center">
      {/* Lock Icon */}
      <div className="mb-[16px] flex h-[48px] w-[48px] items-center justify-center rounded-full bg-gradient-to-r from-[var(--red-400)] via-[var(--red-500)] to-[var(--red-600)]">
        <Store size={24} className="text-white" />
      </div>

      <h1 className="text-center font-sans text-[24px] font-semibold text-[#0A0A0A]">
        Đăng nhập
      </h1>
      <p className="mt-2 text-center font-sans text-[14px] text-[#6B7280]">
        Đăng nhập để truy cập vào hệ thống
      </p>
    </div>
  );
}

export default StoreStaffSignInHeader;
