"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    ArrowLeft, Github, Loader2, Sparkles, Check,
    ExternalLink, Star, X, Save
} from "lucide-react"
import Link from "next/link"
import CaseStudyForm from "@/components/admin/CaseStudyForm"

interface GitHubRepo {
    name: string
    fullName: string
    description: string | null
    githubUrl: string
    homepage: string | null
    topics: string[]
    language: string | null
    stars: number
    createdAt: string
    updatedAt: string
}

interface GeneratedProject {
    title: string
    slug: string
    description: string
    tags: string[]
    category: string
    projectType: string
    technologies: string[]
    externalBadge: string | null
    githubUrl: string
    caseStudyEnabled: boolean
    caseStudy?: any
}

interface ExistingProject {
    slug: string
    githubUrl?: string
}

export default function ImportPage() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [repos, setRepos] = useState<GitHubRepo[]>([])
    const [existingProjects, setExistingProjects] = useState<ExistingProject[]>([])
    const [loadingRepos, setLoadingRepos] = useState(true)
    const [generatingFor, setGeneratingFor] = useState<string | null>(null)
    const [previewProject, setPreviewProject] = useState<GeneratedProject | null>(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            loadData()
        }
    }, [isAuthenticated])

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth")
            const data = await res.json()
            if (!data.authenticated) {
                router.push("/admin")
            } else {
                setIsAuthenticated(true)
            }
        } catch {
            router.push("/admin")
        }
    }

    const loadData = async () => {
        setLoadingRepos(true)
        try {
            // Load repos and existing projects in parallel
            const [reposRes, projectsRes] = await Promise.all([
                fetch("/api/github/repos"),
                fetch("/api/projects")
            ])

            if (reposRes.ok) {
                const reposData = await reposRes.json()
                setRepos(reposData.repos || [])
            }

            if (projectsRes.ok) {
                const projectsData = await projectsRes.json()
                setExistingProjects(projectsData.projects || [])
            }
        } catch (e) {
            console.error("Failed to load data:", e)
        } finally {
            setLoadingRepos(false)
        }
    }

    const isRepoImported = (repo: GitHubRepo) => {
        return existingProjects.some(p =>
            p.githubUrl?.toLowerCase() === repo.githubUrl.toLowerCase()
        )
    }

    const handleGenerate = async (repo: GitHubRepo) => {
        setGeneratingFor(repo.name)
        setError("")

        try {
            const res = await fetch("/api/github/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    repoName: repo.name,
                    repoUrl: repo.githubUrl
                })
            })

            if (res.ok) {
                const data = await res.json()
                setPreviewProject(data.project)
            } else {
                const data = await res.json()
                setError(data.error || "Failed to generate content")
            }
        } catch {
            setError("Failed to generate content")
        } finally {
            setGeneratingFor(null)
        }
    }

    const handleSave = async () => {
        if (!previewProject) return
        setSaving(true)

        try {
            const res = await fetch("/api/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(previewProject)
            })

            if (res.ok) {
                setPreviewProject(null)
                // Reload to update the imported status
                loadData()
            } else {
                const data = await res.json()
                setError(data.error || "Failed to save project")
            }
        } catch {
            setError("Failed to save project")
        } finally {
            setSaving(false)
        }
    }

    const updatePreview = (field: keyof GeneratedProject, value: any) => {
        if (!previewProject) return
        setPreviewProject({ ...previewProject, [field]: value })
    }

    if (isAuthenticated === null || loadingRepos) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading repositories...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/admin" className="text-muted-foreground hover:text-foreground">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <h1 className="text-xl font-bold">Import from GitHub</h1>
                        <Badge variant="outline" className="text-xs">
                            {repos.length} repos
                        </Badge>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6">
                        {error}
                        <button onClick={() => setError("")} className="float-right">
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                )}

                <p className="text-muted-foreground mb-6">
                    Select a repository to import. AI will analyze the README and generate project content for you to review.
                </p>

                {/* Repo List */}
                <div className="space-y-3">
                    {repos.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground border border-dashed rounded-lg">
                            No repositories found
                        </div>
                    ) : (
                        repos.map((repo) => {
                            const imported = isRepoImported(repo)
                            const isGenerating = generatingFor === repo.name

                            return (
                                <div
                                    key={repo.name}
                                    className={`bg-card border border-border rounded-lg p-4 transition-colors ${imported ? 'opacity-60' : 'hover:border-primary/50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Github className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                                <span className="font-medium truncate">{repo.name}</span>
                                                {repo.stars > 0 && (
                                                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <Star className="h-3 w-3" /> {repo.stars}
                                                    </span>
                                                )}
                                                {imported && (
                                                    <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-500">
                                                        <Check className="h-3 w-3 mr-1" /> Imported
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="text-sm text-muted-foreground truncate">
                                                {repo.description || "No description"}
                                            </p>
                                            <div className="flex items-center gap-2 mt-2">
                                                {repo.language && (
                                                    <Badge variant="outline" className="text-xs">
                                                        {repo.language}
                                                    </Badge>
                                                )}
                                                {repo.topics.slice(0, 3).map(topic => (
                                                    <Badge key={topic} variant="outline" className="text-xs">
                                                        {topic}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <a
                                                href={repo.githubUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-foreground"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </a>
                                            {!imported && (
                                                <Button
                                                    size="sm"
                                                    onClick={() => handleGenerate(repo)}
                                                    disabled={isGenerating}
                                                >
                                                    {isGenerating ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <>
                                                            <Sparkles className="h-4 w-4 mr-1" />
                                                            Import
                                                        </>
                                                    )}
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </main>

            {/* Preview Modal */}
            {previewProject && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
                        <div className="p-4 border-b border-border flex items-center justify-between">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                AI-Generated Preview
                            </h2>
                            <button onClick={() => setPreviewProject(null)} className="text-muted-foreground hover:text-foreground">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title</label>
                                <input
                                    type="text"
                                    value={previewProject.title}
                                    onChange={(e) => updatePreview('title', e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Slug</label>
                                <input
                                    type="text"
                                    value={previewProject.slug}
                                    onChange={(e) => updatePreview('slug', e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    value={previewProject.description}
                                    onChange={(e) => updatePreview('description', e.target.value)}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px]"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <select
                                        value={previewProject.category}
                                        onChange={(e) => updatePreview('category', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="data-science">Data Science</option>
                                        <option value="data-visualization">Data Visualization</option>
                                        <option value="ai-automation">AI Automation</option>
                                        <option value="ai-engineering">AI Engineering</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Project Type</label>
                                    <select
                                        value={previewProject.projectType}
                                        onChange={(e) => updatePreview('projectType', e.target.value)}
                                        className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="deployed-app">Deployed App</option>
                                        <option value="github-only">GitHub Only</option>
                                        <option value="case-study">Case Study</option>
                                        <option value="external-dashboard">External Dashboard</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Tags</label>
                                <input
                                    type="text"
                                    value={previewProject.tags.join(", ")}
                                    onChange={(e) => updatePreview('tags', e.target.value.split(",").map(t => t.trim()))}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Technologies</label>
                                <input
                                    type="text"
                                    value={previewProject.technologies.join(", ")}
                                    onChange={(e) => updatePreview('technologies', e.target.value.split(",").map(t => t.trim()))}
                                    className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>

                            <div className="pt-2 text-xs text-muted-foreground">
                                <strong>GitHub URL:</strong> {previewProject.githubUrl}
                            </div>

                            {/* Case Study Toggle and Form */}
                            <div className="pt-4 border-t border-border mt-4">
                                <label className="flex items-center gap-2 cursor-pointer mb-4">
                                    <input
                                        type="checkbox"
                                        checked={previewProject.caseStudyEnabled}
                                        onChange={(e) => updatePreview('caseStudyEnabled', e.target.checked)}
                                        className="w-4 h-4 rounded border-border"
                                    />
                                    <span className="text-sm font-medium">Enable Case Study</span>
                                    {previewProject.caseStudyEnabled && (
                                        <Badge variant="outline" className="text-xs">
                                            {previewProject.category.replace('-', ' ')}
                                        </Badge>
                                    )}
                                </label>

                                {previewProject.caseStudyEnabled && (
                                    <div className="bg-muted/20 rounded-lg p-4">
                                        <h3 className="text-sm font-semibold mb-3">Case Study Content (AI Generated)</h3>
                                        <CaseStudyForm
                                            category={previewProject.category as any}
                                            value={previewProject.caseStudy}
                                            onChange={(v) => updatePreview('caseStudy', v)}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 border-t border-border flex justify-end gap-3">
                            <Button variant="ghost" onClick={() => setPreviewProject(null)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave} disabled={saving}>
                                {saving ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                ) : (
                                    <Save className="h-4 w-4 mr-2" />
                                )}
                                Save Project
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
