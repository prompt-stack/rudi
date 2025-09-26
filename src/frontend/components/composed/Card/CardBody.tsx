/**
 * @component CardBody
 * @purpose Body section for Card component
 * @layer composed
 * @dependencies react, clsx
 */

import React from 'react';
import { clsx } from 'clsx';

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
}) => {
  return (
    <div className={clsx('p-6', className)}>
      {children}
    </div>
  );
};