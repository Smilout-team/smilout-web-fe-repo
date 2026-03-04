import { useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface QRScanFrameProps {
  onScanSuccess: (decodedText: string) => void;
  onScanError?: (error: string) => void;
  isScanning: boolean;
}

export const QRScanFrame = ({
  onScanSuccess,
  onScanError,
  isScanning,
}: QRScanFrameProps) => {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const qrCodeRegionId = 'qr-reader';

  useEffect(() => {
    const styleId = 'qr-scanner-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #${qrCodeRegionId} video {
          width: 100% !important;
          height: auto !important;
          border-radius: 0.75rem;
        }
        #${qrCodeRegionId} {
          border-radius: 0.75rem;
          overflow: hidden;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  useEffect(() => {
    if (!isScanning) {
      return;
    }

    const startScanner = async () => {
      try {
        if (!scannerRef.current) {
          scannerRef.current = new Html5Qrcode(qrCodeRegionId);
        }

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        };

        await scannerRef.current.start(
          { facingMode: 'environment' },
          config,
          (decodedText) => {
            onScanSuccess(decodedText);
          },
          (errorMessage) => {
            const ignoredErrors = [
              'NotFoundException',
              'IndexSizeError',
              'getImageData',
              'source width is 0',
            ];

            const shouldIgnore = ignoredErrors.some((err) =>
              errorMessage.includes(err)
            );

            if (onScanError && !shouldIgnore) {
              onScanError(errorMessage);
            }
          }
        );
      } catch (err) {
        if (onScanError) {
          onScanError(
            err instanceof Error ? err.message : 'Không thể khởi động camera'
          );
        }
      }
    };

    startScanner();

    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current
          .stop()
          .then(() => {
            scannerRef.current?.clear();
            scannerRef.current = null;
          })
          .catch((err) => {
            console.error('Error stopping scanner:', err);
          });
      }
    };
  }, [isScanning, onScanSuccess, onScanError]);

  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-xl)] bg-gray-900 px-6 py-8">
      <div className="relative w-full max-w-sm">
        {/* Camera container */}
        <div
          id={qrCodeRegionId}
          className={isScanning ? 'block w-full' : 'hidden'}
          style={{
            minHeight: '300px',
          }}
        />

        {/* Static placeholder when not scanning */}
        {!isScanning && (
          <div className="mx-auto flex h-48 w-48 items-center justify-center">
            {/* Top left corner */}
            <div className="absolute top-0 left-0 h-12 w-12">
              <div className="absolute top-0 left-0 h-1 w-8 rounded-full bg-white" />
              <div className="absolute top-0 left-0 h-8 w-1 rounded-full bg-white" />
            </div>

            {/* Top right corner */}
            <div className="absolute top-0 right-0 h-12 w-12">
              <div className="absolute top-0 right-0 h-1 w-8 rounded-full bg-white" />
              <div className="absolute top-0 right-0 h-8 w-1 rounded-full bg-white" />
            </div>

            {/* Bottom left corner */}
            <div className="absolute bottom-0 left-0 h-12 w-12">
              <div className="absolute bottom-0 left-0 h-1 w-8 rounded-full bg-white" />
              <div className="absolute bottom-0 left-0 h-8 w-1 rounded-full bg-white" />
            </div>

            {/* Bottom right corner */}
            <div className="absolute right-0 bottom-0 h-12 w-12">
              <div className="absolute right-0 bottom-0 h-1 w-8 rounded-full bg-white" />
              <div className="absolute right-0 bottom-0 h-8 w-1 rounded-full bg-white" />
            </div>
          </div>
        )}
      </div>

      <p className="mt-6 text-[length:var(--text-md)] text-white">
        {isScanning ? 'Hướng camera vào mã QR' : 'Nhấn nút bên dưới để quét'}
      </p>
    </div>
  );
};

export default QRScanFrame;
