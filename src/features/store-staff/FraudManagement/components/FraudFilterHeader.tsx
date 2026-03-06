// import React from 'react';
// import { AlertTriangle } from 'lucide-react';
// import ReturnButton from '@/shared/components/common/ReturnButton';
// import Tag from '@/shared/components/common/Tag';

// interface FraudFilterHeaderProps {
//     activeCount: number;
//     processedCount: number;
//     currentFilter: 'active' | 'processed' | 'all';
//     onFilterChange: (filter: 'active' | 'processed' | 'all') => void;
// }

// const FraudFilterHeader: React.FC<FraudFilterHeaderProps> = ({
//     activeCount,
//     processedCount,
//     currentFilter,
//     onFilterChange,
// }) => {
//     const getTagProps = (filterName: string) => {
//         return currentFilter === filterName
//             ? {
//                 tone: 'primary' as const,
//                 variant: 'solid' as const,
//                 className: '!bg-white !text-[var(--color-primary)] font-medium'
//             }
//             : {
//                 tone: 'gray' as const,
//                 variant: 'light' as const,
//                 className: '!bg-white/20 !text-[var(--text-on-primary)] hover:!bg-white hover:!text-[var(--color-primary)] transition-all duration-200'
//             };
//     };

//     return (
//         <div className="bg-[var(--color-primary)] rounded-xl p-6 text-[var(--text-on-primary)] shadow-[var(--shadow-card)] mb-6">
//             <div className="flex items-center gap-4 mb-5">
//                 <ReturnButton className="bg-white/20 hover:bg-white/30 text-[var(--text-on-primary)] !rounded-full" />
//                 <div>
//                     <h1 className="text-2xl font-bold flex items-center gap-2">
//                         <AlertTriangle size={24} /> Giám sát gian lận
//                     </h1>
//                     <p className="text-[var(--text-on-primary)] opacity-90 text-sm mt-0.5">{activeCount} cảnh báo</p>
//                 </div>
//             </div>

//             <div className="flex gap-3">
//                 <Tag
//                     {...getTagProps('active')}
//                     rounded="full"
//                     className={`px-5 py-2 text-sm border-none shadow-sm cursor-pointer ${getTagProps('active').className}`}
//                     onClick={() => onFilterChange('active')}
//                 >
//                     Đang cảnh báo ({activeCount})
//                 </Tag>
//                 <Tag
//                     {...getTagProps('processed')}
//                     rounded="full"
//                     className={`px-5 py-2 text-sm border-none cursor-pointer ${getTagProps('processed').className}`}
//                     onClick={() => onFilterChange('processed')}
//                 >
//                     Đã xử lý ({processedCount})
//                 </Tag>
//                 <Tag
//                     {...getTagProps('all')}
//                     rounded="full"
//                     className={`px-5 py-2 text-sm border-none cursor-pointer ${getTagProps('all').className}`}
//                     onClick={() => onFilterChange('all')}
//                 >
//                     Tất cả
//                 </Tag>
//             </div>
//         </div>
//     );
// };

// export default FraudFilterHeader;
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import ReturnButton from '@/shared/components/common/ReturnButton';
import Tag from '@/shared/components/common/Tag';

interface FraudFilterHeaderProps {
  activeCount: number;
  processedCount: number;
  currentFilter: 'active' | 'processed' | 'all';
  onFilterChange: (filter: 'active' | 'processed' | 'all') => void;
}

const FraudFilterHeader: React.FC<FraudFilterHeaderProps> = ({
  activeCount,
  processedCount,
  currentFilter,
  onFilterChange,
}) => {
  const getTagProps = (filterName: string) => {
    return currentFilter === filterName
      ? {
          tone: 'primary' as const,
          variant: 'solid' as const,
          className:
            '!bg-[var(--bg-card)] !text-[var(--color-primary)] font-[var(--font-medium)]',
        }
      : {
          tone: 'gray' as const,
          variant: 'light' as const,
          className:
            '!bg-[var(--bg-card)]/20 !text-[var(--text-on-primary)] hover:!bg-[var(--bg-card)] hover:!text-[var(--color-primary)] transition-all duration-200',
        };
  };

  return (
    <div className="mb-6 rounded-[var(--radius-card)] p-6 text-[var(--text-on-primary)] shadow-[var(--shadow-card)] [background:var(--color-primary-gradient)]">
      {' '}
      <div className="mb-5 flex items-center gap-4">
        <ReturnButton className="!rounded-full bg-[var(--bg-card)]/20 text-[var(--text-on-primary)] hover:bg-[var(--bg-card)]/30" />
        <div>
          <h1 className="flex items-center gap-2 font-[var(--font-bold)] text-[var(--text-2xl)]">
            <AlertTriangle size={24} /> Giám sát gian lận
          </h1>
          <p className="mt-0.5 text-[var(--text-on-primary)] text-[var(--text-sm)] opacity-90">
            {activeCount} cảnh báo
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Tag
          {...getTagProps('active')}
          rounded="full"
          className={`cursor-pointer border-none px-5 py-2 text-[var(--text-sm)] shadow-[var(--shadow-button)] ${getTagProps('active').className}`}
          onClick={() => onFilterChange('active')}
        >
          Đang cảnh báo ({activeCount})
        </Tag>
        <Tag
          {...getTagProps('processed')}
          rounded="full"
          className={`cursor-pointer border-none px-5 py-2 text-[var(--text-sm)] ${getTagProps('processed').className}`}
          onClick={() => onFilterChange('processed')}
        >
          Đã xử lý ({processedCount})
        </Tag>
        <Tag
          {...getTagProps('all')}
          rounded="full"
          className={`cursor-pointer border-none px-5 py-2 text-[var(--text-sm)] ${getTagProps('all').className}`}
          onClick={() => onFilterChange('all')}
        >
          Tất cả
        </Tag>
      </div>
    </div>
  );
};

export default FraudFilterHeader;
