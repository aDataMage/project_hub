import { notFound } from "next/navigation"
import { PROJECTS } from "@/lib/constants"
import { DataScienceLayout } from "@/components/layouts/data-science"
import { DataVizLayout } from "@/components/layouts/data-viz"
import { AiAutomationLayout } from "@/components/layouts/ai-automation"
import { AiEngineeringLayout } from "@/components/layouts/ai-engineering"

// Generate static params for all defined projects to enable static export/SSG
export async function generateStaticParams() {
    return PROJECTS.map((project) => ({
        slug: project.slug,
    }))
}

export default async function ProjectPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const project = PROJECTS.find((p) => p.slug === slug)

    if (!project) {
        notFound()
    }

    // Router Logic: Select Layout based on Category
    switch (project.category) {
        case 'data-science':
            return <DataScienceLayout project={project} />

        case 'data-visualization':
            return <DataVizLayout />

        case 'ai-automation':
            return <AiAutomationLayout />

        case 'ai-engineering':
            return <AiEngineeringLayout />

        default:
            // Fallback Layout (can be a generic one, using Data Science for now as a safe default)
            return <DataScienceLayout project={project} />
    }
}
