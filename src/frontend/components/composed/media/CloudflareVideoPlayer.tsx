'use client';

import { useEffect, useRef } from 'react';

interface CloudflareVideoPlayerProps {
  videoId: string;
  title?: string;
  thumbnail?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: string;
  controls?: boolean;
}

export default function CloudflareVideoPlayer({
  videoId,
  title = '',
  thumbnail,
  autoplay = false,
  muted = false,
  loop = false,
  preload = 'metadata',
  controls = true
}: CloudflareVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoId || !containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create the Stream iframe embed
    const iframe = document.createElement('iframe');
    const accountId = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID
    const base = accountId
      ? `https://customer-${accountId}.cloudflarestream.com/${videoId}/iframe`
      : `https://iframe.cloudflarestream.com/${videoId}`
    iframe.src = base;
    iframe.style.border = 'none';
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.height = '100%';
    iframe.style.width = '100%';
    iframe.allow = 'accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;';
    iframe.allowFullscreen = true;
    iframe.title = title || 'Video Player';

    // Add query parameters for player controls
    const params = new URLSearchParams();
    if (autoplay) params.append('autoplay', 'true');
    if (muted) params.append('muted', 'true');
    if (loop) params.append('loop', 'true');
    if (preload) params.append('preload', preload);
    if (!controls) params.append('controls', 'false');
    
    // Add parameters to iframe src if any exist
    if (params.toString()) {
      iframe.src += `?${params.toString()}`;
    }

    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [videoId, autoplay, muted, loop, preload, controls, title]);

  if (!videoId) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontSize: '1.2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
          <p>No video available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        paddingTop: '56.25%', // 16:9 aspect ratio
        width: '100%',
        background: '#000'
      }}
    >
      {/* Iframe will be inserted here */}
    </div>
  );
}

// Alternative: Using the Stream video element directly
export function CloudflareVideoPlayerDirect({
  videoId,
  title = '',
  thumbnail,
  autoplay = false,
  muted = false,
  loop = false,
  preload = 'metadata',
  controls = true
}: CloudflareVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  if (!videoId) {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        color: '#fff',
        fontSize: '1.2rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
          <p>No video available</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <video
        ref={videoRef}
        style={{ width: '100%', height: '100%', background: '#000' }}
        controls={controls}
        autoPlay={autoplay}
        muted={muted}
        loop={loop}
        preload={preload}
        poster={thumbnail}
      >
        {(() => {
          const accountId = process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID
          if (!accountId) return null
          const base = `https://customer-${accountId}.cloudflarestream.com/${videoId}/manifest`
          return (
            <>
              <source src={`${base}/video.m3u8`} type="application/x-mpegURL" />
              <source src={`${base}/video.mpd`} type="application/dash+xml" />
            </>
          )
        })()}
        <p>Your browser doesn't support HTML5 video.</p>
      </video>
    </div>
  );
}
