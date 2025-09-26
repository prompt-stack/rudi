# RUDI LMS Frontend Architecture

## Overview
This frontend structure is inspired by best practices from Learnhouse LMS and optimized for the RUDI Applied GenAI Program.

## Directory Structure

```
frontend/
├── components/
│   ├── primitives/   # Lowest-level atoms (plus shadcn/ui in primitives/ui)
│   ├── composed/     # Reusable molecules built from primitives
│   ├── features/     # Domain experiences composed of primitives/composed
│   └── layouts/      # Page/application layout shells
├── contexts/        # React Context providers
├── hooks/          # Custom React hooks
├── types/          # TypeScript type definitions
├── lib/            # Utility functions and helpers
└── styles/         # Global styles and theme
```

## Component Categories

### Primitives (`components/primitives`)
Base atoms that never depend on higher layers. Includes house-made primitives (e.g. `button/Button.tsx`, `text/Text.tsx`) and the shadcn/ui port in `primitives/ui/*` (Button, Card, Badge, Progress, etc.).

### Composed (`components/composed`)
Molecules assembled from primitives. Examples:
- `Card/*` – card shell above shadcn buttons.
- `media/CloudflarePlayer.tsx` & `CloudflareVideoPlayer.tsx` – iframe wrappers.
- `PageHero.tsx` – shared marketing hero block.

### Features (`components/features`)
Domain experiences stitched together from primitives/composed pieces. Current slices:
- `assessment/` – `RUDIAssessment` flow.
- `media/` – `VideoPlayer` with access logic.
- `activities/` – in-lesson video activity UX.
- `courses/` – `CourseCard` grid helpers.
- `ai-tools/` – `PolicyBuilder` authoring tool.
- `hero/` – landing hero variants.

### Layouts (`components/layouts`)
Headers, nav shells, and dashboard scaffolding (`Header`, `DashboardLayout`).

## Context Providers

### CourseContext
Manages course state and navigation:
```typescript
- currentCourse
- currentLesson
- courseProgress
- updateProgress()
```

### ProgressContext
Tracks overall learning progress:
```typescript
- completedLessons
- certificates
- competencies
- achievements
```

### OrganizationContext
Multi-tenancy support:
```typescript
- currentOrg
- userRole
- permissions
- branding
```

### AIContext
AI-specific state management:
```typescript
- aiTools
- promptHistory
- policyDocuments
- complianceStatus
```

## Design Principles

1. **Component-First**: Every UI element is a component
2. **Type-Safe**: Full TypeScript coverage
3. **Accessible**: WCAG 2.1 AA compliance
4. **Mobile-First**: Responsive by default
5. **Performance**: Code splitting and lazy loading
6. **Testable**: Component isolation for testing

## Key Features

### Multi-Tenancy Support
- Organization-specific routing
- Custom branding per org
- Role-based access control

### Progress Tracking
- Activity-level completion
- Course progress visualization
- Certification pathways
- Competency mapping

### AI Literacy Focus
- Interactive AI tools
- Policy templates
- Compliance tracking
- Industry-specific modules

## Development Guidelines

### Component Creation
1. Create component in appropriate category
2. Add TypeScript types
3. Include Storybook story
4. Write unit tests
5. Document props and usage

### State Management
- Use Context for global state
- Local state for component-specific data
- SWR for data fetching
- Zustand for complex state (optional)

### Styling
- Tailwind CSS for utility classes
- CSS Modules for component styles
- Theme variables in CSS custom properties
- Dark mode support built-in

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run Storybook
npm run storybook

# Run tests
npm test
```

## Technology Stack
- React 19
- Next.js 15
- TypeScript 5
- Tailwind CSS
- shadcn/ui
- SWR
- React Hook Form
- Zod validation
