import { NextResponse } from 'next/server'

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_USERNAME = 'aDataMage'

interface GitHubRepo {
    name: string
    full_name: string
    description: string | null
    html_url: string
    homepage: string | null
    topics: string[]
    language: string | null
    languages_url: string
    stargazers_count: number
    fork: boolean
    created_at: string
    updated_at: string
    pushed_at: string
}

interface ProcessedRepo {
    name: string
    fullName: string
    description: string | null
    githubUrl: string
    homepage: string | null
    topics: string[]
    language: string | null
    stars: number
    isFork: boolean
    createdAt: string
    updatedAt: string
}

// GET /api/github/repos - Fetch all public repos
export async function GET() {
    try {
        if (!GITHUB_TOKEN) {
            return NextResponse.json(
                { error: 'GitHub token not configured' },
                { status: 500 }
            )
        }

        // Fetch repos from GitHub API
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
            {
                headers: {
                    'Authorization': `Bearer ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'X-GitHub-Api-Version': '2022-11-28'
                },
                next: { revalidate: 300 } // Cache for 5 minutes
            }
        )

        if (!response.ok) {
            const errorText = await response.text()
            console.error('GitHub API error:', errorText)
            return NextResponse.json(
                { error: 'Failed to fetch repos from GitHub' },
                { status: response.status }
            )
        }

        const repos: GitHubRepo[] = await response.json()

        // Process and filter repos (exclude forks if desired)
        const processedRepos: ProcessedRepo[] = repos
            .filter(repo => !repo.fork) // Exclude forks
            .map(repo => ({
                name: repo.name,
                fullName: repo.full_name,
                description: repo.description,
                githubUrl: repo.html_url,
                homepage: repo.homepage,
                topics: repo.topics || [],
                language: repo.language,
                stars: repo.stargazers_count,
                isFork: repo.fork,
                createdAt: repo.created_at,
                updatedAt: repo.updated_at
            }))

        return NextResponse.json({ repos: processedRepos })
    } catch (error) {
        console.error('Error fetching GitHub repos:', error)
        return NextResponse.json(
            { error: 'Failed to fetch repos' },
            { status: 500 }
        )
    }
}
