/**
 * @component Text
 * @purpose Typography component for consistent text styling
 * @layer primitives
 * @dependencies react, clsx
 */

import React from 'react';
import { clsx } from 'clsx';

export interface TextProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'small' | 'caption';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'primary' | 'accent' | 'muted' | 'error';
  align?: 'left' | 'center' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as,
  variant = 'body',
  weight = 'normal',
  color = 'default',
  align = 'left',
  className,
  children,
}) => {
  const Component = (as || (variant.startsWith('h') ? variant : 'p')) as React.ElementType;
  
  const variants = {
    h1: 'text-4xl sm:text-5xl leading-tight',
    h2: 'text-3xl sm:text-4xl leading-tight',
    h3: 'text-2xl sm:text-3xl leading-snug',
    h4: 'text-xl sm:text-2xl leading-snug',
    h5: 'text-lg sm:text-xl leading-normal',
    h6: 'text-base sm:text-lg leading-normal',
    body: 'text-base leading-relaxed',
    small: 'text-sm leading-normal',
    caption: 'text-xs leading-normal',
  };
  
  const weights = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };
  
  const colors = {
    default: 'text-gray-900',
    primary: 'text-primary-600',
    accent: 'text-accent-600',
    muted: 'text-gray-600',
    error: 'text-red-600',
  };
  
  const alignments = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };
  
  return (
    <Component
      className={clsx(
        variants[variant],
        weights[weight],
        colors[color],
        alignments[align],
        className
      )}
    >
      {children}
    </Component>
  );
};