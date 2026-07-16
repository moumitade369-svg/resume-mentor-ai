import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'How does the AI Resume Analysis work?',
    a: 'Our AI scans your resume against industry standards and ATS algorithms. It identifies missing keywords, formatting issues, and weak phrasing — then provides actionable, prioritized feedback you can apply immediately.',
  },
  {
    q: 'Is my data secure?',
    a: 'Absolutely. Privacy is our top priority. Your resume is processed securely in-session and we do not store, sell, or share your data with any third parties. Your API key is also stored only locally.',
  },
  {
    q: 'Can I download the improved resume as a PDF?',
    a: 'Yes! Once the AI optimizes your resume, you can download a clean, professionally formatted PDF directly to your device — ready to send to recruiters.',
  },
  {
    q: 'Does it work for all industries?',
    a: 'Yes. Our AI is trained on diverse datasets spanning tech, finance, healthcare, marketing, design, and many more industries. It adapts to your specific field.',
  },
  {
    q: 'Do I need to create an account?',
    a: 'You can sign in with Google for a seamless experience, but you can also use the tool with just your Gemini API key. No mandatory account required.',
  },
  {
    q: 'What is a Gemini API key and where do I get one?',
    a: 'The Gemini API key is your personal key to access Google\'s Gemini AI model. You can get a free one at aistudio.google.com/app/apikey in under 2 minutes.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section">
      <div className="section-inner">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="badge">✦ Got Questions?</div>
          <h2>
            Frequently Asked{' '}
            <span className="grad-text">Questions</span>
          </h2>
          <p>Everything you need to know about Resume Mentor AI.</p>
        </motion.div>

        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              className={`faq-item${open === i ? ' open' : ''}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <button
                id={`faq-trigger-${i}`}
                className="faq-trigger"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <motion.span
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ flexShrink: 0, display: 'flex' }}
                >
                  <ChevronDown size={18} color="#6b7280" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <p className="faq-body">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
