"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ArrowLeft, Bot, Zap, Clock, CheckCircle, TrendingUp,
    DollarSign, AlertTriangle, Settings, Users,
    BarChart3, Target, PlayCircle, GitBranch, Activity,
    ArrowRight,
    Mail,
    Phone
} from "lucide-react"
import Link from "next/link"

// Enhanced Project type for automation projects
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
            context?: string
        }
        problem: {
            statement: string
            goals: string[]
            manualProcess?: {
                description: string
                timePerTask: string
                frequency: string
                errorRate?: string
                annualCost?: string
            }
        }
        methodology: {
            approach: string
            processSteps: Array<{
                title: string
                description: string
                automation?: string
            }>
            tools?: string[]
        }
        implementation: {
            workflow: Array<{
                step: string
                trigger?: string
                action: string
                output?: string
            }>
            challenges?: Array<{
                issue: string
                solution: string
            }>
            integration?: string
            testing?: string
            nextSteps?: string[]
        }
        results: {
            metrics: Array<{
                label: string
                value: string
                improvement?: string
            }>
            impact: string
            roi?: {
                timeSaved: string
                costSavings: string
                paybackPeriod: string
                annualValue?: string
            }
        }
        maintenance?: {
            monitoring: string[]
            updates: string
            scalability?: string
        }
        contact?: {
            email: string
            phone: string
        }
    }
}

// Sample automation project
const sampleProject: Project = {
    title: "AI-Powered Customer Support Automation",
    description: "End-to-end automation reducing support ticket resolution time by 73% and saving 1,200+ hours annually",
    githubUrl: "https://github.com/example/support-automation",
    demoUrl: "https://demo.example.com",
    technologies: ["Python", "LangChain", "OpenAI GPT-4", "n8n", "Zapier", "Airtable", "Slack", "Intercom"],
    caseStudy: {
        overview: {
            summary: "Built an intelligent automation system that handles 85% of tier-1 support tickets automatically, reducing average resolution time from 4 hours to 65 minutes while maintaining 94% customer satisfaction",
            role: "Automation Engineer",
            timeline: "6 weeks",
            teamSize: 2,
            context: "SaaS startup with 5,000+ users experiencing rapid growth. Support team (3 people) drowning in 200+ daily tickets, causing 12-hour response times and customer churn"
        },
        problem: {
            statement: "Support team spending 80% of time on repetitive questions (password resets, billing inquiries, basic troubleshooting). Average response time of 12 hours leading to 15% monthly churn. Manual ticket triage taking 45 minutes daily. No visibility into common issues.",
            goals: [
                "Reduce response time to under 1 hour",
                "Automate 70%+ of tier-1 tickets",
                "Cut support costs by 40%",
                "Maintain >90% CSAT score"
            ],
            manualProcess: {
                description: "Support agents manually: (1) Read each ticket in Intercom, (2) Search knowledge base for answer, (3) Copy/paste response template, (4) Customize for user's context, (5) Update CRM, (6) Follow up if needed",
                timePerTask: "15 minutes",
                frequency: "200 tickets/day",
                errorRate: "8% (wrong template or missing context)",
                annualCost: "$120,000 (50 hours/week × $50/hr × 48 weeks)"
            }
        },
        methodology: {
            approach: "Multi-layered automation combining AI classification, intelligent routing, and autonomous response generation. Built custom RAG system using company knowledge base, then orchestrated workflows with n8n to handle ticket intake, processing, and follow-up without human intervention.",
            processSteps: [
                {
                    title: "Ticket Classification",
                    description: "Incoming support tickets automatically categorized by type (billing, technical, account, feature request) and urgency using GPT-4 fine-tuned on 3 months of historical tickets",
                    automation: "OpenAI API + custom prompt engineering achieving 96% classification accuracy"
                },
                {
                    title: "Intent Recognition & Knowledge Retrieval",
                    description: "Extract user intent, query vector database of 500+ help articles and past resolutions, retrieve top 3 relevant solutions with semantic search",
                    automation: "LangChain + Pinecone vector DB with embedding similarity threshold of 0.85"
                },
                {
                    title: "Intelligent Response Generation",
                    description: "Generate personalized response using retrieved context, user account data, and conversation history. Inject relevant screenshots, links, and step-by-step instructions",
                    automation: "GPT-4 with custom system prompt, user context injection, and response validation"
                },
                {
                    title: "Automated Routing & Escalation",
                    description: "If confidence score <0.75 or sentiment is negative, escalate to human agent with full context and AI-suggested response. Otherwise, send automated reply and mark resolved",
                    automation: "n8n workflow with conditional logic and Slack notifications for escalations"
                },
                {
                    title: "Follow-up & Feedback Loop",
                    description: "Send automated follow-up after 24 hours if ticket unresolved. Collect CSAT rating. Feed low-rated responses back into training pipeline",
                    automation: "Scheduled n8n workflows + Airtable for feedback tracking"
                }
            ],
            tools: ["OpenAI GPT-4 for NLU/NLG", "LangChain for RAG pipeline", "Pinecone for vector storage", "n8n for workflow orchestration", "Airtable for data tracking", "Intercom API for ticket management", "Slack for human-in-the-loop alerts"]
        },
        implementation: {
            workflow: [
                {
                    step: "1. Ticket Arrives",
                    trigger: "New message in Intercom",
                    action: "Webhook triggers n8n workflow, extracts ticket content and metadata",
                    output: "Structured ticket object with user ID, message, timestamp"
                },
                {
                    step: "2. AI Classification",
                    action: "Send to GPT-4 for category + urgency scoring (0-100)",
                    output: "Category (billing/technical/account/feature), urgency score, confidence level"
                },
                {
                    step: "3. Knowledge Search",
                    action: "Generate embedding, query Pinecone for similar past tickets and help docs",
                    output: "Top 3 relevant knowledge base articles with similarity scores"
                },
                {
                    step: "4. Response Generation",
                    action: "GPT-4 generates personalized response using retrieved context + user data from Airtable",
                    output: "Draft response with inline links, confidence score, and suggested action"
                },
                {
                    step: "5. Quality Check & Routing",
                    action: "If confidence >0.75 AND sentiment neutral/positive → auto-send. Otherwise → Slack notification to human agent",
                    output: "Either auto-resolved ticket OR escalation to agent with AI draft"
                },
                {
                    step: "6. Tracking & Learning",
                    action: "Log all decisions to Airtable. Schedule 24hr follow-up. Track CSAT",
                    output: "Analytics dashboard showing automation rate, CSAT, common issues"
                }
            ],
            challenges: [
                {
                    issue: "Initial AI responses too generic, customers complained about 'robotic' tone",
                    solution: "Added user personality detection (formal vs casual) and injected brand voice guidelines into system prompt. Trained on 50 best agent responses. Increased CSAT from 78% to 94%"
                },
                {
                    issue: "Knowledge base retrieving irrelevant articles due to technical jargon overlap",
                    solution: "Implemented hybrid search (semantic + keyword). Added metadata filters (product version, user plan). Improved retrieval accuracy from 71% to 96%"
                },
                {
                    issue: "Escalated tickets missing context, agents re-reading entire thread",
                    solution: "Built escalation template with: (1) Ticket summary, (2) AI's attempted solution, (3) Why it escalated, (4) Suggested next steps. Cut agent context-gathering time from 5 min to 30 sec"
                }
            ],
            integration: "Integrated with existing Intercom (ticketing), Airtable (CRM), Slack (team comms). Used Intercom's webhook API for real-time ticket events. Built custom n8n nodes for Airtable data enrichment. Zero changes to existing support team workflows—automation layer sits transparently in background",
            testing: "Ran 2-week shadow mode where AI generated responses but humans reviewed before sending. Tuned confidence thresholds based on 500+ test tickets. A/B tested with 20% of traffic before full rollout. Implemented automatic rollback if error rate >5%",
            nextSteps: [
                "Expand automation to specialized tier-2 tickets",
                "Integrate voice support via whisper API",
                "Self-service portal for customers"
            ]
        },
        results: {
            metrics: [
                { label: "Automation Rate", value: "85%", improvement: "↑ from 0%" },
                { label: "Avg Resolution Time", value: "65 min", improvement: "↓ 73% (was 4hr)" },
                { label: "Response Time", value: "8 min", improvement: "↓ 94% (was 12hr)" },
                { label: "Ticket Volume", value: "170/day", improvement: "↓ 15% (deflection)" },
                { label: "CSAT Score", value: "94%", improvement: "↑ 9pts (was 85%)" },
                { label: "Agent Capacity", value: "+40 hrs/wk", improvement: "Now handling escalations" }
            ],
            impact: "System now handles 170 tickets per day automatically (85% of total volume). Human agents focus exclusively on complex issues requiring empathy, account changes, or technical debugging. Response times dropped from 12 hours to 8 minutes. Customer satisfaction actually improved despite automation.",
            roi: {
                timeSaved: "1,200 hours/year",
                costSavings: "$60,000 annually",
                paybackPeriod: "6 weeks (implementation cost $7,000)",
                annualValue: "$53,000 net savings in year 1, $60,000/year ongoing"
            }
        },
        maintenance: {
            monitoring: [
                "Daily automation rate and CSAT tracking in Grafana dashboard",
                "Weekly review of escalated tickets to identify knowledge gaps",
                "Monthly fine-tuning of classification model with new ticket patterns",
                "Automated alerts if automation rate drops below 75% or CSAT below 90%",
                "Cost tracking: OpenAI API usage averaging $240/month ($0.015/ticket)"
            ],
            updates: "Knowledge base sync runs nightly. Classification model retrained monthly with new tickets. System automatically suggests new knowledge base articles when it sees recurring questions it can't answer (identified 12 documentation gaps in first 3 months)",
            scalability: "Architecture supports 10x current volume with no code changes. n8n workflows are modular—added new integrations (Zendesk, HubSpot) in under 2 hours. Knowledge base vectorization parallelized to handle 10K+ articles"
        },
        contact: {
            email: "hello@example.com",
            phone: "+1 (555) 000-0000"
        }
    }
}

export function AiAutomationLayout({ project = sampleProject }: { project?: Project }) {
    const { caseStudy } = project

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <div className="border-b border-border/40 bg-gradient-to-br from-emerald-950/20 via-background to-blue-950/20">
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <Link
                        href="/"
                        className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-8"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                    </Link>

                    <div className="grid md:grid-cols-5 gap-8 items-start">
                        {/* Left: Project Info */}
                        <div className="md:col-span-3 space-y-6">
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                    <Bot className="h-6 w-6 text-emerald-500" />
                                </div>
                                <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/5">
                                    AI Automation
                                </Badge>
                            </div>

                            <div>
                                <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {caseStudy?.overview.summary || project.description}
                                </p>
                            </div>

                            {/* ROI Highlight */}
                            {caseStudy?.results.roi && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20">
                                        <Clock className="h-5 w-5 text-green-500 mb-2" />
                                        <div className="text-2xl font-bold">{caseStudy.results.roi.timeSaved}</div>
                                        <div className="text-xs text-muted-foreground">Time Saved</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20">
                                        <DollarSign className="h-5 w-5 text-blue-500 mb-2" />
                                        <div className="text-2xl font-bold">{caseStudy.results.roi.costSavings}</div>
                                        <div className="text-xs text-muted-foreground">Annual Savings</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                                        <TrendingUp className="h-5 w-5 text-purple-500 mb-2" />
                                        <div className="text-2xl font-bold">{caseStudy.results.roi.paybackPeriod}</div>
                                        <div className="text-xs text-muted-foreground">Payback</div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20">
                                        <BarChart3 className="h-5 w-5 text-orange-500 mb-2" />
                                        <div className="text-2xl font-bold">{caseStudy.results.metrics[0]?.value || "N/A"}</div>
                                        <div className="text-xs text-muted-foreground">Automation Rate</div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                {project.githubUrl && (
                                    <Button variant="outline" asChild>
                                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                            <GitBranch className="mr-2 h-4 w-4" /> View Code
                                        </a>
                                    </Button>
                                )}
                                {project.demoUrl && (
                                    <Button asChild>
                                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                                            <PlayCircle className="mr-2 h-4 w-4" /> Live Demo
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </div>

                        {/* Right: Workflow Visual */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 blur-3xl rounded-full opacity-50" />
                                <div className="relative bg-card/80 backdrop-blur-md border border-border p-6 rounded-2xl shadow-xl">
                                    <h3 className="font-semibold mb-4 text-center text-muted-foreground uppercase text-xs tracking-wider flex items-center justify-center gap-2">
                                        <Settings className="h-4 w-4" /> Automated Workflow
                                    </h3>
                                    <div className="space-y-3">
                                        {caseStudy?.implementation.workflow.slice(0, 4).map((step, i) => (
                                            <div key={i}>
                                                {i > 0 && (
                                                    <div className="flex justify-center my-2">
                                                        <div className="h-6 w-px bg-emerald-500/30" />
                                                    </div>
                                                )}
                                                <div className="p-3 bg-background rounded-lg border border-border hover:border-emerald-500/30 transition-colors">
                                                    <div className="flex items-center justify-between mb-1">
                                                        <span className="text-xs font-mono text-muted-foreground">{step.step}</span>
                                                        {step.trigger && (
                                                            <Badge variant="secondary" className="text-[10px] bg-emerald-500/10 text-emerald-500">
                                                                {step.trigger ? "Trigger" : "Auto"}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-medium">{step.action}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {!caseStudy ? (
                <div className="container mx-auto px-4 py-12 max-w-7xl">
                    <div className="p-12 border border-dashed rounded-xl text-center text-muted-foreground">
                        Case study details coming soon. This automation project demonstrates measurable ROI through time savings and cost reduction.
                    </div>
                </div>
            ) : (
                <div className="container mx-auto px-4 py-12 max-w-7xl">

                    {/* Business Context */}
                    {caseStudy.overview.context && (
                        <div className="mb-12 p-6 rounded-xl bg-blue-950/10 border border-blue-500/20">
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-500" /> Business Context
                            </h3>
                            <p className="text-muted-foreground">{caseStudy.overview.context}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-3 space-y-12">

                            {/* The Manual Bottleneck */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <AlertTriangle className="h-7 w-7 text-orange-500" /> The Manual Bottleneck
                                </h2>

                                <div className="space-y-6">
                                    <div className="bg-card p-6 rounded-lg border border-border">
                                        <p className="text-lg leading-relaxed mb-4">{caseStudy.problem.statement}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {caseStudy.problem.goals.map((goal, i) => (
                                                <Badge key={i} variant="outline" className="bg-background">
                                                    <CheckCircle className="w-3 h-3 mr-1 text-green-500" /> {goal}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Manual Process Breakdown */}
                                    {caseStudy.problem.manualProcess && (
                                        <div className="bg-orange-950/10 p-6 rounded-lg border border-orange-500/20">
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <Clock className="h-5 w-5 text-orange-500" /> Manual Process (Before Automation)
                                            </h4>
                                            <p className="text-muted-foreground mb-4">{caseStudy.problem.manualProcess.description}</p>

                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                <div className="p-3 bg-background rounded border border-border">
                                                    <div className="text-sm text-muted-foreground mb-1">Time Per Task</div>
                                                    <div className="text-xl font-bold">{caseStudy.problem.manualProcess.timePerTask}</div>
                                                </div>
                                                <div className="p-3 bg-background rounded border border-border">
                                                    <div className="text-sm text-muted-foreground mb-1">Frequency</div>
                                                    <div className="text-xl font-bold">{caseStudy.problem.manualProcess.frequency}</div>
                                                </div>
                                                {caseStudy.problem.manualProcess.errorRate && (
                                                    <div className="p-3 bg-background rounded border border-border">
                                                        <div className="text-sm text-muted-foreground mb-1">Error Rate</div>
                                                        <div className="text-xl font-bold text-red-500">{caseStudy.problem.manualProcess.errorRate}</div>
                                                    </div>
                                                )}
                                                {caseStudy.problem.manualProcess.annualCost && (
                                                    <div className="p-3 bg-background rounded border border-border">
                                                        <div className="text-sm text-muted-foreground mb-1">Annual Cost</div>
                                                        <div className="text-xl font-bold text-orange-500">{caseStudy.problem.manualProcess.annualCost}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* The Automation Solution */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Zap className="h-7 w-7 text-emerald-500" /> The Automation Solution
                                </h2>

                                <div className="space-y-6">
                                    <div className="bg-card p-6 rounded-lg border border-border">
                                        <h3 className="font-semibold text-lg mb-3">Approach</h3>
                                        <p className="text-muted-foreground leading-relaxed">{caseStudy.methodology.approach}</p>
                                    </div>

                                    {/* Implementation Steps */}
                                    <div className="space-y-4">
                                        {caseStudy.methodology.processSteps.map((step, i) => (
                                            <div key={i} className="bg-card p-5 rounded-lg border border-border hover:border-emerald-500/30 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center font-bold text-emerald-500">
                                                        {i + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-lg mb-2">{step.title}</h4>
                                                        <p className="text-muted-foreground mb-3">{step.description}</p>
                                                        {step.automation && (
                                                            <div className="p-3 bg-emerald-950/20 rounded border border-emerald-500/20">
                                                                <div className="text-xs font-semibold text-emerald-500 mb-1">AUTOMATION</div>
                                                                <div className="text-sm font-mono text-muted-foreground">{step.automation}</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Technical Implementation */}
                            {caseStudy.implementation.workflow && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <Settings className="h-7 w-7 text-blue-500" /> Technical Implementation
                                    </h2>

                                    <div className="bg-[#0a0e1a] p-8 rounded-xl border border-blue-500/20 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-20" />

                                        <div className="relative z-10 space-y-6">
                                            {caseStudy.implementation.workflow.map((item, i) => (
                                                <div key={i} className="flex gap-4">
                                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-bold text-blue-300">
                                                        {i + 1}
                                                    </div>
                                                    <div className="flex-1 p-4 bg-slate-900/50 rounded-lg border border-blue-500/20 backdrop-blur-sm">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <h4 className="font-semibold text-blue-300">{item.step}</h4>
                                                            {item.trigger && (
                                                                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                                                                    {item.trigger}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-slate-300 text-sm mb-2">{item.action}</p>
                                                        {item.output && (
                                                            <div className="text-xs font-mono text-slate-400 bg-slate-950/50 p-2 rounded border border-slate-700">
                                                                → {item.output}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Integration & Testing */}
                                    {(caseStudy.implementation.integration || caseStudy.implementation.testing) && (
                                        <div className="grid md:grid-cols-2 gap-6 mt-6">
                                            {caseStudy.implementation.integration && (
                                                <div className="bg-card p-6 rounded-lg border border-border">
                                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                        <Activity className="h-5 w-5 text-purple-500" /> Integration
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">{caseStudy.implementation.integration}</p>
                                                </div>
                                            )}
                                            {caseStudy.implementation.testing && (
                                                <div className="bg-card p-6 rounded-lg border border-border">
                                                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                        <CheckCircle className="h-5 w-5 text-green-500" /> Testing & Validation
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">{caseStudy.implementation.testing}</p>
                                                </div>
                                            )}
                                        </div>
                                    )}
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
                                                <div className="flex items-start gap-4">
                                                    <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                                                    <div className="flex-1 space-y-3">
                                                        <div>
                                                            <h4 className="font-semibold text-lg mb-1 text-yellow-600 dark:text-yellow-400">Challenge</h4>
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

                            {/* Results & ROI */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <TrendingUp className="h-7 w-7 text-green-500" /> Results & ROI
                                </h2>

                                <div className="space-y-6">
                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {caseStudy.results.metrics.map((metric, i) => (
                                            <div key={i} className="p-5 bg-gradient-to-br from-card to-card/50 rounded-lg border border-border hover:border-primary/30 transition-colors">
                                                <p className="text-muted-foreground text-sm mb-2">{metric.label}</p>
                                                <p className="text-lg font-semibold mb-2">{metric.value}</p>
                                                {metric.improvement && <p className="text-muted-foreground text-sm">{metric.improvement}</p>}
                                            </div>
                                        ))}
                                    </div>

                                    {/* ROI */}
                                    {caseStudy.results.roi && (
                                        <div className="bg-card p-6 rounded-lg border border-border">
                                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                <TrendingUp className="h-5 w-5 text-green-500" /> ROI
                                            </h4>
                                            <p className="text-sm text-muted-foreground">{caseStudy.results.impact}</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Next Steps */}
                            {caseStudy.implementation.nextSteps && (
                                <section>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                        <ArrowRight className="h-7 w-7 text-blue-500" /> Next Steps
                                    </h2>

                                    <div className="space-y-4">
                                        {caseStudy.implementation.nextSteps.map((step, i) => (
                                            <div key={i} className="bg-card p-6 rounded-lg border border-border">
                                                <h4 className="font-semibold mb-3 flex items-center gap-2">
                                                    <ArrowRight className="h-5 w-5 text-blue-500" /> Step {i + 1}
                                                </h4>
                                                <p className="text-sm text-muted-foreground">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Contact */}
                            <section>
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                    <Mail className="h-7 w-7 text-blue-500" /> Contact
                                </h2>

                                <div className="space-y-4">
                                    <div className="bg-card p-6 rounded-lg border border-border">
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <Mail className="h-5 w-5 text-blue-500" /> Email
                                        </h4>
                                        <p className="text-sm text-muted-foreground">{caseStudy.contact?.email}</p>
                                    </div>
                                    <div className="bg-card p-6 rounded-lg border border-border">
                                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                                            <Phone className="h-5 w-5 text-blue-500" /> Phone
                                        </h4>
                                        <p className="text-sm text-muted-foreground">{caseStudy.contact?.phone}</p>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )
            }
        </div>
    )
}