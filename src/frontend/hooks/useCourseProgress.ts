import { useState, useEffect } from 'react'
import { Course, Lesson, Component, CourseProgress } from '@/frontend/types/course'

export function useCourseProgress(courseId: string) {
  const [progress, setProgress] = useState<CourseProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!courseId) return

    const fetchProgress = async () => {
      setIsLoading(true)
      try {
        // This would fetch from your API
        const response = await fetch(`/api/courses/${courseId}/progress`)
        if (!response.ok) throw new Error('Failed to fetch progress')
        
        const data = await response.json()
        setProgress(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load progress')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgress()
  }, [courseId])

  const updateProgress = async (updates: Partial<CourseProgress>) => {
    if (!progress) return

    try {
      const updatedProgress = { ...progress, ...updates }
      setProgress(updatedProgress)
      
      // Persist to backend
      await fetch(`/api/courses/${courseId}/progress`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
    } catch (err) {
      console.error('Failed to update progress:', err)
    }
  }

  const markLessonComplete = async (lessonId: string) => {
    if (!progress) return

    const completedLessons = progress.completedLessons + 1
    const progressPercent = Math.round((completedLessons / progress.totalLessons) * 100)
    
    await updateProgress({
      completedLessons,
      progressPercent,
      lastAccessedAt: new Date()
    })
  }

  const getNextLesson = (currentLessonId: string, lessons: Lesson[]): Lesson | null => {
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId)
    if (currentIndex === -1 || currentIndex === lessons.length - 1) return null
    return lessons[currentIndex + 1]
  }

  const getPreviousLesson = (currentLessonId: string, lessons: Lesson[]): Lesson | null => {
    const currentIndex = lessons.findIndex(l => l.id === currentLessonId)
    if (currentIndex <= 0) return null
    return lessons[currentIndex - 1]
  }

  return {
    progress,
    isLoading,
    error,
    updateProgress,
    markLessonComplete,
    getNextLesson,
    getPreviousLesson
  }
}