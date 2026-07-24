import React from 'react';
import { motion } from 'framer-motion';
import { blogPosts } from '../data/blogPosts';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Blog({ hasApiKey }) {
  return (
    <div className="redesign-root" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Fixed background layer */}
      <div className="page-bg"><div className="star-grid" /></div>

      {/* Navbar */}
      <Navbar
        currentView="blog"
        hasApiKey={hasApiKey}
        setCurrentView={() => { window.location.href = '/'; }}
        setAnalysisResult={() => {}}
      />

      {/* Main content — position:relative + z-index:1 to appear above the fixed page-bg */}
      <main style={{
        flex: 1,
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 2rem 6rem',
        boxSizing: 'border-box',
      }}>
        {/* Page header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>
            Our Blog
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.7 }}>
            Latest insights, tips, and strategies for landing your dream job with AI.
          </p>
        </div>

        {/* Article cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '2rem' }}>
          {blogPosts.map(post => (
            <motion.a
              key={post.id}
              href={`/blog/${post.id}`}
              whileHover={{ y: -5 }}
              className="glass"
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '20px',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid rgba(255,255,255,0.07)',
                transition: 'border-color 0.2s ease',
              }}
            >
              {/* Card image */}
              <div style={{ height: '200px', width: '100%', overflow: 'hidden', flexShrink: 0 }}>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Card body */}
              <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', gap: '0.75rem', color: '#9ca3af', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  <span>{post.date}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h3 style={{ fontSize: '1.3rem', color: '#f8fafc', marginBottom: '0.75rem', lineHeight: 1.4, fontWeight: 700 }}>
                  {post.title}
                </h3>
                <p style={{ color: '#9ca3af', fontSize: '0.9rem', lineHeight: 1.65, flex: 1 }}>
                  {post.excerpt}
                </p>
                <div style={{ marginTop: '1.5rem', color: '#818cf8', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  Read Article <span>→</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </main>

      {/* Footer */}
      <Footer setCurrentView={() => { window.location.href = '/'; }} />
    </div>
  );
}
