import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

const MAIN_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN ?? 'invitia.co'

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

  // Supabase auth session refresh
  let supabaseResponse = NextResponse.next({ request })

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
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  if (pathname.startsWith('/dashboard') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if ((pathname === '/login' || pathname === '/register') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
