import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check, Download, Share2, FileText, File, ExternalLink, ChevronDown } from 'lucide-react';
import { copyToClipboard, exportToPDF, exportToWord, shareToTeams } from '../utils/export.js';
import {
  CompanyOverview, FundingLendingTrend, LeakageAnalysis,
  ProductHolding, IncomeTrend, MeetingPrep, EcosystemAnalysis,
  UnknownResponse, AccessDenied, EcosystemRedirect,
} from './Responses.jsx';

const RESPONSE_COMPONENTS = {
  COMPANY_OVERVIEW:     CompanyOverview,
  FUNDING_LENDING:      FundingLendingTrend,
  LEAKAGE:              LeakageAnalysis,
  PRODUCTS:             ProductHolding,
  INCOME:               IncomeTrend,
  ECOSYSTEM:            EcosystemAnalysis,
  ECOSYSTEM_REDIRECT:   EcosystemRedirect,
  MEETING_PREP:         MeetingPrep,
  UNKNOWN:              UnknownResponse,
};

const RESPONSE_TITLES = {
  COMPANY_OVERVIEW:     'Company Overview',
  FUNDING_LENDING:      'Funding & Lending Balance Analysis',
  LEAKAGE:              'CASA Leakage Analysis',
  PRODUCTS:             'Product Holding Analysis',
  INCOME:               'Income Trend Analysis',
  ECOSYSTEM:            'Ecosystem Analysis',
  ECOSYSTEM_REDIRECT:   'EcoWeb — Detailed Ecosystem',
  MEETING_PREP:         'Customer Meeting Brief',
  UNKNOWN:              'Clarification Needed',
  ACCESS_DENIED:        'Access Restricted',
};

function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
      {[0,1,2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--red)',
          display: 'inline-block',
          animation: `typing-dot 1.4s ${i * 0.16}s ease-in-out infinite`,
        }}/>
      ))}
      <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 6 }}>CN-GPT is analyzing...</span>
    </div>
  );
}

function FeedbackPanel({ msgId, feedback, onFeedback }) {
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = (type) => {
    onFeedback(msgId, type);
    if (type === 'down') setShowComment(true);
  };

  const submitComment = () => {
    onFeedback(msgId, feedback, comment);
    setSubmitted(true);
    setShowComment(false);
  };

  if (submitted) return (
    <div style={{ fontSize: 11, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
      <Check size={11}/> Thank you for your feedback
    </div>
  );

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)', marginRight: 4 }}>Was this helpful?</span>
        <FeedBtn active={feedback === 'up'} color="var(--green)" bg="var(--green-bg)" border="var(--green-border)"
          onClick={() => handleFeedback('up')} icon={<ThumbsUp size={11}/>}/>
        <FeedBtn active={feedback === 'down'} color="var(--red-neg)" bg="var(--red-neg-bg)" border="var(--red-neg-border)"
          onClick={() => handleFeedback('down')} icon={<ThumbsDown size={11}/>}/>
      </div>
      {showComment && (
        <div style={{ marginTop: 8 }}>
          <textarea placeholder="Tell us what was wrong or missing..."
            value={comment} onChange={e => setComment(e.target.value)}
            style={{ width: '100%', minHeight: 64, padding: '8px 10px', border: '1px solid var(--border)', borderRadius: 8, fontSize: 12, resize: 'vertical', outline: 'none', fontFamily: 'var(--font)' }}/>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <button onClick={submitComment} style={{ padding: '5px 14px', borderRadius: 6, background: 'var(--red)', color: '#fff', fontSize: 12, fontWeight: 500 }}>Submit</button>
            <button onClick={() => setShowComment(false)} style={{ padding: '5px 14px', borderRadius: 6, border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-2)' }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FeedBtn({ active, color, bg, border, onClick, icon }) {
  return (
    <button onClick={onClick} style={{
      padding: '4px 8px', borderRadius: 6,
      background: active ? bg : 'transparent',
      border: `1px solid ${active ? border : 'var(--border)'}`,
      color: active ? color : 'var(--text-3)',
      display: 'flex', alignItems: 'center', gap: 4, fontSize: 11,
      transition: 'all 0.15s',
    }}>{icon}</button>
  );
}

// Per-message Export/Share toolbar (matching CN-GPT style)
function MessageActions({ title, session }) {
  const [copied, setCopied] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2000); };

  const handleCopy = () => {
    copyToClipboard(`CN-GPT · ${title}\n\n[Rich response — view in CN-GPT app]`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, position: 'relative' }}>
      {/* Copy */}
      <ActionBtn onClick={handleCopy} title="Copy">
        {copied ? <Check size={13} style={{ color: 'var(--green)' }}/> : <Copy size={13}/>}
      </ActionBtn>

      {/* Export */}
      <div style={{ position: 'relative' }}>
        <ActionBtn onClick={() => { setExportOpen(p=>!p); setShareOpen(false); }} title="Export">
          <Download size={13}/>
          <span style={{ fontSize: 11 }}>Export</span>
          <ChevronDown size={10}/>
        </ActionBtn>
        {exportOpen && (
          <MiniDropdown onClose={() => setExportOpen(false)}>
            <MiniItem onClick={() => { exportToPDF(session); setExportOpen(false); showToast('Exported as PDF'); }}
              icon={<FileText size={12} style={{ color: 'var(--red-neg)' }}/>} label="Export as PDF"/>
            <MiniItem onClick={() => { exportToWord(session); setExportOpen(false); showToast('Exported as Word'); }}
              icon={<File size={12} style={{ color: 'var(--blue)' }}/>} label="Export as Word" border/>
          </MiniDropdown>
        )}
      </div>

      {/* Share */}
      <div style={{ position: 'relative' }}>
        <ActionBtn onClick={() => { setShareOpen(p=>!p); setExportOpen(false); }} title="Share">
          <Share2 size={13}/>
          <span style={{ fontSize: 11 }}>Share</span>
          <ChevronDown size={10}/>
        </ActionBtn>
        {shareOpen && (
          <MiniDropdown onClose={() => setShareOpen(false)}>
            <MiniItem onClick={() => { shareToTeams(session); setShareOpen(false); showToast('Opening Teams…'); }}
              icon={<ExternalLink size={12} style={{ color: '#6264A7' }}/>} label="Share to Microsoft Teams"/>
            <MiniItem onClick={() => { navigator.clipboard.writeText(window.location.href); setShareOpen(false); showToast('Link copied'); }}
              icon={<Share2 size={12} style={{ color: 'var(--text-2)' }}/>} label="Copy link" border/>
          </MiniDropdown>
        )}
      </div>

      {(exportOpen || shareOpen) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 199 }}
          onClick={() => { setExportOpen(false); setShareOpen(false); }}/>
      )}

      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1a1d23', color: '#fff', padding: '8px 18px', borderRadius: 20,
          fontSize: 13, boxShadow: 'var(--shadow-md)', zIndex: 999, animation: 'fadeIn 0.2s ease',
        }}>{toast}</div>
      )}
    </div>
  );
}

function ActionBtn({ onClick, title, children }) {
  return (
    <button onClick={onClick} title={title} style={{
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '4px 9px', borderRadius: 6,
      border: '1px solid var(--border)', background: '#fff',
      color: 'var(--text-3)', fontSize: 11,
      transition: 'all 0.12s',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--red)'; e.currentTarget.style.color = 'var(--red)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-3)'; }}
    >{children}</button>
  );
}

function MiniDropdown({ children, onClose }) {
  return (
    <div style={{
      position: 'absolute', left: 0, top: '100%', marginTop: 4, zIndex: 200,
      background: '#fff', border: '1px solid var(--border)', borderRadius: 10,
      boxShadow: 'var(--shadow-md)', minWidth: 180, overflow: 'hidden',
      animation: 'fadeIn 0.15s ease',
    }}>{children}</div>
  );
}

function MiniItem({ onClick, icon, label, border }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 8,
      padding: '9px 12px', fontSize: 12, color: 'var(--text-1)',
      borderTop: border ? '1px solid var(--border)' : 'none',
      transition: 'background 0.1s', textAlign: 'left',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >{icon}{label}</button>
  );
}

function AiHeader({ timestamp }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
      <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>CN</span>
      </div>
      <div>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>CN-GPT</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 8 }}>Data Analytics Agent</span>
      </div>
      <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>
        {new Date(timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
}

export default function ChatMessage({ msg, onFeedback, companyData, activeSession }) {
  if (msg.role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20, animation: 'fadeIn 0.25s ease' }}>
        <div style={{
          maxWidth: '70%', background: 'var(--red)', color: '#fff',
          borderRadius: '16px 16px 4px 16px',
          padding: '10px 16px', fontSize: 14,
          boxShadow: '0 2px 8px rgba(204,0,1,0.2)',
        }}>{msg.text}</div>
      </div>
    );
  }

  if (msg.type === 'ACCESS_DENIED') {
    return (
      <div style={{ marginBottom: 24, animation: 'fadeIn 0.3s ease' }}>
        <AiHeader timestamp={msg.timestamp}/>
        <div style={{ marginLeft: 38 }}>
          <AccessDenied attemptedCompany={msg.attemptedCompany}/>
        </div>
      </div>
    );
  }

  const Component = RESPONSE_COMPONENTS[msg.type] || UnknownResponse;
  const title = RESPONSE_TITLES[msg.type] || 'Response';

  return (
    <div style={{ marginBottom: 24, animation: 'fadeIn 0.3s ease' }}>
      <AiHeader timestamp={msg.timestamp}/>
      <div style={{ marginLeft: 38 }}>
        {msg.streaming && msg.progress < 0.08 ? (
          <TypingIndicator/>
        ) : (
          <div>
            {/* Title bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', background: 'var(--red-light)',
              borderRadius: '10px 10px 0 0', border: '1px solid var(--red-border)', borderBottom: 'none',
            }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-dark)' }}>{title}</span>
            </div>

            {/* Content */}
            <div style={{ padding: '16px', background: '#fff', border: '1px solid var(--border)', borderRadius: '0 0 12px 12px' }}>
              <Component progress={msg.progress || 1} companyData={companyData}/>
              {msg.streaming && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ height: 2, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'var(--red)', width: `${Math.round((msg.progress||0)*100)}%`, transition: 'width 0.1s linear', borderRadius: 2 }}/>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom action bar — per message, like CN-GPT */}
            {!msg.streaming && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 4px', flexWrap: 'wrap', gap: 8,
              }}>
                <FeedbackPanel msgId={msg.id} feedback={msg.feedback} onFeedback={onFeedback}/>
                <MessageActions title={title} session={activeSession}/>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
