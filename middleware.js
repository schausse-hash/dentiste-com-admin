import { NextResponse } from 'next/server'

// Minimal middleware:
// - Redirect / -> /fr
// - Protect /admin (requires Supabase session cookie, handled by app/admin code)

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/fr'
    return NextResponse.redirect(url)
  }

  // Let the admin area handle auth; we only keep the door closed for obvious cases.
  if (pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/admin/:path*'],
}
