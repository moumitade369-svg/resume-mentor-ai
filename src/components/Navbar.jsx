import React from 'react';
import { FileText, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar({ 
  firebaseUser, 
  handleSignOut, 
  setShowSettings, 
  currentView,
  setCurrentView,
  setAnalysisResult 
}) {
  return (
    <motion.header 
      className="navbar glass"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'sticky',
        top: '1rem',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        margin: '0 auto',
        maxWidth: '1280px',
        width: 'calc(100% - 2rem)',
        borderRadius: '20px'
      }}
    >
      <div 
        className="logo" 
        onClick={() => { setCurrentView('home'); setAnalysisResult(''); }} 
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.25rem' }}
      >
        <FileText size={24} color="var(--primary)" />
        <span>Resume <span className="text-gradient-primary">Mentor AI</span></span>
      </div>

      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="nav-links">
        {currentView === 'home' && (
          <div style={{ display: 'flex', gap: '2rem' }} className="desktop-only">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#faq">FAQ</a>
          </div>
        )}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {firebaseUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }} className="desktop-only">
              {firebaseUser.displayName || firebaseUser.phoneNumber || firebaseUser.email}
            </span>
            <button
              onClick={handleSignOut}
              className="btn-secondary"
              title="Sign Out"
              style={{ padding: '0.5rem 1rem' }}
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          currentView === 'home' && (
            <button 
              className="btn-primary" 
              onClick={() => setCurrentView('api-key')}
            >
              Get Started
            </button>
          )
        )}
        <button 
          className="btn-secondary" 
          onClick={() => setShowSettings(true)}
          title="Settings"
          style={{ padding: '0.5rem 1rem' }}
        >
          <Settings size={18} />
        </button>
      </div>
    </motion.header>
  );
}
