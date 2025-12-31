import { Project } from './types'
import fs from 'fs'
import path from 'path'

// Path to the JSON data file
const dataFilePath = path.join(process.cwd(), 'src/data/projects.json')

export interface DataStore {
    projects: Project[]
    personalInfo: {
        name: string
        title: string
        email: string
        github: string
        linkedin: string
    }
}

/**
 * Read all data from the JSON file
 */
export function readData(): DataStore {
    const fileContent = fs.readFileSync(dataFilePath, 'utf-8')
    return JSON.parse(fileContent) as DataStore
}

/**
 * Write data to the JSON file
 */
const mainSiteDataPath = path.join(process.cwd(), '../data/projects.json')

/**
 * Write data to the JSON file(s)
 */
export function writeData(data: DataStore): void {
    // Write to local (Hub)
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8')

    // Write to Main Site (Sync)
    try {
        // Ensure directory exists if possible, or just try writing
        fs.writeFileSync(mainSiteDataPath, JSON.stringify(data, null, 2), 'utf-8')
    } catch (e) {
        console.warn('Could not sync to Main Site data:', e)
    }
}

/**
 * Get all projects
 */
export function getProjects(): Project[] {
    return readData().projects
}

/**
 * Get a single project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
    return readData().projects.find(p => p.slug === slug)
}

/**
 * Create a new project
 */
export function createProject(project: Project): Project {
    const data = readData()

    // Check if slug already exists
    if (data.projects.some(p => p.slug === project.slug)) {
        throw new Error(`Project with slug "${project.slug}" already exists`)
    }

    data.projects.push(project)
    writeData(data)
    return project
}

/**
 * Update an existing project
 */
export function updateProject(slug: string, updates: Partial<Project>): Project {
    const data = readData()
    const index = data.projects.findIndex(p => p.slug === slug)

    if (index === -1) {
        throw new Error(`Project with slug "${slug}" not found`)
    }

    // If slug is being changed, check for conflicts
    if (updates.slug && updates.slug !== slug) {
        if (data.projects.some(p => p.slug === updates.slug)) {
            throw new Error(`Project with slug "${updates.slug}" already exists`)
        }
    }

    data.projects[index] = { ...data.projects[index], ...updates }
    writeData(data)
    return data.projects[index]
}

/**
 * Delete a project
 */
export function deleteProject(slug: string): boolean {
    const data = readData()
    const index = data.projects.findIndex(p => p.slug === slug)

    if (index === -1) {
        return false
    }

    data.projects.splice(index, 1)
    writeData(data)
    return true
}

/**
 * Get personal info
 */
export function getPersonalInfo() {
    return readData().personalInfo
}
