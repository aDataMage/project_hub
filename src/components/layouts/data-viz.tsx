"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
    ArrowLeft, ExternalLink, Maximize2, Palette, Info,
    BarChart3, Users, Target, TrendingUp, Eye, Zap,
    CheckCircle, Activity, MessageSquare, Layers
} from "lucide-react"
import Link from "next/link"

// Enhanced Project type for data visualization
interface Project {
    title: string
    description: string
    thumbnail?: string
    liveUrl?: string
    githubUrl?: string
    technologies?: string[]
    caseStudy?: {
        overview: {
            summary: string
            role: string
            timeline: string
            client?: string
            audience?: string
        }
        problem: {
            statement: string
            businessContext: string
            userNeeds: string[]
            dataComplexity?: string
        }
        methodology: {
            approach: string
            processSteps: Array<{
                title: string
                description: string
            }>
            designPrinciples?: string[]
        }
        design: {
            colorPalette: Array<{
                name: string
                hex: string
                usage: string
            }>
            visualHierarchy?: string
            interactivity?: string
            accessibility?: string
        }
        implementation: {
            dataProcessing?: string
            visualization: Array<{
                type: string
                purpose: string
                insight: string
            }>
            challenges?: Array<{
                issue: string
                solution: string
            }>
        }
        results: {
            metrics: Array<{
                label: string
                value: string
            }>
            impact: string
            userFeedback?: string[]
            businessOutcome?: string
        }
    }
}

export function DataVizLayout({ project }: { project: Project }) {
    const { caseStudy } = project

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Immersive Header */}
            <div className="h-[60vh] w-full relative bg-muted overflow-hidden">
                {project.thumbnail ? (
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-70"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 max-w-7xl">
                    <a
                        href="https://adatamage.com"
                        className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6 backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full text-sm"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Main Site
                    </a>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none">
                                Data Visualization
                            </Badge>
                            {caseStudy?.overview.client && (
                                <Badge variant="outline" className="backdrop-blur-sm bg-white/10 text-white border-white/20">
                                    {caseStudy.overview.client}
                                </Badge>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight max-w-5xl">
                            {project.title}
                        </h1>

                        {caseStudy && (
                            <p className="text-white/90 max-w-3xl text-lg leading-relaxed">
                                {caseStudy.overview.summary}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {!caseStudy ? (
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <div className="p-12 border border-dashed rounded-xl text-center text-muted-foreground">
                        Case study details coming soon. This visualization project demonstrates design thinking and data storytelling.
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">

                            {/* The Challenge */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Target className="h-7 w-7 text-orange-500" /> The Challenge
                                </h2>

                                <div className="space-y-6">
                                    <div className="bg-card p-6 rounded-lg border border-border">
                                        <p className="text-lg leading-relaxed mb-4">{caseStudy.problem.statement}</p>
                                    </div>

                                    <div className="bg-gradient-to-br from-orange-950/20 to-red-950/20 p-6 rounded-lg border border-orange-500/20">
                                        <h4 className="font-semibold mb-3 text-orange-600 dark:text-orange-400">Business Context</h4>
                                        <p className="text-muted-foreground italic leading-relaxed">"{caseStudy.problem.businessContext}"</p>
                                    </div>

                                    {/* User Needs */}
                                    <div className="bg-card p-6 rounded-lg border border-border">
                                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                                            <Users className="h-5 w-5 text-blue-500" /> User Needs
                                        </h4>
                                        <ul className="space-y-3">
                                            {caseStudy.problem.userNeeds.map((need, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                                                    <span className="text-muted-foreground">{need}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {caseStudy.problem.dataComplexity && (
                                        <div className="bg-card p-6 rounded-lg border border-border">
                                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                <Layers className="h-5 w-5 text-purple-500" /> Data Complexity
                                            </h4>
                                            <p className="text-sm text-muted-foreground">{caseStudy.problem.dataComplexity}</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Design Process */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Palette className="h-7 w-7 text-purple-500" /> Design Process
                                </h2>

                                <div className="space-y-6">
                                    <div className="bg-card p-6 rounded-lg border border-border">
                                        <h3 className="font-semibold text-lg mb-3">Approach</h3>
                                        <p className="text-muted-foreground leading-relaxed">{caseStudy.methodology.approach}</p>
                                    </div>

                                    {/* Process Steps */}
                                    <div className="space-y-4">
                                        {caseStudy.methodology.processSteps.map((step, i) => (
                                            <div key={i} className="flex gap-4">
                                                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold text-lg">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1 bg-card p-5 rounded-lg border border-border hover:border-purple-500/30 transition-colors">
                                                    <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                                                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Design Principles */}
                                    {caseStudy.methodology.designPrinciples && (
                                        <div className="bg-gradient-to-br from-purple-950/20 to-indigo-950/20 p-6 rounded-lg border border-purple-500/20">
                                            <h4 className="font-semibold mb-4 text-purple-400">Design Principles</h4>
                                            <ul className="space-y-2">
                                                {caseStudy.methodology.designPrinciples.map((principle, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <Zap className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-muted-foreground">{principle}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Visual Design System */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Palette className="h-7 w-7 text-pink-500" /> Visual Design System
                                </h2>

                                <div className="space-y-6">
                                    {/* Color Palette */}
                                    <div className="bg-card p-6 rounded-xl border border-border">
                                        <h4 className="font-semibold mb-4 flex items-center gap-2">
                                            <Palette className="h-5 w-5 text-muted-foreground" /> Color Palette
                                        </h4>
                                        <div className="grid gap-4">
                                            {caseStudy.design.colorPalette.map((color, i) => (
                                                <div key={i} className="flex items-center gap-4">
                                                    <div
                                                        className="h-16 w-16 rounded-lg shadow-lg flex-shrink-0 border border-border"
                                                        style={{ backgroundColor: color.hex }}
                                                    />
                                                    <div className="flex-1">
                                                        <div className="font-semibold">{color.name}</div>
                                                        <div className="text-xs font-mono text-muted-foreground">{color.hex}</div>
                                                        <div className="text-sm text-muted-foreground mt-1">{color.usage}</div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Design Details */}
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {caseStudy.design.visualHierarchy && (
                                            <div className="bg-card p-5 rounded-lg border border-border">
                                                <h4 className="font-semibold mb-2 text-sm">Visual Hierarchy</h4>
                                                <p className="text-xs text-muted-foreground">{caseStudy.design.visualHierarchy}</p>
                                            </div>
                                        )}
                                        {caseStudy.design.interactivity && (
                                            <div className="bg-card p-5 rounded-lg border border-border">
                                                <h4 className="font-semibold mb-2 text-sm">Interactivity</h4>
                                                <p className="text-xs text-muted-foreground">{caseStudy.design.interactivity}</p>
                                            </div>
                                        )}
                                    </div>

                                    {caseStudy.design.accessibility && (
                                        <div className="bg-green-950/10 p-5 rounded-lg border border-green-500/20">
                                            <h4 className="font-semibold mb-2 text-sm text-green-600 dark:text-green-400 flex items-center gap-2">
                                                <Eye className="h-4 w-4" /> Accessibility
                                            </h4>
                                            <p className="text-xs text-muted-foreground">{caseStudy.design.accessibility}</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Visualization Showcase */}
                            {caseStudy.implementation.visualization && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <BarChart3 className="h-7 w-7 text-blue-500" /> Visualization Approach
                                    </h2>

                                    <div className="space-y-4">
                                        {caseStudy.implementation.visualization.map((viz, i) => (
                                            <div key={i} className="bg-card p-6 rounded-lg border border-border">
                                                <div className="flex items-start gap-4">
                                                    <BarChart3 className="h-6 w-6 text-blue-500 mt-1 flex-shrink-0" />
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-lg mb-1">{viz.type}</h4>
                                                        <p className="text-sm text-muted-foreground mb-3"><strong>Purpose:</strong> {viz.purpose}</p>
                                                        <div className="pl-4 border-l-2 border-blue-500/30 bg-blue-950/10 p-3 rounded">
                                                            <p className="text-sm"><strong className="text-blue-600 dark:text-blue-400">Insight:</strong> {viz.insight}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Challenges & Solutions */}
                            {caseStudy.implementation.challenges && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <Zap className="h-7 w-7 text-yellow-500" /> Challenges & Solutions
                                    </h2>

                                    <div className="space-y-4">
                                        {caseStudy.implementation.challenges.map((challenge, i) => (
                                            <div key={i} className="bg-card p-6 rounded-lg border border-border">
                                                <div className="space-y-3">
                                                    <div>
                                                        <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 mb-1">Challenge</h4>
                                                        <p className="text-muted-foreground text-sm">{challenge.issue}</p>
                                                    </div>
                                                    <div className="pl-4 border-l-2 border-green-500/30">
                                                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-1">Solution</h4>
                                                        <p className="text-muted-foreground text-sm">{challenge.solution}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Results & Impact */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <TrendingUp className="h-7 w-7 text-green-500" /> Results & Impact
                                </h2>

                                <div className="space-y-6">
                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {caseStudy.results.metrics.map((metric, i) => (
                                            <div key={i} className="bg-gradient-to-br from-card to-card/50 p-5 rounded-lg border border-border hover:border-green-500/30 transition-colors text-center">
                                                <div className="text-sm text-muted-foreground mb-2">{metric.label}</div>
                                                <div className="text-2xl font-bold text-green-500">{metric.value}</div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Impact Statement */}
                                    <div className="bg-gradient-to-br from-green-950/20 to-emerald-950/20 p-6 rounded-lg border border-green-500/20">
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <Activity className="h-5 w-5 text-green-500" /> Impact
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">{caseStudy.results.impact}</p>
                                    </div>

                                    {/* User Feedback */}
                                    {caseStudy.results.userFeedback && (
                                        <div className="space-y-3">
                                            <h4 className="font-semibold flex items-center gap-2">
                                                <MessageSquare className="h-5 w-5 text-blue-500" /> User Feedback
                                            </h4>
                                            <div className="grid gap-3">
                                                {caseStudy.results.userFeedback.map((feedback, i) => (
                                                    <div key={i} className="bg-card p-4 rounded-lg border border-border border-l-4 border-l-blue-500">
                                                        <p className="text-sm text-muted-foreground italic">{feedback}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Business Outcome */}
                                    {caseStudy.results.businessOutcome && (
                                        <div className="bg-gradient-to-br from-blue-950/20 to-purple-950/20 p-6 rounded-lg border border-blue-500/20">
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5 text-blue-500" /> Business Outcome
                                            </h4>
                                            <p className="text-muted-foreground leading-relaxed">{caseStudy.results.businessOutcome}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            <div className="bg-card border border-border p-6 rounded-xl shadow-lg sticky top-8">
                                <h3 className="font-semibold mb-4 flex items-center gap-2">
                                    <Maximize2 className="h-5 w-5 text-primary" />
                                    Explore Dashboard
                                </h3>

                                {project.liveUrl ? (
                                    <Button asChild className="w-full h-12 text-lg shadow-primary/25 shadow-md mb-4">
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-5 w-5" />
                                            View Live Dashboard
                                        </a>
                                    </Button>
                                ) : (
                                    <Button disabled className="w-full h-12 mb-4">Dashboard Offline</Button>
                                )}

                                {project.githubUrl && (
                                    <Button variant="outline" asChild className="w-full">
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="mr-2 h-5 w-5" />
                                            View GitHub Repository
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}