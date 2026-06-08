import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled, company }) {
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
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const placeholder = company
    ? `Ask about ${company.shortName}'s performance, trends, leakage...`
    : 'Select a company to begin...';

  return (
    <div style={{
      padding: '0 20px 18px',
      background: '#fff',
      borderTop: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 10,
          background: 'var(--bg-2)',
          border: '1.5px solid var(--border)',
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
            placeholder={placeholder}
            disabled={disabled || !company}
            style={{
              flex: 1, border: 'none', outline: 'none',
              background: 'transparent', resize: 'none',
              fontSize: 14, color: 'var(--text-1)', lineHeight: 1.5,
              maxHeight: 120, overflowY: 'auto',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!value.trim() || disabled || !company}
            style={{
              width: 36, height: 36, borderRadius: 10, flexShrink: 0,
              background: value.trim() && !disabled && company ? 'var(--red)' : 'var(--bg-3)',
              color: value.trim() && !disabled && company ? '#fff' : 'var(--text-3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.15s',
              cursor: !value.trim() || disabled || !company ? 'not-allowed' : 'pointer',
            }}
          >
            <Send size={15}/>
          </button>
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 6, textAlign: 'center' }}>
          CN-GPT · Data Analytics Agent · Business Banking Pilot · Powered by CIMB Niaga AI CoE
        </div>
      </div>
    </div>
  );
}
