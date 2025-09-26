/**
 * Course Type Definitions
 * Based on RUDI curriculum structure with Learnhouse patterns
 */

export interface Program {
  id: string
  slug: string
  name: string
  description?: string
  courses: Course[]
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  programId?: string
  slug: string
  title: string
  description?: string
  track?: 'core' | 'builder' | 'business' | 'professional'
  durationMinutes?: number
  level: DifficultyLevel
  tags: string[]
  isPublished: boolean
  isFeatured: boolean
  thumbnail?: CourseThumbnail
  learningObjectives?: LearningObjective[]
  lessons: Lesson[]
  enrollmentCount: number
  averageRating?: number
  progress?: CourseProgress
}

export interface Lesson {
  id: string
  courseId: string
  lessonNumber: string // e.g., "03.1"
  title: string
  description?: string
  durationMinutes?: number
  difficultyLevel?: DifficultyLevel
  components: Component[]
  isCompleted?: boolean
  progress?: LessonProgress
}

export interface Component {
  id: string
  lessonId: string
  type: ComponentType
  name: string
  orderIndex: number
  isRequired: boolean
  content?: any // Type varies by component type
  assets?: Asset[]
  videoDetail?: VideoDetail
  isCompleted?: boolean
}

export enum ComponentType {
  LEARNING_VIDEO = 'LEARNING_VIDEO',
  LEARNING_SLIDES = 'LEARNING_SLIDES',
  LAB_VIDEO = 'LAB_VIDEO',
  LAB_DATA = 'LAB_DATA',
  LAB_EXERCISE = 'LAB_EXERCISE',
  QUIZ = 'QUIZ',
  RESOURCE = 'RESOURCE',
  TRANSCRIPT = 'TRANSCRIPT',
  // RUDI-specific
  AI_PLAYGROUND = 'AI_PLAYGROUND',
  POLICY_BUILDER = 'POLICY_BUILDER',
  ETHICS_SCENARIO = 'ETHICS_SCENARIO',
  COMPLIANCE_CHECK = 'COMPLIANCE_CHECK'
}

export interface VideoDetail {
  id: string
  componentId: string
  provider: VideoProvider
  providerId: string
  thumbnailUrl?: string
  durationSeconds?: number
  startTime?: number
  endTime?: number
  chapters?: VideoChapter[]
  transcript?: string
  aiNotes?: string[] // RUDI-specific: AI-generated notes
  isPreview?: boolean
}

export enum VideoProvider {
  CLOUDFLARE = 'CLOUDFLARE',
  YOUTUBE = 'YOUTUBE',
  VIMEO = 'VIMEO',
  WISTIA = 'WISTIA'
}

export interface VideoChapter {
  id: string
  title: string
  startTime: number
  endTime: number
  description?: string
}

export interface Asset {
  id: string
  componentId?: string
  lessonId: string
  relativePath: string
  mimeType?: string
  sizeBytes: number
  url?: string
  role?: AssetRole
}

export enum AssetRole {
  INSTRUCTION = 'INSTRUCTION',
  STARTER = 'STARTER',
  SOLUTION = 'SOLUTION',
  DATA = 'DATA',
  RUBRIC = 'RUBRIC',
  CONFIG = 'CONFIG',
  OTHER = 'OTHER'
}

export enum DifficultyLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCED = 'ADVANCED',
  EXPERT = 'EXPERT'
}

export interface CourseThumbnail {
  type: 'image' | 'video'
  url: string
  alt?: string
}

export interface LearningObjective {
  id: string
  text: string
  icon?: string
  category?: 'knowledge' | 'skill' | 'competency'
}

// Progress Tracking
export interface CourseProgress {
  userId: string
  courseId: string
  completedLessons: number
  totalLessons: number
  progressPercent: number
  lastAccessedAt: Date
  certificateId?: string
}

export interface LessonProgress {
  userId: string
  lessonId: string
  completedComponents: string[]
  totalComponents: number
  timeSpentMinutes: number
  lastAccessedAt: Date
}

// Enrollment
export interface Enrollment {
  id: string
  userId: string
  courseId: string
  status: EnrollmentStatus
  enrolledAt: Date
  completedAt?: Date
  expiresAt?: Date
  progress: CourseProgress
}

export enum EnrollmentStatus {
  ACTIVE = 'ACTIVE',
  PAUSED = 'PAUSED',
  COMPLETED = 'COMPLETED',
  DROPPED = 'DROPPED'
}