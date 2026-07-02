import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SaberDivider from '@/components/SaberDivider';

const Index = () => {
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
