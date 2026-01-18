import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Lightbulb, ArrowRight } from 'lucide-react';
import React from 'react';

interface ProjectsProps {
  onOpenProposalGenerator?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onOpenProposalGenerator }) => {
  console.log('Projects rendered, prop exists:', !!onOpenProposalGenerator);

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
      previewUrl: "https://filmpire-tmdb-react.netlify.app"
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

                {project.featured && (
                  <div className="mt-6 md:mt-0">
                    <div className="bg-gradient-to-br from-primary/5 to-primary-glow/5 rounded-lg p-6 border border-primary/20 h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ExternalLink className="w-8 h-8 text-primary" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Interactive preview available
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              View All Projects!
            </Button>
          </div>
          {/*Proposal Generator CTA*/}
          {onOpenProposalGenerator && (
            <div className="mt-20">
              <div
                className="relative overflow-hidden rounded-xl p-8 md:p-12 text-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--primary-glow) / 0.05))',
                  border: '1px solid hsl(var(--primary) / 0.3)',
                  boxShadow: '0 0 40px hsl(var(--primary) / 0.15)'
                }}
              >
                {/* Animated background glow */}
                <div
                  className="absolute inset-0 opacity-30 blur-3xl"
                  style={{
                    background: 'radial-gradient(circle at 50% 50%, hsl(var(--primary-glow)), transparent 70%)'
                  }}
                />

                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-6">
                    <Lightbulb size={32} className="text-primary" />
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4 font-inter">
                    Don't See What You Need?
                  </h3>

                  <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                    Have a unique project in mind? Share your vision and receive a detailed technical proposal
                    tailored to your specific needs—completely free, no strings attached.
                  </p>

                  <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm max-w-3xl mx-auto">
                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                      <div className="text-primary font-bold mb-1">⚡ Instant</div>
                      <div className="text-muted-foreground">Generated in seconds</div>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                      <div className="text-primary font-bold mb-1">🎯 Detailed</div>
                      <div className="text-muted-foreground">Tech stack & timeline</div>
                    </div>
                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border border-border">
                      <div className="text-primary font-bold mb-1">💰 Free</div>
                      <div className="text-muted-foreground">No commitment needed</div>
                    </div>
                  </div>

                  <button
                    onClick={onOpenProposalGenerator}
                    className="group relative bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-all inline-flex items-center gap-3"
                  >
                    <Lightbulb size={24} />
                    <span>Generate Custom Proposal</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

export default Projects;