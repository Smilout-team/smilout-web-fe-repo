export function SignUpHeader() {
  return (
    <div className="flex flex-col items-center">
      <img
        src="/logo.png"
        alt="SMILOUT Logo"
        className="mb-[32px] h-auto w-[192px] object-contain"
      />
      <h1 className="text-center font-sans text-[24px] text-[#0A0A0A]">
        Tạo tài khoản mới
      </h1>
      <p className="mt-2 text-center font-sans text-[16px] text-[#4A5565]">
        Đăng ký để bắt đầu trải nghiệm mua sắm
      </p>
    </div>
  );
}

export default SignUpHeader;
