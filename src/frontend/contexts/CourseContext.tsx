'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Course, Lesson, Component, CourseProgress } from '@/frontend/types/course'

/**
 * CourseContext - Global state management for course navigation and progress
 *
 * Manages current course, lesson, component state and user progress tracking.
 * Uses React Context + useReducer pattern for predictable state updates.
 *
 * @module CourseContext
 *
 * @example
 * // Wrap your app
 * <CourseProvider>
 *   <YourApp />
 * </CourseProvider>
 *
 * @example
 * // Access course state
 * const { currentCourse, courseProgress } = useCourse();
 *
 * @example
 * // Dispatch actions
 * const dispatch = useCourseDispatch();
 * dispatch({ type: 'SET_COURSE', payload: courseData });
 */

interface CourseState {
  currentCourse: Course | null
  currentLesson: Lesson | null
  currentComponent: Component | null
  courseProgress: CourseProgress | null
  courseStructure: any // For nested navigation
  isLoading: boolean
  error: string | null
}

type CourseAction =
  | { type: 'SET_COURSE'; payload: Course }
  | { type: 'SET_LESSON'; payload: Lesson }
  | { type: 'SET_COMPONENT'; payload: Component }
  | { type: 'SET_PROGRESS'; payload: CourseProgress }
  | { type: 'UPDATE_PROGRESS'; payload: Partial<CourseProgress> }
  | { type: 'SET_COURSE_STRUCTURE'; payload: any }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET' }

const initialState: CourseState = {
  currentCourse: null,
  currentLesson: null,
  currentComponent: null,
  courseProgress: null,
  courseStructure: null,
  isLoading: false,
  error: null
}

function courseReducer(state: CourseState, action: CourseAction): CourseState {
  switch (action.type) {
    case 'SET_COURSE':
      return { ...state, currentCourse: action.payload, error: null }
    
    case 'SET_LESSON':
      return { ...state, currentLesson: action.payload, error: null }
    
    case 'SET_COMPONENT':
      return { ...state, currentComponent: action.payload, error: null }
    
    case 'SET_PROGRESS':
      return { ...state, courseProgress: action.payload }
    
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        courseProgress: state.courseProgress 
          ? { ...state.courseProgress, ...action.payload }
          : null
      }
    
    case 'SET_COURSE_STRUCTURE':
      return { ...state, courseStructure: action.payload }
    
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

// Context
const CourseContext = createContext<CourseState | null>(null)
const CourseDispatchContext = createContext<React.Dispatch<CourseAction> | null>(null)

// Provider
export function CourseProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(courseReducer, initialState)

  return (
    <CourseContext.Provider value={state}>
      <CourseDispatchContext.Provider value={dispatch}>
        {children}
      </CourseDispatchContext.Provider>
    </CourseContext.Provider>
  )
}

// Hooks
export function useCourse() {
  const context = useContext(CourseContext)
  if (!context) {
    throw new Error('useCourse must be used within CourseProvider')
  }
  return context
}

export function useCourseDispatch() {
  const context = useContext(CourseDispatchContext)
  if (!context) {
    throw new Error('useCourseDispatch must be used within CourseProvider')
  }
  return context
}

// Helper hook for common actions
export function useCourseActions() {
  const dispatch = useCourseDispatch()

  return {
    setCourse: (course: Course) => 
      dispatch({ type: 'SET_COURSE', payload: course }),
    
    setLesson: (lesson: Lesson) => 
      dispatch({ type: 'SET_LESSON', payload: lesson }),
    
    setComponent: (component: Component) => 
      dispatch({ type: 'SET_COMPONENT', payload: component }),
    
    updateProgress: (progress: Partial<CourseProgress>) => 
      dispatch({ type: 'UPDATE_PROGRESS', payload: progress }),
    
    markLessonComplete: (lessonId: string) => {
      // TODO: Implementation would update backend and local state
      // lessonId to mark complete
    },
    
    markComponentComplete: (componentId: string) => {
      // TODO: Implementation would update backend and local state
      // componentId to mark complete
    },
    
    reset: () => dispatch({ type: 'RESET' })
  }
}