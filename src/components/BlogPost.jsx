import React, { Component } from 'react';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { blogPosts } from '../data/blogPosts';
import Navbar from './Navbar';
import Footer from './Footer';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', color: 'white', background: '#0d0d1a', minHeight: '100vh' }}>
          <h1 style={{ color: '#ef4444' }}>Rendering Error</h1>
          <pre style={{ marginTop: '1rem', color: '#9ca3af' }}>{this.state.error?.toString()}</pre>
          <a href="/blog" style={{ color: '#818cf8', display: 'inline-block', marginTop: '1rem' }}>← Back to Blog</a>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function BlogPost({ slug, hasApiKey }) {
  const post = blogPosts.find(p => p.id === slug);

  return (
    <ErrorBoundary>
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
          maxWidth: '800px',
          margin: '0 auto',
          padding: '100px 2rem 6rem',
          boxSizing: 'border-box',
        }}>

          {post ? (
  <>
    <Helmet>
      <title>{post.seoTitle}</title>
      <meta
        name="description"
        content={post.seoDescription}
      />
    </Helmet>
            {/* ── Article found ─────────────────────────────── */}

              <a href="/blog" style={{
                color: '#818cf8',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                fontWeight: 500,
                fontSize: '0.95rem',
              }}>
                ← Back to Blog
              </a>

              {/* Hero image */}
              <div style={{ marginBottom: '2rem', borderRadius: '20px', overflow: 'hidden', height: '400px', width: '100%' }}>
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>

              {/* Meta */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', color: '#9ca3af', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
                <span>·</span>
                <span>By {post.author}</span>
              </div>

              {/* Title */}
              <h1 style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: '#ffffff',
                marginBottom: '2.5rem',
                lineHeight: 1.2,
                fontWeight: 800,
                letterSpacing: '-0.025em',
              }}>
                {post.title}
              </h1>

              {/* Markdown body */}
              <div className="markdown-body">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </div>

              {/* CTA */}
              <div className="glass" style={{ marginTop: '4rem', padding: '3rem 2rem', borderRadius: '24px', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', color: '#ffffff', marginBottom: '0.75rem' }}>
                  Ready to land your dream job?
                </h3>
                <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1rem' }}>
                  Let our AI analyze and improve your resume in seconds.
                </p>
                <a
                  href="/"
                  style={{
                    display: 'inline-block',
                    padding: '0.9rem 2.5rem',
                    background: 'linear-gradient(135deg, #4f46e5 0%, #ec4899 100%)',
                    color: '#fff',
                    borderRadius: '9999px',
                    fontWeight: 700,
                    fontSize: '1rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(236,72,153,0.4)',
                  }}
                >
                  Analyze Your Resume →
                </a>
              </div>
            </>
          ) : (
            /* ── Post not found ────────────────────────────── */
            <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
              <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Post Not Found</h1>
              <p style={{ color: '#9ca3af', marginBottom: '2rem' }}>
                The article you're looking for doesn't exist.
              </p>
              <a
                href="/blog"
                style={{
                  display: 'inline-block',
                  padding: '0.75rem 2rem',
                  background: 'linear-gradient(135deg, #4f46e5, #ec4899)',
                  color: '#fff',
                  borderRadius: '9999px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                ← Back to Blog
              </a>
            </div>
          )}
        </main>

        {/* Footer */}
        <Footer setCurrentView={() => { window.location.href = '/'; }} />
      </div>
    </ErrorBoundary>
  );
}
