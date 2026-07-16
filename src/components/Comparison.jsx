import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, CheckCircle, ArrowRight } from 'lucide-react';

const BEFORE_ITEMS = [
  'Missing ATS keywords',
  'Weak, vague bullet points',
  'Poor formatting structure',
  'No quantifiable metrics',
  'Generic summary section',
];

const AFTER_ITEMS = [
  'Optimized keyword density',
  'Powerful action-verb bullets',
  'Clean, recruiter-ready layout',
  'Quantified impact metrics',
  'Compelling AI-crafted summary',
];

export default function Comparison() {
  return (
    <section className="section">
      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="badge">✦ The Transformation</div>
          <h2>
            Before &amp;{' '}
            <span className="grad-text">After</span>
          </h2>
          <p>See the difference AI makes to your resume — instantly.</p>
        </motion.div>

        <div className="compare-grid">
          {/* Before */}
          <motion.div
            className="compare-card before"
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#9ca3af', fontWeight: 700, fontSize: '1.05rem', margin: 0 }}>
                Original Resume
              </h3>
              <span style={{
                background: 'rgba(239,68,68,0.15)',
                color: '#ef4444',
                padding: '0.2rem 0.7rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}>
                ATS: 61%
              </span>
            </div>
            {BEFORE_ITEMS.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#6b7280', fontSize: '0.9rem' }}>
                <XCircle size={18} color="#ef4444" style={{ flexShrink: 0 }} />
                {t}
              </div>
            ))}
          </motion.div>

          {/* Arrow */}
          <motion.div
            className="compare-arrow-wrap"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <ArrowRight size={20} color="#818cf8" />
          </motion.div>

          {/* After */}
          <motion.div
            className="compare-card after"
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', margin: 0 }}>
                Optimized Resume
              </h3>
              <span style={{
                background: 'rgba(16,185,129,0.15)',
                color: '#10b981',
                padding: '0.2rem 0.7rem',
                borderRadius: '9999px',
                fontSize: '0.78rem',
                fontWeight: 700,
              }}>
                ATS: 94%
              </span>
            </div>
            {AFTER_ITEMS.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#d1d5db', fontSize: '0.9rem' }}>
                <CheckCircle size={18} color="#10b981" style={{ flexShrink: 0 }} />
                {t}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
