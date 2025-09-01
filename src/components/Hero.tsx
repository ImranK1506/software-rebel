import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import heroBg from '@/assets/hero-bg.jpg';

// Generate galaxy with multiple star layers
const generateGalaxy = () => {
  const galaxy = [];
  
  // Large bright stars
  for (let i = 0; i < 30; i++) {
    galaxy.push({
      id: `large-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 3 + 2,
      opacity: Math.random() * 0.8 + 0.2,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 3,
      type: 'large'
    });
  }
  
  // Medium stars
  for (let i = 0; i < 100; i++) {
    galaxy.push({
      id: `medium-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.1,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 2,
      type: 'medium'
    });
  }
  
  // Small distant stars
  for (let i = 0; i < 200; i++) {
    galaxy.push({
      id: `small-${i}`,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      delay: Math.random() * 2,
      duration: 1.5 + Math.random() * 1.5,
      type: 'small'
    });
  }
  
  return galaxy;
};

const galaxy = generateGalaxy();

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div 
        className="absolute inset-0 z-0 animate-pulse"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: '110%',
          backgroundPosition: 'center',
          filter: 'brightness(0.3)',
          animation: 'heroFloat 20s ease-in-out infinite'
        }}
      />
      
      {/* Galaxy Background */}
      <div className="absolute inset-0 z-10 galaxy-container">
        {galaxy.map((star) => (
          <div
            key={star.id}
            className={`absolute animate-twinkle star-${star.type}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              animationDelay: `${star.delay}s`,
              animationDuration: `${star.duration}s`,
              background: star.type === 'large' 
                ? 'radial-gradient(circle, #ffffff 0%, #e6f3ff 40%, transparent 70%)'
                : star.type === 'medium'
                ? 'radial-gradient(circle, #ffffff 0%, #f0f8ff 60%, transparent 80%)'
                : 'radial-gradient(circle, #ffffff 20%, transparent 60%)',
              borderRadius: '50%',
              boxShadow: star.type === 'large' 
                ? '0 0 8px #ffffff, 0 0 16px #ffffff40, 0 0 24px #ffffff20'
                : star.type === 'medium'
                ? '0 0 4px #ffffff, 0 0 8px #ffffff40'
                : '0 0 2px #ffffff60'
            }}
          />
        ))}
        
        {/* Galaxy spiral arms effect */}
        <div className="absolute inset-0 galaxy-arms opacity-20" />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-20">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-bounce"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-30" />
      
      {/* Content */}
      <div className="container mx-auto px-6 py-20 relative z-40 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="fade-in-up">
            <p className="text-primary font-mono text-lg mb-4">
              Hello, I'm
            </p>
            <h1 className="text-hero text-gradient mb-6 leading-tight">
              Software Rebel
            </h1>
            <h2 className="text-2xl md:text-3xl font-light text-muted-foreground mb-8 leading-relaxed">
              Front-End Engineer crafting rebellious digital experiences
              <br />
              <span className="text-primary">7+ years</span> of breaking conventions and building the future
            </h2>
          </div>
          
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Specializing in large-scale web platforms, user-centric design, and cutting-edge technologies. 
              I turn complex problems into elegant, performant solutions that users love.
            </p>
          </div>
          
          <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" style={{ animationDelay: '0.4s' }}>
            <Button 
              onClick={scrollToContact}
              size="lg"
              className="bg-primary hover:bg-primary-glow text-primary-foreground glow-on-hover px-8 py-3"
            >
              Start a Project
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3"
              onClick={() => window.open('/resume.pdf', '_blank')}
            >
              View Resume
            </Button>
          </div>
          
          <div className="fade-in-up flex justify-center gap-6" style={{ animationDelay: '0.6s' }}>
            <a 
              href="https://github.com/softwarerebel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://linkedin.com/in/softwarerebel" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:hello@softwarerebel.com"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;