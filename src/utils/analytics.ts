import { redis } from '@/libs/redis'
import { getDate } from '.'

type AnalyticsArgs = {
  retention?: number
}
type GeoInfo =
  | {
      city?: string | undefined
      country?: string | undefined
      region?: string | undefined
      latitude?: string | undefined
      longitude?: string | undefined
    }
  | undefined

class Analytics {
  private retention: number = 60 * 60 * 24 * 31

  constructor(opts?: AnalyticsArgs) {
    if (opts?.retention) this.retention = opts?.retention
  }

  async trackPageview(path: string) {
    const key = `analytics:${getDate()}`

    await redis.hincrby(key, JSON.stringify({ pageviews: path }), 1)
  }

  async trackVisitor(geo: GeoInfo) {
    const key = `analytics:${getDate()}`

    await redis.hincrby(key, JSON.stringify({ visits: 'unique' }), 1)

    if (geo !== undefined && Object.keys(geo).length > 0) {
      await redis.hincrby(key, JSON.stringify({ visitor: geo }), 0)
    }
  }
  async trackEvent(eventName: string) {
    const key = `analytics:${getDate()}`

    await redis.hincrby(key, JSON.stringify({ event: eventName }), 1)
  }
}

export const analytics = new Analytics()
