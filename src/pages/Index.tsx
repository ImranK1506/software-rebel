import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import ChatAnalyticsDashboard  from '@/components/ChatAnalyticsDashboard.tsx';
import ProjectProposalGenerator from '@/components/ProjectProposalGenerator.tsx';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />

      <ChatAssistant />
      <ChatAnalyticsDashboard />
      <ProjectProposalGenerator />
    </div>
  );
};

export default Index;
