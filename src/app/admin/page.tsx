"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Plus, Edit, Trash2, ExternalLink, Github,
    LogOut, Eye, EyeOff, Loader2, Sparkles
} from "lucide-react"
import Link from "next/link"

interface Project {
    title: string
    slug: string
    description: string
    tags: string[]
    projectType: string
    category?: string
    githubUrl?: string
    liveUrl?: string
    caseStudyEnabled?: boolean
    thumbnail?: string
    externalBadge?: string
    featured?: boolean
}

export default function AdminPage() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])
    const [showPassword, setShowPassword] = useState(false)

    // Check authentication on mount
    useEffect(() => {
        checkAuth()
    }, [])

    // Load projects when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            loadProjects()
        }
    }, [isAuthenticated])

    const checkAuth = async () => {
        try {
            const res = await fetch("/api/auth")
            const data = await res.json()
            setIsAuthenticated(data.authenticated)
        } catch {
            setIsAuthenticated(false)
        }
    }

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            })

            if (res.ok) {
                setIsAuthenticated(true)
                setPassword("")
            } else {
                const data = await res.json()
                setError(data.error || "Invalid password")
            }
        } catch {
            setError("Login failed. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        try {
            await fetch("/api/auth", { method: "DELETE" })
            setIsAuthenticated(false)
            setProjects([])
        } catch {
            console.error("Logout failed")
        }
    }

    const loadProjects = async () => {
        try {
            const res = await fetch("/api/projects")
            const data = await res.json()
            setProjects(data.projects || [])
        } catch {
            console.error("Failed to load projects")
        }
    }

    const handleDelete = async (slug: string) => {
        if (!confirm(`Are you sure you want to delete "${slug}"?`)) {
            return
        }

        try {
            const res = await fetch(`/api/projects/${slug}`, { method: "DELETE" })
            if (res.ok) {
                setProjects(projects.filter(p => p.slug !== slug))
            } else {
                alert("Failed to delete project")
            }
        } catch {
            alert("Failed to delete project")
        }
    }

    // Loading state
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    // Login form
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <div className="w-full max-w-sm">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                        <p className="text-muted-foreground mt-2">Enter password to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full px-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Login
                        </Button>
                    </form>

                    <p className="text-center text-muted-foreground text-sm mt-6">
                        <a href="https://adatamage.com" className="hover:text-primary">
                            ← Back to Main Site
                        </a>
                    </p>
                </div>
            </div>
        )
    }

    // Dashboard
    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50 sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold">Admin Dashboard</h1>
                        <Badge variant="outline" className="text-xs">
                            {projects.length} projects
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/" target="_blank">
                            <Button variant="ghost" size="sm">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View Site
                            </Button>
                        </Link>
                        <Button variant="ghost" size="sm" onClick={handleLogout}>
                            <LogOut className="h-4 w-4 mr-2" />
                            Logout
                        </Button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Actions */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Projects</h2>
                    <div className="flex items-center gap-2">
                        <Link href="/admin/import">
                            <Button variant="outline">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Import from GitHub
                            </Button>
                        </Link>
                        <Link href="/admin/new">
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Project
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Projects Table */}
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-muted/50">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Title</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Category</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Type</th>
                                <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Links</th>
                                <th className="text-right px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                                        No projects yet. Click "Add Project" to create one.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((project) => (
                                    <tr key={project.slug} className="hover:bg-muted/30 transition-colors">
                                        <td className="px-4 py-4">
                                            <div>
                                                <div className="font-medium flex items-center gap-2">
                                                    {project.title}
                                                    {project.featured && (
                                                        <Badge variant="secondary" className="text-xs">Featured</Badge>
                                                    )}
                                                </div>
                                                <div className="text-sm text-muted-foreground truncate max-w-md">
                                                    {project.description}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <Badge variant="outline" className="text-xs capitalize">
                                                {project.category?.replace("-", " ") || "—"}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm text-muted-foreground capitalize">
                                                {project.projectType.replace("-", " ")}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                {project.liveUrl && (
                                                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                                                        <Github className="h-4 w-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/edit/${project.slug}`}>
                                                    <Button variant="ghost" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(project.slug)}
                                                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}
