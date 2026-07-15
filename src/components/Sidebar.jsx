import React from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, CheckCircle, Briefcase, BarChart, Settings, FileSearch, Sparkles, Star, CreditCard } from 'lucide-react';

export default function Sidebar({ activeItem, setActiveItem, hasAnalysis, onSubscriptionClick }) {
  const navItems = [
    { id: 'upload', label: 'Upload Resume', icon: <UploadCloud size={20} /> },
    { id: 'analysis', label: 'ATS Analysis', icon: <FileSearch size={20} />, requiresAnalysis: true },
    { id: 'improver', label: 'AI Resume Improver', icon: <Sparkles size={20} />, requiresAnalysis: true },
    { id: 'matcher', label: 'Job Role Matcher', icon: <Briefcase size={20} />, requiresAnalysis: true },
    { id: 'insights', label: 'Career Insights', icon: <BarChart size={20} />, requiresAnalysis: true },
    { id: 'reports', label: 'Saved Reports', icon: <FileText size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="sidebar glass" style={{
      width: '280px',
      height: 'calc(100vh - 40px)',
      position: 'sticky',
      top: '20px',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.5rem',
      borderRadius: '20px',
      margin: '20px 0 20px 20px',
      background: 'var(--bg-sidebar)',
      border: '1px solid rgba(255,255,255,0.05)',
      flexShrink: 0,
    }}>
      <div className="logo" style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <FileText size={28} color="#a78bfa" />
        <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Resume <span className="logo-accent text-gradient">Mentor AI</span></span>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {navItems.map((item) => {
          const isLocked = item.requiresAnalysis && !hasAnalysis;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => !isLocked && setActiveItem(item.id)}
              title={isLocked ? 'Upload and analyze a resume first' : item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                background: isActive
                  ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
                  : 'transparent',
                color: isLocked ? 'rgba(255,255,255,0.25)' : isActive ? '#fff' : 'var(--text-muted)',
                border: 'none',
                textAlign: 'left',
                cursor: isLocked ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: isActive ? '600' : '400',
                boxShadow: isActive ? 'inset 0 1px 0 rgba(255,255,255,0.1)' : 'none',
                opacity: isLocked ? 0.5 : 1,
                position: 'relative',
              }}
            >
              {item.icon}
              <span style={{ flex: 1 }}>{item.label}</span>
              {isLocked && (
                <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'rgba(255,255,255,0.4)' }}>
                  locked
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="premium-card glass" style={{
        marginTop: 'auto',
        padding: '1.25rem',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
        border: '1px solid rgba(139, 92, 246, 0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Star size={18} color="#f59e0b" />
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem', color: '#fff' }}>Pro Plan Active</span>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1rem 0', fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={12} color="var(--success)" /> Unlimited Analyses</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={12} color="var(--success)" /> AI Resume Improver</li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle size={12} color="var(--success)" /> Priority Support</li>
        </ul>
        <button
          onClick={() => onSubscriptionClick && onSubscriptionClick()}
          style={{
            width: '100%',
            padding: '0.6rem',
            borderRadius: '8px',
            border: 'none',
            background: 'rgba(255,255,255,0.1)',
            color: '#fff',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontSize: '0.8rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
          }}
        >
          <CreditCard size={14} />
          Manage Subscription
        </button>
      </div>
    </div>
  );
}
