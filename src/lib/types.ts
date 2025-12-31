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

    // Deep Case Study Content - flexible to support all category templates
    // Each category (data-science, data-viz, ai-automation, ai-engineering) has unique fields
    caseStudy?: any
}
