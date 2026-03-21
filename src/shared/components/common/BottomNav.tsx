import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, ShoppingBag, Clock, Wallet, User } from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { id: 'home', label: 'Trang chủ', icon: Home, path: '/home' },
  {
    id: 'online-shopping',
    label: 'Mua sắm',
    icon: ShoppingBag,
    path: '/online-shopping',
  },
  {
    id: 'order-history',
    label: 'Đơn hàng',
    icon: Clock,
    path: '/order-history',
  },
  { id: 'wallet', label: 'Ví', icon: Wallet, path: '/wallet' },
  { id: 'profile', label: 'Cá nhân', icon: User, path: '/profile' },
];

export const BottomNav: React.FC = () => {
  return (
    <nav
      className={clsx(
        'fixed right-0 bottom-0 left-0 z-50',
        'flex h-16 w-full items-center justify-around',
        'border-t border-[var(--border-default)] bg-[var(--bg-card)]',
        'pb-safe'
      )}
    >
      {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => (
        <NavLink
          key={id}
          to={path}
          className={({ isActive }) =>
            clsx(
              'flex h-full w-full flex-col items-center justify-center gap-1 no-underline transition-colors duration-200 hover:no-underline',
              isActive
                ? 'text-[var(--color-primary)]'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            )
          }
        >
          <Icon size={24} strokeWidth={2} />

          <span className="text-[length:var(--text-xs)] font-[var(--font-medium)]">
            {label}
          </span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
