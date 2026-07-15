import React from 'react';
import { motion } from 'framer-motion';

export default function Statistics() {
  const stats = [
    { value: '10000+', label: 'Resumes Analyzed' },
    { value: '95%', label: 'ATS Improvement' },
    { value: '4.9★', label: 'Average Rating' },
    { value: '2 min', label: 'Average Processing Time' },
  ];

  return (
    <section style={{ padding: '4rem 0' }}>
      <div className="glass-card" style={{ padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center', background: 'rgba(124, 58, 237, 0.05)' }}>
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          >
            <div style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem', background: 'linear-gradient(135deg, #fff 0%, var(--primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {stat.value}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
