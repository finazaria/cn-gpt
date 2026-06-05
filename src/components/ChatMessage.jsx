import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Copy, Check, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '../utils/export.js';
import {
  CompanyOverview, FundingLendingTrend, LeakageAnalysis,
  ProductHolding, IncomeTrend, MeetingPrep, UnknownResponse,
} from './Responses.jsx';

const RESPONSE_COMPONENTS = {
  COMPANY_OVERVIEW: CompanyOverview,
  FUNDING_LENDING: FundingLendingTrend,
  LEAKAGE: LeakageAnalysis,
  PRODUCTS: ProductHolding,
  INCOME: IncomeTrend,
  MEETING_PREP: MeetingPrep,
  UNKNOWN: UnknownResponse,
};

const RESPONSE_TITLES = {
  COMPANY_OVERVIEW: 'Company Overview — PT ABC Makmur Tbk',
  FUNDING_LENDING: 'Funding & Lending Balance Analysis',
  LEAKAGE: 'CASA Leakage Analysis',
  PRODUCTS: 'Product Holding Analysis',
  INCOME: 'Income Trend Analysis',
  MEETING_PREP: 'Customer Meeting Brief',
  UNKNOWN: 'Clarification Needed',
};

// Typing indicator
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', padding: '4px 0' }}>
      {[0, 1, 2].map(i => (
        <span key={i} style={{
          width: 6, height: 6, borderRadius: '50%', background: 'var(--red)',
          display: 'inline-block',
          animation: `typing-dot 1.4s ${i * 0.16}s ease-in-out infinite`,
        }} />
      ))}
      <span style={{ fontSize: 12, color: 'var(--text-3)', marginLeft: 6 }}>CN-GPT is analyzing...</span>
    </div>
  );
}

// Feedback panel
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

  if (submitted) {
    return (
      <div style={{ fontSize: 11, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 4 }}>
        <Check size={11} /> Thank you for your feedback
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)', marginRight: 4 }}>Was this helpful?</span>
        <button
          onClick={() => handleFeedback('up')}
          title="Helpful"
          style={{
            padding: '4px 8px', borderRadius: 6,
            background: feedback === 'up' ? 'var(--green-bg)' : 'transparent',
            border: `1px solid ${feedback === 'up' ? 'var(--green-border)' : 'var(--border)'}`,
            color: feedback === 'up' ? 'var(--green)' : 'var(--text-3)',
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 11,
            transition: 'all 0.15s',
          }}
        >
          <ThumbsUp size={12} /> {feedback === 'up' ? 'Helpful' : ''}
        </button>
        <button
          onClick={() => handleFeedback('down')}
          title="Not helpful"
          style={{
            padding: '4px 8px', borderRadius: 6,
            background: feedback === 'down' ? 'var(--red-neg-bg)' : 'transparent',
            border: `1px solid ${feedback === 'down' ? 'var(--red-neg-border)' : 'var(--border)'}`,
            color: feedback === 'down' ? 'var(--red-neg)' : 'var(--text-3)',
            display: 'flex', alignItems: 'center', gap: 4, fontSize: 11,
            transition: 'all 0.15s',
          }}
        >
          <ThumbsDown size={12} /> {feedback === 'down' ? 'Not helpful' : ''}
        </button>
      </div>
      {showComment && (
        <div style={{ marginTop: 8 }}>
          <textarea
            placeholder="Tell us what was wrong or missing..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            style={{
              width: '100%', minHeight: 64, padding: '8px 10px',
              border: '1px solid var(--border)', borderRadius: 8,
              fontSize: 12, resize: 'vertical', outline: 'none',
              fontFamily: 'var(--font)',
            }}
          />
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <button onClick={submitComment} style={{
              padding: '5px 14px', borderRadius: 6, background: 'var(--red)',
              color: '#fff', fontSize: 12, fontWeight: 500,
            }}>Submit</button>
            <button onClick={() => setShowComment(false)} style={{
              padding: '5px 14px', borderRadius: 6,
              border: '1px solid var(--border)', fontSize: 12, color: 'var(--text-2)',
            }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Main message component
export default function ChatMessage({ msg, onFeedback, isLast }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `CN-GPT Response — ${RESPONSE_TITLES[msg.type] || msg.type}\n\n[Rich content — view in CN-GPT app]\n\nGenerated: ${new Date().toLocaleString('id-ID')}`;
    copyToClipboard(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (msg.role === 'user') {
    return (
      <div style={{
        display: 'flex', justifyContent: 'flex-end',
        marginBottom: 20, animation: 'fadeIn 0.25s ease',
      }}>
        <div style={{
          maxWidth: '70%',
          background: 'var(--red)', color: '#fff',
          borderRadius: '16px 16px 4px 16px',
          padding: '10px 16px', fontSize: 14,
          boxShadow: '0 2px 8px rgba(204,0,1,0.2)',
        }}>
          {msg.text}
        </div>
      </div>
    );
  }

  // Assistant message
  const Component = RESPONSE_COMPONENTS[msg.type] || UnknownResponse;
  const title = RESPONSE_TITLES[msg.type] || 'Response';

  return (
    <div style={{ marginBottom: 24, animation: 'fadeIn 0.3s ease' }}>
      {/* AI header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: 'var(--red)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>CN</span>
        </div>
        <div>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>CN-GPT</span>
          <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 8 }}>Data Analytics Agent</span>
        </div>
        <div style={{ marginLeft: 'auto', fontSize: 11, color: 'var(--text-3)' }}>
          {new Date(msg.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Content area */}
      <div style={{ marginLeft: 38 }}>
        {msg.streaming && msg.progress < 0.08 ? (
          <TypingIndicator />
        ) : (
          <div>
            {/* Response title bar */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '8px 12px', background: 'var(--red-light)',
              borderRadius: '10px 10px 0 0', border: '1px solid var(--red-border)',
              borderBottom: 'none',
            }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-dark)' }}>{title}</span>
              <button onClick={handleCopy} style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 11, color: copied ? 'var(--green)' : 'var(--text-3)',
                padding: '2px 8px', borderRadius: 6,
                border: '1px solid var(--border)', background: '#fff',
                transition: 'all 0.15s',
              }}>
                {copied ? <Check size={11} /> : <Copy size={11} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>

            {/* Rich response */}
            <div style={{
              padding: '16px', background: '#fff',
              border: '1px solid var(--border)',
              borderRadius: '0 0 12px 12px',
            }}>
              <Component progress={msg.progress || 1} />

              {/* Streaming progress bar */}
              {msg.streaming && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ height: 2, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', background: 'var(--red)',
                      width: `${Math.round((msg.progress || 0) * 100)}%`,
                      transition: 'width 0.1s linear',
                      borderRadius: 2,
                    }} />
                  </div>
                </div>
              )}
            </div>

            {/* Feedback row — only show when done */}
            {!msg.streaming && (
              <div style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                padding: '8px 4px', flexWrap: 'wrap', gap: 8,
              }}>
                <FeedbackPanel
                  msgId={msg.id}
                  feedback={msg.feedback}
                  onFeedback={onFeedback}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
