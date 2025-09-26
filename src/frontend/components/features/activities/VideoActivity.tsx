'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Component, VideoDetail, VideoProvider } from '@/frontend/types/course'
import { 
  Play, Pause, Volume2, VolumeX, Maximize, 
  SkipBack, SkipForward, Settings, FileText,
  ChevronRight, Clock, BookOpen
} from 'lucide-react'
import { useCourseActions } from '@/frontend/contexts/CourseContext'

interface VideoActivityProps {
  component: Component
  videoDetail: VideoDetail
  onComplete?: () => void
  showTranscript?: boolean
  showChapters?: boolean
}

export default function VideoActivity({
  component,
  videoDetail,
  onComplete,
  showTranscript = true,
  showChapters = true
}: VideoActivityProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [activeTab, setActiveTab] = useState<'chapters' | 'transcript' | 'notes'>('chapters')
  const [watchedPercent, setWatchedPercent] = useState(0)
  
  const { markComponentComplete } = useCourseActions()

  // Video URLs based on provider
  const getVideoUrl = () => {
    switch (videoDetail.provider) {
      case VideoProvider.CLOUDFLARE:
        return `https://customer-${process.env.NEXT_PUBLIC_CLOUDFLARE_CUSTOMER_ID}.cloudflarestream.com/${videoDetail.providerId}/manifest/video.m3u8`
      case VideoProvider.YOUTUBE:
        return `https://www.youtube.com/embed/${videoDetail.providerId}`
      case VideoProvider.VIMEO:
        return `https://player.vimeo.com/video/${videoDetail.providerId}`
      default:
        return ''
    }
  }

  // Format time display
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle play/pause
  const togglePlay = () => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  // Handle progress update
  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    
    const current = videoRef.current.currentTime
    setCurrentTime(current)
    
    // Track watch percentage for completion
    const percent = (current / duration) * 100
    if (percent > watchedPercent) {
      setWatchedPercent(percent)
      
      // Mark complete at 90% watched
      if (percent >= 90 && onComplete) {
        markComponentComplete(component.id)
        onComplete()
      }
    }
  }

  // Jump to chapter
  const jumpToChapter = (startTime: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = startTime
    setCurrentTime(startTime)
  }

  // Render based on provider
  if (videoDetail.provider === VideoProvider.YOUTUBE) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
        <iframe
          src={getVideoUrl()}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Video Player */}
      <div 
        className="group relative aspect-video w-full overflow-hidden rounded-lg bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          src={getVideoUrl()}
          className="h-full w-full"
          poster={videoDetail.thumbnailUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={(e) => {
            setDuration(e.currentTarget.duration)
            if (videoDetail.startTime) {
              e.currentTarget.currentTime = videoDetail.startTime
            }
          }}
          onEnded={() => {
            if (onComplete) {
              markComponentComplete(component.id)
              onComplete()
            }
          }}
        />

        {/* Custom Controls Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Center Play Button */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 p-4 backdrop-blur transition hover:bg-white/30"
            >
              <Play className="h-12 w-12 text-white" fill="white" />
            </button>
          )}

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {/* Progress Bar */}
            <div className="mb-3 group/progress">
              <div className="relative h-1 cursor-pointer rounded-full bg-white/30">
                <div 
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                />
                {/* Chapter Markers */}
                {videoDetail.chapters?.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white"
                    style={{ left: `${(chapter.startTime / duration) * 100}%` }}
                    title={chapter.title}
                  />
                ))}
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="text-white transition hover:text-primary"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </button>

                {/* Skip Back */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime -= 10
                    }
                  }}
                  className="text-white transition hover:text-primary"
                >
                  <SkipBack className="h-5 w-5" />
                </button>

                {/* Skip Forward */}
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime += 10
                    }
                  }}
                  className="text-white transition hover:text-primary"
                >
                  <SkipForward className="h-5 w-5" />
                </button>

                {/* Volume */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="text-white transition hover:text-primary"
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </button>

                {/* Time */}
                <span className="text-sm text-white">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Settings */}
                <button className="text-white transition hover:text-primary">
                  <Settings className="h-5 w-5" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={() => {
                    if (!document.fullscreenElement) {
                      videoRef.current?.parentElement?.requestFullscreen()
                    } else {
                      document.exitFullscreen()
                    }
                  }}
                  className="text-white transition hover:text-primary"
                >
                  <Maximize className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Chapters, Transcript, Notes */}
      {(showChapters || showTranscript) && (
        <div className="rounded-lg border">
          {/* Tab Headers */}
          <div className="flex border-b">
            {showChapters && videoDetail.chapters && (
              <button
                onClick={() => setActiveTab('chapters')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${
                  activeTab === 'chapters'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Chapters
              </button>
            )}
            {showTranscript && videoDetail.transcript && (
              <button
                onClick={() => setActiveTab('transcript')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${
                  activeTab === 'transcript'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="h-4 w-4" />
                Transcript
              </button>
            )}
            {videoDetail.aiNotes && (
              <button
                onClick={() => setActiveTab('notes')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition ${
                  activeTab === 'notes'
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <FileText className="h-4 w-4" />
                AI Notes
              </button>
            )}
          </div>

          {/* Tab Content */}
          <div className="max-h-96 overflow-y-auto p-4">
            {activeTab === 'chapters' && videoDetail.chapters && (
              <div className="space-y-2">
                {videoDetail.chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => jumpToChapter(chapter.startTime)}
                    className={`flex w-full items-center gap-3 rounded-lg p-3 text-left transition hover:bg-muted ${
                      currentTime >= chapter.startTime && currentTime < chapter.endTime
                        ? 'bg-primary/10 text-primary'
                        : ''
                    }`}
                  >
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium">{chapter.title}</p>
                      {chapter.description && (
                        <p className="text-sm text-muted-foreground">{chapter.description}</p>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatTime(chapter.startTime)}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ))}
              </div>
            )}

            {activeTab === 'transcript' && videoDetail.transcript && (
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap">{videoDetail.transcript}</p>
              </div>
            )}

            {activeTab === 'notes' && videoDetail.aiNotes && (
              <div className="space-y-3">
                {videoDetail.aiNotes.map((note, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <p className="text-sm">{note}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}