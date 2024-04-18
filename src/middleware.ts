import { NextRequest, NextResponse } from 'next/server'
import { analytics } from './utils/analytics'
import { session } from './utils/session'

export default async function middleware(request: NextRequest) {
  const relativePath = request.nextUrl.pathname

  const response = NextResponse.next()

  let id = request.cookies.get('id')?.value
  if (!id) id = session.newId()

  try {
    analytics.trackPageview(relativePath)

    const user = await session.check(id)
    if (user) return response

    id = session.newId()
    session.set(id)
    analytics.trackVisitor(request.geo)
  } catch (e) {
    console.error(e)
  }

  response.cookies.set('id', id, { maxAge: 60 * 60 * 24, httpOnly: true, sameSite: 'lax' })
  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)']
}
