import { useState, useRef, useEffect, useCallback } from 'react'

interface VideoPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isMuted: boolean
  isFullscreen: boolean
  playbackRate: number
  isBuffering: boolean
  watchedPercent: number
}

export function useVideoPlayer(onComplete?: () => void, completionThreshold = 90) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    isFullscreen: false,
    playbackRate: 1,
    isBuffering: false,
    watchedPercent: 0
  })

  const [hasCompletedOnce, setHasCompletedOnce] = useState(false)

  // Play/Pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    
    if (state.isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setState(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
  }, [state.isPlaying])

  // Seek
  const seek = useCallback((time: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = time
    setState(prev => ({ ...prev, currentTime: time }))
  }, [])

  // Skip forward/backward
  const skip = useCallback((seconds: number) => {
    if (!videoRef.current) return
    const newTime = Math.max(0, Math.min(
      videoRef.current.currentTime + seconds,
      videoRef.current.duration
    ))
    seek(newTime)
  }, [seek])

  // Volume
  const setVolume = useCallback((volume: number) => {
    if (!videoRef.current) return
    const clampedVolume = Math.max(0, Math.min(1, volume))
    videoRef.current.volume = clampedVolume
    setState(prev => ({ ...prev, volume: clampedVolume, isMuted: clampedVolume === 0 }))
  }, [])

  const toggleMute = useCallback(() => {
    if (!videoRef.current) return
    videoRef.current.muted = !videoRef.current.muted
    setState(prev => ({ ...prev, isMuted: !prev.isMuted }))
  }, [])

  // Playback rate
  const setPlaybackRate = useCallback((rate: number) => {
    if (!videoRef.current) return
    videoRef.current.playbackRate = rate
    setState(prev => ({ ...prev, playbackRate: rate }))
  }, [])

  // Fullscreen
  const toggleFullscreen = useCallback(async () => {
    if (!videoRef.current) return
    
    try {
      if (!document.fullscreenElement) {
        await videoRef.current.requestFullscreen()
        setState(prev => ({ ...prev, isFullscreen: true }))
      } else {
        await document.exitFullscreen()
        setState(prev => ({ ...prev, isFullscreen: false }))
      }
    } catch (err) {
      console.error('Fullscreen error:', err)
    }
  }, [])

  // Picture-in-Picture
  const togglePiP = useCallback(async () => {
    if (!videoRef.current) return
    
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture()
      } else if (document.pictureInPictureEnabled) {
        await videoRef.current.requestPictureInPicture()
      }
    } catch (err) {
      console.error('PiP error:', err)
    }
  }, [])

  // Event handlers
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const current = video.currentTime
      setState(prev => ({ ...prev, currentTime: current }))
      
      // Track watch percentage
      const percent = (current / video.duration) * 100
      setState(prev => {
        if (percent > prev.watchedPercent) {
          // Check for completion
          if (!hasCompletedOnce && percent >= completionThreshold && onComplete) {
            setHasCompletedOnce(true)
            onComplete()
          }
          return { ...prev, watchedPercent: percent }
        }
        return prev
      })
    }

    const handleLoadedMetadata = () => {
      setState(prev => ({ ...prev, duration: video.duration }))
    }

    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true }))
    }

    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }))
    }

    const handleWaiting = () => {
      setState(prev => ({ ...prev, isBuffering: true }))
    }

    const handleCanPlay = () => {
      setState(prev => ({ ...prev, isBuffering: false }))
    }

    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false }))
      if (onComplete && !hasCompletedOnce) {
        setHasCompletedOnce(true)
        onComplete()
      }
    }

    const handleVolumeChange = () => {
      setState(prev => ({ 
        ...prev, 
        volume: video.volume,
        isMuted: video.muted
      }))
    }

    // Add event listeners
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('waiting', handleWaiting)
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('volumechange', handleVolumeChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('waiting', handleWaiting)
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [completionThreshold, hasCompletedOnce, onComplete])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!videoRef.current) return
      
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault()
          togglePlay()
          break
        case 'ArrowLeft':
          e.preventDefault()
          skip(-10)
          break
        case 'ArrowRight':
          e.preventDefault()
          skip(10)
          break
        case 'ArrowUp':
          e.preventDefault()
          setVolume(state.volume + 0.1)
          break
        case 'ArrowDown':
          e.preventDefault()
          setVolume(state.volume - 0.1)
          break
        case 'm':
          e.preventDefault()
          toggleMute()
          break
        case 'f':
          e.preventDefault()
          toggleFullscreen()
          break
        case 'p':
          e.preventDefault()
          togglePiP()
          break
        case '<':
          e.preventDefault()
          setPlaybackRate(Math.max(0.25, state.playbackRate - 0.25))
          break
        case '>':
          e.preventDefault()
          setPlaybackRate(Math.min(2, state.playbackRate + 0.25))
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [
    togglePlay, skip, setVolume, toggleMute, 
    toggleFullscreen, togglePiP, setPlaybackRate, state
  ])

  return {
    videoRef,
    ...state,
    togglePlay,
    seek,
    skip,
    setVolume,
    toggleMute,
    setPlaybackRate,
    toggleFullscreen,
    togglePiP
  }
}