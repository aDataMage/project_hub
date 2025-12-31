import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
const SESSION_NAME = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

// POST /api/auth - Login
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { password } = body

        if (!password) {
            return NextResponse.json(
                { error: 'Password is required' },
                { status: 400 }
            )
        }

        if (password !== ADMIN_PASSWORD) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            )
        }

        // Create session
        const sessionToken = Buffer.from(`${Date.now()}-${Math.random()}`).toString('base64')
        const expiresAt = new Date(Date.now() + SESSION_DURATION)

        const cookieStore = await cookies()
        cookieStore.set(SESSION_NAME, sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: expiresAt,
            path: '/'
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Auth error:', error)
        return NextResponse.json(
            { error: 'Authentication failed' },
            { status: 500 }
        )
    }
}

// DELETE /api/auth - Logout
export async function DELETE() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete(SESSION_NAME)
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        )
    }
}

// GET /api/auth - Check session
export async function GET() {
    try {
        const cookieStore = await cookies()
        const session = cookieStore.get(SESSION_NAME)

        if (!session) {
            return NextResponse.json({ authenticated: false })
        }

        return NextResponse.json({ authenticated: true })
    } catch (error) {
        console.error('Session check error:', error)
        return NextResponse.json({ authenticated: false })
    }
}
