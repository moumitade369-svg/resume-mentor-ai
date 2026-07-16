import React from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Target, BarChart2, FileText, CheckCircle } from 'lucide-react';

const FEATURES = [
  {
    Icon: Search,
    color: '#22d3ee',
    bg: 'rgba(34,211,238,0.1)',
    border: 'rgba(34,211,238,0.25)',
    glow: 'rgba(34,211,238,0.2)',
    title: 'ATS Optimization',
    desc: 'Our AI scans your resume against ATS algorithms to ensure it gets past the robots and reaches human eyes.',
  },
  {
    Icon: Sparkles,
    color: '#818cf8',
    bg: 'rgba(129,140,248,0.1)',
    border: 'rgba(129,140,248,0.25)',
    glow: 'rgba(129,140,248,0.2)',
    title: 'Smart AI Rewriting',
    desc: 'Automatically enhance your bullet points with powerful action verbs and quantifiable metrics that recruiters love.',
  },
  {
    Icon: Target,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    border: 'rgba(236,72,153,0.25)',
    glow: 'rgba(236,72,153,0.2)',
    title: 'Keyword Matching',
    desc: 'Identifies missing keywords from job descriptions and suggests exactly where to add them for maximum impact.',
  },
  {
    Icon: BarChart2,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.25)',
    glow: 'rgba(16,185,129,0.2)',
    title: 'Detailed Analytics',
    desc: 'Get a comprehensive score breakdown of your resume with specific areas flagged for improvement.',
  },
  {
    Icon: FileText,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    border: 'rgba(245,158,11,0.25)',
    glow: 'rgba(245,158,11,0.2)',
    title: 'AI Cover Letters',
    desc: 'Generate highly customized, professional cover letters tailored to each job description automatically.',
  },
  {
    Icon: CheckCircle,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
    border: 'rgba(99,102,241,0.25)',
    glow: 'rgba(99,102,241,0.2)',
    title: 'Formatting Fixes',
    desc: 'Ensures your resume layout is clean, consistent, and professional — ready for any recruiter or ATS system.',
  },
];

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="section-inner">
        {/* Heading */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="badge">✦ Core Features</div>
          <h2>
            Why Choose{' '}
            <span className="grad-text">Resume Mentor AI</span>
          </h2>
          <p>
            Everything you need to craft the perfect resume and land your
            dream job faster with AI-powered precision.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="feat-grid">
          {FEATURES.map(({ Icon, color, bg, border, glow, title, desc }, i) => (
            <motion.div
              key={i}
              className="feat-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{
                y: -4,
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 24px ${glow}`,
                borderColor: border,
              }}
            >
              {/* Icon box */}
              <div
                className="feat-icon-box"
                style={{
                  background: bg,
                  border: `1px solid ${border}`,
                  boxShadow: `0 0 16px ${glow}`,
                }}
              >
                <Icon size={22} color={color} />
              </div>

              <h3 className="feat-title">{title}</h3>
              <p className="feat-desc">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
