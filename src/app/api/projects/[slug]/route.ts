import { NextRequest, NextResponse } from 'next/server'
import { getProjectBySlug, updateProject, deleteProject } from '@/lib/data'

interface RouteParams {
    params: Promise<{ slug: string }>
}

// GET /api/projects/[slug] - Get a single project
export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params
        const project = getProjectBySlug(slug)

        if (!project) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ project })
    } catch (error) {
        console.error('Error fetching project:', error)
        return NextResponse.json(
            { error: 'Failed to fetch project' },
            { status: 500 }
        )
    }
}

// PUT /api/projects/[slug] - Update a project
export async function PUT(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params
        const body = await request.json()

        const updated = updateProject(slug, body)
        return NextResponse.json({ project: updated })
    } catch (error) {
        console.error('Error updating project:', error)
        const message = error instanceof Error ? error.message : 'Failed to update project'
        return NextResponse.json({ error: message }, { status: 400 })
    }
}

// DELETE /api/projects/[slug] - Delete a project
export async function DELETE(request: NextRequest, { params }: RouteParams) {
    try {
        const { slug } = await params
        const deleted = deleteProject(slug)

        if (!deleted) {
            return NextResponse.json(
                { error: 'Project not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error deleting project:', error)
        return NextResponse.json(
            { error: 'Failed to delete project' },
            { status: 500 }
        )
    }
}
