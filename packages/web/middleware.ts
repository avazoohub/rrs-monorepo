import { NextResponse, NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const { supabase } = createClient(request)
    const {
        data: { session },
    } = await supabase.auth.getSession();

    console.log('pathname', pathname)

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        // '/((?!_next/static|_next/image|favicon.ico).*)',
        '/nfl/:path*',
        '/home/:path*',
        '/profile/:path*',
        '/auction/:path*',
        '/matchit/:path*',
    ],
}
