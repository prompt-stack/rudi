/**
 * @component CardHeader
 * @purpose Header section for Card component
 * @layer composed
 * @dependencies react, clsx
 */

import React from 'react';
import { clsx } from 'clsx';

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  bordered = true,
}) => {
  return (
    <div
      className={clsx(
        'px-6 py-4',
        bordered && 'border-b border-gray-100',
        className
      )}
    >
      {children}
    </div>
  );
};