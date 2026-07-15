import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Clock, ShieldCheck, ThumbsUp } from 'lucide-react';

export default function WhyChooseUs() {
  const items = [
    { icon: <BrainCircuit size={28} />, title: 'AI Powered', desc: 'Advanced language models analyze your resume.' },
    { icon: <Clock size={28} />, title: 'Fast Analysis', desc: 'Get results and improvements in seconds.' },
    { icon: <ShieldCheck size={28} />, title: 'Privacy First', desc: 'Your data is secure and never stored unnecessarily.' },
    { icon: <ThumbsUp size={28} />, title: 'Professional Suggestions', desc: 'Industry-standard formatting and keyword advice.' }
  ];

  return (
    <section style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Why Resume Mentor AI</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Built for professionals who want to stand out.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ padding: '2rem', display: 'flex', alignItems: 'flex-start', gap: '1.25rem' }}
          >
            <div style={{ color: 'var(--accent)', background: 'rgba(99, 102, 241, 0.1)', padding: '0.75rem', borderRadius: '12px' }}>
              {item.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>{item.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
