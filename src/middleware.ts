import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Supported locales
const locales = ['en', 'pt']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // 1. AGE GATE LOGIC (Cookie Check)
  // Check if the user has already passed the age gate
  const hasPassedAgeGate = request.cookies.has('age_verified')
  
  // If they are trying to access the site without verification, 
  // they will still be allowed to route, but the Client Component will read this cookie
  // and force the cinematic overlay if it is missing.
  
  // 2. i18n ROUTING LOGIC
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static assets
    '/((?!_next|api|favicon.ico|assets|images).*)',
  ],
}
