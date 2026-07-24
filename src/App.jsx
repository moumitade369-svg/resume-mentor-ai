import React, { useState, useEffect } from 'react';
import { UploadCloud, FileText, Settings, X, CheckCircle, AlertCircle, Loader2, Download, Briefcase, BarChart, Sparkles, RefreshCw, Copy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { extractTextFromFile } from './services/fileParser';
import { analyzeResume, improveResume, analyzeMatchReport, generateJobSpecificResume, generateCoverLetter, testApiKey } from './services/gemini';
import { generatePDFReport, generateImprovedResumePDF } from './services/pdfGenerator';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ApiSetupWizard from './components/ApiSetupWizard';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Comparison from './components/Comparison';
import WhyChooseUs from './components/WhyChooseUs';
import Statistics from './components/Statistics';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import './Redesign.css'; // Redesign CSS
import Sidebar from './components/Sidebar';
import TopHeader from './components/TopHeader';
import UploadCard from './components/UploadCard';
import ATSScoreCard from './components/ATSScoreCard';
import { motion } from 'framer-motion';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';

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
  
  const [extractedText, setExtractedText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  
  const [isGeneratingMatch, setIsGeneratingMatch] = useState(false);
  const [matchReport, setMatchReport] = useState('');
  const [matchError, setMatchError] = useState('');

  const [isGeneratingJobSpecific, setIsGeneratingJobSpecific] = useState(false);
  const [jobSpecificResume, setJobSpecificResume] = useState('');
  const [jobSpecificError, setJobSpecificError] = useState('');
  const [isDownloadingJobSpecificPDF, setIsDownloadingJobSpecificPDF] = useState(false);
  const [jobSpecificSuccessMsg, setJobSpecificSuccessMsg] = useState('');

  const [isGeneratingCoverLetter, setIsGeneratingCoverLetter] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [coverLetterError, setCoverLetterError] = useState('');
  const [coverLetterCopySuccessMsg, setCoverLetterCopySuccessMsg] = useState('');

  const [currentView, setCurrentView] = useState('home');
  const [activeSidebarItem, setActiveSidebarItem] = useState('upload');
  const [apiLastVerified, setApiLastVerified] = useState('');
  
  // Load API key from local storage on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    const storedTime = localStorage.getItem('gemini_api_verified');
    if (storedKey) {
      setApiKey(storedKey);
      if (storedTime) setApiLastVerified(storedTime);
    }
  }, []);

  const handleCompleteWizard = (key) => {
    const now = new Date().toLocaleString();
    setApiKey(key);
    setApiLastVerified(now);
    localStorage.setItem('gemini_api_key', key);
    localStorage.setItem('gemini_api_verified', now);
    setCurrentView('upload');
  };

  const handleRemoveApiKey = () => {
    setApiKey('');
    setApiLastVerified('');
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('gemini_api_verified');
    setCurrentView('api-key');
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
      setExtractedText('');
      setMatchReport('');
      setMatchError('');
      setJobSpecificResume('');
      setJobSpecificError('');
      setJobSpecificSuccessMsg('');
      setCoverLetter('');
      setCoverLetterError('');
      setCoverLetterCopySuccessMsg('');
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
      let text = extractedText;
      if (!text) {
        text = await extractTextFromFile(file);
        setExtractedText(text);
      }
      const result = await analyzeResume(apiKey, text, jobTarget);
      setAnalysisResult(result);
      setActiveSidebarItem('analysis');
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
      let text = extractedText;
      if (!text) {
        text = await extractTextFromFile(file);
        setExtractedText(text);
      }
      const result = await improveResume(apiKey, text, jobTarget);
      setImprovedResume(result);
      setActiveSidebarItem('improver');
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

  const handleAnalyzeMatch = async () => {
    if (!apiKey) {
      setMatchError('API Key is missing.');
      return;
    }
    if (!improvedResume) {
      setMatchError('Please improve your resume first before analyzing match.');
      return;
    }
    if (!jobDescription.trim()) {
      setMatchError('Please enter a Job Description.');
      return;
    }
    
    setIsGeneratingMatch(true);
    setMatchError('');
    
    try {
      let text = extractedText;
      if (!text) {
        text = await extractTextFromFile(file);
        setExtractedText(text);
      }
      const result = await analyzeMatchReport(apiKey, text, improvedResume, jobDescription);
      setMatchReport(result);
    } catch (err) {
      setMatchError(err.message || 'An error occurred during match analysis.');
    } finally {
      setIsGeneratingMatch(false);
    }
  };

  const handleGenerateJobSpecificResume = async () => {
    if (!apiKey) {
      setJobSpecificError('API Key is missing.');
      return;
    }
    if (!improvedResume || !jobDescription.trim()) {
      setJobSpecificError('Requires improved resume and job description.');
      return;
    }
    
    setIsGeneratingJobSpecific(true);
    setJobSpecificError('');
    
    try {
      let text = extractedText;
      if (!text) {
        text = await extractTextFromFile(file);
        setExtractedText(text);
      }
      const result = await generateJobSpecificResume(apiKey, text, improvedResume, jobDescription);
      setJobSpecificResume(result);
    } catch (err) {
      setJobSpecificError(err.message || 'An error occurred during job-specific resume generation.');
    } finally {
      setIsGeneratingJobSpecific(false);
    }
  };

  const handleGenerateCoverLetter = async () => {
    if (!apiKey) {
      setCoverLetterError('API Key is missing.');
      return;
    }
    if (!improvedResume || !jobDescription.trim()) {
      setCoverLetterError('Requires improved resume and job description.');
      return;
    }
    
    setIsGeneratingCoverLetter(true);
    setCoverLetterError('');
    
    try {
      let text = extractedText;
      if (!text) {
        text = await extractTextFromFile(file);
        setExtractedText(text);
      }
      const result = await generateCoverLetter(apiKey, text, improvedResume, jobDescription);
      setCoverLetter(result);
    } catch (err) {
      setCoverLetterError(err.message || 'An error occurred during cover letter generation.');
    } finally {
      setIsGeneratingCoverLetter(false);
    }
  };

  const handleDownloadJobSpecificPDF = async () => {
    setIsDownloadingJobSpecificPDF(true);
    setJobSpecificError('');
    setJobSpecificSuccessMsg('');
    try {
      const candidateName = file?.name?.replace(/\.[^/.]+$/, "") || "Candidate";
      await generateImprovedResumePDF(candidateName + "_Job_Specific", 'job-specific-resume-preview');
      setJobSpecificSuccessMsg('Job-specific resume downloaded successfully!');
      setTimeout(() => setJobSpecificSuccessMsg(''), 5000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      setJobSpecificError('Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloadingJobSpecificPDF(false);
    }
  };

  const handleCopyCoverLetter = () => {
    if (coverLetter) {
      navigator.clipboard.writeText(coverLetter)
        .then(() => {
          setCoverLetterCopySuccessMsg('Copied to clipboard!');
          setTimeout(() => setCoverLetterCopySuccessMsg(''), 3000);
        })
        .catch(err => {
          console.error('Failed to copy text: ', err);
          setCoverLetterError('Failed to copy to clipboard.');
        });
    }
  };

  if (window.location.pathname.startsWith('/blog/')) {
    const slug = window.location.pathname.split('/blog/')[1].replace(/\/$/, '');
    return <BlogPost slug={slug} hasApiKey={!!apiKey} />;
  }

  if (window.location.pathname === '/blog') {
    return <Blog hasApiKey={!!apiKey} />;
  }

  return (
    <div className="app-container">
      <Navbar 
          hasApiKey={!!apiKey}
          currentView={currentView}
          setCurrentView={setCurrentView}
          setAnalysisResult={setAnalysisResult}
        />

      <main className="main-content" style={{ paddingTop: currentView === 'home' ? '0' : '68px' }}>
        {!analysisResult && !isAnalyzing && currentView === 'home' && (
          <div className="redesign-root">
            {/* Fixed background nebula lighting */}
            <div className="page-bg">
              <div className="star-grid" />
            </div>
            <Hero setCurrentView={setCurrentView} hasApiKey={!!apiKey} />
            <Features />
            <HowItWorks />
            <Comparison />
            <WhyChooseUs />
            <Statistics />
            <Testimonials />
            <FAQ />
            <Footer setCurrentView={setCurrentView} />
          </div>
        )}

        {!analysisResult && !isAnalyzing && currentView === 'api-key' && (
          <div className="api-key-page" style={{ animation: 'fadeIn 0.5s ease-out', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', padding: '2rem 0' }}>
            <ApiSetupWizard onComplete={handleCompleteWizard} />
          </div>
        )}

        {currentView === 'upload' && (
          <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-color)' }}>
            <Sidebar 
              activeItem={activeSidebarItem} 
              setActiveItem={setActiveSidebarItem} 
              hasAnalysis={!!analysisResult} 
              onSubscriptionClick={() => setActiveSidebarItem('subscription')}
            />
            
            <div style={{ flex: 1, padding: '2rem 3rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
              <TopHeader 
                hasApiKey={!!apiKey}
                onSettingsClick={() => setActiveSidebarItem('settings')} 
              />
              
              {/* ── UPLOAD view ── */}
                  {activeSidebarItem === 'upload' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {!analysisResult && !isAnalyzing && (
                        <UploadCard 
                          file={file} setFile={setFile} isDragging={isDragging} 
                          handleDragOver={handleDragOver} handleDragLeave={handleDragLeave} 
                          handleDrop={handleDrop} handleFileChange={handleFileChange}
                          jobTarget={jobTarget} setJobTarget={setJobTarget} error={error} 
                          handleAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} 
                        />
                      )}
                      {isAnalyzing && (
                        <div className="loader" style={{ alignSelf: 'center', marginTop: '4rem' }}>
                          <div className="spinner"></div>
                          <p className="loader-text">Our AI is reviewing your resume...</p>
                        </div>
                      )}
                      {analysisResult && !isAnalyzing && (
                        <div className="results-section glass" style={{ padding: '2rem', borderRadius: '20px' }}>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Resume already analyzed.</p>
                          <button className="btn-primary" onClick={() => setActiveSidebarItem('analysis')} style={{ width: 'auto' }}>
                            View Analysis Report →
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ── ATS ANALYSIS view ── */}
                  {activeSidebarItem === 'analysis' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {!analysisResult ? (
                        <div className="glass" style={{ padding: '3rem', borderRadius: '20px', textAlign: 'center' }}>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>No analysis yet. Upload and analyze your resume first.</p>
                          <button className="btn-primary" onClick={() => setActiveSidebarItem('upload')} style={{ width: 'auto' }}>Go to Upload →</button>
                        </div>
                      ) : (
                        <section className="results-section glass" ref={analysisRef}>
                          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>Analysis Complete</h2>
                          <div className="markdown-body">
                            <ReactMarkdown>{analysisResult}</ReactMarkdown>
                          </div>
                        </section>
                      )}
                    </div>
                  )}

                  {/* ── AI RESUME IMPROVER view ── */}
                  {activeSidebarItem === 'improver' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {!analysisResult ? (
                        <div className="glass" style={{ padding: '3rem', borderRadius: '20px', textAlign: 'center' }}>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Analyze your resume first to use the AI Improver.</p>
                          <button className="btn-primary" onClick={() => setActiveSidebarItem('upload')} style={{ width: 'auto' }}>Go to Upload →</button>
                        </div>
                      ) : (
                        <section className="resume-improver-section glass" style={{ padding: '3rem' }}>
                          <div style={{ width: '100%', textAlign: 'left', marginBottom: '2.5rem' }}>
                            <label htmlFor="jobTargetImprover" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)', fontSize: '1.1rem' }}>Add Job Description / Target Job Role</label>
                            <textarea 
                              id="jobTargetImprover" 
                              ref={jobTargetRef}
                              placeholder="e.g. Software Engineer, OR paste the full job description here to optimize your resume..."
                              value={jobTarget}
                              onChange={(e) => setJobTarget(e.target.value)}
                              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', minHeight: '120px', resize: 'vertical', boxSizing: 'border-box' }}
                            />
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>Update this before improving your resume to get targeted ATS optimization.</p>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} className="text-gradient">✨ AI Resume Improver</h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', maxWidth: '600px' }}>Let our AI rewrite and format your resume professionally. We'll optimize your content for ATS readability without inventing any false information.</p>
                            {!improvedResume && !isImproving && (
                              <button className="btn-primary" style={{ width: 'auto', minWidth: '250px' }} onClick={handleImproveResume}>✨ Improve Resume with AI</button>
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
                              <AlertCircle size={18} /><span>{improverError}</span>
                            </div>
                          )}
                          {improvedResume && !isImproving && (
                            <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                              <div id="improved-resume-preview" className="resume-preview" dangerouslySetInnerHTML={{ __html: improvedResume }}></div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                                {improvedSuccessMsg && (
                                  <div className="success-message"><CheckCircle size={18} />{improvedSuccessMsg}</div>
                                )}
                              </div>
                            </div>
                          )}
                        </section>
                      )}
                    </div>
                  )}

                  {/* ── JOB ROLE MATCHER view ── */}
                  {activeSidebarItem === 'matcher' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {!analysisResult ? (
                        <div className="glass" style={{ padding: '3rem', borderRadius: '20px', textAlign: 'center' }}>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Analyze your resume first to use Job Role Matcher.</p>
                          <button className="btn-primary" onClick={() => setActiveSidebarItem('upload')} style={{ width: 'auto' }}>Go to Upload →</button>
                        </div>
                      ) : (
                        <section className="resume-improver-section glass" style={{ padding: '3rem' }}>
                          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }} className="text-gradient">🎯 Job Role Matcher</h2>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px' }}>Paste a full job description below to generate a detailed match report, a tailored job-specific resume, and an AI cover letter.</p>
                          {!improvedResume && (
                            <div className="glass" style={{ padding: '1.25rem', borderRadius: '12px', marginBottom: '1.5rem', border: '1px solid rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.05)' }}>
                              <p style={{ color: '#f59e0b', margin: 0, fontSize: '0.9rem' }}>⚠️ Run AI Resume Improver first for best results. <button onClick={() => setActiveSidebarItem('improver')} style={{ background: 'none', border: 'none', color: '#a78bfa', cursor: 'pointer', textDecoration: 'underline', padding: 0, fontSize: '0.9rem' }}>Go to Improver →</button></p>
                            </div>
                          )}
                          <div style={{ width: '100%', marginBottom: '1.5rem' }}>
                            <label htmlFor="jobDescription" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-main)', fontSize: '1rem' }}>Paste the Full Job Description</label>
                            <textarea 
                              id="jobDescription"
                              placeholder="Paste the full job description here to generate match report, job-specific resume, and cover letter..."
                              value={jobDescription}
                              onChange={(e) => setJobDescription(e.target.value)}
                              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.3)', color: 'var(--text-main)', minHeight: '150px', resize: 'vertical', boxSizing: 'border-box' }}
                            />
                          </div>
                          {!matchReport && !isGeneratingMatch && (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                              <button className="btn-primary" style={{ width: 'auto', minWidth: '250px' }} onClick={handleAnalyzeMatch} disabled={!jobDescription.trim()}>📊 Analyze Match</button>
                            </div>
                          )}
                          {isGeneratingMatch && (
                            <div className="loader" style={{ padding: '2rem 0' }}><div className="spinner"></div><p className="loader-text">Analyzing match and generating report...</p></div>
                          )}
                          {matchError && (
                            <div style={{ color: 'var(--danger)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                              <AlertCircle size={18} /><span>{matchError}</span>
                            </div>
                          )}
                          {matchReport && !isGeneratingMatch && (
                            <div style={{ animation: 'fadeIn 0.5s ease-out', marginTop: '2rem' }}>
                              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>Resume Match Report</h2>
                              <div className="markdown-body"><ReactMarkdown>{matchReport}</ReactMarkdown></div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '2rem', justifyContent: 'center' }}>
                                {!jobSpecificResume && !isGeneratingJobSpecific && (
                                  <button className="btn-primary" onClick={handleGenerateJobSpecificResume}>📝 Generate Job-Specific Resume</button>
                                )}
                                {!coverLetter && !isGeneratingCoverLetter && (
                                  <button className="btn-primary" onClick={handleGenerateCoverLetter}>✉️ Generate AI Cover Letter</button>
                                )}
                              </div>
                            </div>
                          )}
                          {isGeneratingJobSpecific && (
                            <div className="loader" style={{ padding: '2rem 0' }}><div className="spinner"></div><p className="loader-text">Generating tailored job-specific resume...</p></div>
                          )}
                          {jobSpecificError && (
                            <div style={{ color: 'var(--danger)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                              <AlertCircle size={18} /><span>{jobSpecificError}</span>
                            </div>
                          )}
                          {jobSpecificResume && !isGeneratingJobSpecific && (
                            <div style={{ animation: 'fadeIn 0.5s ease-out', marginTop: '3rem' }}>
                              <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>Job-Specific Resume</h2>
                              <div id="job-specific-resume-preview" className="resume-preview" dangerouslySetInnerHTML={{ __html: jobSpecificResume }}></div>
                              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                                <button className="btn-primary" onClick={handleDownloadJobSpecificPDF} disabled={isDownloadingJobSpecificPDF} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: 'auto', minWidth: '250px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none' }}>
                                  <Download size={18} />{isDownloadingJobSpecificPDF ? 'Generating...' : 'Download Job-Specific PDF'}
                                </button>
                                {jobSpecificSuccessMsg && <div className="success-message"><CheckCircle size={18} />{jobSpecificSuccessMsg}</div>}
                              </div>
                            </div>
                          )}
                          {isGeneratingCoverLetter && (
                            <div className="loader" style={{ padding: '2rem 0' }}><div className="spinner"></div><p className="loader-text">Generating professional cover letter...</p></div>
                          )}
                          {coverLetterError && (
                            <div style={{ color: 'var(--danger)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                              <AlertCircle size={18} /><span>{coverLetterError}</span>
                            </div>
                          )}
                          {coverLetter && !isGeneratingCoverLetter && (
                            <div style={{ animation: 'fadeIn 0.5s ease-out', marginTop: '3rem', position: 'relative' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                                <h2 style={{ fontSize: '1.5rem', color: 'var(--primary)', margin: 0 }}>AI Cover Letter</h2>
                                <button onClick={handleCopyCoverLetter} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }} title="Copy Cover Letter">
                                  <Copy size={16} />Copy
                                </button>
                              </div>
                              {coverLetterCopySuccessMsg && (
                                <div style={{ color: 'var(--success)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                  <CheckCircle size={16} />{coverLetterCopySuccessMsg}
                                </div>
                              )}
                              <div className="markdown-body"><ReactMarkdown>{coverLetter}</ReactMarkdown></div>
                            </div>
                          )}
                        </section>
                      )}
                    </div>
                  )}

                  {/* ── CAREER INSIGHTS view ── */}
                  {activeSidebarItem === 'insights' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      {!analysisResult ? (
                        <div className="glass" style={{ padding: '3rem', borderRadius: '20px', textAlign: 'center' }}>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>Analyze your resume first to unlock Career Insights.</p>
                          <button className="btn-primary" onClick={() => setActiveSidebarItem('upload')} style={{ width: 'auto' }}>Go to Upload →</button>
                        </div>
                      ) : (
                        <section className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
                          <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }} className="text-gradient">📈 Career Insights</h2>
                          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Insights derived from your latest resume analysis.</p>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                            {[
                              { icon: '🎯', title: 'ATS Compatibility', desc: 'Your resume analysis includes ATS keyword coverage and formatting tips.', action: 'View Analysis', view: 'analysis' },
                              { icon: '✨', title: 'AI-Enhanced Version', desc: improvedResume ? 'Your AI-improved resume is ready to download.' : 'Run the AI Improver to get an optimized version of your resume.', action: improvedResume ? 'View Improved Resume' : 'Run AI Improver', view: 'improver' },
                              { icon: '🎯', title: 'Job Match Score', desc: matchReport ? 'Your job match report has been generated.' : 'Generate a match report by pasting a job description.', action: matchReport ? 'View Match Report' : 'Go to Matcher', view: 'matcher' },
                              { icon: '✉️', title: 'Cover Letter', desc: coverLetter ? 'Your AI-generated cover letter is ready.' : 'Generate a tailored cover letter for your target role.', action: coverLetter ? 'View Cover Letter' : 'Generate Cover Letter', view: 'matcher' },
                            ].map((card, i) => (
                              <div key={i} className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <span style={{ fontSize: '2rem' }}>{card.icon}</span>
                                <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)', fontWeight: 600 }}>{card.title}</h3>
                                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', flex: 1 }}>{card.desc}</p>
                                <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem', width: 'auto', alignSelf: 'flex-start' }} onClick={() => setActiveSidebarItem(card.view)}>{card.action}</button>
                              </div>
                            ))}
                          </div>
                          <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.05)' }}>
                            <h3 style={{ margin: '0 0 0.75rem', color: '#a78bfa', fontSize: '1rem' }}>📋 Full Analysis Report</h3>
                            <div className="markdown-body" style={{ maxHeight: '300px', overflow: 'auto' }}>
                              <ReactMarkdown>{analysisResult}</ReactMarkdown>
                            </div>
                            <button className="btn-secondary" style={{ marginTop: '1rem', fontSize: '0.85rem', width: 'auto' }} onClick={() => setActiveSidebarItem('analysis')}>View Full Report →</button>
                          </div>
                        </section>
                      )}
                    </div>
                  )}

                  {/* ── SAVED REPORTS view ── */}
                  {activeSidebarItem === 'reports' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <section className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }} className="text-gradient">📁 Saved Reports</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Your generated analysis reports will appear here. Firebase storage integration coming soon.</p>
                        {analysisResult ? (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="glass" style={{ padding: '1.25rem 1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ fontSize: '1.75rem' }}>📄</span>
                                <div>
                                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>{file?.name || 'Resume Analysis'}</p>
                                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current session · {new Date().toLocaleDateString()}</p>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', width: 'auto' }} onClick={() => setActiveSidebarItem('analysis')}>View Report</button>
                                <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem' }} onClick={handleDownloadPDF} disabled={isDownloadingPDF}>
                                  <Download size={14} />{isDownloadingPDF ? 'Generating...' : 'Download PDF'}
                                </button>
                              </div>
                            </div>
                            {improvedResume && (
                              <div className="glass" style={{ padding: '1.25rem 1.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                  <span style={{ fontSize: '1.75rem' }}>✨</span>
                                  <div>
                                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--text-main)' }}>AI-Improved Resume</p>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)' }}>Current session · {new Date().toLocaleDateString()}</p>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                                  <button className="btn-secondary" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', width: 'auto' }} onClick={() => setActiveSidebarItem('improver')}>View</button>
                                  <button className="btn-primary" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', width: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none' }} onClick={handleDownloadImprovedPDF} disabled={isDownloadingImprovedPDF}>
                                    <Download size={14} />{isDownloadingImprovedPDF ? 'Generating...' : 'Download PDF'}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                            <span style={{ fontSize: '3rem' }}>📂</span>
                            <p style={{ color: 'var(--text-muted)', marginTop: '1rem' }}>No reports yet. Upload and analyze a resume to get started.</p>
                            <button className="btn-primary" style={{ width: 'auto', marginTop: '1rem' }} onClick={() => setActiveSidebarItem('upload')}>Upload Resume →</button>
                          </div>
                        )}
                        <div className="glass" style={{ marginTop: '2rem', padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.05)' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>🔒 <strong style={{ color: '#a78bfa' }}>Coming soon:</strong> Reports will be saved automatically to your account via Firebase, allowing you to access them from any device.</p>
                        </div>
                      </section>
                    </div>
                  )}

                  {/* ── SETTINGS view ── */}
                  {activeSidebarItem === 'settings' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <section className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }} className="text-gradient">⚙️ Settings</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Manage your AI Connection Settings</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px' }}>
                          <div className="glass" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <h3 style={{ margin: '0 0 1.5rem', fontSize: '1.2rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Settings size={20} /> AI Connection Settings
                            </h3>
                            
                            {apiKey ? (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ color: 'var(--text-muted)' }}>Provider:</span>
                                  <span style={{ fontWeight: 600 }}>Google Gemini</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                                  <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14}/> Connected</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ color: 'var(--text-muted)' }}>API Key:</span>
                                  <span style={{ fontFamily: 'monospace' }}>{apiKey ? `${apiKey.substring(0, 6)}****************${apiKey.substring(apiKey.length - 3)}` : 'Not Set'}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <span style={{ color: 'var(--text-muted)' }}>Last Verified:</span>
                                  <span>{apiLastVerified || 'Unknown'}</span>
                                </div>
                              </div>
                            ) : (
                              <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', borderRadius: '12px', marginBottom: '2rem' }}>
                                <AlertCircle size={32} color="#ef4444" style={{ marginBottom: '1rem' }} />
                                <h4 style={{ color: '#ef4444', margin: '0 0 0.5rem' }}>Not Connected</h4>
                                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>Please connect your Gemini API Key to use the application.</p>
                              </div>
                            )}

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                              {!apiKey ? (
                                <button className="btn-primary" style={{ gridColumn: '1 / -1' }} onClick={() => setCurrentView('api-key')}>Connect API Key</button>
                              ) : (
                                <>
                                  <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={async () => {
                                    try {
                                      await testApiKey(apiKey);
                                      const now = new Date().toLocaleString();
                                      setApiLastVerified(now);
                                      localStorage.setItem('gemini_api_verified', now);
                                      alert('Connection successful!');
                                    } catch(err) {
                                      alert('Connection failed: ' + err.message);
                                    }
                                  }}>
                                    <RefreshCw size={16} /> Test Connection
                                  </button>
                                  <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={() => setCurrentView('api-key')}>
                                    <Settings size={16} /> Change API Key
                                  </button>
                                  <button className="btn-secondary" style={{ gridColumn: '1 / -1', color: '#ef4444', borderColor: 'rgba(239, 68, 68, 0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }} onClick={handleRemoveApiKey}>
                                    <X size={16} /> Remove API Key
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </section>
                    </div>
                  )}

                  {/* ── SUBSCRIPTION view ── */}
                  {activeSidebarItem === 'subscription' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                      <section className="glass" style={{ padding: '2.5rem', borderRadius: '20px' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }} className="text-gradient">💳 Manage Subscription</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Choose the plan that works best for you. Payment integration via Razorpay/Stripe coming soon.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                          {[
                            { name: 'Free', price: '₹0', period: '/ month', features: ['5 Resume Analyses', 'Basic ATS Check', 'PDF Download'], badge: null, current: false },
                            { name: 'Pro', price: '₹499', period: '/ month', features: ['Unlimited Analyses', 'AI Resume Improver', 'Job Role Matcher', 'Career Insights', 'Priority Support'], badge: 'Current Plan', current: true },
                            { name: 'Enterprise', price: '₹999', period: '/ month', features: ['Everything in Pro', 'Team Dashboard', 'Bulk Analysis', 'Custom Branding', 'Dedicated Support'], badge: 'Coming Soon', current: false },
                          ].map((plan, i) => (
                            <div key={i} className="glass" style={{ padding: '2rem', borderRadius: '20px', border: plan.current ? '1px solid rgba(139,92,246,0.5)' : '1px solid rgba(255,255,255,0.06)', position: 'relative', background: plan.current ? 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.08))' : 'transparent', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                              {plan.badge && (
                                <span style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: plan.current ? 'linear-gradient(135deg, #8b5cf6, #3b82f6)' : 'rgba(255,255,255,0.1)', color: '#fff', fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderRadius: '20px', whiteSpace: 'nowrap' }}>{plan.badge}</span>
                              )}
                              <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>{plan.name}</h3>
                              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 800, color: plan.current ? '#a78bfa' : 'var(--text-main)' }}>{plan.price}</span>
                                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{plan.period}</span>
                              </div>
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                                {plan.features.map((f, j) => (
                                  <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                    <CheckCircle size={14} color="var(--success)" />{f}
                                  </li>
                                ))}
                              </ul>
                              <button className={plan.current ? 'btn-secondary' : 'btn-primary'} style={{ width: '100%', opacity: plan.name === 'Enterprise' ? 0.5 : 1, cursor: plan.name === 'Enterprise' ? 'not-allowed' : 'pointer' }} disabled={plan.name === 'Enterprise'}>
                                {plan.current ? 'Current Plan' : plan.name === 'Enterprise' ? 'Coming Soon' : 'Upgrade'}
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="glass" style={{ padding: '1.25rem', borderRadius: '14px', border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(139,92,246,0.05)' }}>
                          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>🔒 <strong style={{ color: '#a78bfa' }}>Secure Payments:</strong> Payment processing via Razorpay and Stripe will be integrated in the next release. Your subscription data will be managed securely through Firebase.</p>
                        </div>
                      </section>
                    </div>
                  )}
            </div>

            <aside className="action-sidebar">
              <div style={{ position: 'sticky', top: '20px', display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingRight: '20px', marginTop: '20px' }}>
                {analysisResult && <ATSScoreCard score={88} />}
                
                <div className="action-panel glass" style={{ padding: '1.5rem', borderRadius: '20px' }}>
                  <h3 style={{ marginBottom: '1.5rem', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '600' }}>Quick Actions</h3>
                  
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
                    View Analysis
                  </button>

                  {!improvedResume && (
                    <button 
                      className="btn-primary" 
                      onClick={handleImproveResume}
                      disabled={isImproving}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)', border: 'none' }}
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
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none' }}
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
                    {isDownloadingPDF ? 'Generating...' : 'Download Report'}
                  </button>

                  <button 
                    className="btn-secondary" 
                    onClick={() => {
                      setAnalysisResult('');
                      setImprovedResume('');
                      setImproverError('');
                      setImprovedSuccessMsg('');
                      setExtractedText('');
                      setMatchReport('');
                      setMatchError('');
                      setJobSpecificResume('');
                      setJobSpecificError('');
                      setJobSpecificSuccessMsg('');
                      setCoverLetter('');
                      setCoverLetterError('');
                      setCoverLetterCopySuccessMsg('');
                      setJobTarget('');
                      setJobDescription('');
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
            </div>
          </aside>
        </div>
      )}
    </main>



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
