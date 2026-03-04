import React, { useMemo, useRef, useEffect } from 'react';
import { ArrowDownLeft, ArrowUpRight, TrendingUp } from 'lucide-react';
import { type Transaction } from '../types/wallet.types';
import { formatCurrency } from '../utils/currency';

interface BalanceHistoryProps {
  transactions: Transaction[];
  title?: string;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
  hasMore?: boolean;
}

const TransactionItem: React.FC<{ transaction: Transaction }> = ({
  transaction,
}) => {
  const isIncome = transaction.type === 'IN';
  const Icon = isIncome ? ArrowDownLeft : ArrowUpRight;
  const iconColor = isIncome ? '#10B981' : '#FF6B6B';

  return (
    <div className="flex items-center justify-between rounded border-b border-[#E5E7EB] px-2 py-3 transition-colors last:border-b-0 hover:bg-[#F9FAFB]">
      <div className="flex flex-1 items-center gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full"
          style={{
            backgroundColor: isIncome ? '#ECFDF5' : '#FEF2F2',
          }}
        >
          <Icon size={20} color={iconColor} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-[#1F2937]">
            {transaction.description}
          </p>
          <p className="text-xs text-[#6B7280]">
            {transaction.date}, {transaction.time}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p
          className="text-sm font-bold"
          style={{ color: isIncome ? '#10B981' : '#FF6B6B' }}
        >
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>
        <p className="text-xs text-[#6B7280]">
          {formatCurrency(transaction.balance)}
        </p>
      </div>
    </div>
  );
};

export const BalanceHistory: React.FC<BalanceHistoryProps> = ({
  transactions,
  title = 'Lịch sử giao dịch',
  onLoadMore,
  isLoadingMore = false,
  hasMore = false,
}) => {
  const isEmpty = useMemo(() => transactions.length === 0, [transactions]);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || isLoadingMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        rootMargin: '100px',
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, isLoadingMore, hasMore]);

  return (
    <div className="space-y-4">
      <h3 className="flex items-center gap-2 text-lg font-bold text-[#1F2937]">
        <TrendingUp size={20} />
        {title}
      </h3>

      {isEmpty ? (
        <div className="rounded-lg border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] py-8 text-center">
          <p className="font-medium text-[#6B7280]">Chưa có giao dịch nào</p>
          <p className="text-sm text-[#9CA3AF]">Hãy nạp tiền để bắt đầu</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-lg border border-[#E5E7EB] bg-white">
            {transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>

          {/* Load more trigger */}
          {hasMore && (
            <div
              ref={loadMoreRef}
              className="flex items-center justify-center py-4"
            >
              {isLoadingMore ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#2563EB] border-t-transparent" />
                  <p className="text-sm text-[#6B7280]">Đang tải thêm...</p>
                </div>
              ) : (
                <p className="text-xs text-[#9CA3AF]">Cuộn để xem thêm</p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BalanceHistory;
