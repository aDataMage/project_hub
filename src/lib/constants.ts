import { Project } from './types'
import projectsData from '@/data/projects.json'

// For client-side usage, we import directly from the JSON file
// This gets bundled at build time and works in both server and client components

export const PROJECTS: Project[] = projectsData.projects as Project[]

export const PERSONAL_INFO = projectsData.personalInfo
