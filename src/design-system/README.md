# RUDI Design System

## Overview
A consistent, scalable design system for the RUDI AI training platform.

## Architecture

```
design-system/
├── tokens/              # Design tokens (single source of truth)
│   ├── colors.ts       # Color palette & semantic colors
│   ├── typography.ts   # Font sizes, weights, line heights
│   ├── spacing.ts      # Spacing scale
│   └── index.ts        # Export all tokens
│
├── primitives/         # Basic building blocks
│   ├── Text.tsx       # Typography component
│   ├── Button.tsx     # Button variations
│   ├── Card.tsx       # Card container
│   └── Icon.tsx       # Icon wrapper
│
├── composed/          # Combinations of primitives
│   ├── PageSection.tsx
│   ├── FeatureCard.tsx
│   └── NavItem.tsx
│
└── patterns/          # Page-level patterns
    ├── HeroSection.tsx
    ├── CTASection.tsx
    └── GridLayout.tsx
```

## Design Principles

1. **Semantic, not descriptive**: Use `text-primary` not `text-gray-900`
2. **Consistent tokens**: All colors, spacing, typography from tokens
3. **Composable**: Build up from primitives
4. **Accessible**: WCAG 2.1 AA compliant
5. **Responsive**: Mobile-first design

## Color System

### Semantic Colors
- `primary`: Main text, headings (gray-900)
- `secondary`: Supporting text (gray-600)
- `tertiary`: Subtle text (gray-500)
- `accent`: Interactive elements (blue-600)
- `success`: Positive states (green-600)
- `warning`: Caution states (amber-600)
- `error`: Error states (red-500)

### Background Colors
- `bg-surface`: White backgrounds
- `bg-surface-light`: Subtle gray (gray-50)
- `bg-surface-dark`: Dark sections (gray-900)

## Typography Scale

### Display (Headlines)
- `text-display`: Hero headlines
- `text-title`: Section titles
- `text-subtitle`: Section subtitles

### Body
- `text-lead`: Intro paragraphs
- `text-large`: Emphasized body
- `text-body`: Default body
- `text-small`: Supporting text

## Spacing System

Based on 4px grid:
- `space-xs`: 4px
- `space-sm`: 8px
- `space-md`: 16px
- `space-lg`: 24px
- `space-xl`: 32px
- `space-2xl`: 48px
- `space-3xl`: 64px

## Component Guidelines

### Primitives
```tsx
// ❌ Don't hardcode colors
<p className="text-gray-900">

// ✅ Use semantic classes
<p className="text-primary">
```

### Sections
```tsx
// ❌ Don't repeat layout code
<section className="py-16 sm:py-20 lg:py-28">

// ✅ Use consistent utilities
<section className="section-padding">
```

### Containers
```tsx
// ❌ Don't create custom widths
<div className="max-w-[1400px] mx-auto px-5">

// ✅ Use predefined containers
<div className="container-wide">
```

## Usage Examples

### Page Structure
```tsx
<main>
  <section className="section-padding bg-surface-light">
    <div className="container-wide">
      <h1 className="text-display text-primary">
        Hero Title
      </h1>
      <p className="text-lead text-secondary">
        Supporting description
      </p>
    </div>
  </section>
</main>
```

### Card Component
```tsx
<div className="card-sleek">
  <h3 className="text-title text-primary">
    Card Title
  </h3>
  <p className="text-body text-secondary">
    Card content
  </p>
  <button className="btn-primary">
    Action
  </button>
</div>
```

## Migration Guide

To update existing components:

1. Replace hardcoded colors with semantic tokens
2. Use typography classes instead of custom sizes
3. Apply consistent spacing utilities
4. Wrap in proper container classes
5. Test responsiveness at all breakpoints