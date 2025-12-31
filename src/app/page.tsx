import { PROJECTS, PERSONAL_INFO } from "@/lib/constants"
import { ProjectCard } from "@/components/project-card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Background Gradient Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">

        {/* Header */}
        <header className="mb-16 text-center space-y-4">
          <Badge variant="outline" className="mb-4">
            Projects Hub
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {PERSONAL_INFO.name}'s <span className="text-primary">Work</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A centralized showcase of my data science projects, deployed applications, and technical experiments.
          </p>
        </header>

        {/* Projects Grid */}
        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {PROJECTS.map((project, index) => (
              <div key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {PROJECTS.length === 0 && (
            <div className="text-center py-20 text-muted-foreground border border-dashed rounded-lg">
              No projects found. Check constants.ts to add some!
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-24 text-center text-sm text-muted-foreground pb-8 border-t pt-8">
          <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
          <p className="mt-2">
            <a href={PERSONAL_INFO.github} className="hover:text-primary transition-colors mx-2">GitHub</a>
            <a href={PERSONAL_INFO.linkedin} className="hover:text-primary transition-colors mx-2">LinkedIn</a>
          </p>
        </footer>
      </div>
    </div>
  )
}
