import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, X, FileText, Image, File, Upload, Building2, TrendingUp, AlertTriangle, Package, BarChart2, Calendar, Network } from 'lucide-react';

const MAX_FILE_SIZE_MB = 10;
const ACCEPTED_TYPES = '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.txt,.csv';

// ─── Suggested questions — always shown above chatbox ────────────────────────
const SUGGESTED = [
  { label: 'Company Overview', icon: Building2,     promptFn: (n) => `Tell me about ${n}` },
  { label: 'Balance Trend',    icon: TrendingUp,    promptFn: (n) => `Show funding & lending balance trend for ${n}` },
  { label: 'Leakage Analysis', icon: AlertTriangle, promptFn: (n) => `Analyze leakage for ${n}` },
  { label: 'Product Holding',  icon: Package,       promptFn: (n) => `What products does ${n} currently use?` },
  { label: 'Income Trend',     icon: BarChart2,     promptFn: (n) => `How's the income trend for ${n}?` },
  { label: 'Ecosystem',        icon: Network,       promptFn: (n) => `Show me the ecosystem for ${n}` },
  { label: 'Meeting Prep',     icon: Calendar,      promptFn: (n) => `Prepare me for my customer meeting with ${n}` },
];

function SuggestedPills({ company, onSend }) {
  if (!company) return null;
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
        SUGGESTED QUESTIONS
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {SUGGESTED.map((s, i) => {
          const Icon = s.icon;
          return (
            <button key={i}
              onClick={() => onSend(s.promptFn(company.name))}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 11px', borderRadius: 20, cursor: 'pointer',
                border: '1px solid var(--border)',
                background: 'var(--bg-2)', color: 'var(--text-2)',
                fontSize: 12, fontWeight: 400,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--red-light)';
                e.currentTarget.style.color = 'var(--red-dark)';
                e.currentTarget.style.borderColor = 'var(--red-border)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--bg-2)';
                e.currentTarget.style.color = 'var(--text-2)';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <Icon size={11}/>
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FilePreview({ file, onRemove }) {
  const ext = file.name.split('.').pop().toLowerCase();
  const isImage = ['png','jpg','jpeg'].includes(ext);
  const Icon = isImage ? Image : ['pdf'].includes(ext) ? FileText : File;
  const color = isImage ? 'var(--blue)' : ext === 'pdf' ? 'var(--red-neg)' : 'var(--amber)';

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px 4px 8px',
      background: 'var(--bg-2)', border: '1px solid var(--border)',
      borderRadius: 20, fontSize: 11, maxWidth: 180,
    }}>
      <Icon size={12} style={{ color, flexShrink: 0 }}/>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--text-1)' }}>
        {file.name}
      </span>
      <button onClick={() => onRemove(file.name)} style={{ color: 'var(--text-3)', flexShrink: 0, padding: 1 }}>
        <X size={10}/>
      </button>
    </div>
  );
}

function UploadModal({ onClose, onUpload }) {
  const [dragging, setDragging] = useState(false);
  const [staged, setStaged] = useState([]);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const validate = (files) => {
    const valid = [];
    let err = '';
    Array.from(files).forEach(f => {
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        err = `${f.name} exceeds 10MB limit.`;
      } else {
        valid.push(f);
      }
    });
    setError(err);
    return valid;
  };

  const addFiles = (files) => {
    const valid = validate(files);
    setStaged(prev => {
      const names = prev.map(f => f.name);
      return [...prev, ...valid.filter(f => !names.includes(f.name))];
    });
  };

  const onDrop = (e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 500,
    }} onClick={onClose}>
      <div style={{
        background: '#fff', borderRadius: 16, width: 520,
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        overflow: 'hidden',
        animation: 'fadeInScale 0.2s ease',
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          background: 'var(--red)', padding: '16px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff' }}>
            <Upload size={18}/>
            <span style={{ fontSize: 16, fontWeight: 600 }}>Upload File</span>
          </div>
          <button onClick={onClose} style={{ color: '#fff', opacity: 0.8 }}><X size={18}/></button>
        </div>

        {/* Drop zone */}
        <div style={{ padding: '24px 24px 16px' }}>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            style={{
              border: `2px dashed ${dragging ? 'var(--red)' : 'var(--border-med)'}`,
              borderRadius: 12, padding: '36px 20px',
              textAlign: 'center', background: dragging ? 'var(--red-light)' : 'var(--bg-2)',
              transition: 'all 0.15s',
            }}
          >
            <Upload size={32} style={{ color: 'var(--text-3)', margin: '0 auto 12px' }}/>
            <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-1)', marginBottom: 6 }}>
              Drag and Drop Files Here
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', marginBottom: 14 }}>
              or click the button below to browse
            </div>
            <button
              onClick={() => inputRef.current?.click()}
              style={{
                padding: '10px 28px', borderRadius: 8,
                background: 'var(--red)', color: '#fff',
                fontSize: 13, fontWeight: 600,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
            >
              Select Files
            </button>
            <input ref={inputRef} type="file" multiple accept={ACCEPTED_TYPES}
              style={{ display: 'none' }}
              onChange={e => addFiles(e.target.files)}/>
          </div>

          {error && <div style={{ fontSize: 11, color: 'var(--red-neg)', marginTop: 8 }}>{error}</div>}

          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 10 }}>
            Supported formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, TXT, and more. Maximum file size: 10MB per file.
          </div>

          {/* Staged files */}
          {staged.length > 0 && (
            <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {staged.map(f => (
                <FilePreview key={f.name} file={f}
                  onRemove={name => setStaged(prev => prev.filter(x => x.name !== name))}/>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px', borderTop: '1px solid var(--border)',
          display: 'flex', gap: 10,
        }}>
          <button onClick={onClose} style={{
            flex: 1, padding: '10px', borderRadius: 8,
            border: '1.5px solid var(--border)', fontSize: 13, fontWeight: 500,
            color: 'var(--text-1)',
          }}>Cancel</button>
          <button
            onClick={() => { if (staged.length > 0) { onUpload(staged); onClose(); }}}
            disabled={staged.length === 0}
            style={{
              flex: 1, padding: '10px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: staged.length > 0 ? 'var(--text-3)' : 'var(--bg-3)',
              color: staged.length > 0 ? '#fff' : 'var(--text-3)',
              transition: 'background 0.15s',
            }}
          >Upload</button>
        </div>
      </div>
    </div>
  );
}

export default function ChatInput({ onSend, disabled, company, onNewChat }) {
  const [value, setValue] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
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
    onSend(trimmed, attachedFiles);
    setValue('');
    setAttachedFiles([]);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // Suggested pill click: start a new chat session, then send the prompt
  const handleSuggestedClick = (prompt) => {
    if (!company || disabled) return;
    if (onNewChat) onNewChat();
    // Small delay so session is created before message is added
    setTimeout(() => onSend(prompt), 50);
  };

  const placeholder = company
    ? `Ask about ${company.shortName}'s performance, trends, leakage...`
    : 'Select a company to begin...';

  return (
    <div style={{ padding: '0 20px 18px', background: '#fff', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        {/* Suggested Questions — always visible above chatbox */}
        <SuggestedPills company={company} onSend={handleSuggestedClick}/>

        {/* Attached files preview */}
        {attachedFiles.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
            {attachedFiles.map(f => (
              <FilePreview key={f.name} file={f}
                onRemove={name => setAttachedFiles(prev => prev.filter(x => x.name !== name))}/>
            ))}
          </div>
        )}

        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 8,
          background: 'var(--bg-2)',
          border: '1.5px solid var(--border)',
          borderRadius: 14, padding: '10px 10px 10px 12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'border-color 0.15s',
        }}
          onFocusCapture={e => e.currentTarget.style.borderColor = 'var(--red)'}
          onBlurCapture={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          {/* Attach button */}
          <button
            onClick={() => setShowUpload(true)}
            disabled={!company}
            title="Attach file"
            style={{
              width: 32, height: 32, borderRadius: 8, flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-3)',
              transition: 'all 0.15s',
              opacity: !company ? 0.4 : 1,
            }}
            onMouseEnter={e => { if (company) e.currentTarget.style.color = 'var(--red)'; }}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-3)'}
          >
            <Paperclip size={16}/>
          </button>

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

      {showUpload && (
        <UploadModal
          onClose={() => setShowUpload(false)}
          onUpload={(files) => setAttachedFiles(prev => {
            const names = prev.map(f => f.name);
            return [...prev, ...files.filter(f => !names.includes(f.name))];
          })}
        />
      )}
    </div>
  );
}
