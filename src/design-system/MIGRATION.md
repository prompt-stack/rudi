# Component Migration Guide

## How to Refactor Components to Use the Design System

### 1. Primitive Components (`/primitives`)
These should ONLY use design tokens, never hardcoded values.

#### Before (BAD):
```tsx
// Button.tsx
<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
  Click me
</button>
```

#### After (GOOD):
```tsx
// Button.tsx
import { getButtonStyle } from '@/design-system';

<button className={getButtonStyle('primary', 'md')}>
  Click me
</button>
```

### 2. Composed Components (`/composed`)
These should use primitive components and design system utilities.

#### Before (BAD):
```tsx
// Card.tsx
<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
  <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
  <p className="text-gray-600">{content}</p>
</div>
```

#### After (GOOD):
```tsx
// Card.tsx
import { getCardStyle, textStyles } from '@/design-system';

<div className={getCardStyle(true, 'md')}>
  <h3 className={`${textStyles.subtitle} ${textStyles.primary}`}>{title}</h3>
  <p className={`${textStyles.body} ${textStyles.secondary}`}>{content}</p>
</div>
```

### 3. Feature Components (`/features`)
These should compose primitives and use semantic styles.

#### Before (BAD):
```tsx
// HeroSection.tsx
<section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <h1 className="text-5xl font-bold text-gray-900">Title</h1>
    <p className="text-xl text-gray-600 mt-4">Description</p>
    <button className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg">
      Get Started
    </button>
  </div>
</section>
```

#### After (GOOD):
```tsx
// HeroSection.tsx
import {
  getSectionStyle,
  getContainerStyle,
  textStyles,
  bgStyles,
  getButtonStyle,
  getStackStyle
} from '@/design-system';

<section className={`${getSectionStyle('lg')} ${bgStyles.surfaceLight}`}>
  <div className={getContainerStyle('wide')}>
    <div className={getStackStyle()}>
      <h1 className={`${textStyles.display} ${textStyles.primary}`}>
        Title
      </h1>
      <p className={`${textStyles.lead} ${textStyles.secondary}`}>
        Description
      </p>
      <button className={getButtonStyle('primary', 'lg')}>
        Get Started
      </button>
    </div>
  </div>
</section>
```

## Migration Checklist

### Step 1: Import Design System
```tsx
import {
  textStyles,
  bgStyles,
  borderStyles,
  getButtonStyle,
  getCardStyle,
  getSectionStyle,
  getContainerStyle,
  getGridStyle,
  getStackStyle
} from '@/design-system';
```

### Step 2: Replace Colors
- `text-gray-900` → `textStyles.primary`
- `text-gray-600` → `textStyles.secondary`
- `text-blue-800` → `textStyles.accent`
- `bg-white` → `bgStyles.surface`
- `bg-gray-50` → `bgStyles.surfaceLight`
- `border-gray-200` → `borderStyles.default`

### Step 3: Replace Typography
- `text-5xl font-bold` → `textStyles.display`
- `text-3xl font-semibold` → `textStyles.title`
- `text-xl` → `textStyles.subtitle` or `textStyles.lead`
- `text-lg` → `textStyles.large`
- `text-base` → `textStyles.body`
- `text-sm` → `textStyles.small`

### Step 4: Replace Layout
- `py-16 sm:py-20 lg:py-28` → `getSectionStyle()`
- `max-w-7xl mx-auto px-6` → `getContainerStyle('wide')`
- `max-w-4xl mx-auto` → `getContainerStyle('narrow')`
- `grid grid-cols-3 gap-8` → `getGridStyle('cards')`
- `space-y-4` → `getStackStyle()`

### Step 5: Replace Components
- Custom buttons → `getButtonStyle(variant, size)`
- Custom cards → `getCardStyle(hover, padding)`
- Custom badges → `getBadgeStyle(variant)`

## Common Patterns

### Hero Section
```tsx
<section className={`${getSectionStyle('lg')} ${bgStyles.surfaceLight}`}>
  <div className={getContainerStyle('wide')}>
    <h1 className={`${textStyles.display} ${textStyles.primary}`}>
      {title}
    </h1>
    <p className={`${textStyles.lead} ${textStyles.secondary}`}>
      {description}
    </p>
  </div>
</section>
```

### Feature Grid
```tsx
<div className={getGridStyle('cards')}>
  {features.map(feature => (
    <div className={getCardStyle()}>
      <h3 className={`${textStyles.subtitle} ${textStyles.primary}`}>
        {feature.title}
      </h3>
      <p className={`${textStyles.body} ${textStyles.secondary}`}>
        {feature.description}
      </p>
    </div>
  ))}
</div>
```

### CTA Section
```tsx
<section className={`${getSectionStyle()} ${bgStyles.primary} text-white`}>
  <div className={`${getContainerStyle('narrow')} text-center`}>
    <h2 className={`${textStyles.title} text-white`}>
      {ctaTitle}
    </h2>
    <button className={getButtonStyle('secondary', 'lg')}>
      {ctaButtonText}
    </button>
  </div>
</section>
```