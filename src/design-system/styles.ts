/**
 * Style utilities and component classes
 * These compose our design tokens into reusable patterns
 */

import { cn } from '@/frontend/lib/utils';

// Text styles using semantic tokens
export const textStyles = {
  // Semantic text colors
  primary: 'text-gray-900',
  secondary: 'text-gray-600',
  tertiary: 'text-gray-500',
  accent: 'text-navy-800',  // Navy blue
  success: 'text-green-600',
  warning: 'text-amber-600',
  error: 'text-red-500',
  inverse: 'text-white',

  // Typography sizes
  display: 'text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight',
  title: 'text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight',
  subtitle: 'text-xl sm:text-2xl font-normal leading-relaxed',
  lead: 'text-xl leading-relaxed',
  large: 'text-lg leading-relaxed',
  body: 'text-base leading-relaxed',
  small: 'text-sm leading-normal',
  xs: 'text-xs leading-normal',
  caps: 'text-xs font-semibold uppercase tracking-wider',
} as const;

// Background styles
export const bgStyles = {
  surface: 'bg-white',
  surfaceLight: 'bg-gray-50/50',
  surfaceDark: 'bg-gray-900',
  primary: 'bg-navy-800',  // Navy blue
  primaryLight: 'bg-navy-50',
  accent: 'bg-amber-500',
  accentLight: 'bg-amber-50',
  success: 'bg-green-50',
  error: 'bg-red-50',
} as const;

// Border styles
export const borderStyles = {
  subtle: 'border-gray-100',
  default: 'border-gray-200',
  strong: 'border-gray-300',
  primary: 'border-navy-800',  // Navy blue
  accent: 'border-amber-500',
  success: 'border-green-600',
  error: 'border-red-500',
} as const;

// Component styles
export const componentStyles = {
  // Buttons
  button: {
    base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
    primary: 'bg-navy-800 text-white hover:bg-navy-900 focus:ring-navy-700',  // Navy blue
    secondary: 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300',
    accent: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500',
    ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-50',
    sizes: {
      sm: 'px-3 py-1.5 text-sm rounded-lg',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-6 py-3 rounded-xl',
      xl: 'px-8 py-4 text-lg rounded-xl',
    },
  },

  // Cards
  card: {
    base: 'bg-white rounded-2xl border border-gray-100 transition-all duration-200',
    hover: 'hover:shadow-lg hover:-translate-y-0.5',
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },

  // Badges
  badge: {
    base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
    default: 'bg-gray-100 text-gray-700',
    primary: 'bg-navy-100 text-navy-800',  // Navy blue text
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
  },

  // Icons
  icon: {
    xs: 'w-4 h-4',
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  },
} as const;

// Layout styles
export const layoutStyles = {
  // Sections
  section: {
    base: 'relative',
    padding: 'py-16 sm:py-20 lg:py-28',
    paddingSm: 'py-12 sm:py-16 lg:py-20',
    paddingLg: 'py-20 sm:py-28 lg:py-36',
  },

  // Containers
  container: {
    narrow: 'mx-auto max-w-4xl px-5 sm:px-8',
    wide: 'mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12',
    full: 'mx-auto px-5 sm:px-8 lg:px-12',
  },

  // Grids
  grid: {
    auto: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8',
    cards: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
    features: 'grid md:grid-cols-2 lg:grid-cols-4 gap-8',
    two: 'grid md:grid-cols-2 gap-8',
  },

  // Stacks
  stack: {
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-8',
    xl: 'space-y-12',
  },
} as const;

// Helper functions to compose styles
export const getTextStyle = (style: keyof typeof textStyles) => textStyles[style];
export const getBgStyle = (style: keyof typeof bgStyles) => bgStyles[style];
export const getBorderStyle = (style: keyof typeof borderStyles) => borderStyles[style];

// Component style helpers
export const getButtonStyle = (
  variant: keyof typeof componentStyles.button = 'primary',
  size: keyof typeof componentStyles.button.sizes = 'md'
) => {
  if (variant === 'base' || variant === 'sizes') return '';
  return cn(
    componentStyles.button.base,
    componentStyles.button[variant],
    componentStyles.button.sizes[size]
  );
};

export const getCardStyle = (
  hover: boolean = true,
  padding: keyof typeof componentStyles.card.padding = 'md'
) => {
  return cn(
    componentStyles.card.base,
    hover && componentStyles.card.hover,
    componentStyles.card.padding[padding]
  );
};

export const getBadgeStyle = (variant: keyof typeof componentStyles.badge = 'default') => {
  if (variant === 'base') return '';
  return cn(componentStyles.badge.base, componentStyles.badge[variant]);
};

export const getIconStyle = (size: keyof typeof componentStyles.icon = 'md') => {
  return componentStyles.icon[size];
};

// Layout style helpers
export const getSectionStyle = (padding: 'sm' | 'md' | 'lg' = 'md') => {
  const paddingMap = {
    sm: layoutStyles.section.paddingSm,
    md: layoutStyles.section.padding,
    lg: layoutStyles.section.paddingLg,
  };
  return cn(layoutStyles.section.base, paddingMap[padding]);
};

export const getContainerStyle = (width: keyof typeof layoutStyles.container = 'wide') => {
  return layoutStyles.container[width];
};

export const getGridStyle = (type: keyof typeof layoutStyles.grid = 'auto') => {
  return layoutStyles.grid[type];
};

export const getStackStyle = (size: keyof typeof layoutStyles.stack = 'md') => {
  return layoutStyles.stack[size];
};