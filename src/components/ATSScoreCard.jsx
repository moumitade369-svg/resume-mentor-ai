import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ATSScoreCard({ score = 85 }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 500);
    return () => clearTimeout(timer);
  }, [score]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  let color = '#ef4444'; // Red
  if (animatedScore >= 80) color = '#10b981'; // Green
  else if (animatedScore >= 50) color = '#f59e0b'; // Yellow

  return (
    <div className="ats-score-card glass" style={{
      padding: '1.5rem',
      borderRadius: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '1.5rem'
    }}>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', alignSelf: 'flex-start' }}>ATS Match Score</h3>
      
      <div style={{ position: 'relative', width: '150px', height: '150px' }}>
        <svg width="150" height="150" viewBox="0 0 150 150">
          <circle 
            cx="75" cy="75" r={radius} 
            stroke="rgba(255,255,255,0.05)" 
            strokeWidth="12" fill="none" 
          />
          <motion.circle 
            cx="75" cy="75" r={radius} 
            stroke={color} 
            strokeWidth="12" fill="none" 
            strokeLinecap="round"
            style={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            transform="rotate(-90 75 75)"
          />
        </svg>
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
        }}>
          <span style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: 1 }}>{Math.round(animatedScore)}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>/ 100</span>
        </div>
      </div>

      <div style={{ width: '100%', marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ScoreBar label="Keywords" score={animatedScore > 80 ? 92 : 65} color="#8b5cf6" />
        <ScoreBar label="Formatting" score={animatedScore > 80 ? 85 : 70} color="#3b82f6" />
        <ScoreBar label="Experience" score={animatedScore > 80 ? 88 : 55} color="#10b981" />
      </div>
    </div>
  );
}

function ScoreBar({ label, score, color }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
        <span style={{ color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontWeight: 'bold' }}>{score}%</span>
      </div>
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ height: '100%', background: color, borderRadius: '10px' }}
        />
      </div>
    </div>
  );
}
