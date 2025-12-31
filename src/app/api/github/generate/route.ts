import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

// POST /api/github/generate - Generate project content from repo using Gemini
export async function POST(request: NextRequest) {
    try {
        if (!GEMINI_API_KEY) {
            return NextResponse.json(
                { error: 'Gemini API key not configured' },
                { status: 500 }
            )
        }

        const body = await request.json()
        const { repoName, repoUrl } = body

        if (!repoName || !repoUrl) {
            return NextResponse.json(
                { error: 'Repository name and URL are required' },
                { status: 400 }
            )
        }

        // Fetch README content from GitHub
        let readmeContent = ''
        try {
            const readmeResponse = await fetch(
                `https://api.github.com/repos/aDataMage/${repoName}/readme`,
                {
                    headers: {
                        'Authorization': `Bearer ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3.raw'
                    }
                }
            )
            if (readmeResponse.ok) {
                readmeContent = await readmeResponse.text()
                // Truncate to first 3000 chars to stay within context limits
                readmeContent = readmeContent.substring(0, 3000)
            }
        } catch (e) {
            console.log('Could not fetch README:', e)
        }

        // Fetch repo details for topics and languages
        let topics: string[] = []
        let languages: string[] = []
        let description = ''

        try {
            const repoResponse = await fetch(
                `https://api.github.com/repos/aDataMage/${repoName}`,
                {
                    headers: {
                        'Authorization': `Bearer ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            )
            if (repoResponse.ok) {
                const repoData = await repoResponse.json()
                topics = repoData.topics || []
                description = repoData.description || ''
            }

            const langResponse = await fetch(
                `https://api.github.com/repos/aDataMage/${repoName}/languages`,
                {
                    headers: {
                        'Authorization': `Bearer ${GITHUB_TOKEN}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            )
            if (langResponse.ok) {
                const langData = await langResponse.json()
                languages = Object.keys(langData)
            }
        } catch (e) {
            console.log('Could not fetch repo details:', e)
        }

        // Initialize Gemini
        const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY })

        const prompt = `You are analyzing a GitHub repository to create a portfolio project entry for a data scientist/AI engineer.

Repository Name: ${repoName}
GitHub Description: ${description || 'No description provided'}
Topics: ${topics.length > 0 ? topics.join(', ') : 'None'}
Languages: ${languages.length > 0 ? languages.join(', ') : 'Unknown'}

README Content (first 3000 chars):
${readmeContent || 'No README available'}

STEP 1: Determine the category:
- data-science: ML models, statistical analysis, predictive modeling, data analysis
- data-visualization: Dashboards, Tableau, charts, interactive visualizations
- ai-automation: Workflow automation, bots, n8n/Zapier, RPA
- ai-engineering: Production ML systems, APIs, infrastructure, LLMs, RAG

STEP 2: Generate JSON with caseStudy matching the EXACT structure for that category:

FOR data-science:
{
  "title": "...", "slug": "...", "description": "...", "tags": [...], 
  "category": "data-science", "projectType": "github-only", "technologies": [...],
  "externalBadge": null, "caseStudyEnabled": true,
  "caseStudy": {
    "overview": { "summary": "...", "role": "...", "timeline": "...", "teamSize": 1 },
    "problem": { "statement": "...", "businessContext": "...", "goals": ["..."] },
    "methodology": { "approach": "...", "processSteps": [{"title": "...", "description": "..."}] },
    "results": { "metrics": [{"label": "...", "value": "..."}], "impact": "...", "learnings": ["..."] }
  }
}

FOR data-visualization:
{
  "caseStudy": {
    "overview": { "summary": "...", "role": "...", "timeline": "...", "client": "...", "audience": "..." },
    "problem": { "statement": "...", "businessContext": "...", "userNeeds": ["..."], "dataComplexity": "..." },
    "methodology": { "approach": "...", "processSteps": [...], "designPrinciples": ["..."] },
    "design": { "colorPalette": [{"name": "...", "hex": "#...", "usage": "..."}], "visualHierarchy": "...", "interactivity": "...", "accessibility": "..." },
    "implementation": { "dataProcessing": "...", "visualization": [{"type": "...", "purpose": "...", "insight": "..."}], "challenges": [{"issue": "...", "solution": "..."}] },
    "results": { "metrics": [...], "impact": "...", "userFeedback": ["..."], "businessOutcome": "..." }
  }
}

FOR ai-automation:
{
  "caseStudy": {
    "overview": { "summary": "...", "role": "...", "timeline": "...", "teamSize": 1, "context": "..." },
    "problem": { "statement": "...", "goals": ["..."], "manualProcess": { "description": "...", "timePerTask": "...", "frequency": "...", "errorRate": "...", "annualCost": "..." } },
    "methodology": { "approach": "...", "processSteps": [{"title": "...", "description": "...", "automation": "..."}], "tools": ["..."] },
    "implementation": { "workflow": [{"step": "...", "trigger": "...", "action": "...", "output": "..."}], "challenges": [...], "integration": "...", "testing": "...", "nextSteps": ["..."] },
    "results": { "metrics": [{"label": "...", "value": "...", "improvement": "..."}], "impact": "...", "roi": { "timeSaved": "...", "costSavings": "...", "paybackPeriod": "...", "annualValue": "..." } },
    "maintenance": { "monitoring": ["..."], "updates": "...", "scalability": "..." },
    "contact": { "email": "hello@adatamage.com", "phone": "" }
  }
}

FOR ai-engineering:
{
  "caseStudy": {
    "overview": { "summary": "...", "role": "...", "timeline": "...", "teamSize": 1, "businessContext": "..." },
    "problem": { "statement": "...", "goals": ["..."], "constraints": ["..."], "stakeholders": ["..."] },
    "methodology": { "approach": "...", "processSteps": [...], "architecture": { "components": [{"name": "...", "description": "...", "tech": ["..."]}] } },
    "implementation": { "dataStrategy": "...", "modelDetails": "...", "pipeline": ["..."], "challenges": [...] },
    "results": { "metrics": [{"label": "...", "value": "...", "improvement": "..."}], "impact": "...", "businessValue": "..." },
    "deployment": { "infrastructure": "...", "monitoring": ["..."], "scalability": "..." },
    "learnings": { "technical": ["..."], "business": ["..."] }
  }
}

IMPORTANT:
- Use the EXACT structure for the detected category
- Infer metrics and details from README where possible
- Generate realistic processSteps based on the project
- Fill in all fields with reasonable content

Respond with ONLY the JSON object, no markdown.`

        const response = await ai.models.generateContent({
            model: 'gemini-2.0-flash',
            contents: prompt
        })

        // Parse the response
        let generatedContent
        try {
            const responseText = response.text || ''
            // Clean up the response - remove markdown code blocks if present
            const cleanedText = responseText
                .replace(/```json\n?/g, '')
                .replace(/```\n?/g, '')
                .trim()
            generatedContent = JSON.parse(cleanedText)
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', response.text)
            return NextResponse.json(
                { error: 'Failed to parse AI response' },
                { status: 500 }
            )
        }

        // Add the GitHub URL to the generated content
        generatedContent.githubUrl = repoUrl

        return NextResponse.json({ project: generatedContent })
    } catch (error) {
        console.error('Error generating project content:', error)
        return NextResponse.json(
            { error: 'Failed to generate content' },
            { status: 500 }
        )
    }
}
