import React from 'react';
import { Github, Linkedin, Mail, ArrowRight } from 'lucide-react';

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

const Hero : React.FC = () => {

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 animate-pulse"
      />
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
                ? '#ffffff'
                : star.type === 'medium'
                ? '#ffffff'
                : '#ffffff',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background z-30" />
      
      <div className="container mx-auto px-6 py-20 relative z-40 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="fade-in-up">
            <h1 className="text-8xl md:text-9xl font-black mb-8 tracking-tighter leading-none relative">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                Imran Khan
              </span>
              <div className="absolute inset-0 blur-3xl opacity-30 bg-gradient-to-r from-cyan-500 to-purple-500" />
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
              Front-End Engineer
            </p>

            <p className="text-xl md:text-2xl text-gray-400 mb-12 font-light">
              Breaking conventions, building the future
            </p>
          </div>
          
          <div className="fade-in-up flex flex-col sm:flex-row gap-4 justify-center items-center mb-12" style={{ animationDelay: '0.4s' }}>
            <button
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
              className="group relative bg-gradient-to-r from-cyan-500 to-blue-500 text-black px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl transition-all inline-flex items-center gap-3"
              style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4)' }}
            >
              <span className="relative z-10">View Work</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
            </button>
          </div>
          
          <div className="fade-in-up flex justify-center gap-6" style={{ animationDelay: '0.6s' }}>
            <a 
              href="https://github.com/ImranK1506" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2 rounded-lg"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/imran-khan-621342104/"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2 rounded-lg"
            >
              <Linkedin size={24} />
            </a>
            <a 
              href="mailto:imran@softwarerebel.com"
              className="text-muted-foreground hover:text-primary transition-colors glow-on-hover p-2 rounded-lg"
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