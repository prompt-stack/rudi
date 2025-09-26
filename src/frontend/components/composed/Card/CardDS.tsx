/**
 * @component CardDS (Design System Version)
 * @purpose Card component using design system tokens
 * @layer composed
 */
'use client';

import React from 'react';
import { clsx } from 'clsx';
import { getCardStyle } from '@/design-system';

export interface CardDSProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
  onClick?: () => void;
}

export const CardDS: React.FC<CardDSProps> = ({
  children,
  className,
  padding = 'md',
  hover = false,
  onClick,
}) => {
  // Use design system utilities
  const cardClasses = getCardStyle(hover, padding);

  return (
    <div
      className={clsx(
        cardClasses,
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

// Export as default to easily replace existing Card imports
export default CardDS;