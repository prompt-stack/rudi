import { describe, it, expect, beforeEach } from 'vitest'
import { rateLimit } from '../rate-limit'

describe('Rate Limiting', () => {
  beforeEach(() => {
    global.rateLimitStore = new Map()
  })

  it('should allow requests within limit', () => {
    const result = rateLimit('test-ip', {
      interval: 60000,
      uniqueTokenPerInterval: 3
    })

    expect(result.success).toBe(true)
    expect(result.limit).toBe(3)
    expect(result.remaining).toBe(2)
  })

  it('should block requests exceeding limit', () => {
    const options = {
      interval: 60000,
      uniqueTokenPerInterval: 2
    }

    rateLimit('test-ip-2', options)
    rateLimit('test-ip-2', options)
    const result = rateLimit('test-ip-2', options)

    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('should track separate IPs independently', () => {
    const options = {
      interval: 60000,
      uniqueTokenPerInterval: 2
    }

    const ip1Result = rateLimit('ip1', options)
    const ip2Result = rateLimit('ip2', options)

    expect(ip1Result.success).toBe(true)
    expect(ip2Result.success).toBe(true)
    expect(ip1Result.remaining).toBe(1)
    expect(ip2Result.remaining).toBe(1)
  })

  it('should provide reset timestamp', () => {
    const result = rateLimit('test-ip-3', {
      interval: 60000,
      uniqueTokenPerInterval: 5
    })

    expect(result.reset).toBeGreaterThan(Date.now())
    expect(result.reset).toBeLessThanOrEqual(Date.now() + 60000)
  })
})