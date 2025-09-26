/**
 * @component Card
 * @purpose Flexible container component built from primitives
 * @layer composed
 * @dependencies react, clsx
 */
'use client';

import React from 'react';
import { clsx } from 'clsx';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'soft' | 'medium' | 'large';
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  padding = 'md',
  shadow = 'soft',
  hover = false,
  onClick,
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };
  
  const shadows = {
    none: '',
    soft: 'shadow-soft',
    medium: 'shadow-medium',
    large: 'shadow-large',
  };
  
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-gray-100 overflow-hidden',
        paddings[padding],
        shadows[shadow],
        hover && 'transition-all hover:shadow-medium hover:border-gray-200',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};