/**
 * Typography tokens for RUDI Design System
 */

export const fontFamily = {
  sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  mono: ['Menlo', 'Monaco', 'Consolas', 'monospace'],
} as const;

export const fontSize = {
  // Display sizes
  display: {
    size: 'clamp(2.5rem, 5vw, 4.5rem)', // 40px → 72px
    lineHeight: '1.1',
    letterSpacing: '-0.02em',
    weight: '300',
  },
  displayMd: {
    size: 'clamp(2rem, 4vw, 3.5rem)', // 32px → 56px
    lineHeight: '1.15',
    letterSpacing: '-0.02em',
    weight: '300',
  },

  // Titles
  title: {
    size: 'clamp(1.875rem, 3vw, 3rem)', // 30px → 48px
    lineHeight: '1.2',
    letterSpacing: '-0.01em',
    weight: '300',
  },
  titleMd: {
    size: 'clamp(1.5rem, 2.5vw, 2.25rem)', // 24px → 36px
    lineHeight: '1.25',
    letterSpacing: '-0.01em',
    weight: '400',
  },
  titleSm: {
    size: 'clamp(1.25rem, 2vw, 1.875rem)', // 20px → 30px
    lineHeight: '1.3',
    letterSpacing: '-0.01em',
    weight: '500',
  },

  // Body text
  lead: {
    size: '1.25rem', // 20px
    lineHeight: '1.8',
    letterSpacing: '-0.01em',
    weight: '400',
  },
  large: {
    size: '1.125rem', // 18px
    lineHeight: '1.75',
    letterSpacing: '-0.01em',
    weight: '400',
  },
  body: {
    size: '1rem', // 16px
    lineHeight: '1.75',
    letterSpacing: '0',
    weight: '400',
  },
  small: {
    size: '0.875rem', // 14px
    lineHeight: '1.6',
    letterSpacing: '0',
    weight: '400',
  },
  xs: {
    size: '0.75rem', // 12px
    lineHeight: '1.5',
    letterSpacing: '0.01em',
    weight: '400',
  },
} as const;

export const fontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
} as const;

// Tailwind class mappings
export const typographyClasses = {
  // Display
  'text-display': `text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-tight`,
  'text-display-md': `text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-tight`,

  // Titles
  'text-title': `text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight`,
  'text-title-md': `text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight leading-snug`,
  'text-title-sm': `text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight leading-snug`,

  // Subtitles
  'text-subtitle': `text-xl sm:text-2xl font-normal leading-relaxed`,
  'text-subtitle-sm': `text-lg sm:text-xl font-normal leading-relaxed`,

  // Body
  'text-lead': `text-xl leading-relaxed`,
  'text-large': `text-lg leading-relaxed`,
  'text-body': `text-base leading-relaxed`,
  'text-small': `text-sm leading-normal`,
  'text-xs': `text-xs leading-normal`,

  // Special
  'text-caps': `text-xs font-semibold uppercase tracking-wider`,
  'text-label': `text-sm font-medium`,
  'text-hint': `text-sm text-secondary`,
} as const;