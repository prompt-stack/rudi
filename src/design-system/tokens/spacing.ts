/**
 * Spacing tokens for RUDI Design System
 * Based on 4px grid system
 */

export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
} as const;

// Semantic spacing tokens
export const semanticSpacing = {
  // Component spacing
  component: {
    xs: spacing[1],    // 4px
    sm: spacing[2],    // 8px
    md: spacing[4],    // 16px
    lg: spacing[6],    // 24px
    xl: spacing[8],    // 32px
    '2xl': spacing[12], // 48px
  },

  // Section spacing
  section: {
    sm: spacing[16],   // 64px
    md: spacing[20],   // 80px
    lg: spacing[28],   // 112px
    xl: spacing[32],   // 128px
  },

  // Container padding
  container: {
    sm: spacing[5],    // 20px
    md: spacing[8],    // 32px
    lg: spacing[12],   // 48px
  },

  // Grid gaps
  grid: {
    xs: spacing[2],    // 8px
    sm: spacing[4],    // 16px
    md: spacing[6],    // 24px
    lg: spacing[8],    // 32px
    xl: spacing[12],   // 48px
  },
} as const;

// Layout utilities
export const layout = {
  // Max widths
  maxWidth: {
    xs: '20rem',       // 320px
    sm: '24rem',       // 384px
    md: '28rem',       // 448px
    lg: '32rem',       // 512px
    xl: '36rem',       // 576px
    '2xl': '42rem',    // 672px
    '3xl': '48rem',    // 768px
    '4xl': '56rem',    // 896px
    '5xl': '64rem',    // 1024px
    '6xl': '72rem',    // 1152px
    '7xl': '80rem',    // 1280px
    wide: '87.5rem',   // 1400px
    full: '100%',
  },

  // Breakpoints
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

// Tailwind class mappings
export const spacingClasses = {
  // Section padding
  'section-padding': 'py-16 sm:py-20 lg:py-28',
  'section-padding-sm': 'py-12 sm:py-16 lg:py-20',
  'section-padding-lg': 'py-20 sm:py-28 lg:py-36',

  // Container widths
  'container-narrow': 'mx-auto max-w-4xl px-5 sm:px-8',
  'container-wide': 'mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12',
  'container-full': 'mx-auto px-5 sm:px-8 lg:px-12',

  // Content spacing
  'content-spacing': 'space-y-8',
  'content-spacing-sm': 'space-y-4',
  'content-spacing-lg': 'space-y-12',

  // List spacing
  'list-spaced': 'space-y-3',
  'list-compact': 'space-y-2',

  // Grid layouts
  'grid-cols-auto': 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8',
  'grid-cols-cards': 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  'grid-cols-features': 'grid md:grid-cols-2 lg:grid-cols-4 gap-8',
} as const;