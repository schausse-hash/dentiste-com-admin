import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // 1) Redirect racine -> /fr (site bilingue)
  // (ne touche pas aux routes admin)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/fr', request.url))
  }

  // 2) Protection /admin (sauf /admin/login)
  if (!pathname.startsWith('/admin') || pathname.startsWith('/admin/login')) {
    return NextResponse.next()
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Fail closed sur admin si env vars manquantes
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('error', 'missing_env')
    return NextResponse.redirect(url)
  }

  const response = NextResponse.next()

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get: (name) => request.cookies.get(name)?.value,
      set: (name, value, options) => response.cookies.set({ name, value, ...options }),
      remove: (name, options) => response.cookies.set({ name, value: '', ...options }),
    },
  })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.searchParams.set('redirectedFrom', pathname)
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: ['/', '/admin/:path*'],
}