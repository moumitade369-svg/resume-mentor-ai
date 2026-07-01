import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, Settings, X, CheckCircle, AlertCircle, Loader2, Download } from 'lucide-react';
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
  
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');

  const [isImproving, setIsImproving] = useState(false);
  const [improvedResume, setImprovedResume] = useState('');
  const [improverError, setImproverError] = useState('');
  const [isDownloadingImprovedPDF, setIsDownloadingImprovedPDF] = useState(false);
  const [improvedSuccessMsg, setImprovedSuccessMsg] = useState('');

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
      const result = await analyzeResume(apiKey, extractedText);
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
      const result = await improveResume(apiKey, extractedText);
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
        <div className="logo">
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
        <section className="hero">
          <h1>AI-Powered Resume Analysis & Career Guidance</h1>
          <p>
            Upload your resume and get instant, professional feedback using the power of Generative AI. 
            Discover your strengths, identify missing skills, and get a realistic ATS score.
          </p>
        </section>

        {!analysisResult && !isAnalyzing && (
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

            <button 
              className="btn-primary btn-analyze" 
              onClick={handleAnalyze}
              disabled={!file}
            >
              Analyze Resume
            </button>
          </section>
        )}

        {isAnalyzing && (
          <div className="loader">
            <div className="spinner"></div>
            <p className="loader-text">Our AI is reviewing your resume...</p>
          </div>
        )}

        {analysisResult && !isAnalyzing && (
          <section className="results-section glass">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <h2 style={{ fontSize: '1.5rem', color: '#a78bfa' }}>Analysis Complete</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button 
                  className="btn-secondary" 
                  style={{ width: 'auto', padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'transparent', border: '1px solid #a78bfa', color: '#a78bfa', borderRadius: '8px', cursor: 'pointer' }}
                  onClick={handleDownloadPDF}
                  disabled={isDownloadingPDF}
                >
                  <Download size={18} />
                  {isDownloadingPDF ? 'Generating PDF...' : 'Download PDF Report'}
                </button>
                <button 
                  className="btn-primary" 
                  style={{ width: 'auto', padding: '0.5rem 1rem' }}
                  onClick={() => {
                    setAnalysisResult('');
                    setImprovedResume('');
                    setImproverError('');
                    setImprovedSuccessMsg('');
                  }}
                >
                  Analyze Another Resume
                </button>
              </div>
            </div>
            
            <div className="markdown-body">
              <ReactMarkdown>{analysisResult}</ReactMarkdown>
            </div>

            {/* AI Resume Improver Section */}
            <div className="resume-improver-section glass" style={{ marginTop: '3rem', padding: '2rem' }}>
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
                    <button 
                      className="btn-primary" 
                      onClick={handleDownloadImprovedPDF}
                      disabled={isDownloadingImprovedPDF}
                      style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}
                    >
                      <Download size={20} />
                      {isDownloadingImprovedPDF ? 'Generating PDF...' : 'Download Improved Resume (PDF)'}
                    </button>
                    {improvedSuccessMsg && (
                      <div className="success-message">
                        <CheckCircle size={18} />
                        {improvedSuccessMsg}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </section>
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
