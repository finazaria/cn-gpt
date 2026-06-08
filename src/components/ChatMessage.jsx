import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '../utils/export.js';
import {
  CompanyOverview, FundingLendingTrend, LeakageAnalysis,
  ProductHolding, IncomeTrend, MeetingPrep, UnknownResponse, AccessDenied,
} from './Responses.jsx';

const RESPONSE_COMPONENTS = {
  COMPANY_OVERVIEW: CompanyOverview,
  FUNDING_LENDING:  FundingLendingTrend,
  LEAKAGE:          LeakageAnalysis,
  PRODUCTS:         ProductHolding,
  INCOME:           IncomeTrend,
  MEETING_PREP:     MeetingPrep,
  UNKNOWN:          UnknownResponse,
};

const RESPONSE_TITLES = {
  COMPANY_OVERVIEW: 'Company Overview',
  FUNDING_LENDING:  'Funding & Lending Balance Analysis',
  LEAKAGE:          'CASA Leakage Analysis',
  PRODUCTS:         'Product Holding Analysis',
  INCOME:           'Income Trend Analysis',
  MEETING_PREP:     'Customer Meeting Brief',
  UNKNOWN:          'Clarification Needed',
  ACCESS_DENIED:    'Access Restricted',
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
        <FeedbackBtn active={feedback === 'up'} activeColor="var(--green)" activeBg="var(--green-bg)" activeBorder="var(--green-border)"
          onClick={() => handleFeedback('up')} icon={<ThumbsUp size={11}/>} label={feedback === 'up' ? 'Helpful' : ''}/>
        <FeedbackBtn active={feedback === 'down'} activeColor="var(--red-neg)" activeBg="var(--red-neg-bg)" activeBorder="var(--red-neg-border)"
          onClick={() => handleFeedback('down')} icon={<ThumbsDown size={11}/>} label={feedback === 'down' ? 'Not helpful' : ''}/>
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

function FeedbackBtn({ active, activeColor, activeBg, activeBorder, onClick, icon, label }) {
  return (
    <button onClick={onClick} style={{
      padding: '4px 8px', borderRadius: 6,
      background: active ? activeBg : 'transparent',
      border: `1px solid ${active ? activeBorder : 'var(--border)'}`,
      color: active ? activeColor : 'var(--text-3)',
      display: 'flex', alignItems: 'center', gap: 4, fontSize: 11,
      transition: 'all 0.15s',
    }}>
      {icon}{label}
    </button>
  );
}

export default function ChatMessage({ msg, onFeedback, companyData }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copyToClipboard(`CN-GPT · ${RESPONSE_TITLES[msg.type] || msg.type}\n\n[Rich response — view in CN-GPT app]\n\nGenerated: ${new Date().toLocaleString('id-ID')}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (msg.role === 'user') {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20, animation: 'fadeIn 0.25s ease' }}>
        <div style={{
          maxWidth: '70%', background: 'var(--red)', color: '#fff',
          borderRadius: '16px 16px 4px 16px',
          padding: '10px 16px', fontSize: 14,
          boxShadow: '0 2px 8px rgba(204,0,1,0.2)',
        }}>
          {msg.text}
        </div>
      </div>
    );
  }

  // Access denied — no streaming needed
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
              <button onClick={handleCopy} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 11, color: copied ? 'var(--green)' : 'var(--text-3)',
                padding: '2px 8px', borderRadius: 6,
                border: '1px solid var(--border)', background: '#fff',
                transition: 'all 0.15s',
              }}>
                {copied ? <Check size={11}/> : <Copy size={11}/>}
                {copied ? 'Copied' : 'Copy'}
              </button>
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

            {!msg.streaming && (
              <div style={{ padding: '8px 4px' }}>
                <FeedbackPanel msgId={msg.id} feedback={msg.feedback} onFeedback={onFeedback}/>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
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
