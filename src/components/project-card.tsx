"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ExternalLink, Github, Layout, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Project } from "@/lib/types"

interface ProjectCardProps {
    project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
    const router = useRouter()
    const isDeployed = project.projectType === 'deployed-app'
    const isDashboard = project.projectType === 'external-dashboard'
    const isGithub = project.projectType === 'github-only'

    // Card Click: Prioritize Case Study (Internal), else Live URL, else GitHub
    const handleCardClick = () => {
        if (project.caseStudyEnabled) {
            // Internal navigation
            router.push(`/project/${project.slug}`)
        } else if (project.liveUrl) {
            // External navigation
            window.open(project.liveUrl, '_blank')
        } else if (project.githubUrl) {
            window.open(project.githubUrl, '_blank')
        }
    }

    // Primary Button Action: Explicitly configured URL
    const handlePrimaryAction = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent card click
        if (project.liveUrl) window.open(project.liveUrl, '_blank')
    }

    // Github Button Action
    const handleGithubAction = (e: React.MouseEvent) => {
        e.stopPropagation()
        // Link handles navigation, just stop propagation
    }

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="h-full"
            onClick={handleCardClick}
        >
            <Card className="h-full flex flex-col overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg transition-all duration-300 group cursor-pointer">

                {/* Thumbnail Section */}
                <div className="relative aspect-video w-full overflow-hidden bg-muted/50">
                    {project.thumbnail ? (
                        <img
                            src={project.thumbnail}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            <Layout className="h-12 w-12 opacity-20" />
                        </div>
                    )}

                    <div className="absolute top-2 right-2">
                        <Badge variant={isGithub ? "secondary" : "default"} className="backdrop-blur-md shadow-sm">
                            {project.externalBadge || project.projectType}
                        </Badge>
                    </div>
                </div>

                <CardHeader>
                    <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">
                        {project.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">
                        {project.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs bg-background/50">
                                {tag}
                            </Badge>
                        ))}
                        {project.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs bg-background/50">+{project.tags.length - 3}</Badge>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="flex gap-2 pt-2">
                    {/* Primary Action Button */}
                    {(project.liveUrl || project.caseStudyEnabled) && (
                        <Button
                            className="flex-1 gap-2"
                            onClick={handlePrimaryAction}
                            variant={isDashboard ? "secondary" : "default"}
                        >
                            {isDashboard ? <Layout className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                            {isDashboard ? "View Dashboard" : "Launch App"}
                        </Button>
                    )}

                    {/* Secondary Action (GitHub) */}
                    {project.githubUrl && (
                        <Button
                            variant="outline"
                            size="icon"
                            asChild
                            className="hover:text-primary hover:border-primary/50"
                            onClick={handleGithubAction}
                        >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                <span className="sr-only">GitHub</span>
                            </a>
                        </Button>
                    )}

                    {/* Internal Case Study Link (Visible hint) */}
                    {project.caseStudyEnabled && !project.liveUrl && (
                        <Button variant="ghost" size="sm" className="ml-auto gap-1">
                            Case Study <ArrowRight className="h-3 w-3" />
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
    )
}
