"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft, Server, Code, Terminal, Cpu, CheckCircle,
    Database, TrendingUp, AlertCircle, GitBranch,
    Activity, Users, Target, Zap, Box, FileCode
} from "lucide-react"
import Link from "next/link"

// Enhanced Project type with more comprehensive case study fields
interface Project {
    title: string
    description: string
    githubUrl?: string
    demoUrl?: string
    technologies?: string[]
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
            goals: string[]
            constraints?: string[]
            stakeholders?: string[]
        }
        methodology: {
            approach: string
            processSteps: Array<{
                title: string
                description: string
            }>
            architecture?: {
                components: Array<{
                    name: string
                    description: string
                    tech: string[]
                }>
            }
        }
        implementation: {
            dataStrategy?: string
            modelDetails?: string
            pipeline?: string[]
            challenges?: Array<{
                issue: string
                solution: string
            }>
        }
        results: {
            metrics: Array<{
                label: string
                value: string
                improvement?: string
            }>
            impact: string
            businessValue?: string
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

export function AiEngineeringLayout({ project }: { project: Project }) {
    const { caseStudy } = project
    const [activeSection, setActiveSection] = useState<string>("overview")

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="border-b border-border/40 bg-gradient-to-br from-blue-950/20 via-background to-purple-950/20">
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <a
                        href="https://adatamage.com"
                        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Main Site
                    </a>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-2 mb-4">
                                <Terminal className="h-5 w-5 text-blue-500" />
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                                    Production AI System
                                </Badge>
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                {caseStudy?.overview.summary || project.description}
                            </p>

                            {/* Quick Stats */}
                            {caseStudy?.overview && (
                                <div className="grid grid-cols-3 gap-4 mt-8">
                                    <div className="p-4 rounded-lg bg-card border border-border">
                                        <Users className="h-5 w-5 text-blue-500 mb-2" />
                                        <div className="text-2xl font-bold">{caseStudy.overview.teamSize}</div>
                                        <div className="text-sm text-muted-foreground">Team Size</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-card border border-border">
                                        <Target className="h-5 w-5 text-green-500 mb-2" />
                                        <div className="text-2xl font-bold">{caseStudy.overview.timeline}</div>
                                        <div className="text-sm text-muted-foreground">Duration</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-card border border-border">
                                        <TrendingUp className="h-5 w-5 text-purple-500 mb-2" />
                                        <div className="text-2xl font-bold">{caseStudy.results.metrics[0]?.improvement || "N/A"}</div>
                                        <div className="text-sm text-muted-foreground">Key Impact</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons & Tech Stack */}
                        <div className="space-y-6">
                            <div className="flex flex-col gap-3">
                                {project.githubUrl && (
                                    <Button variant="outline" className="border-primary/20 hover:bg-primary/10 w-full" asChild>
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <Code className="mr-2 h-4 w-4" /> View Source Code
                                        </a>
                                    </Button>
                                )}
                                {project.demoUrl && (
                                    <Button className="w-full" asChild>
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                            <Zap className="mr-2 h-4 w-4" /> Live Demo
                                        </a>
                                    </Button>
                                )}
                            </div>

                            <div className="bg-card p-6 rounded-xl border border-border">
                                <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                                    <Box className="h-5 w-5" /> Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies?.map(tech => (
                                        <Badge key={tech} variant="secondary" className="rounded-md px-3 py-1">
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {!caseStudy ? (
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <div className="p-12 border border-dashed rounded-xl text-center text-muted-foreground">
                        Case study details coming soon. This project demonstrates production-ready AI engineering capabilities.
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-12 max-w-7xl">

                    {/* Business Context Banner */}
                    {caseStudy.overview.businessContext && (
                        <div className="mb-12 p-6 rounded-xl bg-blue-950/10 border border-blue-500/20">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-500" /> Business Context
                            </h3>
                            <p className="text-muted-foreground">{caseStudy.overview.businessContext}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-12">

                            {/* Problem Statement */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <AlertCircle className="h-7 w-7 text-orange-500" /> The Problem
                                </h2>
                                <div className="bg-card p-6 rounded-lg border border-border space-y-6">
                                    <p className="text-lg leading-relaxed">{caseStudy.problem.statement}</p>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <CheckCircle className="h-4 w-4 text-green-500" /> Success Criteria
                                            </h4>
                                            <ul className="space-y-2">
                                                {caseStudy.problem.goals.map((goal, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-muted-foreground">{goal}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {caseStudy.problem.constraints && (
                                            <div>
                                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                    <AlertCircle className="h-4 w-4 text-orange-500" /> Constraints
                                                </h4>
                                                <ul className="space-y-2">
                                                    {caseStudy.problem.constraints.map((constraint, i) => (
                                                        <li key={i} className="flex items-start gap-2">
                                                            <div className="h-4 w-4 rounded-full border-2 border-orange-500 mt-0.5 flex-shrink-0" />
                                                            <span className="text-muted-foreground">{constraint}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </section>

                            {/* Technical Approach */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Code className="h-7 w-7 text-blue-500" /> Technical Approach
                                </h2>

                                <div className="space-y-6">
                                    <div className="bg-card p-6 rounded-lg border border-border">
                                        <h3 className="font-semibold text-lg mb-3">Solution Overview</h3>
                                        <p className="text-muted-foreground leading-relaxed">{caseStudy.methodology.approach}</p>
                                    </div>

                                    {/* Process Steps */}
                                    <div className="space-y-4">
                                        {caseStudy.methodology.processSteps.map((step, i) => (
                                            <div key={i} className="bg-card p-5 rounded-lg border border-border hover:border-primary/30 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                                        {i + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                                                        <p className="text-muted-foreground">{step.description}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* System Architecture */}
                            {caseStudy.methodology.architecture && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <Server className="h-7 w-7 text-purple-500" /> System Architecture
                                    </h2>

                                    <div className="bg-[#0a0e1a] p-8 rounded-xl border border-purple-500/20 relative overflow-hidden">
                                        {/* Grid Background */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

                                        <div className="relative z-10 grid gap-6">
                                            {caseStudy.methodology.architecture.components.map((component, i) => (
                                                <div key={i} className="p-5 border border-blue-500/30 bg-slate-900/50 rounded-lg backdrop-blur-sm">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <h4 className="font-semibold text-lg text-blue-300">{component.name}</h4>
                                                        <Database className="h-5 w-5 text-blue-400" />
                                                    </div>
                                                    <p className="text-slate-300 mb-3">{component.description}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {component.tech.map((t, j) => (
                                                            <span key={j} className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20">
                                                                {t}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            )}

                            {/* Implementation Challenges */}
                            {caseStudy.implementation?.challenges && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <Zap className="h-7 w-7 text-yellow-500" /> Key Challenges & Solutions
                                    </h2>

                                    <div className="space-y-4">
                                        {caseStudy.implementation.challenges.map((challenge, i) => (
                                            <div key={i} className="bg-card p-6 rounded-lg border border-border">
                                                <div className="flex items-start gap-4">
                                                    <AlertCircle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                                                    <div className="flex-1 space-y-3">
                                                        <div>
                                                            <h4 className="font-semibold text-lg mb-1">Challenge</h4>
                                                            <p className="text-muted-foreground">{challenge.issue}</p>
                                                        </div>
                                                        <div className="pl-4 border-l-2 border-green-500/30">
                                                            <h4 className="font-semibold text-green-600 dark:text-green-400 mb-1">Solution</h4>
                                                            <p className="text-muted-foreground">{challenge.solution}</p>
                                                        </div>
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
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {caseStudy.results.metrics.map((metric, i) => (
                                            <div key={i} className="p-5 bg-gradient-to-br from-card to-card/50 rounded-lg border border-border hover:border-primary/30 transition-colors">
                                                <p className="text-muted-foreground text-sm mb-1">{metric.label}</p>
                                                <p className="text-3xl font-bold text-primary mb-1">{metric.value}</p>
                                                {metric.improvement && (
                                                    <p className="text-sm text-green-500 font-medium">{metric.improvement}</p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Impact Statement */}
                                    <div className="bg-gradient-to-r from-green-950/20 to-blue-950/20 p-6 rounded-lg border border-green-500/20">
                                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                                            <Activity className="h-5 w-5 text-green-500" /> Technical Impact
                                        </h4>
                                        <p className="text-muted-foreground leading-relaxed">{caseStudy.results.impact}</p>
                                    </div>

                                    {caseStudy.results.businessValue && (
                                        <div className="bg-gradient-to-r from-purple-950/20 to-blue-950/20 p-6 rounded-lg border border-purple-500/20">
                                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5 text-purple-500" /> Business Value
                                            </h4>
                                            <p className="text-muted-foreground leading-relaxed">{caseStudy.results.businessValue}</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Deployment & Operations */}
                            {caseStudy.deployment && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <GitBranch className="h-7 w-7 text-blue-500" /> Production Deployment
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="bg-card p-6 rounded-lg border border-border">
                                            <h4 className="font-semibold mb-2">Infrastructure</h4>
                                            <p className="text-muted-foreground">{caseStudy.deployment.infrastructure}</p>
                                        </div>

                                        <div className="bg-card p-6 rounded-lg border border-border">
                                            <h4 className="font-semibold mb-3">Monitoring & Observability</h4>
                                            <ul className="space-y-2">
                                                {caseStudy.deployment.monitoring.map((item, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <Activity className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                                                        <span className="text-muted-foreground">{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {caseStudy.deployment.scalability && (
                                            <div className="bg-card p-6 rounded-lg border border-border">
                                                <h4 className="font-semibold mb-2">Scalability</h4>
                                                <p className="text-muted-foreground">{caseStudy.deployment.scalability}</p>
                                            </div>
                                        )}
                                    </div>
                                </section>
                            )}

                            {/* Key Learnings */}
                            {caseStudy.learnings && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <FileCode className="h-7 w-7 text-purple-500" /> Key Learnings
                                    </h2>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="bg-card p-6 rounded-lg border border-border">
                                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                                                <Code className="h-5 w-5 text-blue-500" /> Technical Insights
                                            </h4>
                                            <ul className="space-y-3">
                                                {caseStudy.learnings.technical.map((learning, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                                                        <span className="text-muted-foreground">{learning}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-card p-6 rounded-lg border border-border">
                                            <h4 className="font-semibold mb-4 flex items-center gap-2">
                                                <Users className="h-5 w-5 text-purple-500" /> Business Insights
                                            </h4>
                                            <ul className="space-y-3">
                                                {caseStudy.learnings.business.map((learning, i) => (
                                                    <li key={i} className="flex items-start gap-2">
                                                        <div className="h-2 w-2 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                                                        <span className="text-muted-foreground">{learning}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-8 space-y-6">
                                {/* Project Details Card */}
                                <div className="bg-card p-6 rounded-xl border border-border">
                                    <h3 className="font-semibold mb-4 text-lg">Project Details</h3>
                                    <div className="space-y-3 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Role</span>
                                            <span className="font-medium">{caseStudy.overview.role}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Duration</span>
                                            <span className="font-medium">{caseStudy.overview.timeline}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Team Size</span>
                                            <span className="font-medium">{caseStudy.overview.teamSize || 1}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Stakeholders */}
                                {caseStudy.problem.stakeholders && (
                                    <div className="bg-card p-6 rounded-xl border border-border">
                                        <h3 className="font-semibold mb-4 text-lg flex items-center gap-2">
                                            <Users className="h-5 w-5" /> Stakeholders
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {caseStudy.problem.stakeholders.map((stakeholder, i) => (
                                                <Badge key={i} variant="outline" className="text-xs">
                                                    {stakeholder}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quick Links */}
                                <div className="bg-gradient-to-br from-primary/5 to-purple-500/5 p-6 rounded-xl border border-primary/20">
                                    <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
                                    <div className="space-y-2">
                                        {project.githubUrl && (
                                            <a
                                                href={project.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Zap className="h-4 w-4" />
                                                <span>Live Demo</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}