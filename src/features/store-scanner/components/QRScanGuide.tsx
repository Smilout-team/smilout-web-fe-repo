export const QRScanGuide = () => {
  const steps = [
    'Tìm mã QR tại cửa ra vào cửa hàng',
    'Quét mã để check-in vào cửa hàng',
    'Bắt đầu quét sản phẩm và mua sắm',
    'Thanh toán và nhận mã để rời khỏi cửa hàng',
  ];

  return (
    <div className="rounded-[var(--radius-lg)] bg-[var(--bg-card)] p-4">
      <h3 className="mb-3 text-[length:var(--text-md)] font-[var(--font-semibold)] text-[var(--text-primary)]">
        Hướng dẫn:
      </h3>
      <ol className="space-y-2">
        {steps.map((step, index) => (
          <li
            key={index}
            className="text-[length:var(--text-sm)] text-[var(--text-secondary)]"
          >
            <span className="font-[var(--font-medium)]">{index + 1}.</span>{' '}
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default QRScanGuide;
