import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, BrainCircuit, Target, FileDown } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    Icon: UploadCloud,
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.25)',
    bg: 'rgba(34,211,238,0.1)',
    border: 'rgba(34,211,238,0.3)',
    title: 'Upload Resume',
    desc: 'Drag & drop or browse to upload your resume in PDF or DOCX format. Takes under 5 seconds.',
  },
  {
    num: '02',
    Icon: BrainCircuit,
    color: '#818cf8',
    glow: 'rgba(129,140,248,0.25)',
    bg: 'rgba(129,140,248,0.1)',
    border: 'rgba(129,140,248,0.3)',
    title: 'AI Deep Analysis',
    desc: 'Our AI engine performs a comprehensive ATS audit, keyword gap analysis, and format check in real-time.',
  },
  {
    num: '03',
    Icon: Target,
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
    bg: 'rgba(236,72,153,0.1)',
    border: 'rgba(236,72,153,0.3)',
    title: 'Get AI Suggestions',
    desc: 'Receive prioritized, actionable improvements. Match against any job description for targeted optimization.',
  },
  {
    num: '04',
    Icon: FileDown,
    color: '#10b981',
    glow: 'rgba(16,185,129,0.25)',
    bg: 'rgba(16,185,129,0.1)',
    border: 'rgba(16,185,129,0.3)',
    title: 'Download & Apply',
    desc: 'Download your polished, ATS-optimized resume as a professional PDF and start applying with confidence.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="section-inner">
        {/* Heading */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="badge">✦ The Process</div>
          <h2>
            How{' '}
            <span className="grad-text">Resume Mentor AI</span> Works
          </h2>
          <p>
            From upload to interview-ready resume in four simple steps.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="steps-grid">
          {STEPS.map((step, i) => (
            <motion.div
              key={i}
              className="step-card"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{
                y: -4,
                boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 28px ${step.glow}`,
                borderColor: step.border,
              }}
            >
              {/* Soft glow blob in corner */}
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: step.glow,
                  filter: 'blur(22px)',
                  pointerEvents: 'none',
                }}
              />

              {/* Icon */}
              <div
                className="step-icon-box"
                style={{
                  background: step.bg,
                  border: `1px solid ${step.border}`,
                  boxShadow: `0 0 20px ${step.glow}`,
                }}
              >
                <step.Icon size={26} color={step.color} />
              </div>

              {/* Number */}
              <span
                className="step-num"
                style={{
                  background: `linear-gradient(90deg, ${step.color}, #fff)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                STEP {step.num}
              </span>

              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
