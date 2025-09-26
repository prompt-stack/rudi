// Context Providers
export { CourseProvider, useCourse, useCourseDispatch, useCourseActions } from './contexts/CourseContext'
export { OrganizationProvider, useOrganization, usePermissions, useCurrentUser, useOrgSettings } from './contexts/OrganizationContext'
export { ProgressProvider, useProgress, useProgressDispatch, useProgressActions, useLearningStreak, useAchievements, useCertificates } from './contexts/ProgressContext'
export { AIProvider, useAI, useAITools, usePrompts, usePolicies, useCompliance } from './contexts/AIContext'

// Components - Primitives and UI
export { Button, Text, ui as PrimitiveUI } from './components/primitives'

// Components - Composed
export { PageHero, CloudflarePlayer, CloudflareVideoPlayer } from './components/composed'

// Components - Features
export {
  VideoActivity,
  PolicyBuilder,
  CourseCard,
  CourseGrid,
  FrameworkMatrix,
  Hero,
  VideoPlayer,
  AssessmentIntro,
  AssessmentSurvey,
} from './components/features'

// Components - Layouts
export { DashboardLayout, Header } from './components/layouts'

// Types
export * from './types/course'

// Utils
export * from './lib/utils'
