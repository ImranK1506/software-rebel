import { Card } from '@/components/ui/card';
import { Code, Zap, Users, Rocket } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Code Advocate",
      description: "Writing maintainable, scalable code that stands the test of time"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Performance Obsessed",
      description: "Optimizing every millisecond for lightning-fast user experiences"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "User-Centric Design",
      description: "Building interfaces that users actually want to use"
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Innovation Driver",
      description: "Pushing boundaries with cutting-edge technologies and methodologies"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-section text-gradient mb-6">
              About the Rebel
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              With many years in the trenches of front-end development, I've built everything 
              from startup MVPs to enterprise-scale platforms serving millions of users.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="fade-in-left">
              <h3 className="text-2xl font-bold mb-6 text-primary">
                The Journey
              </h3>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Started as a self-taught developer with an insatiable curiosity for how the web works.
                  That curiosity turned into a 7-year journey building everything from scrappy MVPs to
                  production platforms serving millions of users.
                </p>
                <p>
                  Along the way, I've architected e-commerce systems handling 10M+ transactions, built
                  design systems used across 15+ products, and created real-time dashboards processing
                  100K+ events per second. The common thread? An obsession with solving real problems
                  with elegant, performant solutions—not just chasing the latest tech trends.
                </p>
                <p>
                  Today, I specialize in React, Vue, TypeScript, StencilJS, and Python—building
                  applications that are fast, accessible, and built to scale. Currently accepting
                  select freelance projects for Q2 2026. If you're building something ambitious,
                  let's make it extraordinary together.
                </p>
              </div>
            </div>
            
            <div className="fade-in-right">
              <div className="grid grid-cols-2 gap-6">
                {highlights.map((item, index) => (
                  <Card 
                    key={index} 
                    className="rebel-card text-center p-6"
                  >
                    <div className="text-primary mb-4 flex justify-center">
                      {item.icon}
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">
                      {item.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center fade-in-up">
            <div className="inline-block bg-gradient-to-r from-primary/10 to-primary-glow/10 rounded-xl p-8 border border-primary/20">
              <p className="text-lg font-mono text-primary mb-2">
                "Code is poetry in motion"
              </p>
              <p className="text-muted-foreground">
                Every line of code should tell a story, solve a problem, and inspire the next developer who reads it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;