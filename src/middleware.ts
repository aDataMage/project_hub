import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SESSION_NAME = 'admin_session'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only protect /admin routes (except the login page itself which we'll handle in the component)
    if (pathname.startsWith('/admin')) {
        const session = request.cookies.get(SESSION_NAME)

        // If no session and trying to access admin API routes, return 401
        if (!session && pathname.startsWith('/api/projects')) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*']
}
