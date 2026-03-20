import { useEffect, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';

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
  const transitionRef = useRef<Promise<void> | null>(null);
  const hasScannedRef = useRef(false);
  const isInitializingRef = useRef(false);
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
    const stopScanner = async () => {
      if (transitionRef.current) {
        await transitionRef.current;
      }

      if (!scannerRef.current) {
        isInitializingRef.current = false;
        return;
      }

      const transition = (async () => {
        try {
          if (scannerRef.current?.isScanning) {
            await scannerRef.current.stop();
          }
          await scannerRef.current?.clear();
        } catch (error) {
          void error;
        } finally {
          const container = document.getElementById(qrCodeRegionId);
          if (container) {
            container.innerHTML = '';
          }
          scannerRef.current = null;
          isInitializingRef.current = false;
        }
      })();

      transitionRef.current = transition;
      await transition;
      transitionRef.current = null;
    };

    const startScanner = async () => {
      if (isInitializingRef.current || scannerRef.current) {
        return;
      }

      try {
        isInitializingRef.current = true;
        await stopScanner();

        await new Promise<void>((resolve) => setTimeout(resolve, 100));

        hasScannedRef.current = false;

        const container = document.getElementById(qrCodeRegionId);
        if (container) {
          container.innerHTML = '';
        }

        scannerRef.current = new Html5Qrcode(qrCodeRegionId);

        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        };

        const transition = scannerRef.current.start(
          { facingMode: 'environment' },
          config,
          async (decodedText: string) => {
            if (hasScannedRef.current) {
              return;
            }

            hasScannedRef.current = true;
            await stopScanner();
            onScanSuccess(decodedText);
          },
          (errorMessage: string) => {
            const ignoredErrors = [
              'NotFoundException',
              'IndexSizeError',
              'getImageData',
              'source width is 0',
              'No MultiFormat Readers were able to detect the code',
            ];

            const shouldIgnore = ignoredErrors.some((err) =>
              errorMessage.includes(err)
            );

            if (onScanError && !shouldIgnore) {
              onScanError(errorMessage);
            }
          }
        );

        transitionRef.current = transition.then(() => undefined);
        await transition;
        transitionRef.current = null;
      } catch (err) {
        if (onScanError) {
          const errorMsg =
            err instanceof Error ? err.message : 'Không thể khởi động camera';
          onScanError(errorMsg);
        }
      } finally {
        isInitializingRef.current = false;
      }
    };

    if (isScanning) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isScanning, onScanSuccess, onScanError]);

  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-xl)] bg-gray-900 px-6 py-8">
      <div className="relative w-full max-w-sm">
        <div
          id={qrCodeRegionId}
          className={isScanning ? 'block w-full' : 'hidden'}
          style={{
            minHeight: '300px',
          }}
        />

        {!isScanning && (
          <div className="mx-auto flex h-48 w-48 items-center justify-center">
            <div className="absolute top-0 left-0 h-12 w-12">
              <div className="absolute top-0 left-0 h-1 w-8 rounded-full bg-white" />
              <div className="absolute top-0 left-0 h-8 w-1 rounded-full bg-white" />
            </div>

            <div className="absolute top-0 right-0 h-12 w-12">
              <div className="absolute top-0 right-0 h-1 w-8 rounded-full bg-white" />
              <div className="absolute top-0 right-0 h-8 w-1 rounded-full bg-white" />
            </div>

            <div className="absolute bottom-0 left-0 h-12 w-12">
              <div className="absolute bottom-0 left-0 h-1 w-8 rounded-full bg-white" />
              <div className="absolute bottom-0 left-0 h-8 w-1 rounded-full bg-white" />
            </div>

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
