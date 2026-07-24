import React from 'react';
import { motion } from 'framer-motion';
import { Settings, ArrowRight, CheckCircle } from 'lucide-react';

export default function Navbar({
  hasApiKey,
  currentView,
  setCurrentView,
  setAnalysisResult
}) {
  const goHome = () => {
    setCurrentView('home');
    setAnalysisResult('');
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(3, 0, 26, 0.75)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        height: '68px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
      }}>
        {/* Brand */}
        <div
          onClick={goHome}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}
        >
          <div style={{
            width: '36px', height: '36px', borderRadius: '9px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: '800', fontSize: '0.85rem', color: '#fff', letterSpacing: '-0.5px'
          }}>
            RM
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', lineHeight: 1.2 }}>Resume Mentor AI</div>
            <div style={{ fontSize: '0.7rem', color: '#9ca3af', lineHeight: 1 }}>AI Career Assistant</div>
          </div>
        </div>

        {/* Nav links */}
        {(currentView === 'home' || currentView === 'blog') && (
          <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-only">
            {currentView === 'blog' ? (
              <a href="/" style={{ color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}>Home</a>
            ) : (
              <>
                <a href="#features" style={{ color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}>Features</a>
                <a href="#how-it-works" style={{ color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}>How It Works</a>
                <a href="#pricing" style={{ color: '#d1d5db', fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', transition: 'color .2s' }}>Pricing</a>
              </>
            )}
            <a href="/blog" style={{ color: currentView === 'blog' ? '#fff' : '#d1d5db', fontSize: '0.9rem', fontWeight: currentView === 'blog' ? 600 : 500, textDecoration: 'none', transition: 'color .2s' }}>Blog</a>
          </nav>
        )}

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {hasApiKey ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(16, 185, 129, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '9999px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                <CheckCircle size={14} color="#10b981" />
                <span style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 500 }}>API Connected</span>
              </div>
            </div>
          ) : (
            currentView === 'home' && (
              <button
                onClick={() => setCurrentView('api-key')}
                style={{
                  padding: '0.6rem 1.5rem',
                  background: 'linear-gradient(90deg, #4f46e5, #ec4899)',
                  border: 'none', borderRadius: '9999px',
                  color: '#fff', cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 600, fontSize: '0.9rem',
                  display: 'flex', alignItems: 'center', gap: '0.4rem',
                  boxShadow: '0 4px 16px rgba(236,72,153,0.35)',
                  transition: 'transform .2s, box-shadow .2s'
                }}
              >
                Get Started <ArrowRight size={15} />
              </button>
            )
          )}

          {hasApiKey && (
            <button
              onClick={() => setCurrentView('upload')} // Navigates to dashboard basically if on home
              title="Dashboard"
              style={{
                padding: '0.5rem', background: 'transparent', border: 'none',
                color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center',
                transition: 'color .2s'
              }}
            >
              <Settings size={18} />
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
}
