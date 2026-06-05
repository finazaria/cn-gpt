import React, { useState, useRef, useEffect } from 'react';
import { Send, Building2, TrendingUp, AlertTriangle, Package, BarChart2, Calendar } from 'lucide-react';
import { SUGGESTED_QUESTIONS } from '../utils/matcher.js';

const ICON_MAP = {
  building: Building2,
  'trending-up': TrendingUp,
  'alert-triangle': AlertTriangle,
  package: Package,
  'bar-chart-2': BarChart2,
  calendar: Calendar,
};

export default function ChatInput({ onSend, disabled, showSuggestions }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [value]);

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (q) => {
    if (disabled) return;
    onSend(q.text);
  };

  return (
    <div style={{ padding: '0 20px 20px', background: '#fff' }}>
      {/* Suggested questions */}
      {showSuggestions && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 8, fontWeight: 500 }}>
            SUGGESTED QUESTIONS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {SUGGESTED_QUESTIONS.map((q, i) => {
              const Icon = ICON_MAP[q.icon] || Building2;
              return (
                <button key={i} onClick={() => handleSuggestion(q)}
                  disabled={disabled}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 12px', borderRadius: 20,
                    border: '1px solid var(--border)',
                    background: 'var(--bg-2)', color: 'var(--text-2)',
                    fontSize: 12, fontWeight: 400,
                    transition: 'all 0.15s',
                    opacity: disabled ? 0.5 : 1,
                    cursor: disabled ? 'not-allowed' : 'pointer',
                  }}
                  onMouseEnter={e => {
                    if (!disabled) {
                      e.currentTarget.style.background = 'var(--red-light)';
                      e.currentTarget.style.color = 'var(--red-dark)';
                      e.currentTarget.style.borderColor = 'var(--red-border)';
                    }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'var(--bg-2)';
                    e.currentTarget.style.color = 'var(--text-2)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <Icon size={12} />
                  {q.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Input box */}
      <div style={{
        display: 'flex', alignItems: 'flex-end', gap: 10,
        background: 'var(--bg-2)', border: '1.5px solid var(--border)',
        borderRadius: 14, padding: '10px 10px 10px 16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'border-color 0.15s',
      }}
        onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--red)'}
        onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
      >
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask about PT ABC's performance, trends, leakage..."
          disabled={disabled}
          style={{
            flex: 1, border: 'none', outline: 'none',
            background: 'transparent', resize: 'none',
            fontSize: 14, color: 'var(--text-1)', lineHeight: 1.5,
            maxHeight: 120, overflowY: 'auto',
          }}
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: value.trim() && !disabled ? 'var(--red)' : 'var(--bg-3)',
            color: value.trim() && !disabled ? '#fff' : 'var(--text-3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.15s',
            cursor: !value.trim() || disabled ? 'not-allowed' : 'pointer',
          }}
        >
          <Send size={15} />
        </button>
      </div>
      <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 6, textAlign: 'center' }}>
        CN-GPT · Data Analytics Agent · Business Banking Pilot · Powered by CIMB Niaga
      </div>
    </div>
  );
}
