import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Lightbulb, ArrowRight } from 'lucide-react';
import React from 'react';

interface ProjectsProps {
  onOpenProposalGenerator?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onOpenProposalGenerator }) => {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "Built a high-performance React/TypeScript platform handling 10M+ monthly transactions. Implemented micro-frontends architecture with 99.9% uptime.",
      tech: ["React", "TypeScript", "Node.js", "PostgreSQL", "Redis"],
      impact: "Increased conversion rate by 35% and reduced page load times by 60%",
      featured: true
    },
    {
      title: "Real-Time Analytics Dashboard",
      description: "Created a real-time data visualization platform processing 100K+ events per second. Custom WebSocket implementation with D3.js visualizations.",
      tech: ["React", "D3.js", "WebSocket", "Python", "ClickHouse"],
      impact: "Reduced decision-making time by 80% for data teams",
      featured: true
    },
    {
      title: "Design System & Component Library",
      description: "Architected and maintained a comprehensive design system used across 15+ products. Built with accessibility-first principles and comprehensive testing.",
      tech: ["React", "Storybook", "TypeScript", "Jest", "Figma"],
      impact: "Reduced development time by 50% across all product teams",
      featured: false
    },
    {
      title: "Filmpire - Movie Discovery App",
      description: "Developed a full-stack movie discovery application using React for the frontend and Node.js for the backend. Integrated with third-party APIs for movie data.",
      tech: ["React", "Node.js", "Express", "MongoDB", "TMDb API"],
      impact: "The app was created as an example of what I can build. It showcases my skills in building full-stack applications.",
      featured: true,
      liveUrl: "https://filmpire-tmdb-react.netlify.app",
      repoUrl: "https://github.com/ImranK1506/react-filmpire?tab=readme-ov-file",
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-section text-gradient mb-6">
              Featured Work
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A selection of projects where rebellion meets craftsmanship. 
              Each one pushed boundaries and delivered real business impact.
            </p>
          </div>
          
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <Card 
                key={index}
                className={`rebel-card ${project.featured ? 'md:grid md:grid-cols-3 md:gap-8' : ''}`}
              >
                <div className={project.featured ? 'md:col-span-2' : ''}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold text-foreground">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                        FEATURED
                      </span>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-primary mb-2">Impact:</p>
                    <p className="text-sm text-muted-foreground italic">
                      {project.impact}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="text-xs font-mono bg-secondary text-secondary-foreground px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}

                    {project.repoUrl && (
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;