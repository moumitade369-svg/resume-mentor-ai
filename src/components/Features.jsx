import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Zap, TrendingUp, Sparkles, Target, Download } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: <FileText size={32} />, title: 'AI Resume Analysis', desc: 'Deep scan of your resume content, structure, and formatting.' },
    { icon: <Zap size={32} />, title: 'ATS Optimization', desc: 'Ensure your resume passes Applicant Tracking Systems.' },
    { icon: <TrendingUp size={32} />, title: 'Resume Improvement', desc: 'Let AI rewrite and elevate your professional experience.' },
    { icon: <Target size={32} />, title: 'Keyword Scanner', desc: 'Identify missing skills and keywords for your target role.' },
    { icon: <Sparkles size={32} />, title: 'AI Suggestions', desc: 'Actionable tips to make your resume stand out to recruiters.' },
    { icon: <Download size={32} />, title: 'Download PDF', desc: 'Export your optimized resume in a clean, professional format.' },
  ];

  return (
    <section id="features" style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Premium Features</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>Everything you need to craft a winning resume in one powerful platform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.3)' }}
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', cursor: 'default' }}
          >
            <div style={{ color: 'var(--primary)', background: 'rgba(124, 58, 237, 0.1)', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {feature.icon}
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#fff', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
