import { redis } from '@/libs/redis'

type SessionArgs = {
  retention?: number
}

class Session {
  private retention: number = 60 * 60 * 24

  constructor(opts?: SessionArgs) {
    if (opts?.retention) this.retention = opts?.retention
  }

  newId() {
    return crypto.randomUUID()
  }
  async set(id: string) {
    const key = `sessions:${id}`
    await redis.setex(key, this.retention, {})
  }
  async check(id: string) {
    const key = `sessions:${id}`
    return await redis.exists(key)
  }
  async delete(id: string) {
    const key = `sessions:${id}`
    await redis.del(key)
  }
}

export const session = new Session()
