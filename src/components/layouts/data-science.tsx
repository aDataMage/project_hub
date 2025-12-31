"use client"

import { Project } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, ExternalLink, Github, Database, Brain, BarChart, Target, Flag, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function DataScienceLayout({ project }: { project: Project }) {
    const { caseStudy } = project
    if (!caseStudy) return <div className="p-8 text-center text-muted-foreground">Case study content coming soon...</div>

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Top Navigation */}
            <div className="container mx-auto px-4 py-6">
                <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                </Link>
            </div>

            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-16">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="border-primary/50 text-primary">Data Science Case Study</Badge>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{project.technologies?.join(" • ")}</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">{caseStudy.overview.summary}</p>

                    <div className="flex flex-wrap gap-6 py-4 text-sm text-muted-foreground border-y border-border/40">
                        <div>
                            <span className="font-semibold text-foreground block">Role</span>
                            {caseStudy.overview.role}
                        </div>
                        <div>
                            <span className="font-semibold text-foreground block">Timeline</span>
                            {caseStudy.overview.timeline}
                        </div>
                        {caseStudy.overview.teamSize && (
                            <div>
                                <span className="font-semibold text-foreground block">Team</span>
                                {caseStudy.overview.teamSize} Person(s)
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4 pt-4">
                        {project.liveUrl && (
                            <Button asChild size="lg" className="rounded-full">
                                <a href={project.liveUrl} target="_blank">
                                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                                </a>
                            </Button>
                        )}
                        {project.githubUrl && (
                            <Button asChild variant="outline" size="lg" className="rounded-full">
                                <a href={project.githubUrl} target="_blank">
                                    <Github className="mr-2 h-4 w-4" /> View Code
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </section>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">

                {/* Sidebar Navigation */}
                <aside className="lg:col-span-3 hidden lg:block">
                    <div className="sticky top-12 space-y-2 border-l border-border/50 pl-4 text-sm">
                        <p className="font-semibold text-foreground mb-4 uppercase tracking-widest text-xs">PACE Framework</p>
                        <a href="#plan" className="block text-muted-foreground hover:text-primary transition-colors py-1">1. Plan (Problem)</a>
                        <a href="#analyze" className="block text-muted-foreground hover:text-primary transition-colors py-1">2. Analyze & Construct</a>
                        <a href="#execute" className="block text-muted-foreground hover:text-primary transition-colors py-1">3. Execute (Results)</a>
                    </div>
                </aside>

                {/* Content Area */}
                <div className="lg:col-span-9 space-y-20">

                    {/* Section 1: Plan (Problem) */}
                    <section id="plan" className="space-y-8 scroll-mt-20">
                        <div className="flex items-center gap-3 text-primary mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 font-bold border border-primary/20">1</span>
                            <h2 className="text-3xl font-bold">Plan Phase</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <Target className="w-5 h-5 text-red-400" /> Problem Statement
                                </h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {caseStudy.problem.statement}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-semibold flex items-center gap-2">
                                    <Flag className="w-5 h-5 text-blue-400" /> Business Goals
                                </h3>
                                <ul className="space-y-3">
                                    {caseStudy.problem.goals.map((goal, i) => (
                                        <li key={i} className="flex gap-3 text-muted-foreground">
                                            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                            {goal}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-6 rounded-lg border border-border/50">
                            <span className="font-semibold text-foreground uppercase text-xs tracking-wider block mb-2">Business Context</span>
                            <p className="text-muted-foreground italic">"{caseStudy.problem.businessContext}"</p>
                        </div>
                    </section>

                    <Separator />

                    {/* Section 2: Analyze & Construct (Methodology) */}
                    <section id="analyze" className="space-y-8 scroll-mt-20">
                        <div className="flex items-center gap-3 text-primary mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 font-bold border border-primary/20">2</span>
                            <h2 className="text-3xl font-bold">Methodology</h2>
                        </div>

                        <p className="text-lg text-muted-foreground">{caseStudy.methodology.approach}</p>

                        <div className="grid gap-6 mt-8">
                            {caseStudy.methodology.processSteps.map((step, idx) => (
                                <div key={idx} className="group relative border-l-2 border-border pl-6 pb-2 hover:border-primary transition-colors">
                                    <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-primary transition-colors" />
                                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                                    <p className="text-muted-foreground">{step.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Mock Code Block */}
                        <div className="bg-[#0d1117] rounded-lg p-6 font-mono text-sm overflow-x-auto shadow-2xl border border-white/5 mt-8">
                            <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-2">
                                <span className="text-muted-foreground text-xs">model_training.py</span>
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-purple-400">from <span className="text-white">sklearn.ensemble</span> import <span className="text-yellow-200">RandomForestClassifier</span></p>
                                <p className="text-purple-400">from <span className="text-white">imblearn.over_sampling</span> import <span className="text-yellow-200">SMOTE</span></p>
                                <br />
                                <p className="text-slate-500"># Handle imbalances</p>
                                <p className="text-white">smote = <span className="text-yellow-200">SMOTE</span>(random_state=<span className="text-orange-400">42</span>)</p>
                                <p className="text-white">X_res, y_res = smote.fit_resample(X_train, y_train)</p>
                                <br />
                                <p className="text-slate-500"># Train Optimized Model</p>
                                <p className="text-white">model = <span className="text-yellow-200">RandomForestClassifier</span>(**best_params)</p>
                                <p className="text-white">model.fit(X_res, y_res)</p>
                            </div>
                        </div>
                    </section>

                    <Separator />

                    {/* Section 3: Execute (Results) */}
                    <section id="execute" className="space-y-8 scroll-mt-20">
                        <div className="flex items-center gap-3 text-primary mb-6">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 font-bold border border-primary/20">3</span>
                            <h2 className="text-3xl font-bold">Results & Impact</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {caseStudy.results.metrics.map((metric, i) => (
                                <div key={i} className="bg-card p-6 rounded-xl border border-border shadow-sm">
                                    <p className="text-sm text-muted-foreground mb-2">{metric.label}</p>
                                    <p className="text-4xl font-bold text-primary tracking-tight">{metric.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-gradient-to-br from-primary/10 via-background to-background p-8 rounded-2xl border border-primary/10">
                            <h3 className="text-xl font-bold mb-4">Business Impact</h3>
                            <p className="text-lg leading-relaxed">{caseStudy.results.impact}</p>
                        </div>

                        {caseStudy.results.learnings && caseStudy.results.learnings.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Key Learnings</h3>
                                <ul className="grid md:grid-cols-2 gap-4">
                                    {caseStudy.results.learnings.map((learning, i) => (
                                        <li key={i} className="bg-muted/20 p-4 rounded-lg text-sm text-muted-foreground border border-border/50">
                                            • {learning}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>

                </div>
            </div>
        </div>
    )
}
