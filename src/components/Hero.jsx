import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import DashboardPreview from './DashboardPreview';

export default function Hero({ setCurrentView }) {
  return (
    <section className="hero-section">
      {/* ── Left copy ── */}
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        {/* Badge */}
        <div className="hero-badge">
          <Sparkles size={13} color="#818cf8" />
          AI-Powered Career Assistant
        </div>

        {/* Headline */}
        <h1 className="hero-h1">
          Your Resume.<br />
          Our AI.<br />
          Your{' '}
          <span className="grad-text">Dream Job.</span>
        </h1>

        {/* Sub-copy */}
        <p className="hero-sub">
          Get AI-powered resume analysis, boost your ATS score, and land
          your dream job faster with our premium career assistant.
        </p>

        {/* CTA row */}
        <div className="hero-actions">
          <button
            id="hero-get-started"
            className="btn-cta"
            onClick={() => setCurrentView && setCurrentView('api-key')}
          >
            🚀 Get Started Free
          </button>

          {/* Decorative hand-drawn arrow */}
          <svg
            width="52"
            height="34"
            viewBox="0 0 52 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ opacity: 0.65, flexShrink: 0 }}
          >
            <path
              d="M4 26 C12 6 36 2 48 16"
              stroke="#ec4899"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M42 9 L48 16 L38 20"
              stroke="#ec4899"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Social proof line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            marginTop: '2.25rem',
            fontSize: '0.82rem',
            color: '#6b7280',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ color: '#f59e0b' }}>★★★★★</span>
          Trusted by 10,000+ professionals · No credit card required
        </motion.p>
      </motion.div>

      {/* ── Right dashboard mockup ── */}
      <motion.div
        className="hero-image"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
      >
        <DashboardPreview />
      </motion.div>
    </section>
  );
}
