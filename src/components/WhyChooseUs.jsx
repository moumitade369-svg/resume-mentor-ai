import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Clock, ShieldCheck, ThumbsUp } from 'lucide-react';

const ITEMS = [
  {
    Icon: BrainCircuit,
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.1)',
    border: 'rgba(129,140,248,0.25)',
    title: 'AI-Powered',
    desc: 'Advanced language models trained on millions of resumes analyze and improve your document instantly.',
  },
  {
    Icon: Clock,
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.1)',
    border: 'rgba(34,211,238,0.25)',
    title: 'Lightning Fast',
    desc: 'Get comprehensive analysis, rewrites, and improvement suggestions in under 60 seconds.',
  },
  {
    Icon: ShieldCheck,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.25)',
    title: 'Privacy First',
    desc: 'Your resume is processed securely. We never store your personal data or share it with third parties.',
  },
  {
    Icon: ThumbsUp,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    border: 'rgba(236,72,153,0.25)',
    title: 'Professional Results',
    desc: 'Industry-standard formatting, keyword optimization, and recruiter-tested improvement suggestions.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section" style={{ paddingTop: '2rem' }}>
      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="badge">✦ Our Advantage</div>
          <h2>
            Built for{' '}
            <span className="grad-text">Professionals</span>
          </h2>
          <p>Every feature is designed to maximize your chances of landing the job.</p>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {ITEMS.map(({ Icon, color, bg, border, title, desc }, i) => (
            <motion.div
              key={i}
              className="feat-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ flexDirection: 'row', alignItems: 'flex-start' }}
              whileHover={{ y: -3, borderColor: border }}
            >
              <div
                className="feat-icon-box"
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  flexShrink: 0,
                }}
              >
                <Icon size={22} color={color} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <h4 className="feat-title">{title}</h4>
                <p className="feat-desc">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
