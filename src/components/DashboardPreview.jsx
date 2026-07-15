import React from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, BarChart, Download, Sparkles } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <motion.div 
      className="glass-card"
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: '100%',
        maxWidth: '500px',
        padding: '2rem',
        background: 'rgba(17, 17, 24, 0.8)',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ background: 'var(--primary)', padding: '0.75rem', borderRadius: '12px' }}>
          <FileText size={24} color="#fff" />
        </div>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff' }}>Resume.pdf</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Uploaded 2 mins ago</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass" style={{ padding: '1rem', textAlign: 'center', borderRadius: '12px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Resume Score</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>92%</div>
        </div>
        <div className="glass" style={{ padding: '1rem', textAlign: 'center', borderRadius: '12px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>ATS Score</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)' }}>89%</div>
        </div>
        <div className="glass" style={{ padding: '1rem', textAlign: 'center', borderRadius: '12px' }}>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginBottom: '0.25rem' }}>Keyword Match</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--accent)' }}>94%</div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="var(--primary)" /> AI Suggestions
        </h4>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', listStyle: 'none' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
            <CheckCircle size={16} color="var(--success)" /> Add measurable achievements
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
            <CheckCircle size={16} color="var(--success)" /> Improve Summary
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
            <CheckCircle size={16} color="var(--success)" /> Stronger Action Verbs
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-main)' }}>
            <AlertCircle size={16} color="var(--warning)" /> Include Industry Keywords
          </li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="btn-primary" style={{ flex: 1, fontSize: '0.875rem', padding: '0.75rem' }}>
          Improve Resume
        </button>
        <button className="btn-secondary" style={{ flex: 1, fontSize: '0.875rem', padding: '0.75rem' }}>
          <Download size={16} /> Report
        </button>
      </div>
    </motion.div>
  );
}
