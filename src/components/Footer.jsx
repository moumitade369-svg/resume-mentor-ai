import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  return (
    <>
      {/* ── CTA Banner ── */}
      <section className="section" style={{ paddingBottom: '2rem' }}>
        <div className="section-inner">
          <motion.div
            className="cta-banner"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 1rem',
                borderRadius: '9999px',
                background: 'rgba(129, 140, 248, 0.1)',
                border: '1px solid rgba(129, 140, 248, 0.22)',
                color: '#818cf8',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Sparkles size={12} /> Start Free Today
            </div>

            <h2>
              Ready to{' '}
              <span className="grad-text">Land Your Dream Job?</span>
            </h2>
            <p>
              Join thousands of professionals who have already transformed their
              resumes and fast-tracked their careers with Resume Mentor AI.
            </p>

            <div className="cta-actions">
              <button
                id="footer-get-started"
                className="btn-cta"
                onClick={() => setCurrentView && setCurrentView('api-key')}
              >
                🚀 Get Started Free <ArrowRight size={16} />
              </button>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="btn-outline"
              >
                Get Free API Key
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          {/* Footer grid */}
          <div className="footer-grid">
            {/* Brand column */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="footer-logo-box">RM</div>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                  Resume Mentor AI
                </span>
              </div>
              <p className="footer-desc">
                Premium AI-powered resume analysis, optimization, and career acceleration.
                Land your dream job faster.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-col-title">Quick Links</h4>
              <ul className="footer-links">
                {[
                  ['#features', 'Features'],
                  ['#how-it-works', 'How It Works'],
                  ['#testimonials', 'Testimonials'],
                  ['#faq', 'FAQ'],
                ].map(([href, label]) => (
                  <li key={href}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="footer-col-title">Legal</h4>
              <ul className="footer-links">
                {[
                  ['#', 'Privacy Policy'],
                  ['#', 'Terms of Service'],
                  ['#', 'Cookie Policy'],
                  ['#', 'Contact Us'],
                ].map(([href, label], i) => (
                  <li key={i}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="footer-col-title">Connect</h4>
              <ul className="footer-links">
                {[
                  ['#', 'GitHub'],
                  ['#', 'LinkedIn'],
                  ['#', 'Twitter / X'],
                  ['#', 'Product Hunt'],
                ].map(([href, label], i) => (
                  <li key={i}>
                    <a href={href}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Resume Mentor AI. All rights reserved.</span>
            <span>Crafted with ♥ by Moumita De Panja · Powered by Google Gemini AI</span>
          </div>
        </div>
      </footer>
    </>
  );
}
