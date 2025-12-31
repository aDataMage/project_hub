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

// Sample data viz project
const sampleProject: Project = {
    title: "Healthcare Analytics Dashboard: Emergency Department Performance",
    description: "Interactive dashboard reducing ED wait time analysis from 4 hours to 3 minutes, enabling real-time operational decisions",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
    liveUrl: "https://public.tableau.com/app/profile/example/viz/EDDashboard",
    githubUrl: "https://github.com/example/ed-dashboard",
    technologies: ["Tableau", "Python", "PostgreSQL", "D3.js", "Figma"],
    caseStudy: {
        overview: {
            summary: "Designed and built an interactive analytics dashboard for a 500-bed hospital's Emergency Department, transforming complex patient flow data into actionable insights that reduced average wait times by 23% within 6 months",
            role: "Lead Data Visualization Designer",
            timeline: "3 months",
            client: "Metro General Hospital",
            audience: "ED Directors, Charge Nurses, Hospital Administrators"
        },
        problem: {
            statement: "Emergency Department leadership was making critical staffing and resource allocation decisions based on week-old Excel reports. They couldn't identify bottlenecks in real-time, leading to 6-hour average wait times and 15% of patients leaving without being seen (LWBS).",
            businessContext: "Hospital facing CMS penalties for excessive wait times. ED seeing 180 patients/day with only 40 beds. Leadership needed visibility into: patient flow bottlenecks, staff efficiency, bed turnover rates, and triage accuracy—updated in real-time, not weekly.",
            userNeeds: [
                "See current ED status at a glance (under 10 seconds)",
                "Identify which stage of care is causing delays",
                "Compare today's performance vs. historical trends",
                "Drill down from high-level metrics to individual patients",
                "Access from any device (desktop, tablet, mobile in hallways)"
            ],
            dataComplexity: "Data scattered across 4 systems: EMR (patient records), Badge System (staff clock-ins), Bed Management (capacity), Triage System (acuity scores). 50,000+ patient visits/year with 15+ timestamps per visit. Required real-time ETL pipeline."
        },
        methodology: {
            approach: "User-centered design process: shadowed ED staff for 2 weeks to understand workflow, conducted 12 stakeholder interviews, created 3 prototype iterations tested with real users. Focused on \"information scent\"—users should find what they need in 3 clicks or less.",
            processSteps: [
                {
                    title: "User Research & Discovery",
                    description: "Shadowed nurses, doctors, and administrators during shifts. Mapped decision points: What questions do they ask? What data do they need? When? Discovered that charge nurses check dashboard every 15 minutes during shift changes."
                },
                {
                    title: "Data Architecture & Integration",
                    description: "Built ETL pipeline integrating 4 source systems. Created unified data model with 8 core metrics (Wait Time, LWBS Rate, Bed Utilization, etc.). Refreshes every 5 minutes. Designed star schema optimized for Tableau queries."
                },
                {
                    title: "Information Architecture",
                    description: "Organized dashboard into 3 views: (1) Executive Summary (30-second glance), (2) Operational Detail (charge nurses' workstation), (3) Historical Analysis (administrators planning staffing). Each view accessible via tabs."
                },
                {
                    title: "Visual Design & Prototyping",
                    description: "Created low-fidelity wireframes in Figma. Tested with 5 nurses—learned they need BIG numbers (visible from 10 feet away). Iterated to high-fidelity mockups using hospital brand colors. Built interactive Tableau prototype."
                },
                {
                    title: "User Testing & Refinement",
                    description: "Deployed dashboard to pilot group of 8 staff for 2 weeks. Collected feedback via surveys and observation. Key change: added \"alert\" badges when metrics exceed thresholds (e.g., wait time >4 hours turns red). Increased engagement by 60%."
                },
                {
                    title: "Training & Rollout",
                    description: "Created 5-minute video tutorial. Held 30-minute training sessions for all ED staff (80 people). Provided quick-reference card with key interactions. Full rollout achieved 95% adoption within 1 month."
                }
            ],
            designPrinciples: [
                "Information density: Show maximum relevant data without clutter",
                "Progressive disclosure: Simple overview → detailed drill-downs",
                "Contextual comparison: Always show benchmarks (targets, averages, trends)",
                "Actionable insights: Every chart should answer 'So what? Now what?'",
                "Mobile-first: Critical metrics visible on tablets nurses carry"
            ]
        },
        design: {
            colorPalette: [
                { name: "Status Good", hex: "#10b981", usage: "Metrics meeting target (e.g., wait time <3hrs)" },
                { name: "Status Warning", hex: "#f59e0b", usage: "Metrics approaching threshold (e.g., 3-4hrs)" },
                { name: "Status Critical", hex: "#ef4444", usage: "Metrics exceeding threshold (e.g., >4hrs)" },
                { name: "Primary Accent", hex: "#2563eb", usage: "Interactive elements, drill-down links" },
                { name: "Neutral Gray", hex: "#64748b", usage: "Supporting text, grid lines, secondary info" }
            ],
            visualHierarchy: "F-pattern layout: Top left shows most critical metric (current ED census). Eye flows right to trends, then down to detailed breakdowns. Used size (largest = most important), color (alerts stand out), and position (top = priority) to guide attention.",
            interactivity: "Click any bar/line to filter entire dashboard to that subset. Hover for detailed tooltips with patient counts and timestamps. Time scrubber allows playback of historical day (\"what did Monday look like?\"). Bookmark key states (night shift vs. day shift views).",
            accessibility: "WCAG AA compliant: 4.5:1 contrast ratios, colorblind-safe palette tested with simulator, alt text for all charts, keyboard navigation supported, screen reader compatible with proper ARIA labels."
        },
        implementation: {
            dataProcessing: "Python ETL pipeline runs every 5 minutes: (1) Query 4 source databases, (2) Calculate derived metrics (time-in-stage, bed turnover rate), (3) Detect anomalies (sudden spikes), (4) Write to PostgreSQL data warehouse. Handles 10K+ rows/day. Logs errors to Slack for monitoring.",
            visualization: [
                {
                    type: "KPI Cards (Large Numbers)",
                    purpose: "Show current status at a glance: Total ED Census, Avg Wait Time, LWBS Rate, Bed Utilization",
                    insight: "Nurses can assess situation from 10 feet away in under 5 seconds. Color-coded alerts (green/yellow/red) instantly communicate urgency."
                },
                {
                    type: "Sparkline Trends",
                    purpose: "Show how each KPI has changed over past 24 hours",
                    insight: "Context matters: Wait time of 4 hours is different if it's been steady vs. spiking. Trends reveal patterns (morning rush, shift change delays)."
                },
                {
                    type: "Patient Flow Funnel",
                    purpose: "Visualize where patients are stuck: Arrival → Triage → Waiting → In Treatment → Discharge",
                    insight: "Identified that 60% of wait time was in 'Waiting Room' stage—not triage or treatment. Led to adding triage nurses during peak hours."
                },
                {
                    type: "Heatmap Calendar",
                    purpose: "Show busiest days/hours over past 3 months",
                    insight: "Revealed predictable patterns: Mondays 8-10am are worst. Enabled proactive staffing adjustments before shifts, not reactive scrambling."
                },
                {
                    type: "Staff Efficiency Scatter Plot",
                    purpose: "Compare individual providers: patients seen vs. average time-per-patient",
                    insight: "Not for punishment—for learning. High performers mentor others on workflow efficiency. Identified best practices (parallel charting technique)."
                }
            ],
            challenges: [
                {
                    issue: "Initial design showed TOO MUCH data. Users felt overwhelmed—60+ metrics on one screen. Engagement was low.",
                    solution: "Applied 'edit ruthlessly' principle. Cut to 12 core metrics based on user interviews: 'What decisions do you make daily?' Moved secondary metrics to drill-down pages. Result: Users spend 4x longer with streamlined dashboard."
                },
                {
                    issue: "Real-time data had 10-15 minute lag due to EMR batch exports. Dashboard showed 'stale' status.",
                    solution: "Worked with IT to enable EMR API access (instead of batch files). Reduced lag to 5 minutes. Added 'Last Updated' timestamp prominently so users trust data freshness."
                },
                {
                    issue: "Mobile version (tablet) unreadable—tiny text, charts too small for hallway quick-checks.",
                    solution: "Redesigned with mobile-first approach: Single-column layout, minimum 24px font for numbers, tap-friendly 48px touch targets. Created separate 'mobile' dashboard variant optimized for tablets."
                }
            ]
        },
        results: {
            metrics: [
                { label: "Avg Wait Time", value: "↓ 23% (6hr → 4.6hr)" },
                { label: "LWBS Rate", value: "↓ 40% (15% → 9%)" },
                { label: "Analysis Time", value: "↓ 95% (4hr → 3min)" },
                { label: "Staff Adoption", value: "95% daily usage" },
                { label: "Decision Speed", value: "↑ 3x faster" },
                { label: "Patient Throughput", value: "↑ 12 patients/day" }
            ],
            impact: "Dashboard became the 'single source of truth' for ED operations. Charge nurses now check it every 15 minutes to make staffing adjustments. Administrators use it in weekly meetings to identify improvement opportunities. Most importantly: patients are seen faster and fewer leave without treatment.",
            userFeedback: [
                "\"Finally, I can see what's happening in real-time instead of guessing.\" – Charge Nurse",
                "\"We made data-driven decisions for the first time ever. Game changer.\" – ED Director",
                "\"I can spot trends in seconds that used to take me hours in Excel.\" – Administrator",
                "\"The color coding is brilliant—I know immediately if we're in trouble.\" – Triage Nurse"
            ],
            businessOutcome: "Hospital avoided $1.2M in CMS penalties by reducing wait times below threshold. Increased patient satisfaction scores from 62% to 78% (Press Ganey survey). ED can now handle 12 additional patients/day with same staffing, generating $800K additional annual revenue."
        }
    }
}

export function DataVizLayout({ project = sampleProject }: { project?: Project }) {
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
                    <Link
                        href="/"
                        className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-6 backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full text-sm"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                    </Link>

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