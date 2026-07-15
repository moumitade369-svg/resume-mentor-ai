import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, XCircle, CheckCircle } from 'lucide-react';

export default function Comparison() {
  return (
    <section style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Before & After</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>See the difference AI makes in your resume.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Before Card */}
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ flex: '1 1 300px', padding: '2.5rem', borderTop: '4px solid var(--danger)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-muted)' }}>Original Resume</h3>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600 }}>ATS: 61%</div>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <XCircle size={20} color="var(--danger)" /> Missing Keywords
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <XCircle size={20} color="var(--danger)" /> Weak Summary
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
              <XCircle size={20} color="var(--danger)" /> Poor Formatting
            </li>
          </ul>
        </motion.div>

        {/* Arrow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          style={{ padding: '1rem', background: 'rgba(124, 58, 237, 0.1)', borderRadius: '50%', color: 'var(--primary)' }}
        >
          <ArrowRight size={32} />
        </motion.div>

        {/* After Card */}
        <motion.div 
          className="glass-card"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          style={{ flex: '1 1 300px', padding: '2.5rem', borderTop: '4px solid var(--success)', position: 'relative', overflow: 'hidden' }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle at 100% 0%, rgba(16, 185, 129, 0.1), transparent 50%)', pointerEvents: 'none' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', position: 'relative' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>Optimized Resume</h3>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 600 }}>ATS: 94%</div>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
              <CheckCircle size={20} color="var(--success)" /> Optimized Keywords
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
              <CheckCircle size={20} color="var(--success)" /> Professional Summary
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
              <CheckCircle size={20} color="var(--success)" /> Improved Formatting
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
