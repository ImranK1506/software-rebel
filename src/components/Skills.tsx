import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Mastery",
      description: "Building beautiful, performant user interfaces",
      skills: [
        { name: "React / Next.js", level: "Expert", years: "5+" },
        { name: "TypeScript", level: "Expert", years: "4+" },
        { name: "JavaScript (ES6+)", level: "Expert", years: "7+" },
        { name: "HTML5 / CSS3", level: "Expert", years: "7+" },
        { name: "Tailwind CSS", level: "Advanced", years: "3+" },
        { name: "SASS / Styled Components", level: "Advanced", years: "4+" }
      ]
    },
    {
      title: "Development Tools",
      description: "Modern development workflow and tooling",
      skills: [
        { name: "Git / GitHub", level: "Expert", years: "7+" },
        { name: "Webpack / Vite", level: "Advanced", years: "4+" },
        { name: "Jest / Testing Library", level: "Advanced", years: "5+" },
        { name: "Storybook", level: "Advanced", years: "2+" },
        { name: "Docker", level: "Intermediate", years: "2+" },
        { name: "CI/CD Pipelines", level: "Advanced", years: "3+" }
      ]
    },
    {
      title: "Architecture & Performance",
      description: "Scalable, maintainable application design",
      skills: [
        { name: "Micro-frontends", level: "Advanced", years: "2+" },
        { name: "State Management", level: "Expert", years: "5+" },
        { name: "Performance Optimization", level: "Expert", years: "5+" },
        { name: "Web Accessibility", level: "Advanced", years: "4+" },
        { name: "Progressive Web Apps", level: "Advanced", years: "3+" },
        { name: "Design Systems", level: "Advanced", years: "3+" }
      ]
    },
    {
      title: "Backend & Integration",
      description: "Full-stack capabilities and API integration",
      skills: [
        { name: "Node.js / Express", level: "Advanced", years: "4+" },
        { name: "REST / GraphQL APIs", level: "Advanced", years: "5+" },
        { name: "PostgreSQL / MongoDB", level: "Intermediate", years: "3+" },
        { name: "Redis / Caching", level: "Intermediate", years: "2+" },
        { name: "AWS / Cloud Services", level: "Intermediate", years: "3+" },
        { name: "WebSocket / Real-time", level: "Advanced", years: "2+" }
      ]
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Expert': return 'bg-primary text-primary-foreground';
      case 'Advanced': return 'bg-primary/70 text-primary-foreground';
      case 'Intermediate': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section id="skills" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-section text-gradient mb-6">
              Technical Arsenal
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              7+ years of battle-tested expertise across the modern web development stack. 
              Always learning, always evolving.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card key={index} className="rebel-card">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {category.description}
                  </p>
                </div>
                
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-medium text-foreground">
                            {skill.name}
                          </span>
                          <Badge className={`text-xs ${getLevelColor(skill.level)}`}>
                            {skill.level}
                          </Badge>
                        </div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {skill.years} experience
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-xl p-8 border border-primary/20">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Always Learning
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                The web moves fast, and so do I. Currently exploring AI agents, 
                advanced Vue patterns, the latest in web performance optimization and more advanced Python methods.
                The rebellion never stops evolving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;