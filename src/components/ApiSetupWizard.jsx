import React, { useState } from 'react';
import { Key, Shield, CheckCircle, Copy, HelpCircle, ExternalLink, AlertCircle, Loader2, Info, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { testApiKey } from '../services/gemini';

const ApiSetupWizard = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showKey, setShowKey] = useState(false);
  
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [showHelpPopup, setShowHelpPopup] = useState(false);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setApiKeyInput(text.trim());
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const maskApiKey = (key) => {
    if (!key || key.length < 10) return key;
    return `${key.substring(0, 6)}****************${key.substring(key.length - 3)}`;
  };

  const handleValidate = async () => {
    const keyToTest = apiKeyInput.trim();
    if (!keyToTest) {
      setValidationError('Please enter an API key.');
      return;
    }

    setIsValidating(true);
    setValidationError('');
    setIsSuccess(false);

    try {
      await testApiKey(keyToTest);
      setIsSuccess(true);
    } catch (err) {
      setValidationError(err.message || 'Invalid Gemini API Key. Please try again.');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSaveAndContinue = () => {
    if (isSuccess && apiKeyInput.trim()) {
      onComplete(apiKeyInput.trim());
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem' }}>
      <div className="glass" style={{ maxWidth: '600px', width: '100%', padding: '3rem', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
        
        {/* Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ 
              height: '4px', 
              width: '40px', 
              borderRadius: '2px', 
              background: step >= i ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
              transition: 'all 0.3s ease'
            }} />
          ))}
        </div>

        {/* STEP 1: INTRODUCTION */}
        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Key size={40} color="var(--primary)" />
              </div>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Connect Your Free<br/>Gemini API Key</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                AI features require your own FREE Gemini API key. Your key stays only on your device and is never shared.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem', background: 'rgba(0,0,0,0.2)', padding: '1.5rem', borderRadius: '16px' }}>
              {[
                { icon: <CheckCircle size={20} color="#10b981" />, text: 'Free Gemini AI usage' },
                { icon: <CheckCircle size={20} color="#10b981" />, text: 'No subscription required' },
                { icon: <CheckCircle size={20} color="#10b981" />, text: 'Your own API quota' },
                { icon: <Shield size={20} color="#10b981" />, text: 'Secure local storage' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  {item.icon}
                  <span style={{ color: 'var(--text-main)', fontSize: '1.05rem' }}>{item.text}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} onClick={handleNext}>
              Continue <ArrowRight size={20} style={{ marginLeft: '8px' }}/>
            </button>
          </div>
        )}

        {/* STEP 2: GUIDE */}
        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Get Your Free Gemini API Key</h2>
              <p style={{ color: 'var(--text-muted)' }}>Follow these simple steps to connect AI features.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>1</div>
                <div>
                  <p style={{ margin: '0 0 0.5rem', fontWeight: 600 }}>Open Google AI Studio</p>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    Open Google AI Studio <ExternalLink size={16} />
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>2</div>
                <p style={{ margin: 0, marginTop: '4px' }}>Click <strong>"Create API Key"</strong></p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>3</div>
                <p style={{ margin: 0, marginTop: '4px' }}>Copy the Generated API Key</p>
              </div>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', flexShrink: 0 }}>4</div>
                <p style={{ margin: 0, marginTop: '4px' }}>Return to Resume Mentor AI and Connect Your API Key</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1rem', marginBottom: '2.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '1.2rem' }}>💡</span>
              <div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>One-time setup</p>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>You only need to connect your API Key once. It will be securely stored on your device and automatically reused on future visits.</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={handleBack}>Back</button>
              <button className="btn-primary" style={{ flex: 1 }} onClick={handleNext}>Connect API Key</button>
            </div>
          </div>
        )}

        {/* STEP 3: INPUT & VALIDATE */}
        {step === 3 && (
          <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Enter your API Key</h2>
              <p style={{ color: 'var(--text-muted)' }}>Paste your Gemini API key below to connect.</p>
            </div>

            {!isSuccess ? (
              <>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>API Key</label>
                    <button 
                      onClick={() => setShowHelpPopup(true)}
                      style={{ background: 'none', border: 'none', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      <HelpCircle size={14} /> Where is my key?
                    </button>
                  </div>
                  
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                      type={showKey ? 'text' : 'password'}
                      value={apiKeyInput}
                      onChange={(e) => {
                        setApiKeyInput(e.target.value.trim());
                        setValidationError('');
                      }}
                      placeholder="AIzaSy..."
                      style={{ 
                        width: '100%', 
                        padding: '1rem', 
                        paddingRight: '120px', 
                        borderRadius: '12px', 
                        border: `1px solid ${validationError ? 'var(--danger)' : 'var(--border-color)'}`,
                        background: 'rgba(0,0,0,0.3)',
                        color: 'var(--text-main)',
                        fontSize: '1rem'
                      }}
                    />
                    <div style={{ position: 'absolute', right: '10px', display: 'flex', gap: '0.5rem' }}>
                      <button onClick={handlePaste} title="Paste from clipboard" style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
                        <Copy size={16} />
                      </button>
                      <button onClick={() => setShowKey(!showKey)} title={showKey ? "Hide key" : "Show key"} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center' }}>
                        {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      {apiKeyInput && (
                        <button onClick={() => setApiKeyInput('')} title="Clear" style={{ background: 'rgba(239, 68, 68, 0.2)', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center' }}>
                          ✕
                        </button>
                      )}
                    </div>
                  </div>
                  
                  {validationError && (
                    <div style={{ color: 'var(--danger)', fontSize: '0.9rem', marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={16} /> {validationError}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={handleBack} disabled={isValidating}>Back</button>
                  <button className="btn-primary" style={{ flex: 2 }} onClick={handleValidate} disabled={isValidating || !apiKeyInput}>
                    {isValidating ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                        <Loader2 size={18} className="spin" /> Verifying API Key...
                      </span>
                    ) : (
                      'Test Connection'
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div style={{ animation: 'fadeIn 0.5s ease-out', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                  <CheckCircle size={40} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '1.5rem' }}>Connected Successfully</h3>
                
                <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '12px', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Provider:</span>
                    <span style={{ fontWeight: 600 }}>Google Gemini</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Status:</span>
                    <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><CheckCircle size={14}/> Connected</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Masked API Key:</span>
                    <span style={{ fontFamily: 'monospace' }}>{maskApiKey(apiKeyInput)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Last Verified:</span>
                    <span>{new Date().toLocaleString()}</span>
                  </div>
                </div>

                <button className="btn-primary" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} onClick={handleSaveAndContinue}>
                  Connect Securely & Continue
                </button>
              </div>
            )}
          </div>
        )}

        {/* Help Popup */}
        {showHelpPopup && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '2rem', animation: 'fadeIn 0.2s ease-out' }}>
            <div className="glass" style={{ padding: '2rem', borderRadius: '16px', maxWidth: '400px', width: '100%', position: 'relative' }}>
              <button onClick={() => setShowHelpPopup(false)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>✕</button>
              <h3 style={{ marginTop: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Info size={20} color="var(--primary)"/> How to create API Key?</h3>
              <ol style={{ paddingLeft: '1.5rem', margin: '1.5rem 0', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                <li>Open Google AI Studio</li>
                <li>Click "Create API Key"</li>
                <li>Copy the Generated API Key</li>
                <li>Return to Resume Mentor AI and Connect Your API Key</li>
              </ol>
              <button className="btn-primary" style={{ width: '100%' }} onClick={() => setShowHelpPopup(false)}>Got it</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiSetupWizard;
