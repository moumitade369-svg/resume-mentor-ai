import React from 'react';
import { motion } from 'framer-motion';
import { Home, FileText, BarChart2, Briefcase, Mic, User, Lock, Crown } from 'lucide-react';

/* Circular progress ring */
function Ring({ value, color, size = 88, stroke = 8, label, sublabel }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - value / 100);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={stroke} />
          <circle
            cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={color} strokeWidth={stroke}
            strokeDasharray={circ} strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{value}<span style={{ fontSize: '0.75rem' }}>%</span></span>
          {sublabel && <span style={{ fontSize: '0.65rem', color, marginTop: '2px' }}>{sublabel}</span>}
        </div>
      </div>
      {label && <span style={{ fontSize: '0.75rem', color: '#9ca3af', textAlign: 'center' }}>{label}</span>}
    </div>
  );
}

/* Skill bar */
function SkillBar({ name, pct, color }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <span style={{ fontSize: '0.7rem', color: '#9ca3af', width: '72px', flexShrink: 0 }}>{name}</span>
      <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.08)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '2px' }} />
      </div>
      <span style={{ fontSize: '0.68rem', color: '#9ca3af', width: '28px', textAlign: 'right', flexShrink: 0 }}>{pct}%</span>
    </div>
  );
}

const sidebarIcons = [
  { Icon: Home, active: true },
  { Icon: FileText, active: false },
  { Icon: BarChart2, active: false },
  { Icon: Briefcase, active: false },
  { Icon: Mic, active: false },
  { Icon: User, active: false },
];

export default function DashboardPreview() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        width: '100%',
        maxWidth: '700px',
        minWidth: '580px',
        height: '440px',
        display: 'flex',
        borderRadius: '18px',
        overflow: 'hidden',
        background: 'rgba(8, 6, 30, 0.85)',
        boxShadow: '0 0 0 1px rgba(79,70,229,0.4), 0 25px 60px rgba(0,0,0,0.6), 0 0 60px rgba(79,70,229,0.15)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* ── Sidebar ── */}
      <div style={{
        width: '56px', flexShrink: 0,
        background: 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '1.25rem 0', gap: '1.25rem',
      }}>
        <div style={{
          width: '30px', height: '30px', borderRadius: '7px',
          background: 'linear-gradient(135deg,#4f46e5,#ec4899)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '0.7rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem',
        }}>RM</div>
        {sidebarIcons.map(({ Icon, active }, i) => (
          <Icon key={i} size={18} color={active ? '#818cf8' : 'rgba(255,255,255,0.3)'} />
        ))}
      </div>

      {/* ── Main panel ── */}
      <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Hi, Moumita 👋</h3>
            <p style={{ margin: '2px 0 0', fontSize: '0.72rem', color: '#6b7280' }}>Let's improve your resume and get you job-ready.</p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.35rem',
            background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
            padding: '0.2rem 0.65rem', borderRadius: '9999px',
          }}>
            <Crown size={11} color="#f59e0b" />
            <span style={{ fontSize: '0.68rem', color: '#f59e0b', fontWeight: 600 }}>Premium Plan</span>
          </div>
        </div>

        {/* ── Score grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.15fr', gap: '0.75rem', flex: 1 }}>
          {/* ATS Score card */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#d1d5db', alignSelf: 'flex-start' }}>ATS Score</span>
            <Ring value={92} color="#818cf8" sublabel="Excellent" />
            <p style={{ margin: 0, fontSize: '0.62rem', color: '#6b7280', textAlign: 'center', lineHeight: 1.4 }}>
              <span style={{ color: '#10b981' }}>↑ 18%</span> improvement<br />Keep going!
            </p>
          </div>

          {/* Resume Match card */}
          <div style={{
            background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '12px', padding: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem'
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#d1d5db', alignSelf: 'flex-start' }}>Resume Match</span>
            <Ring value={89} color="#22d3ee" sublabel="Great Match" />
            <p style={{ margin: 0, fontSize: '0.62rem', color: '#6b7280', textAlign: 'center', lineHeight: 1.4 }}>
              Great match with<br />target job description
            </p>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Top Skills */}
            <div style={{
              flex: 1, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem'
            }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#d1d5db' }}>Top Skills</span>
              <SkillBar name="React"      pct={90} color="#818cf8" />
              <SkillBar name="JavaScript" pct={85} color="#818cf8" />
              <SkillBar name="Node.js"    pct={80} color="#818cf8" />
              <SkillBar name="MongoDB"    pct={75} color="#818cf8" />
            </div>

            {/* Career Readiness */}
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '12px', padding: '0.875rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#d1d5db', display: 'block' }}>Career Readiness</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>85%</span>
                <span style={{ fontSize: '0.62rem', color: '#10b981', display: 'block' }}>Job Ready</span>
              </div>
              <Ring value={85} color="#22d3ee" size={52} stroke={6} />
            </div>
          </div>
        </div>

        {/* ── AI Suggestions ── */}
        <div style={{ flexShrink: 0 }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#d1d5db', display: 'block', marginBottom: '0.5rem' }}>AI Suggestions</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {[
              'Add more quantifiable achievements',
              'Include more relevant keywords',
              'Improve your summary section',
            ].map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                background: 'rgba(255,255,255,0.025)', borderRadius: '8px',
                padding: '0.45rem 0.75rem',
              }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '5px',
                  background: 'rgba(79,70,229,0.2)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Lock size={10} color="#818cf8" />
                </div>
                <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: '#818cf8', cursor: 'pointer' }}>
            View all suggestions →
          </div>
        </div>
      </div>
    </motion.div>
  );
}
