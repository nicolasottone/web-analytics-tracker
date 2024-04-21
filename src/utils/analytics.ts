import { redis } from '@/libs/redis'
import { getDate } from '.'
import { addDays, differenceInDays, format } from 'date-fns'

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
  async retrieve(day: Date) {
    const key = `analytics:${format(day, 'dd/MM/yyyy')}`
    return await redis.hgetall(key)
  }
  async retrieveDays(from: Date, to: Date) {
    let promises: ReturnType<typeof this.retrieve>[] = []
    let days: string[] = []
    if (from !== to) {
      const daysBetween = differenceInDays(to, from)
      for (let i = 0; i <= daysBetween; i++) {
        const day = addDays(from, i)
        const promise = this.retrieve(day)
        days.push(format(day, 'dd/MM/yy'))
        promises.push(promise)
      }
    } else {
      days.push(format(from, 'dd/MM/yy'))
      promises.push(this.retrieve(from))
    }
    const result = await Promise.all(promises)
    const formatedResult = result.map((dayData, i) => {
      return { [days[i]]: dayData }
    })
    return formatedResult
  }
}

export const analytics = new Analytics()
