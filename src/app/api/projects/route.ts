import { NextRequest, NextResponse } from 'next/server'
import { getProjects, createProject } from '@/lib/data'
import { Project } from '@/lib/types'

// GET /api/projects - List all projects
export async function GET() {
    try {
        const projects = getProjects()
        return NextResponse.json({ projects })
    } catch (error) {
        console.error('Error fetching projects:', error)
        return NextResponse.json(
            { error: 'Failed to fetch projects' },
            { status: 500 }
        )
    }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Basic validation
        if (!body.title || !body.slug || !body.description) {
            return NextResponse.json(
                { error: 'Title, slug, and description are required' },
                { status: 400 }
            )
        }

        const project: Project = {
            title: body.title,
            slug: body.slug,
            description: body.description,
            tags: body.tags || [],
            projectType: body.projectType || 'github-only',
            category: body.category,
            githubUrl: body.githubUrl,
            liveUrl: body.liveUrl,
            caseStudyEnabled: body.caseStudyEnabled || false,
            thumbnail: body.thumbnail,
            externalBadge: body.externalBadge,
            technologies: body.technologies || [],
            featured: body.featured || false,
            order: body.order,
            caseStudy: body.caseStudy
        }

        const created = createProject(project)
        return NextResponse.json({ project: created }, { status: 201 })
    } catch (error) {
        console.error('Error creating project:', error)
        const message = error instanceof Error ? error.message : 'Failed to create project'
        return NextResponse.json({ error: message }, { status: 400 })
    }
}
