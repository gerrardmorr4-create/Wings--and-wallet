/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { PillarCategory } from './types';

// Components & Pages
import Header from './components/Header';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';

import Home from './pages/Home';
import PillarPage from './pages/PillarPage';
import TravelHub from './pages/TravelHub';
import ArticlePage from './pages/ArticlePage';
import Advertise from './pages/Advertise';
import About from './pages/About';
import Contact from './pages/Contact';
import Legal from './pages/Legal';
import Admin from './pages/Admin';

export default function App() {
  const [currentHash, setCurrentHash] = useState<string>(window.location.hash || '#home');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash || '#home');
      // Natural instant scroll-top during route dispatching
      window.scrollTo(0, 0);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (hash: string) => {
    window.location.hash = hash;
  };

  // Dispatch page renderer based on parsed hash
  const renderPage = () => {
    const hash = currentHash || '#home';

    if (hash === '#home' || hash === '#') {
      return <Home onNavigate={navigate} />;
    }
    
    if (hash === '#travel-hub') {
      return <TravelHub onNavigate={navigate} />;
    }

    if (hash === '#advertise') {
      return <Advertise />;
    }

    if (hash === '#about') {
      return <About />;
    }

    if (hash === '#contact') {
      return <Contact />;
    }

    if (hash === '#admin') {
      return <Admin onNavigate={navigate} />;
    }

    if (hash.startsWith('#legal')) {
      return <Legal />;
    }

    if (hash.startsWith('#pillar/')) {
      const category = hash.replace('#pillar/', '') as PillarCategory;
      const validPillars: PillarCategory[] = ['industry-news', 'careers', 'travel-deals', 'aircraft-tech'];
      
      if (validPillars.includes(category)) {
        return <PillarPage category={category} onNavigate={navigate} />;
      }
    }

    if (hash.startsWith('#article/')) {
      const articleId = hash.replace('#article/', '');
      return <ArticlePage id={articleId} onNavigate={navigate} />;
    }

    // Default Fallback
    return <Home onNavigate={navigate} />;
  };

  // Convert current hash to an elegant active nav state indicator
  const getActivePageLabel = (): string => {
    const hash = currentHash || '#home';
    if (hash.startsWith('#pillar/')) {
      return hash.replace('#', '');
    }
    if (hash === '#travel-hub') {
      return 'travel-hub';
    }
    return hash.replace('#', '');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF8] text-neutral-800 font-sans selection:bg-amber-100 selection:text-neutral-900">
      
      {/* Shared Navigation Header */}
      <Header currentPage={getActivePageLabel()} onNavigate={navigate} />

      {/* Main Body with Transition Wrapper */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentHash}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-full"
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer Board */}
      <Footer onNavigate={navigate} />

      {/* Consent Banner overlay */}
      <CookieConsent onNavigate={navigate} />

      {/* Vercel Web Analytics */}
      <Analytics />

    </div>
  );
}
