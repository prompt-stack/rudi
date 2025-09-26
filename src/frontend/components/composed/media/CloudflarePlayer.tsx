/**
 * @layer composed
 * @dependencies react
 * @purpose Embeds Cloudflare Stream videos with iframe player
 * @status stable
 */

'use client'

import { useEffect, useRef } from 'react'

interface CloudflarePlayerProps {
  videoId: string
  title?: string
  poster?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  preload?: 'auto' | 'metadata' | 'none'
  controls?: boolean
  className?: string
}

export default function CloudflarePlayer({ 
  videoId, 
  title, 
  poster,
  autoplay = false,
  muted = false,
  loop = false,
  preload = 'metadata',
  controls = true,
  className = ''
}: CloudflarePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Clear any existing content
    if (containerRef.current) {
      containerRef.current.innerHTML = ''
    }

    // Build iframe URL with parameters
    const params = new URLSearchParams()
    if (autoplay) params.append('autoplay', 'true')
    if (muted) params.append('muted', 'true')
    if (loop) params.append('loop', 'true')
    if (preload) params.append('preload', preload)
    if (!controls) params.append('controls', 'false')
    if (poster) params.append('poster', encodeURIComponent(poster))
    
    // Create and append the iframe
    const iframe = document.createElement('iframe')
    const queryString = params.toString()
    iframe.src = `https://iframe.cloudflarestream.com/${videoId}${queryString ? '?' + queryString : ''}`
    iframe.style.border = 'none'
    iframe.style.width = '100%'
    iframe.style.height = '100%'
    iframe.allow = 'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
    iframe.allowFullscreen = true
    
    if (title) {
      iframe.title = title
    }

    if (containerRef.current) {
      containerRef.current.appendChild(iframe)
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [videoId, title, autoplay, muted, loop, preload, controls, poster])

  return (
    <div className={`relative w-full ${className}`} style={{ paddingBottom: '56.25%' }}>
      <div ref={containerRef} className="absolute inset-0" />
    </div>
  )
}
