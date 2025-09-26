'use client'

import React from 'react'
import Link from 'next/link'
import { Course, DifficultyLevel } from '@/frontend/types/course'
import { Clock, Users, Award, PlayCircle, BookOpen } from 'lucide-react'

interface CourseCardProps {
  course: Course
  href?: string
  showProgress?: boolean
}

export default function CourseCard({ course, href, showProgress = false }: CourseCardProps) {
  const difficultyColor = {
    [DifficultyLevel.BEGINNER]: 'bg-green-100 text-green-600',
    [DifficultyLevel.INTERMEDIATE]: 'bg-amber-100 text-amber-600',
    [DifficultyLevel.ADVANCED]: 'bg-amber-100 text-amber-700',
    [DifficultyLevel.EXPERT]: 'bg-red-100 text-red-800'
  }

  const trackIcon = {
    core: '🎯',
    builder: '🔨',
    business: '💼',
    professional: '🎓'
  }

  const CardContent = () => (
    <div className="group relative overflow-hidden rounded-xl border bg-card transition-all hover:shadow-lg">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {course.thumbnail ? (
          course.thumbnail.type === 'image' ? (
            <img 
              src={course.thumbnail.url} 
              alt={course.thumbnail.alt || course.title}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <video 
              src={course.thumbnail.url}
              muted
              loop
              className="h-full w-full object-cover"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            />
          )
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        
        {/* Track Badge */}
        {course.track && (
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-medium backdrop-blur">
              <span>{trackIcon[course.track]}</span>
              <span className="capitalize">{course.track}</span>
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {course.isFeatured && (
          <div className="absolute right-3 top-3">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/90 px-2 py-1 text-xs font-medium text-white backdrop-blur">
              <Award className="h-3 w-3" />
              Featured
            </span>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <PlayCircle className="h-16 w-16 text-white drop-shadow-lg" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold">
          {course.title}
        </h3>

        {/* Description */}
        {course.description && (
          <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
            {course.description}
          </p>
        )}

        {/* Tags */}
        {course.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-md bg-muted px-2 py-1 text-xs"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="inline-block px-2 py-1 text-xs text-muted-foreground">
                +{course.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {/* Difficulty */}
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${difficultyColor[course.level]}`}>
            {course.level}
          </span>

          {/* Duration */}
          {course.durationMinutes && (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {Math.floor(course.durationMinutes / 60)}h {course.durationMinutes % 60}m
            </span>
          )}

          {/* Lessons */}
          <span className="inline-flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {course.lessons.length} lessons
          </span>

          {/* Enrollments */}
          {course.enrollmentCount > 0 && (
            <span className="inline-flex items-center gap-1">
              <Users className="h-3 w-3" />
              {course.enrollmentCount.toLocaleString()}
            </span>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && course.progress && (
          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{course.progress.progressPercent}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-primary transition-all"
                style={{ width: `${course.progress.progressPercent}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {course.progress.completedLessons} of {course.progress.totalLessons} lessons completed
            </p>
          </div>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        <CardContent />
      </Link>
    )
  }

  return <CardContent />
}

// Grid wrapper component
export function CourseGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {children}
    </div>
  )
}