/**
 * @component ButtonDS (Design System Version)
 * @purpose Button component using design system tokens
 * @layer primitives
 */
'use client';

import React from 'react';
import { clsx } from 'clsx';
import { getButtonStyle, componentStyles } from '@/design-system';

export interface ButtonDSProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const ButtonDS = React.forwardRef<HTMLButtonElement, ButtonDSProps>(
  ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    className,
    children,
    disabled,
    ...props
  }, ref) => {
    // Use design system utilities
    const buttonClasses = getButtonStyle(variant, size);

    return (
      <button
        ref={ref}
        className={clsx(
          buttonClasses,
          fullWidth && 'w-full',
          loading && 'relative opacity-75 cursor-wait',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </>
        ) : children}
      </button>
    );
  }
);

ButtonDS.displayName = 'ButtonDS';

// Export as default to easily replace existing Button imports
export default ButtonDS;