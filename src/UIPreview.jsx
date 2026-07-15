import React, { useState } from 'react';
import './UIPreview.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import WhyChooseUs from './components/WhyChooseUs';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';

export default function UIPreview() {
  const [currentView, setCurrentView] = useState('home');
  const [showSettings, setShowSettings] = useState(false);

  // Mock functions for preview
  const handleSignOut = () => console.log('Sign out');
  const setAnalysisResult = () => console.log('Reset analysis');

  return (
    <div className="ui-preview-root">
      <Navbar 
        firebaseUser={null}
        handleSignOut={handleSignOut}
        setShowSettings={setShowSettings}
        currentView={currentView}
        setCurrentView={setCurrentView}
        setAnalysisResult={setAnalysisResult}
      />
      <main className="main-content">
        <Hero setCurrentView={setCurrentView} />
        <Features />
        <HowItWorks />
        <Comparison />
        <WhyChooseUs />
        <Statistics />
        <Testimonials />
        <FAQ />
      </main>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
        <Footer />
      </div>
    </div>
  );
}
