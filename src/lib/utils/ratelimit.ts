// Simple in-memory rate limiter. Works per-instance (fine for single-region deploys).
// For multi-region, replace with Upstash Redis.

interface Bucket {
  count: number
  resetAt: number
}

const store = new Map<string, Bucket>()

// Clean up expired buckets every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, bucket] of store) {
      if (bucket.resetAt < now) store.delete(key)
    }
  }, 5 * 60 * 1000)
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const bucket = store.get(key)

  if (!bucket || bucket.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  if (bucket.count >= limit) {
    return { allowed: false, remaining: 0 }
  }

  bucket.count++
  return { allowed: true, remaining: limit - bucket.count }
}
