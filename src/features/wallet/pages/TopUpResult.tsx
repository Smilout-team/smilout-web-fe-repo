import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { TopUpStatus } from '../types/wallet.types';
import { walletService } from '../services/walletService';
import { ROUTES } from '@/shared/constants/routes';
import {
  TopUpResultLoading,
  TopUpResultError,
  TopUpResultSuccess,
  TopUpResultPending,
  TopUpResultFailed,
  TopUpResultUnknown,
} from '../components/TopUpResult';

const POLLING_INTERVAL = 2000;
const MAX_POLLING_DURATION = 60000;
const TOP_UP_NOT_FOUND_MESSAGE = 'Không tìm thấy yêu cầu nạp tiền';

export const TopUpResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<TopUpStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);

  const invoiceNumber = searchParams.get('invoiceNumber');

  const checkStatus = useCallback(async (): Promise<boolean> => {
    if (!invoiceNumber) {
      setError('Invoice number not found');
      setIsLoading(false);
      return false;
    }

    try {
      const response = await walletService.getTopUpStatus(invoiceNumber);

      if (response.statusCode !== 200 || !response.data) {
        throw new Error(response.message || 'Failed to fetch status');
      }

      setStatus(response.data.status);
      setAmount(response.data.amount);

      return response.data.status !== 'PENDING';
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch status';

      if (errorMessage.includes(TOP_UP_NOT_FOUND_MESSAGE)) {
        setError(TOP_UP_NOT_FOUND_MESSAGE);
        return true;
      }

      setError(errorMessage);
      return false;
    }
  }, [invoiceNumber]);

  useEffect(() => {
    if (!invoiceNumber) {
      setError('Invoice number not found');
      setIsLoading(false);
      return;
    }

    let pollCount = 0;
    const maxPolls = Math.ceil(MAX_POLLING_DURATION / POLLING_INTERVAL);

    const pollStatus = async () => {
      const shouldStop = await checkStatus();

      if (shouldStop) {
        setIsLoading(false);
        return;
      }

      pollCount++;
      if (pollCount < maxPolls) {
        setTimeout(pollStatus, POLLING_INTERVAL);
      } else {
        setIsLoading(false);
      }
    };

    pollStatus();
  }, [invoiceNumber, checkStatus]);

  const handleReturnToWallet = () => {
    navigate(ROUTES.WALLET);
  };

  const handleRetry = () => {
    navigate(ROUTES.WALLET);
  };

  if (isLoading) {
    return <TopUpResultLoading />;
  }

  if (error) {
    return <TopUpResultError error={error} onRetry={handleRetry} />;
  }

  if (status === 'PAID') {
    return (
      <TopUpResultSuccess
        amount={amount ?? undefined}
        onReturnToWallet={handleReturnToWallet}
      />
    );
  }

  if (status === 'PENDING') {
    return <TopUpResultPending onReturnToWallet={handleReturnToWallet} />;
  }

  if (status === 'FAILED' || status === 'CANCELLED') {
    return <TopUpResultFailed status={status} onRetry={handleRetry} />;
  }

  return <TopUpResultUnknown onReturnToWallet={handleReturnToWallet} />;
};

export default TopUpResult;
