import React from 'react';
import { motion } from 'framer-motion';
import DashboardPreview from './DashboardPreview';

export default function Hero({ setCurrentView }) {
  return (
    <section className="hero-section" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '80vh',
      gap: '4rem',
      padding: '4rem 0'
    }}>
      <div className="hero-content" style={{ flex: 1, maxWidth: '600px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="hero-badge"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(124, 58, 237, 0.1)',
            border: '1px solid rgba(124, 58, 237, 0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '9999px',
            color: 'var(--accent)',
            fontSize: '0.875rem',
            fontWeight: 500,
            marginBottom: '2rem'
          }}
        >
          ✨ AI Powered Resume Intelligence
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontSize: '4.5rem',
            lineHeight: 1.1,
            fontWeight: 800,
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}
        >
          Build ATS-Friendly Resumes <br />
          <span className="text-gradient">That Get More Interviews</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: '1.125rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}
        >
          Upload your resume and let AI analyze, optimize, rewrite, improve ATS compatibility, identify missing keywords, and generate a professional report within seconds.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
        >
          <button 
            className="btn-primary" 
            style={{ fontSize: '1.125rem', padding: '1rem 2rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            onClick={() => setCurrentView && setCurrentView('api-key')}
          >
            Get Started <ArrowRight size={20} />
          </button>
          <button className="btn-secondary" style={{ padding: '1rem 2rem', fontSize: '1.125rem' }}>
            View Demo
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}
        >
          <div style={{ color: '#F59E0B', letterSpacing: '2px', marginBottom: '0.5rem' }}>★★★★★</div>
          <p>Trusted by students, job seekers, freshers, and professionals.</p>
        </motion.div>
      </div>

      <motion.div 
        className="hero-image"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        style={{ flex: 1, display: 'flex', justifyContent: 'center' }}
      >
        <DashboardPreview />
      </motion.div>
    </section>
  );
}
