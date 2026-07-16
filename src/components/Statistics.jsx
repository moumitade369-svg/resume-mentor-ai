import React from 'react';
import { motion } from 'framer-motion';

const STATS = [
  { value: '10,000+', label: 'Resumes Analyzed' },
  { value: '95%',     label: 'ATS Improvement Rate' },
  { value: '4.9★',   label: 'Average User Rating' },
  { value: '< 60s',  label: 'Average Analysis Time' },
];

export default function Statistics() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="section-inner">
        <div className="stats-strip">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
            >
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
