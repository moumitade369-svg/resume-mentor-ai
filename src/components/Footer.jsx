import React from 'react';
import { FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', padding: '4rem 0 2rem', marginTop: '4rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 700, fontSize: '1.25rem', marginBottom: '1rem' }}>
            <FileText size={24} color="var(--primary)" />
            <span>Resume <span className="text-gradient-primary">Mentor AI</span></span>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6 }}>
            Premium AI-powered resume analysis and optimization. Build ATS-friendly resumes that get you hired faster.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem' }}>Quick Links</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><a href="#features" style={{ color: 'var(--text-muted)' }}>Features</a></li>
            <li><a href="#how-it-works" style={{ color: 'var(--text-muted)' }}>How It Works</a></li>
            <li><a href="#faq" style={{ color: 'var(--text-muted)' }}>FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem' }}>Legal</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><a href="#" style={{ color: 'var(--text-muted)' }}>Privacy Policy</a></li>
            <li><a href="#" style={{ color: 'var(--text-muted)' }}>Terms of Service</a></li>
            <li><a href="#" style={{ color: 'var(--text-muted)' }}>Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '1.5rem' }}>Social</h4>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ color: 'var(--text-muted)' }}>GitHub</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>LinkedIn</a>
            <a href="#" style={{ color: 'var(--text-muted)' }}>Twitter</a>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
        <p>© {new Date().getFullYear()} Resume Mentor AI. All rights reserved.</p>
        <p style={{ marginTop: '0.5rem' }}>Powered by Moumita De Panja</p>
      </div>
    </footer>
  );
}
