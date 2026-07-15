import React from 'react';
import { UploadCloud, CheckCircle, X, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UploadCard({ 
  file, setFile, isDragging, handleDragOver, handleDragLeave, handleDrop, handleFileChange,
  jobTarget, setJobTarget, error, handleAnalyze, isAnalyzing 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass"
      style={{
        padding: '3rem',
        borderRadius: '24px',
        maxWidth: '800px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: 800 }}>Upload Your Resume</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Let our AI analyze and improve your resume instantly.</p>
      </div>

      <div 
        className={`upload-area ${isDragging ? 'drag-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
        style={{
          width: '100%',
          padding: '3rem 2rem',
          border: `2px dashed ${isDragging ? 'var(--primary)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '20px',
          background: isDragging ? 'rgba(139, 92, 246, 0.05)' : 'rgba(255,255,255,0.02)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginBottom: '1.5rem'
        }}
      >
        <input 
          id="file-upload" 
          type="file" 
          accept=".pdf,.docx" 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <UploadCloud size={56} color="var(--primary)" style={{ marginBottom: '1rem' }} />
        </motion.div>
        <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem' }}>Click to upload or drag and drop</div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Supported formats: PDF or DOCX (Max 10MB)</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          🔒 Secure and private. Files are not stored permanently.
        </div>
      </div>

      {error && (
        <div style={{ color: 'var(--danger)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem 1.5rem', borderRadius: '12px' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {file && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '1rem 1.5rem',
            borderRadius: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle size={20} color="var(--success)" />
            <span style={{ fontWeight: 500 }}>{file.name}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
          </div>
          <button 
            onClick={(e) => { e.stopPropagation(); setFile(null); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0.5rem' }}
          >
            <X size={18} />
          </button>
        </motion.div>
      )}

      {file && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          style={{ width: '100%', textAlign: 'left', marginBottom: '2rem' }}
        >
          <label htmlFor="jobTarget" style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>
            Target Job Role OR Paste Job Description
          </label>
          <textarea 
            id="jobTarget" 
            placeholder="e.g. Senior Frontend Developer, OR paste the full job description here..."
            value={jobTarget}
            onChange={(e) => setJobTarget(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '1.25rem', 
              borderRadius: '16px', 
              border: '1px solid rgba(255,255,255,0.1)', 
              background: 'rgba(0,0,0,0.2)', 
              color: 'var(--text-main)',
              minHeight: '120px',
              resize: 'vertical',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              fontSize: '1rem',
              outline: 'none',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </motion.div>
      )}

      <button 
        onClick={handleAnalyze}
        disabled={!file || isAnalyzing}
        style={{
          width: '100%',
          padding: '1.25rem',
          borderRadius: '16px',
          background: (!file || isAnalyzing) ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
          color: (!file || isAnalyzing) ? 'var(--text-muted)' : '#fff',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          border: 'none',
          cursor: (!file || isAnalyzing) ? 'not-allowed' : 'pointer',
          boxShadow: (!file || isAnalyzing) ? 'none' : '0 10px 25px -5px rgba(139, 92, 246, 0.4)',
          transition: 'all 0.3s ease',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '0.5rem'
        }}
      >
        {isAnalyzing ? (
          <>
            <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '3px' }}></div>
            Analyzing...
          </>
        ) : (
          'Analyze Resume'
        )}
      </button>
    </motion.div>
  );
}
