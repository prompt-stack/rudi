/**
 * Color tokens for RUDI Design System
 * All colors should reference these tokens
 */

export const colors = {
  // Base palette
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },

  amber: {
    50: '#fffbeb',
    100: '#fef3c7',
    200: '#fde68a',
    300: '#fcd34d',
    400: '#fbbf24',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309',
    800: '#92400e',
    900: '#78350f',
  },

  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },

  gray: {
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
  },

  white: '#ffffff',
  black: '#000000',
  transparent: 'transparent',
} as const;

// Semantic color tokens
export const semantic = {
  // Text colors
  text: {
    primary: colors.gray[900],
    secondary: colors.gray[600],
    tertiary: colors.gray[500],
    accent: colors.blue[800],  // Changed to navy blue
    success: colors.green[600],
    warning: colors.amber[600],
    error: colors.red[500],
    inverse: colors.white,
  },

  // Background colors
  background: {
    surface: colors.white,
    surfaceLight: `${colors.gray[50]}80`, // with opacity
    surfaceDark: colors.gray[900],
    primary: colors.blue[800],  // Changed to navy blue
    primaryLight: colors.blue[50],
    accent: colors.amber[500],
    accentLight: colors.amber[50],
    success: colors.green[50],
    error: colors.red[50],
  },

  // Border colors
  border: {
    subtle: colors.gray[100],
    default: colors.gray[200],
    strong: colors.gray[300],
    primary: colors.blue[800],  // Changed to navy blue
    accent: colors.amber[500],
    success: colors.green[600],
    error: colors.red[500],
  },

  // Interactive states
  interactive: {
    primary: {
      default: colors.blue[800],  // Navy blue as primary
      hover: colors.blue[900],    // Darker navy on hover
      active: colors.blue[700],   // Slightly lighter when active
      disabled: colors.gray[300],
    },
    secondary: {
      default: colors.gray[100],
      hover: colors.gray[200],
      active: colors.gray[300],
      disabled: colors.gray[50],
    },
    accent: {
      default: colors.amber[500],
      hover: colors.amber[600],
      active: colors.amber[700],
      disabled: colors.amber[200],
    },
  },
} as const;

// CSS variable mapping (for use in Tailwind)
export const cssVariables = {
  '--color-primary': semantic.text.accent,
  '--color-primary-hover': semantic.interactive.primary.hover,
  '--color-secondary': semantic.text.secondary,
  '--color-accent': semantic.interactive.accent.default,
  '--color-success': semantic.text.success,
  '--color-error': semantic.text.error,
  '--bg-surface': semantic.background.surface,
  '--bg-surface-light': semantic.background.surfaceLight,
  '--border-default': semantic.border.default,
} as const;