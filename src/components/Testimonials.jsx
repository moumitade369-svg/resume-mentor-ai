import React from 'react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    { name: "Sarah Jenkins", role: "Software Engineer", company: "TechCorp", content: "Resume Mentor AI completely transformed my resume. I went from getting no callbacks to scheduling 4 interviews in a week.", rating: 5 },
    { name: "David Chen", role: "Product Manager", company: "StartupX", content: "The ATS optimization feature is incredible. It highlighted keywords I was missing and the AI rewrites were spot-on professional.", rating: 5 },
    { name: "Emily Rodriguez", role: "Marketing Specialist", company: "Global Agency", content: "The interface is beautiful and the results speak for themselves. This is the best tool I've used for career advancement.", rating: 5 }
  ];

  return (
    <section style={{ padding: '6rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Loved by Professionals</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>See what others are saying about our platform.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {testimonials.map((test, index) => (
          <motion.div
            key={index}
            className="glass-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <div style={{ color: '#F59E0B', letterSpacing: '2px', marginBottom: '1.5rem' }}>
                {'★'.repeat(test.rating)}
              </div>
              <p style={{ color: '#fff', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic' }}>
                "{test.content}"
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: '1.25rem' }}>
                {test.name.charAt(0)}
              </div>
              <div>
                <h4 style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{test.name}</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{test.role}, {test.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
