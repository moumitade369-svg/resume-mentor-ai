import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Search, PenTool, FileDown } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    { icon: <UploadCloud size={24} />, title: 'Upload Resume', desc: 'PDF or DOCX format' },
    { icon: <Search size={24} />, title: 'AI Analysis', desc: 'Instant ATS & keyword scan' },
    { icon: <PenTool size={24} />, title: 'Optimization', desc: 'AI rewrites & improves' },
    { icon: <FileDown size={24} />, title: 'Download Report', desc: 'Get your polished PDF' },
  ];

  return (
    <section id="how-it-works" style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>How It Works</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Four simple steps to a better resume.</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', flexWrap: 'wrap', gap: '2rem' }}>
        {/* Connecting Line for Desktop */}
        <div className="desktop-only" style={{ position: 'absolute', top: '40px', left: '10%', right: '10%', height: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: '1 1 200px' }}
          >
            <div style={{ 
              width: '80px', height: '80px', borderRadius: '50%', 
              background: 'var(--surface)', border: '2px solid var(--primary)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--primary)', marginBottom: '1.5rem',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.2)'
            }}>
              {step.icon}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>{step.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
