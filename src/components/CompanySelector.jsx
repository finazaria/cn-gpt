import React, { useState, useRef, useEffect } from 'react';
import { Search, Building2, ChevronRight, X } from 'lucide-react';
import { COMPANY_REGISTRY } from '../data/mockData.js';

export default function CompanySelector({ onSelect }) {
  const [query, setQuery] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const filtered = COMPANY_REGISTRY.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.shortName.toLowerCase().includes(query.toLowerCase())
  );

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter' && filtered[highlighted]) onSelect(filtered[highlighted]);
  };

  const colors = {
    astra:    { bg: 'var(--red-light)',    border: 'var(--red-border)',    text: 'var(--red)' },
    kino:     { bg: 'var(--blue-bg)',      border: 'var(--blue-border)',   text: 'var(--blue)' },
    indofood: { bg: 'var(--amber-bg)',     border: 'var(--amber-border)',  text: 'var(--amber)' },
  };

  const segments = {
    astra: 'Corporate Banking',
    kino: 'Commercial Banking',
    indofood: 'Corporate Banking',
  };

  return (
    <div style={{
      flex: 1, display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      background: 'var(--bg)',
    }}>
      <div style={{
        width: '100%', maxWidth: 520,
        animation: 'fadeInScale 0.3s ease',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, background: 'var(--red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 24px rgba(204,0,1,0.2)',
          }}>
            <span style={{ color: '#fff', fontSize: 18, fontWeight: 800 }}>CN</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>
            Data Analytics Agent
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.6 }}>
            Select a client company to begin your analysis session.
          </p>
        </div>

        {/* Search box */}
        <div style={{
          background: '#fff',
          border: '1.5px solid var(--border)',
          borderRadius: 14, overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '12px 16px',
            borderBottom: '1px solid var(--border)',
          }}>
            <Search size={16} style={{ color: 'var(--text-3)', flexShrink: 0 }}/>
            <input
              ref={inputRef}
              placeholder="Search company name..."
              value={query}
              onChange={e => { setQuery(e.target.value); setHighlighted(0); }}
              onKeyDown={handleKey}
              style={{
                flex: 1, border: 'none', outline: 'none',
                fontSize: 14, color: 'var(--text-1)',
                background: 'transparent',
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} style={{ color: 'var(--text-3)' }}>
                <X size={14}/>
              </button>
            )}
          </div>

          {/* Company list */}
          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {filtered.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-3)', fontSize: 13 }}>
                No companies found matching "{query}"
              </div>
            ) : (
              filtered.map((c, i) => {
                const col = colors[c.id] || colors.astra;
                const isHighlighted = i === highlighted;
                return (
                  <button
                    key={c.id}
                    onClick={() => onSelect(c)}
                    onMouseEnter={() => setHighlighted(i)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 16px', textAlign: 'left',
                      background: isHighlighted ? 'var(--red-light)' : '#fff',
                      borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                      transition: 'background 0.1s',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: col.bg, border: `1px solid ${col.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: col.text }}>
                        {c.initials}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 14, fontWeight: 600,
                        color: isHighlighted ? 'var(--red-dark)' : 'var(--text-1)',
                      }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>
                        {segments[c.id]} · CIF Available
                      </div>
                    </div>
                    <ChevronRight size={16} style={{
                      color: isHighlighted ? 'var(--red)' : 'var(--text-3)',
                      transition: 'color 0.1s',
                    }}/>
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: 'var(--text-3)', textAlign: 'center' }}>
          🔒 You can only access companies assigned to your RM portfolio
        </div>
      </div>
    </div>
  );
}
