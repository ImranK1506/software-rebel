import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SaberDivider from '@/components/SaberDivider';

const Index = () => {
  // The page renders client-side, so the browser's own jump to /#section runs
  // before the sections exist. Repeat it once they do, so shared links land correctly.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <SaberDivider />
      <About />
      <SaberDivider />
      <Projects />
      <SaberDivider color="gold" />
      <Skills />
      <SaberDivider />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
