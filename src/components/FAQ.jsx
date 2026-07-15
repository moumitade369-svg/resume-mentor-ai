import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "How does the AI Resume Analysis work?", a: "Our AI scans your resume against industry standards and Applicant Tracking Systems (ATS) algorithms. It identifies missing keywords, formatting issues, and weak phrasing, then provides actionable feedback." },
    { q: "Is my data secure?", a: "Yes. Privacy is our top priority. Your resume is analyzed securely and we do not store your data or share it with third parties." },
    { q: "Can I download the improved resume as a PDF?", a: "Absolutely. Once the AI optimizes your resume, you can download a clean, professionally formatted PDF directly to your device." },
    { q: "Does it work for all industries?", a: "Yes. Our AI models are trained on millions of successful resumes across various industries, from tech and finance to healthcare and design." }
  ];

  return (
    <section id="faq" style={{ padding: '6rem 0', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem' }}>Frequently Asked Questions</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem' }}>Everything you need to know about Resume Mentor AI.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {faqs.map((faq, index) => (
          <div key={index} className="glass-card" style={{ overflow: 'hidden' }}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              style={{
                width: '100%',
                padding: '1.5rem 2rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '1.125rem',
                fontWeight: 500,
                textAlign: 'left'
              }}
            >
              {faq.q}
              <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                <ChevronDown size={20} color="var(--text-muted)" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={{ padding: '0 2rem 1.5rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
