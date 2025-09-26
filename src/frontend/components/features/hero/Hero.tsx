/**
 * @component Hero
 * @purpose Homepage hero section with value proposition
 * @layer features
 * @dependencies react, primitives, composed
 */
'use client';

import React from 'react';
import { Button, Text } from '@/frontend/components/primitives';

export interface HeroProps {
  title: string;
  subtitle: string;
  ctaPrimary?: {
    text: string;
    href: string;
  };
  ctaSecondary?: {
    text: string;
    href: string;
  };
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}) => {
  return (
    <section className="rudi-section bg-gradient-to-b from-primary-50 to-white">
      <div className="rudi-container">
        <div className="max-w-4xl mx-auto text-center">
          <Text variant="h1" weight="bold" className="mb-6">
            {title}
          </Text>
          <Text variant="h5" color="muted" className="mb-8">
            {subtitle}
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {ctaPrimary && (
              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.href = ctaPrimary.href}
              >
                {ctaPrimary.text}
              </Button>
            )}
            {ctaSecondary && (
              <Button
                variant="secondary"
                size="lg"
                onClick={() => window.location.href = ctaSecondary.href}
              >
                {ctaSecondary.text}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
