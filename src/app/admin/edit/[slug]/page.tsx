"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Save, Loader2, Trash2 } from "lucide-react"
import Link from "next/link"
import CaseStudyForm from "@/components/admin/CaseStudyForm"

const PROJECT_TYPES = [
    { value: "deployed-app", label: "Deployed App" },
    { value: "external-dashboard", label: "External Dashboard" },
    { value: "github-only", label: "GitHub Only" },
    { value: "case-study", label: "Case Study" },
    { value: "external-resource", label: "External Resource" }
]

const CATEGORIES = [
    { value: "data-science", label: "Data Science" },
    { value: "data-visualization", label: "Data Visualization" },
    { value: "ai-automation", label: "AI Automation" },
    { value: "ai-engineering", label: "AI Engineering" }
]

interface FormData {
    title: string
    slug: string
    description: string
    tags: string
    projectType: string
    category: string
    githubUrl: string
    liveUrl: string
    caseStudyEnabled: boolean
    thumbnail: string
    externalBadge: string
    technologies: string
    featured: boolean
    caseStudy: any
}

export default function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params)
    const router = useRouter()
    const [formData, setFormData] = useState<FormData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            loadProject()
        }
    }, [isAuthenticated, slug])

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

    const loadProject = async () => {
        try {
            const res = await fetch(`/api/projects/${slug}`)
            if (!res.ok) {
                router.push("/admin")
                return
            }
            const data = await res.json()
            const project = data.project

            setFormData({
                title: project.title || "",
                slug: project.slug || "",
                description: project.description || "",
                tags: (project.tags || []).join(", "),
                projectType: project.projectType || "github-only",
                category: project.category || "data-science",
                githubUrl: project.githubUrl || "",
                liveUrl: project.liveUrl || "",
                caseStudyEnabled: project.caseStudyEnabled || false,
                thumbnail: project.thumbnail || "",
                externalBadge: project.externalBadge || "",
                technologies: (project.technologies || []).join(", "),
                featured: project.featured || false,
                caseStudy: project.caseStudy || null
            })
        } catch {
            router.push("/admin")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData) return

        setLoading(true)
        setError("")

        try {
            const projectData = {
                ...formData,
                tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
                technologies: formData.technologies.split(",").map(t => t.trim()).filter(Boolean),
                caseStudy: formData.caseStudyEnabled ? formData.caseStudy : undefined
            }

            const res = await fetch(`/api/projects/${slug}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData)
            })

            if (res.ok) {
                router.push("/admin")
            } else {
                const data = await res.json()
                setError(data.error || "Failed to update project")
            }
        } catch {
            setError("Failed to update project")
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm(`Are you sure you want to delete "${formData?.title}"? This cannot be undone.`)) {
            return
        }

        try {
            const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" })
            if (res.ok) {
                router.push("/admin")
            } else {
                alert("Failed to delete project")
            }
        } catch {
            alert("Failed to delete project")
        }
    }

    if (isAuthenticated === null || !formData) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
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
                        <h1 className="text-xl font-bold">Edit Project</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" onClick={handleDelete} className="text-red-500 hover:text-red-600 hover:bg-red-500/10">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                        </Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </div>
            </header>

            {/* Form */}
            <main className="container mx-auto px-4 py-8 max-w-3xl">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Info */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Basic Information</h2>

                        <div className="grid gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Title *</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Slug *</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                                    required
                                />
                                <p className="text-xs text-muted-foreground mt-1">URL-friendly identifier</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px]"
                                    required
                                />
                            </div>
                        </div>
                    </section>

                    {/* Classification */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Classification</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Project Type</label>
                                <select
                                    value={formData.projectType}
                                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {PROJECT_TYPES.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Category</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    {CATEGORIES.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Tags</label>
                            <input
                                type="text"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Python, ML, Data Science"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Comma-separated list</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Technologies</label>
                            <input
                                type="text"
                                value={formData.technologies}
                                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Python, Pandas, Scikit-learn"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Comma-separated list</p>
                        </div>
                    </section>

                    {/* Links */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Links</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">GitHub URL</label>
                                <input
                                    type="url"
                                    value={formData.githubUrl}
                                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Live URL</label>
                                <input
                                    type="url"
                                    value={formData.liveUrl}
                                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="https://..."
                                />
                            </div>
                        </div>
                    </section>

                    {/* Display */}
                    <section className="space-y-4">
                        <h2 className="text-lg font-semibold border-b border-border pb-2">Display Options</h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
                                <input
                                    type="text"
                                    value={formData.thumbnail}
                                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="/projects/my-project.png"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">External Badge</label>
                                <input
                                    type="text"
                                    value={formData.externalBadge}
                                    onChange={(e) => setFormData({ ...formData, externalBadge: e.target.value })}
                                    className="w-full px-3 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    placeholder="Streamlit App"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4 rounded border-border"
                                />
                                <span className="text-sm">Featured project</span>
                            </label>

                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.caseStudyEnabled}
                                    onChange={(e) => setFormData({ ...formData, caseStudyEnabled: e.target.checked })}
                                    className="w-4 h-4 rounded border-border"
                                />
                                <span className="text-sm">Case study enabled</span>
                            </label>
                        </div>
                    </section>

                    {/* Case Study Section */}
                    {formData.caseStudyEnabled && (
                        <section className="space-y-4">
                            <h2 className="text-lg font-semibold border-b border-border pb-2">
                                Case Study Content
                                <span className="text-sm font-normal text-muted-foreground ml-2">
                                    ({formData.category.replace('-', ' ')} template)
                                </span>
                            </h2>
                            <CaseStudyForm
                                category={formData.category as any}
                                value={formData.caseStudy}
                                onChange={(v) => setFormData({ ...formData, caseStudy: v })}
                            />
                        </section>
                    )}

                    {/* Submit */}
                    <div className="pt-4">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                            Save Changes
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}
