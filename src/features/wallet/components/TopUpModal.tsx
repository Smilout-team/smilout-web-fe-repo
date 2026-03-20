import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import TopUpForm from './TopUpForm';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 mb-0 flex items-end bg-black/50">
      <div className="animate-in slide-in-from-bottom max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white shadow-xl">
        <div className="sticky top-0 z-10 flex items-center justify-end border-b border-[var(--border-default)] bg-white px-6 py-4">
          <button
            onClick={onClose}
            className="text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-6 pb-32">
          <TopUpForm onClose={onClose} />
        </div>
      </div>
    </div>
  );
};

export default TopUpModal;
