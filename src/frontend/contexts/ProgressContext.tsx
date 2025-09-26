'use client'

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { Course, Lesson, Component, DifficultyLevel } from '@/frontend/types/course'

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt?: Date
  progress: number
  maxProgress: number
  category: 'course' | 'streak' | 'mastery' | 'special'
}

export interface Certificate {
  id: string
  courseId: string
  courseName: string
  issuedAt: Date
  certificateUrl?: string
  verificationCode: string
}

export interface Competency {
  id: string
  name: string
  category: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  progress: number
  subCompetencies?: SubCompetency[]
}

export interface SubCompetency {
  id: string
  name: string
  completed: boolean
  completedAt?: Date
}

export interface LearningStreak {
  currentStreak: number
  longestStreak: number
  lastActivityDate: Date
  todayCompleted: boolean
}

export interface ProgressStats {
  totalCoursesEnrolled: number
  totalCoursesCompleted: number
  totalLessonsCompleted: number
  totalMinutesLearned: number
  averageQuizScore: number
  completionRate: number
}

interface ProgressState {
  achievements: Achievement[]
  certificates: Certificate[]
  competencies: Competency[]
  learningStreak: LearningStreak
  stats: ProgressStats
  recentActivity: ActivityItem[]
  isLoading: boolean
  error: string | null
}

export interface ActivityItem {
  id: string
  type: 'lesson_completed' | 'quiz_passed' | 'achievement_unlocked' | 'certificate_earned'
  title: string
  description?: string
  timestamp: Date
  metadata?: Record<string, any>
}

type ProgressAction =
  | { type: 'SET_ACHIEVEMENTS'; payload: Achievement[] }
  | { type: 'ADD_ACHIEVEMENT'; payload: Achievement }
  | { type: 'SET_CERTIFICATES'; payload: Certificate[] }
  | { type: 'ADD_CERTIFICATE'; payload: Certificate }
  | { type: 'SET_COMPETENCIES'; payload: Competency[] }
  | { type: 'UPDATE_COMPETENCY'; payload: { id: string; progress: number } }
  | { type: 'SET_STREAK'; payload: LearningStreak }
  | { type: 'UPDATE_STATS'; payload: Partial<ProgressStats> }
  | { type: 'ADD_ACTIVITY'; payload: ActivityItem }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' }

const initialState: ProgressState = {
  achievements: [],
  certificates: [],
  competencies: [],
  learningStreak: {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: new Date(),
    todayCompleted: false
  },
  stats: {
    totalCoursesEnrolled: 0,
    totalCoursesCompleted: 0,
    totalLessonsCompleted: 0,
    totalMinutesLearned: 0,
    averageQuizScore: 0,
    completionRate: 0
  },
  recentActivity: [],
  isLoading: false,
  error: null
}

function progressReducer(state: ProgressState, action: ProgressAction): ProgressState {
  switch (action.type) {
    case 'SET_ACHIEVEMENTS':
      return { ...state, achievements: action.payload }
    
    case 'ADD_ACHIEVEMENT':
      return { 
        ...state, 
        achievements: [...state.achievements, action.payload],
        recentActivity: [
          {
            id: `achievement-${Date.now()}`,
            type: 'achievement_unlocked',
            title: `Achievement Unlocked: ${action.payload.name}`,
            description: action.payload.description,
            timestamp: new Date(),
            metadata: { achievementId: action.payload.id }
          },
          ...state.recentActivity.slice(0, 9)
        ]
      }
    
    case 'SET_CERTIFICATES':
      return { ...state, certificates: action.payload }
    
    case 'ADD_CERTIFICATE':
      return { 
        ...state, 
        certificates: [...state.certificates, action.payload],
        recentActivity: [
          {
            id: `cert-${Date.now()}`,
            type: 'certificate_earned',
            title: `Certificate Earned: ${action.payload.courseName}`,
            timestamp: new Date(),
            metadata: { certificateId: action.payload.id }
          },
          ...state.recentActivity.slice(0, 9)
        ]
      }
    
    case 'SET_COMPETENCIES':
      return { ...state, competencies: action.payload }
    
    case 'UPDATE_COMPETENCY':
      return {
        ...state,
        competencies: state.competencies.map(comp =>
          comp.id === action.payload.id
            ? { ...comp, progress: action.payload.progress }
            : comp
        )
      }
    
    case 'SET_STREAK':
      return { ...state, learningStreak: action.payload }
    
    case 'UPDATE_STATS':
      return {
        ...state,
        stats: { ...state.stats, ...action.payload }
      }
    
    case 'ADD_ACTIVITY':
      return {
        ...state,
        recentActivity: [action.payload, ...state.recentActivity.slice(0, 19)]
      }
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false }
    
    case 'RESET':
      return initialState
    
    default:
      return state
  }
}

const ProgressContext = createContext<ProgressState | null>(null)
const ProgressDispatchContext = createContext<React.Dispatch<ProgressAction> | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(progressReducer, initialState)

  useEffect(() => {
    // Load progress data from API
    loadProgressData()
  }, [])

  const loadProgressData = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    try {
      // This would fetch from your API
      // const progressData = await fetchUserProgress()
      // dispatch({ type: 'SET_ACHIEVEMENTS', payload: progressData.achievements })
      // etc.
      
      dispatch({ type: 'SET_LOADING', payload: false })
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load progress'
      })
    }
  }

  return (
    <ProgressContext.Provider value={state}>
      <ProgressDispatchContext.Provider value={dispatch}>
        {children}
      </ProgressDispatchContext.Provider>
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}

export function useProgressDispatch() {
  const context = useContext(ProgressDispatchContext)
  if (!context) {
    throw new Error('useProgressDispatch must be used within ProgressProvider')
  }
  return context
}

// Helper hooks and functions
export function useProgressActions() {
  const dispatch = useProgressDispatch()

  return {
    recordLessonCompletion: (lesson: Lesson, timeSpent: number) => {
      dispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: `lesson-${Date.now()}`,
          type: 'lesson_completed',
          title: `Completed: ${lesson.title}`,
          timestamp: new Date(),
          metadata: { lessonId: lesson.id, timeSpent }
        }
      })
      
      dispatch({
        type: 'UPDATE_STATS',
        payload: {
          totalLessonsCompleted: 1, // This would be incremented
          totalMinutesLearned: timeSpent
        }
      })
    },

    recordQuizCompletion: (quizId: string, score: number, title: string) => {
      dispatch({
        type: 'ADD_ACTIVITY',
        payload: {
          id: `quiz-${Date.now()}`,
          type: 'quiz_passed',
          title: `Quiz Passed: ${title}`,
          description: `Score: ${score}%`,
          timestamp: new Date(),
          metadata: { quizId, score }
        }
      })
    },

    checkAndUnlockAchievements: (trigger: string, value?: any) => {
      // Logic to check if achievements should be unlocked
      // This would typically check against achievement criteria
    },

    updateStreak: () => {
      // Update learning streak based on daily activity
    }
  }
}

export function useLearningStreak() {
  const { learningStreak } = useProgress()
  return learningStreak
}

export function useAchievements() {
  const { achievements } = useProgress()
  return achievements
}

export function useCertificates() {
  const { certificates } = useProgress()
  return certificates
}