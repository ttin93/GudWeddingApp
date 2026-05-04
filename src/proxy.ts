import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const MAIN_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? 'invitia.co'

const intlMiddleware = createIntlMiddleware(routing)

export async function proxy(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  const hostname = host.split(':')[0]

  // Subdomain routing: lorena-viktor.invitia.co → /invite/lorena-viktor
  const isSubdomain =
    hostname.endsWith(`.${MAIN_DOMAIN}`) &&
    !hostname.startsWith('www.') &&
    hostname !== MAIN_DOMAIN

  if (isSubdomain) {
    const slug = hostname.replace(`.${MAIN_DOMAIN}`, '')
    const url = request.nextUrl.clone()
    url.pathname = `/invite/${slug}`
    return NextResponse.rewrite(url)
  }

  const { pathname } = request.nextUrl

  // Skip intl middleware for API routes, auth callback, and static invite/admin pages
  const skipIntl =
    pathname.startsWith('/api/') ||
    pathname.startsWith('/auth/') ||
    pathname.startsWith('/invite/') ||
    pathname.startsWith('/admin') ||
    pathname === '/favicon.ico'

  // Run intl middleware and use its response as the base (preserves rewrites for default locale)
  let response: NextResponse

  if (!skipIntl) {
    const intlResponse = intlMiddleware(request)

    // If next-intl wants to redirect (e.g. add locale prefix for non-default), honour it
    if (intlResponse.headers.get('location')) {
      return intlResponse
    }

    // Use the intl response as our base — it carries the x-middleware-rewrite header
    // that maps /  → /sl  (default locale, as-needed prefix)
    response = intlResponse as NextResponse
  } else {
    response = NextResponse.next({ request })
  }

  // Supabase auth session refresh — mutates `response` to add/refresh cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          // Rebuild response preserving all intl headers, then layer cookies on top
          const newResponse = new NextResponse(response.body, {
            status: response.status,
            headers: new Headers(response.headers),
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            newResponse.cookies.set(name, value, options)
          )
          response = newResponse
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Detect locale prefix (sl is default, no prefix)
  const localeMatch = pathname.match(/^\/(en|hr)(\/|$)/)
  const localePrefix = localeMatch ? localeMatch[1] : 'sl'
  const basePrefix = localeMatch ? `/${localePrefix}` : ''

  // Strip locale prefix for path matching
  const pathWithoutLocale = localeMatch
    ? pathname.replace(`/${localePrefix}`, '') || '/'
    : pathname

  if (pathWithoutLocale.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL(`${basePrefix}/login`, request.url))
  }

  if ((pathWithoutLocale === '/login' || pathWithoutLocale === '/register') && user) {
    // Preserve ?plan= from pricing page so dashboard can show the package banner
    const plan = request.nextUrl.searchParams.get('plan')
    const dest = plan
      ? `${basePrefix}/dashboard?package=${plan}`
      : `${basePrefix}/dashboard`
    return NextResponse.redirect(new URL(dest, request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|music/).*)',
  ],
}
