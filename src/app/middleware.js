import { NextResponse } from 'next/server'
import { getIronSession } from 'iron-session/edge'
import { ironOptions } from './lib/config'

// Add the paths that need authentication
const protectedPaths = ['/dashboard']

export async function middleware(request) {
  const res = NextResponse.next()

  
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const session = await getIronSession(request, res, ironOptions)

    if (!session.user) {
      const url = new URL('/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    } else {
    }
  }

  return res
}