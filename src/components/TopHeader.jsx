import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function TopHeader({ hasApiKey, onSettingsClick }) {

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 0',
      marginBottom: '2rem'
    }}>
      <div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Welcome back 👋
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: '0.2rem 0 0 0' }}>Here's what's happening with your resume today.</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div className="search-bar glass" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '50px',
          background: 'rgba(255,255,255,0.03)'
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search reports..." 
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              outline: 'none',
              width: '200px'
            }}
          />
        </div>

        <button style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--text-muted)',
          cursor: 'pointer'
        }}>
          <Bell size={18} />
        </button>

        <div 
          onClick={onSettingsClick}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.3rem 0.5rem',
            borderRadius: '50px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            cursor: 'pointer'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <User size={16} color="#fff" />
          </div>
        </div>
      </div>
    </div>
  );
}
