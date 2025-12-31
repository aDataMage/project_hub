export type ProjectType =
    | 'deployed-app'
    | 'external-dashboard'
    | 'github-only'
    | 'case-study'
    | 'external-resource'

export type ProjectCategory =
    | 'data-science'
    | 'data-visualization'
    | 'ai-automation'
    | 'ai-engineering'

export interface Project {
    _id?: string
    title: string
    slug: string
    description: string
    tags: string[]

    // Categorization
    projectType: ProjectType
    category?: ProjectCategory

    // Links
    githubUrl?: string
    liveUrl?: string
    caseStudyEnabled?: boolean

    // Visuals
    thumbnail?: string
    externalBadge?: string

    // Metadata
    technologies?: string[]
    featured?: boolean
    order?: number

    // Deep Case Study Content (PACE Framework)
    caseStudy?: {
        overview: {
            summary: string
            role: string
            timeline: string
            teamSize?: number
            businessContext?: string
        }
        problem: {
            statement: string
            businessContext: string // Kept for backward compatibility if needed, or unify
            goals: string[]
            constraints?: string[]
            stakeholders?: string[]
        }
        methodology: {
            approach: string
            processSteps: { title: string; description: string }[]
            architectureImage?: string // URL to architecture diagram
            architecture?: {
                components: Array<{
                    name: string
                    description: string
                    tech: string[]
                }>
            }
        }
        implementation?: {
            dataStrategy?: string
            modelDetails?: string
            pipeline?: string[]
            challenges?: Array<{
                issue: string
                solution: string
            }>
        }
        results: {
            metrics: { label: string; value: string; trend?: 'up' | 'down'; improvement?: string }[]
            impact: string
            businessValue?: string
            learnings?: string[]
        }
        deployment?: {
            infrastructure: string
            monitoring: string[]
            scalability?: string
        }
        learnings?: {
            technical: string[]
            business: string[]
        }
    }
}
