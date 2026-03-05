import { useCallback, useEffect, useRef, useState } from 'react';

interface BarcodeScanFrameProps {
  onScanSuccess: (barcode: string) => void;
  onScanError?: (error: string) => void;
  isScanning: boolean;
}

interface QuaggaDetectedCodeResult {
  code?: string;
  format?: string;
}

interface QuaggaDetectedPayload {
  codeResult?: QuaggaDetectedCodeResult;
}

type QuaggaDetectedHandler = (data: QuaggaDetectedPayload) => void;

interface QuaggaInitConfig {
  inputStream: {
    name: string;
    type: string;
    target: HTMLElement | null;
    constraints: {
      facingMode: string;
      width: { ideal: number };
      height: { ideal: number };
      aspectRatio: { min: number; max: number };
    };
    area: {
      top: string;
      right: string;
      left: string;
      bottom: string;
    };
  };
  decoder: {
    readers: string[];
    multiple: boolean;
  };
  locate: boolean;
  locator: {
    patchSize: 'x-small' | 'small' | 'medium' | 'large' | 'x-large';
    halfSample: boolean;
  };
  numOfWorkers: number;
  frequency: number;
}

interface QuaggaApi {
  init: (config: QuaggaInitConfig, cb: (err?: Error) => void) => void;
  start: () => void;
  stop: () => void;
  onDetected: (handler: QuaggaDetectedHandler) => void;
  offDetected: (handler: QuaggaDetectedHandler) => void;
}

const validateEAN13 = (barcode: string): boolean => {
  if (barcode.length !== 13 || !/^\d+$/.test(barcode)) {
    return false;
  }

  const digits = barcode.split('').map(Number);
  const checkDigit = digits.pop()!;

  let sum = 0;
  digits.forEach((digit, index) => {
    sum += index % 2 === 0 ? digit : digit * 3;
  });

  const calculatedCheck = (10 - (sum % 10)) % 10;
  return calculatedCheck === checkDigit;
};

const validateEAN8 = (barcode: string): boolean => {
  if (barcode.length !== 8 || !/^\d+$/.test(barcode)) {
    return false;
  }

  const digits = barcode.split('').map(Number);
  const checkDigit = digits.pop()!;

  let sum = 0;
  digits.forEach((digit, index) => {
    sum += index % 2 === 0 ? digit * 3 : digit;
  });

  const calculatedCheck = (10 - (sum % 10)) % 10;
  return calculatedCheck === checkDigit;
};

export const BarcodeScanFrame = ({
  onScanSuccess,
  onScanError,
  isScanning,
}: BarcodeScanFrameProps) => {
  const quaggaTargetRef = useRef<HTMLDivElement>(null);
  const quaggaRef = useRef<QuaggaApi | null>(null);
  const quaggaDetectedHandlerRef = useRef<QuaggaDetectedHandler | null>(null);
  const seenCodesRef = useRef<Set<string>>(new Set());
  const detectionCountRef = useRef<Map<string, number>>(new Map());
  const [isCapturing, setIsCapturing] = useState(false);

  useEffect(() => {
    const styleId = 'quagga-scanner-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        #quagga-scanner video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        #quagga-scanner canvas {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const stopScanner = useCallback(() => {
    if (quaggaRef.current) {
      if (quaggaDetectedHandlerRef.current) {
        quaggaRef.current.offDetected(quaggaDetectedHandlerRef.current);
        quaggaDetectedHandlerRef.current = null;
      }
      quaggaRef.current.stop();
      quaggaRef.current = null;
    }
  }, []);

  const processDetectedBarcode = useCallback(
    (barcode: string, format: string) => {
      if (
        !barcode ||
        typeof barcode !== 'string' ||
        barcode.trim().length === 0
      ) {
        return false;
      }

      const trimmedBarcode = barcode.trim();
      if (trimmedBarcode.length < 8 || trimmedBarcode.length > 20) {
        return false;
      }

      if (
        format === 'ean_13' &&
        trimmedBarcode.length === 13 &&
        /^\d+$/.test(trimmedBarcode)
      ) {
        if (!validateEAN13(trimmedBarcode)) {
          return false;
        }
      }

      if (
        format === 'ean_8' &&
        trimmedBarcode.length === 8 &&
        /^\d+$/.test(trimmedBarcode)
      ) {
        if (!validateEAN8(trimmedBarcode)) {
          return false;
        }
      }

      const currentCount =
        (detectionCountRef.current.get(trimmedBarcode) || 0) + 1;
      detectionCountRef.current.set(trimmedBarcode, currentCount);

      if (detectionCountRef.current.size > 10) {
        const firstKey = detectionCountRef.current.keys().next().value;
        if (firstKey !== undefined) {
          detectionCountRef.current.delete(firstKey);
        }
      }

      if (currentCount < 2) {
        return false;
      }

      if (seenCodesRef.current.has(trimmedBarcode)) {
        return false;
      }

      seenCodesRef.current.add(trimmedBarcode);
      setTimeout(() => {
        seenCodesRef.current.delete(trimmedBarcode);
      }, 3000);

      detectionCountRef.current.clear();
      setIsCapturing(true);
      stopScanner();
      onScanSuccess(trimmedBarcode);
      return true;
    },
    [onScanSuccess, stopScanner]
  );

  useEffect(() => {
    if (!isScanning) {
      stopScanner();
      setIsCapturing(false);
      detectionCountRef.current.clear();
      return;
    }

    const initQuagga = async () => {
      try {
        const module = await import('quagga');
        const moduleWithDefault = module as unknown as { default?: QuaggaApi };
        const Quagga =
          moduleWithDefault.default ?? (module as unknown as QuaggaApi);

        quaggaRef.current = Quagga;

        await new Promise<void>((resolve) => setTimeout(resolve, 100));

        if (!quaggaTargetRef.current) {
          onScanError?.('Không tìm thấy vùng camera để quét');
          return;
        }

        await new Promise<void>((resolve, reject) => {
          Quagga.init(
            {
              inputStream: {
                name: 'Live',
                type: 'LiveStream',
                target: quaggaTargetRef.current,
                constraints: {
                  facingMode: 'environment',
                  width: { ideal: 1280 },
                  height: { ideal: 720 },
                  aspectRatio: { min: 1, max: 2 },
                },
                area: {
                  top: '20%',
                  right: '10%',
                  left: '10%',
                  bottom: '20%',
                },
              },
              decoder: {
                readers: [
                  'ean_reader',
                  'ean_8_reader',
                  'upc_reader',
                  'upc_e_reader',
                  'code_128_reader',
                  'code_39_reader',
                  'i2of5_reader',
                  'codabar_reader',
                ],
                multiple: false,
              },
              locate: true,
              locator: {
                patchSize: 'medium',
                halfSample: true,
              },
              numOfWorkers: 2,
              frequency: 10,
            },
            (err: Error | undefined) => {
              if (err) {
                reject(err);
                return;
              }

              resolve();
            }
          );
        });

        const onDetected: QuaggaDetectedHandler = (data) => {
          const codeResult = data?.codeResult;
          if (!codeResult?.code) {
            return;
          }
          const barcode = String(codeResult.code);
          const format = String(codeResult.format || '').toLowerCase();
          void processDetectedBarcode(barcode, format);
        };

        quaggaDetectedHandlerRef.current = onDetected;
        Quagga.onDetected(onDetected);
        Quagga.start();
      } catch (error) {
        const errorMsg =
          error instanceof Error
            ? error.message
            : 'Không thể khởi tạo máy quét';
        onScanError?.(errorMsg);
      }
    };

    void initQuagga();

    const seenCodes = seenCodesRef.current;
    const detectionCount = detectionCountRef.current;

    return () => {
      stopScanner();
      seenCodes.clear();
      detectionCount.clear();
    };
  }, [isScanning, onScanError, processDetectedBarcode, stopScanner]);

  return (
    <div className="flex flex-col items-center justify-center rounded-[var(--radius-xl)] bg-gray-900 px-6 py-8">
      <div className="relative w-full max-w-sm overflow-hidden rounded-[var(--radius-lg)]">
        <div
          className="relative w-full bg-black"
          style={{
            height: '300px',
            borderRadius: '0.75rem',
            display: isScanning ? 'block' : 'none',
          }}
        >
          <div
            id="quagga-scanner"
            ref={quaggaTargetRef}
            className="h-full w-full overflow-hidden"
            style={{ position: 'relative' }}
          />
          {isCapturing && (
            <div className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-lg)] bg-black/30">
              <div className="flex flex-col items-center gap-2">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent" />
                <p className="text-xs text-white">Đang xử lý...</p>
              </div>
            </div>
          )}
        </div>

        {!isScanning && (
          <div className="mx-auto flex h-48 w-full items-center justify-center bg-gray-900">
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
        {isScanning
          ? 'Hướng camera vào mã vạch'
          : 'Nhấn nút bên dưới để bật camera'}
      </p>
    </div>
  );
};
