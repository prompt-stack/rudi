/**
 * @component PageHero
 * @layer composed
 * @dependencies None
 * @purpose Standardized hero section for all pages
 * @status stable
 */
'use client';

import { ReactNode } from 'react';

interface PageHeroProps {
  badge?: {
    icon: ReactNode;
    text: string;
  };
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}

export function PageHero({ 
  badge, 
  title, 
  subtitle, 
  children,
  className = '' 
}: PageHeroProps) {
  return (
    <section className={`relative section-padding bg-gradient-to-b from-gray-50/50 to-white ${className}`}>
      <div className="container-wide">
        <div className="max-w-4xl">
          {badge && (
            <div className="flex items-center gap-2 mb-6">
              {badge.icon}
              <span className="text-sm font-medium text-secondary">{badge.text}</span>
            </div>
          )}
          
          <h1 className="text-display font-light tracking-tight text-primary mb-6">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-lead mb-10 max-w-3xl">
              {subtitle}
            </p>
          )}
          
          {children}
        </div>
      </div>
    </section>
  );
}