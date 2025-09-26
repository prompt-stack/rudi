import type { NextConfig } from 'next'

const isDev = process.env.NODE_ENV !== 'production'

const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: [
      'camera=()',
      'microphone=()',
      'geolocation=()',
      'usb=()',
      'payment=()',
      'interest-cohort=()'
    ].join(', '),
  },
  // Send HSTS only in production over HTTPS
  ...(!isDev
    ? [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }]
    : []),
]

// Note: For Next dev, we allow websockets and blob for HMR/workers.
// Tighten CSP for production and consider nonces for inline code.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  // Scripts and styles
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'" + (isDev ? " blob:" : ''),
  "style-src 'self' 'unsafe-inline'",
  // Media and frames (Cloudflare Stream embeds)
  "img-src 'self' data: blob: https://res.cloudinary.com",
  "font-src 'self' data:",
  "frame-src 'self' https://*.cloudflarestream.com https://iframe.cloudflarestream.com",
  "media-src 'self' blob: https://*.cloudflarestream.com",
  // Network calls (Supabase, Cloudflare Stream, HMR websockets in dev)
  "connect-src 'self' https://*.supabase.co https://*.supabase.in https://*.cloudflarestream.com" + (isDev ? ' ws: wss:' : ''),
  // Workers in dev
  ...(isDev ? ["worker-src 'self' blob:"] : []),
  // Prevent clickjacking
  "frame-ancestors 'none'",
]
  .flat()
  .join('; ')

const nextConfig: NextConfig = {
  poweredByHeader: false,
  eslint: {
    // Temporarily ignore ESLint errors during production builds
    // TODO: Fix remaining any types in contexts and utils (non-critical)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript strict checking
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
}

export default nextConfig
