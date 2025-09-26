/**
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, consider using Redis or Vercel KV
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per window
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

/**
 * Rate limit checker
 * @param identifier - Unique identifier (usually IP address)
 * @param config - Rate limit configuration
 * @returns Rate limit result with remaining requests and reset time
 */
export function rateLimit(
  identifier: string,
  config: RateLimitConfig = {
    interval: 15 * 60 * 1000, // 15 minutes
    uniqueTokenPerInterval: 5 // 5 requests per 15 min
  }
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // Clean up old entries periodically (simple gc)
  if (rateLimitMap.size > 10000) {
    const cutoff = now - config.interval;
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.resetTime < cutoff) {
        rateLimitMap.delete(key);
      }
    }
  }

  // No entry or expired entry - create new
  if (!entry || now > entry.resetTime) {
    const resetTime = now + config.interval;
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime
    });

    return {
      success: true,
      limit: config.uniqueTokenPerInterval,
      remaining: config.uniqueTokenPerInterval - 1,
      reset: resetTime
    };
  }

  // Check if limit exceeded
  if (entry.count >= config.uniqueTokenPerInterval) {
    return {
      success: false,
      limit: config.uniqueTokenPerInterval,
      remaining: 0,
      reset: entry.resetTime
    };
  }

  // Increment count
  entry.count++;
  rateLimitMap.set(identifier, entry);

  return {
    success: true,
    limit: config.uniqueTokenPerInterval,
    remaining: config.uniqueTokenPerInterval - entry.count,
    reset: entry.resetTime
  };
}

/**
 * Get client IP from request headers (works with Vercel)
 */
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIp) {
    return realIp;
  }

  return 'unknown';
}