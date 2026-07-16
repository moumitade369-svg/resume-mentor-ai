import React from 'react';
import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    name: 'Sarah Jenkins',
    role: 'Software Engineer',
    company: 'TechCorp',
    rating: 5,
    quote:
      'Resume Mentor AI completely transformed my resume. I went from getting no callbacks to scheduling 4 interviews in a single week. Absolutely incredible.',
    initials: 'SJ',
    gradient: 'linear-gradient(135deg, #4f46e5, #818cf8)',
  },
  {
    name: 'David Chen',
    role: 'Product Manager',
    company: 'StartupX',
    rating: 5,
    quote:
      'The ATS optimization feature is incredible. It highlighted keywords I was missing and the AI rewrites were spot-on professional. Landed my dream PM role!',
    initials: 'DC',
    gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Specialist',
    company: 'Global Agency',
    rating: 5,
    quote:
      'The interface is stunning and the results speak for themselves. This is the best resume tool I have ever used. Got 3 job offers within a month!',
    initials: 'ER',
    gradient: 'linear-gradient(135deg, #10b981, #22d3ee)',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="section">
      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="badge">✦ Success Stories</div>
          <h2>
            Loved by{' '}
            <span className="grad-text">Professionals</span>
          </h2>
          <p>See what real users say about their resume transformation experience.</p>
        </motion.div>

        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              className="testi-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              {/* Stars */}
              <div className="testi-stars">
                {'★'.repeat(t.rating)}
              </div>

              {/* Quote */}
              <p className="testi-quote">"{t.quote}"</p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                <div
                  className="testi-avatar"
                  style={{ background: t.gradient }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}, {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
