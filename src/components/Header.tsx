import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gradient font-mono">
            &lt;softwarerebel /&gt;
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => scrollToSection('about')}
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-primary/10 hover:border hover:border-primary/20"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('projects')}
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-primary/10 hover:border hover:border-primary/20"
            >
              Projects
            </button>
            <button 
              onClick={() => scrollToSection('skills')}
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-primary/10 hover:border hover:border-primary/20"
            >
              Skills
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-all duration-300 hover:bg-primary/10 hover:border hover:border-primary/20"
            >
              Contact
            </button>
          </div>

          <Button 
            onClick={() => scrollToSection('contact')}
            className="bg-primary hover:bg-primary-glow text-primary-foreground glow-on-hover"
          >
            Get In Touch
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Header;