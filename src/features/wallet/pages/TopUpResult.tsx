import { useEffect, useState, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { TopUpStatus } from '../types/wallet.types';
import { walletService } from '../services/walletService';
import { WALLET_QUERY_KEYS } from '../constants/queryKeys';
import { ROUTES } from '@/shared/constants/routes';
import { STORAGE_KEYS } from '@/shared/constants';
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
  const queryClient = useQueryClient();
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

      if (response.data.status === 'PAID') {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: WALLET_QUERY_KEYS.balance,
          }),
          queryClient.invalidateQueries({
            predicate: (query) =>
              Array.isArray(query.queryKey) &&
              query.queryKey[0] === 'wallet' &&
              query.queryKey[1] === 'transactionHistory',
          }),
        ]);
      }

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
  }, [invoiceNumber, queryClient]);

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

  useEffect(() => {
    if (status === 'PAID') {
      const pendingOrderId = localStorage.getItem(
        STORAGE_KEYS.CHECKOUT_PENDING_ORDERID
      );

      if (pendingOrderId) {
        const redirectTimer = setTimeout(() => {
          localStorage.removeItem(STORAGE_KEYS.CHECKOUT_PENDING_ORDERID);
          navigate(ROUTES.CHECKOUT);
        }, 2500);

        return () => clearTimeout(redirectTimer);
      }
    }
  }, [status, navigate]);

  const handleReturnToWallet = () => {
    const pendingOrderId = localStorage.getItem(
      STORAGE_KEYS.CHECKOUT_PENDING_ORDERID
    );
    if (pendingOrderId) {
      localStorage.removeItem(STORAGE_KEYS.CHECKOUT_PENDING_ORDERID);
      navigate(ROUTES.CHECKOUT);
    } else {
      navigate(ROUTES.WALLET);
    }
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
