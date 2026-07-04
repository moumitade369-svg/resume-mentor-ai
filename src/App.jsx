import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, Settings, X, CheckCircle, AlertCircle, Loader2, Download, Briefcase, BarChart, Sparkles, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { extractTextFromFile } from './services/fileParser';
import { analyzeResume, improveResume } from './services/gemini';
import { generatePDFReport, generateImprovedResumePDF } from './services/pdfGenerator';
import './App.css';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [jobTarget, setJobTarget] = useState('');
  
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  
  const analysisRef = React.useRef(null);
  const jobTargetRef = React.useRef(null);
  

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');

  const [isImproving, setIsImproving] = useState(false);
  const [improvedResume, setImprovedResume] = useState('');
  const [improverError, setImproverError] = useState('');
  const [isDownloadingImprovedPDF, setIsDownloadingImprovedPDF] = useState(false);
  const [improvedSuccessMsg, setImprovedSuccessMsg] = useState('');

  const [currentView, setCurrentView] = useState('home');
  const [tempApiKey, setTempApiKey] = useState('');
  const [showApiPassword, setShowApiPassword] = useState(false);
  const [apiKeyError, setApiKeyError] = useState('');
  const [apiKeySuccess, setApiKeySuccess] = useState(false);

  const handleValidateApiKey = () => {
    if (!tempApiKey.trim()) {
      setApiKeyError('Please enter your Gemini API Key.');
      setApiKeySuccess(false);
    } else {
      setApiKeyError('');
      setApiKeySuccess(true);
      setApiKey(tempApiKey.trim());
      localStorage.setItem('gemini_api_key', tempApiKey.trim());
      setTimeout(() => {
        setCurrentView('upload');
        setApiKeySuccess(false);
      }, 1000);
    }
  };

  // Load API key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowSettings(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelection(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const handleFileSelection = (selectedFile) => {
    setError('');
    const validTypes = [
      'application/pdf', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (validTypes.includes(selectedFile.type) || 
        selectedFile.name.endsWith('.pdf') || 
        selectedFile.name.endsWith('.docx')) {
      setFile(selectedFile);
      setAnalysisResult('');
      setImprovedResume('');
      setImproverError('');
      setImprovedSuccessMsg('');
    } else {
      setError('Please upload a valid PDF or DOCX file.');
      setFile(null);
    }
  };

  const handleAnalyze = async () => {
    if (!apiKey) {
      setError('Please enter your Gemini API Key in the settings first.');
      setShowSettings(true);
      return;
    }

    if (!file) {
      setError('Please upload a resume first.');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    setAnalysisResult('');

    try {
      const extractedText = await extractTextFromFile(file);
      const result = await analyzeResume(apiKey, extractedText, jobTarget);
      setAnalysisResult(result);
    } catch (err) {
      setError(err.message || 'An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownloadPDF = () => {
    setIsDownloadingPDF(true);
    try {
      const candidateName = file?.name?.replace(/\.[^/.]+$/, "") || "Candidate";
      generatePDFReport(candidateName, analysisResult);
    } catch (err) {
      console.error('PDF Generation Error:', err);
    } finally {
      setIsDownloadingPDF(false);
    }
  };

  const handleImproveResume = async () => {
    if (!apiKey) {
      setImproverError('API Key is missing.');
      return;
    }
    
    setIsImproving(true);
    setImproverError('');
    setImprovedSuccessMsg('');
    
    try {
      const extractedText = await extractTextFromFile(file);
      const result = await improveResume(apiKey, extractedText, jobTarget);
      setImprovedResume(result);
    } catch (err) {
      setImproverError(err.message || 'An error occurred during improvement.');
    } finally {
      setIsImproving(false);
    }
  };

  const handleDownloadImprovedPDF = async () => {
    setIsDownloadingImprovedPDF(true);
    setImproverError('');
    setImprovedSuccessMsg('');
    try {
      const candidateName = file?.name?.replace(/\.[^/.]+$/, "") || "Candidate";
      await generateImprovedResumePDF(candidateName, 'improved-resume-preview');
      setImprovedSuccessMsg('Improved resume downloaded successfully!');
      setTimeout(() => setImprovedSuccessMsg(''), 5000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setImproverError('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloadingImprovedPDF(false);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo" onClick={() => { setCurrentView('home'); setAnalysisResult(''); }} style={{cursor: 'pointer'}}>
          <FileText size={28} color="#a78bfa" />
          <span>Resume <span className="logo-accent">Mentor AI</span></span>
        </div>
        <button 
          className="settings-btn" 
          onClick={() => setShowSettings(true)}
          title="Settings (API Key)"
        >
          <Settings size={20} />
        </button>
      </header>

      <main className="main-content">
        {!analysisResult && !isAnalyzing && currentView === 'home' && (
          <div className="landing-wrapper">
            <section className="hero">
              <div className="hero-badge">✨ Next Generation Resume AI</div>
              <h1>Build Your Perfect Resume with AI</h1>
              <p>
                Create ATS-friendly resumes with AI-powered suggestions and improve your resume professionally.
              </p>
            </section>

            <section className="info-cards-container">
              <div className="info-card glass">
                <div className="info-icon">📄</div>
                <h3>Before Improvement Report</h3>
                <p>Preview your original resume report before AI optimization.</p>
              </div>
              <div className="info-card glass">
                <div className="info-icon">✨</div>
                <h3>After Improvement Report</h3>
                <p>Download your AI improved resume after analysis.</p>
              </div>
            </section>

            <section className="cta-section" style={{ textAlign: 'center', margin: '2rem 0' }}>
              <button 
                className="btn-primary" 
                onClick={() => setCurrentView('api-key')}
                style={{ fontSize: '1.5rem', padding: '1.2rem 3rem', borderRadius: '50px', width: 'auto' }}
              >
                Get Started
              </button>
            </section>

            <section className="features-section">
              <h2 className="section-title">Premium Features</h2>
              <div className="features-grid">
                <div className="feature-card glass">
                  <div className="feature-icon">🔍</div>
                  <h4>AI Resume Analysis</h4>
                </div>
                <div className="feature-card glass">
                  <div className="feature-icon">⚡</div>
                  <h4>ATS Optimization</h4>
                </div>
                <div className="feature-card glass">
                  <div className="feature-icon">📈</div>
                  <h4>Resume Improvement</h4>
                </div>
                <div className="feature-card glass">
                  <div className="feature-icon">💡</div>
                  <h4>AI Suggestions</h4>
                </div>
                <div className="feature-card glass">
                  <div className="feature-icon">🎯</div>
                  <h4>Keyword Scanner</h4>
                </div>
                <div className="feature-card glass">
                  <div className="feature-icon">📄</div>
                  <h4>Download PDF</h4>
                </div>
              </div>
            </section>

            <section className="how-it-works-section">
              <h2 className="section-title">How It Works</h2>
              <div className="steps-container">
                <div className="step glass">Upload Resume</div>
                <div className="step-arrow">↓</div>
                <div className="step glass">Analyze Resume</div>
                <div className="step-arrow">↓</div>
                <div className="step glass">Improve Resume</div>
                <div className="step-arrow">↓</div>
                <div className="step glass">Download Report</div>
              </div>
            </section>
          </div>
        )}

        {!analysisResult && !isAnalyzing && currentView === 'api-key' && (
          <div className="api-key-page" style={{ animation: 'fadeIn 0.5s ease-out', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="api-card glass" style={{ padding: '3rem', maxWidth: '500px', width: '100%', textAlign: 'center' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔑 Connect Your Gemini API</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                To use Resume Mentor AI, please enter your Google Gemini API Key before continuing.
              </p>
              
              <div className="input-group" style={{ textAlign: 'left', marginBottom: '1.5rem' }}>
                <div style={{ position: 'relative' }}>
                  <input 
                    type={showApiPassword ? 'text' : 'password'} 
                    placeholder="Paste your Gemini API Key" 
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    style={{ width: '100%', paddingRight: '40px', boxSizing: 'border-box' }}
                  />
                  <button 
                    onClick={() => setShowApiPassword(!showApiPassword)}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    👁
                  </button>
                </div>
                {apiKeyError && <p style={{ color: 'var(--danger)', fontSize: '0.9rem', marginTop: '0.5rem' }}>{apiKeyError}</p>}
                {apiKeySuccess && <p style={{ color: 'var(--success)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Gemini API Key Accepted</p>}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <button className="btn-primary" onClick={handleValidateApiKey}>
                  Validate API Key
                </button>
                <a 
                  href="https://aistudio.google.com/app/apikey" 
                  target="_blank" 
                  rel="noreferrer"
                  className="btn-secondary"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  Get Free Gemini API Key
                </a>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                🔒 Your API key is never stored on our server. It is only used during your current session.
              </p>
            </div>
          </div>
        )}

        {!analysisResult && !isAnalyzing && currentView === 'upload' && (
          <div className="upload-page" style={{ animation: 'fadeIn 0.5s ease-out', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Upload Your Resume</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>Let our AI analyze and improve your resume instantly.</p>
            </div>
            <section className="upload-section">
              <div 
                className={`upload-area glass ${isDragging ? 'drag-active' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('file-upload').click()}
              >
                <input 
                  id="file-upload" 
                  type="file" 
                  accept=".pdf,.docx" 
                  style={{ display: 'none' }} 
                  onChange={handleFileChange}
                />
                <UploadCloud size={48} className="upload-icon" />
                <div className="upload-text">Click to upload or drag and drop</div>
                <div className="upload-hint">PDF or DOCX (Max 10MB)</div>
              </div>

              {error && (
                <div style={{ color: 'var(--danger)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              {file && (
                <div className="file-info glass">
                  <div className="file-name">
                    <CheckCircle size={18} color="var(--success)" />
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setFile(null); }}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <X size={18} />
                  </button>
                </div>
              )}

              {file && (
                <div style={{ marginTop: '1.5rem', width: '100%', textAlign: 'left' }}>
                  <label htmlFor="jobTarget" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)' }}>Target Job Role OR Paste Job Description</label>
                  <textarea 
                    id="jobTarget" 
                    placeholder="e.g. Software Engineer, OR paste the full job description here..."
                    value={jobTarget}
                    onChange={(e) => setJobTarget(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      borderRadius: '12px', 
                      border: '1px solid var(--border-color)', 
                      background: 'rgba(0,0,0,0.3)', 
                      color: 'var(--text-main)',
                      minHeight: '100px',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}

              <button 
                className="btn-primary btn-analyze" 
                onClick={handleAnalyze}
                disabled={!file}
              >
                Analyze Resume
              </button>
            </section>
          </div>
        )}

        {isAnalyzing && (
          <div className="loader">
            <div className="spinner"></div>
            <p className="loader-text">Our AI is reviewing your resume...</p>
          </div>
        )}

        {analysisResult && !isAnalyzing && (
          <div className="results-layout">
            <div className="results-main">
              <section className="results-section glass" ref={analysisRef}>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>Analysis Complete</h2>
                <div className="markdown-body">
                  <ReactMarkdown>{analysisResult}</ReactMarkdown>
                </div>
              </section>

              {/* AI Resume Improver Section */}
              <section className="resume-improver-section glass" style={{ marginTop: '2rem', padding: '3rem' }}>
                <div style={{ width: '100%', textAlign: 'left', marginBottom: '2.5rem' }}>
                  <label htmlFor="jobTargetImprover" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)', fontSize: '1.1rem' }}>Add Job Description / Target Job Role</label>
                  <textarea 
                    id="jobTargetImprover" 
                    ref={jobTargetRef}
                    placeholder="e.g. Software Engineer, OR paste the full job description here to optimize your resume..."
                    value={jobTarget}
                    onChange={(e) => setJobTarget(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '1rem', 
                      borderRadius: '12px', 
                      border: '1px solid var(--border-color)', 
                      background: 'rgba(0,0,0,0.3)', 
                      color: 'var(--text-main)',
                      minHeight: '120px',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Update this before improving your resume to get targeted ATS optimization.</p>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} className="text-gradient">✨ AI Resume Improver</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '600px' }}>
                    Let our AI rewrite and format your resume professionally. We'll optimize your content for ATS readability without inventing any false information.
                  </p>
                  {!improvedResume && !isImproving && (
                    <button 
                      className="btn-primary" 
                      style={{ width: 'auto', minWidth: '250px' }}
                      onClick={handleImproveResume}
                    >
                      ✨ Improve Resume with AI
                    </button>
                  )}
                </div>

                {isImproving && (
                  <div className="loader" style={{ padding: '2rem 0' }}>
                    <div className="spinner"></div>
                    <p className="loader-text">Professionally rewriting your resume...</p>
                  </div>
                )}

                {improverError && (
                  <div style={{ color: 'var(--danger)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                    <AlertCircle size={18} />
                    <span>{improverError}</span>
                  </div>
                )}

                {improvedResume && !isImproving && (
                  <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <div 
                      id="improved-resume-preview"
                      className="resume-preview" 
                      dangerouslySetInnerHTML={{ __html: improvedResume }} 
                    ></div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                      {improvedSuccessMsg && (
                        <div className="success-message">
                          <CheckCircle size={18} />
                          {improvedSuccessMsg}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* Sticky Sidebar */}
            <aside className="action-sidebar">
              <div className="action-panel glass">
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: '600' }}>Quick Actions</h3>
                
                <div className="action-buttons" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
                  <button 
                    className="btn-secondary" 
                    onClick={() => {
                      if (jobTargetRef.current) {
                        const headerOffset = 100;
                        const elementPosition = jobTargetRef.current.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        setTimeout(() => jobTargetRef.current.focus(), 500);
                      }
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                  >
                    <Briefcase size={18} />
                    Add Job Description
                  </button>

                  <button 
                    className="btn-secondary" 
                    onClick={() => {
                      if (analysisRef.current) {
                        const headerOffset = 100;
                        const elementPosition = analysisRef.current.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                      }
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                  >
                    <BarChart size={18} />
                    View ATS Score
                  </button>

                  {!improvedResume && (
                    <button 
                      className="btn-primary" 
                      onClick={handleImproveResume}
                      disabled={isImproving}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)', border: 'none' }}
                    >
                      <Sparkles size={18} />
                      {isImproving ? 'Improving...' : 'AI Resume Improver'}
                    </button>
                  )}

                  {improvedResume && (
                    <button 
                      className="btn-primary" 
                      onClick={handleDownloadImprovedPDF}
                      disabled={isDownloadingImprovedPDF}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)', border: 'none' }}
                    >
                      <Download size={18} />
                      {isDownloadingImprovedPDF ? 'Generating...' : 'Download Improved PDF'}
                    </button>
                  )}

                  <button 
                    className="btn-primary" 
                    onClick={handleDownloadPDF}
                    disabled={isDownloadingPDF}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                  >
                    <Download size={18} />
                    {isDownloadingPDF ? 'Generating...' : 'Download Analysis Report'}
                  </button>

                  <button 
                    className="btn-secondary" 
                    onClick={() => {
                      setAnalysisResult('');
                      setImprovedResume('');
                      setImproverError('');
                      setImprovedSuccessMsg('');
                      setJobTarget('');
                      setFile(null);
                      setCurrentView('upload');
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' }}
                  >
                    <RefreshCw size={18} />
                    Analyze Another Resume
                  </button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>

      <footer className="footer">
        Resume Mentor AI &copy; 2026 • Powered by Moumita De Panja
      </footer>

      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content glass" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowSettings(false)}>
              <X size={20} />
            </button>
            <h2 className="modal-title">Settings</h2>
            
            <div className="input-group">
              <label htmlFor="apiKey">Gemini API Key</label>
              <input 
                type="password" 
                id="apiKey" 
                placeholder="Enter your API Key" 
                defaultValue={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Your API key is only stored in your current browser session and is never saved permanently.
              </span>
            </div>

            <button 
              className="btn-primary" 
              onClick={() => saveApiKey(document.getElementById('apiKey').value)}
            >
              Save Key
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
