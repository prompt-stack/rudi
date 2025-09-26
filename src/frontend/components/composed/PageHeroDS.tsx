/**
 * @component PageHeroDS (Design System Version)
 * @layer composed
 * @purpose Standardized hero section using design system tokens
 */
'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import {
  getSectionStyle,
  getContainerStyle,
  textStyles,
  bgStyles,
  getIconStyle
} from '@/design-system';

interface PageHeroDSProps {
  badge?: {
    icon: ReactNode;
    text: string;
  };
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  variant?: 'default' | 'gradient' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PageHeroDS({
  badge,
  title,
  subtitle,
  children,
  variant = 'default',
  size = 'md',
  className = ''
}: PageHeroDSProps) {
  // Use design system utilities
  const sectionClasses = getSectionStyle(size === 'lg' ? 'lg' : size === 'sm' ? 'sm' : 'md');
  const containerClasses = getContainerStyle('wide');

  // Background variants
  const backgrounds = {
    default: bgStyles.surfaceLight,
    gradient: 'bg-gradient-to-b from-navy-50/30 to-white',
    dark: `${bgStyles.surfaceDark} text-white`
  };

  return (
    <section className={clsx(
      'relative',
      sectionClasses,
      backgrounds[variant],
      className
    )}>
      <div className={containerClasses}>
        <div className="max-w-4xl">
          {badge && (
            <div className="flex items-center gap-2 mb-6">
              <span className={clsx(
                getIconStyle('xs'),
                variant === 'dark' ? 'text-white' : textStyles.accent
              )}>
                {badge.icon}
              </span>
              <span className={clsx(
                textStyles.caps,
                variant === 'dark' ? 'text-gray-300' : textStyles.secondary
              )}>
                {badge.text}
              </span>
            </div>
          )}

          <h1 className={clsx(
            textStyles.display,
            variant === 'dark' ? 'text-white' : textStyles.primary,
            'mb-6'
          )}>
            {title}
          </h1>

          {subtitle && (
            <p className={clsx(
              textStyles.lead,
              variant === 'dark' ? 'text-gray-300' : textStyles.secondary,
              'mb-10 max-w-3xl'
            )}>
              {subtitle}
            </p>
          )}

          {children}
        </div>
      </div>
    </section>
  );
}

export default PageHeroDS;