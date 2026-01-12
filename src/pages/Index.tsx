import React from 'react';
import { useState } from 'react';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ChatAssistant from '@/components/ChatAssistant';
import ChatAnalyticsDashboard  from '@/components/ChatAnalyticsDashboard';
import ProjectProposalGenerator from '@/components/ProjectProposalGenerator';

const Index = () => {
  const [isProposalOpen, setIsProposalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero onOpenProposalGenerator={() => setIsProposalOpen(true)} />
      <About />
      <Projects onOpenProposalGenerator={() => setIsProposalOpen(true)} />
      <Skills />
      <Contact />
      <Footer />

      <ChatAssistant />
      <ChatAnalyticsDashboard />
      {isProposalOpen && (
        <ProjectProposalGenerator onClose={() => setIsProposalOpen(false)} />
      )}
    </div>
  );
};

export default Index;
