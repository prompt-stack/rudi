/**
 * @layer feature
 * @dependencies CloudflarePlayer, react, supabase
 * @purpose Full-featured video player with metadata, access control, and progress tracking
 * @status development
 */

'use client'

import { useState, useEffect } from 'react'
import { CloudflarePlayer } from '@/frontend/components/composed'

interface VideoMetadata {
  id: string
  title: string
  description?: string
  duration_seconds: number
  is_preview: boolean
  is_required: boolean
  provider_asset_id: string
  video_provider: string
  course_id: string
  price_cents?: number
}

interface VideoPlayerProps {
  video: VideoMetadata
  canWatch: boolean
  onProgress?: (seconds: number) => void
  onComplete?: () => void
}

export default function VideoPlayer({ 
  video, 
  canWatch, 
  onProgress,
  onComplete 
}: VideoPlayerProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
  const [streamStatus, setStreamStatus] = useState<'ready' | 'processing' | 'error'>('processing')

  useEffect(() => {
    // Generate thumbnail URL based on provider
    if (video.video_provider === 'cloudflare') {
      setThumbnailUrl(
        `https://customer-vrz0iwi6omoe8ysa.cloudflarestream.com/${video.provider_asset_id}/thumbnails/thumbnail.jpg`
      )
      // In Phase 2, we'd check stream status via API
      setStreamStatus('ready')
      setIsLoading(false)
    }
  }, [video])

  // Access denied state
  if (!canWatch && !video.is_preview) {
    return (
      <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center">
        <div className="text-center text-white p-8">
          <div className="text-6xl mb-4">🔒</div>
          <h3 className="text-2xl font-bold mb-2">This video requires purchase</h3>
          <p className="text-gray-300 mb-6">
            Get access to this video and the entire course
          </p>
          <button className="px-6 py-3 bg-navy-800 text-white rounded-lg hover:bg-navy-900 transition">
            Purchase Course - ${(video.price_cents || 9700) / 100}
          </button>
        </div>
      </div>
    )
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-gray-100 rounded-lg aspect-video flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-navy-800 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading video...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || streamStatus === 'error') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg aspect-video flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-red-800 mb-2">Video unavailable</h3>
          <p className="text-red-600">{error || 'This video is still processing or unavailable'}</p>
        </div>
      </div>
    )
  }

  // Processing state
  if (streamStatus === 'processing') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg aspect-video flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-4xl mb-4 animate-pulse">⏳</div>
          <h3 className="text-xl font-semibold text-amber-600 mb-2">Video processing</h3>
          <p className="text-amber-600">This video is being processed. Please check back in a few minutes.</p>
        </div>
      </div>
    )
  }

  // Ready to play
  return (
    <div>
      {/* Video metadata bar */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">{video.title}</h2>
            {video.description && (
              <p className="text-sm text-gray-300 mt-1">{video.description}</p>
            )}
          </div>
          <div className="flex items-center gap-4 text-sm">
            {video.is_preview && (
              <span className="px-2 py-1 bg-green-600 rounded text-xs font-semibold">
                FREE PREVIEW
              </span>
            )}
            <span>{Math.floor(video.duration_seconds / 60)} min</span>
          </div>
        </div>
      </div>

      {/* Video player */}
      <div className="bg-black rounded-b-lg overflow-hidden">
        <CloudflarePlayer
          videoId={video.provider_asset_id}
          title={video.title}
          poster={thumbnailUrl}
        />
      </div>

      {/* Progress tracking (Phase 2) */}
      {onProgress && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            Progress tracking will be enabled in Phase 2
          </p>
        </div>
      )}
    </div>
  )
}
