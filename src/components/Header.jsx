import React, { useState } from 'react';
import { Download, Share2, FileText, File, ExternalLink, ChevronDown, Plus } from 'lucide-react';
import { exportToPDF, exportToWord, shareToTeams } from '../utils/export.js';

export default function Header({ activeSession, currentCompany, onNew }) {
  const [exportOpen, setExportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const handleExportPDF = () => { exportToPDF(activeSession); setExportOpen(false); showToast('Exported as PDF'); };
  const handleExportWord = () => { exportToWord(activeSession); setExportOpen(false); showToast('Exported as Word'); };
  const handleShareTeams = () => { shareToTeams(activeSession); setShareOpen(false); showToast('Opening Teams…'); };
  const handleCopyLink = () => { navigator.clipboard.writeText(window.location.href); setShareOpen(false); showToast('Link copied'); };

  return (
    <header style={{
      height: 54, background: 'var(--topbar-bg)',
      borderBottom: '1px solid var(--topbar-border)',
      display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: 12, flexShrink: 0,
      position: 'relative', zIndex: 50,
    }}>
      {/* CIMB Niaga logo area */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* CIMB logo badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 4,
            background: 'var(--red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: 8, fontWeight: 800 }}>C</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--red)', letterSpacing: -0.3 }}>CIMB</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-2)', letterSpacing: -0.3 }}>NIAGA</span>
        </div>

        <div style={{ width: 1, height: 18, background: 'var(--border)' }}/>

        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.2 }}>
            {currentCompany ? `${currentCompany.name}` : 'Data Analytics Agent'}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-3)', lineHeight: 1.2 }}>CN-GPT AI Assistant v1.0</div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }}/>

      {/* Right side */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        {/* New Chat */}
        <button onClick={onNew} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 8,
          background: 'var(--red)', color: '#fff',
          fontSize: 12, fontWeight: 600,
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
        >
          <Plus size={13}/>
          New Chat
        </button>

        {/* Export */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setExportOpen(!exportOpen); setShareOpen(false); }} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 11px', borderRadius: 8, fontSize: 12,
            border: '1px solid var(--border)', color: 'var(--text-2)',
            background: exportOpen ? 'var(--bg-2)' : 'transparent',
          }}>
            <Download size={13}/> Export <ChevronDown size={10}/>
          </button>
          {exportOpen && (
            <Dropdown>
              <DropItem onClick={handleExportPDF} icon={<FileText size={13} style={{ color: '#dc2626' }}/>} label="Export as PDF"/>
              <DropItem onClick={handleExportWord} icon={<File size={13} style={{ color: '#2563eb' }}/>} label="Export as Word" border/>
            </Dropdown>
          )}
        </div>

        {/* Share */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setShareOpen(!shareOpen); setExportOpen(false); }} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 11px', borderRadius: 8, fontSize: 12,
            border: '1px solid var(--border)', color: 'var(--text-2)',
            background: shareOpen ? 'var(--bg-2)' : 'transparent',
          }}>
            <Share2 size={13}/> Share <ChevronDown size={10}/>
          </button>
          {shareOpen && (
            <Dropdown>
              <DropItem onClick={handleShareTeams} icon={<ExternalLink size={13} style={{ color: '#6264A7' }}/>} label="Share to Microsoft Teams"/>
              <DropItem onClick={handleCopyLink} icon={<Share2 size={13} style={{ color: 'var(--text-2)' }}/>} label="Copy link" border/>
            </Dropdown>
          )}
        </div>

        {/* User badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-1)' }}>Dewi Rahayu</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Standard User</div>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--red)', border: '2px solid var(--red-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, fontWeight: 700, color: '#fff',
          }}>DR</div>
        </div>
      </div>

      {(exportOpen || shareOpen) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}
          onClick={() => { setExportOpen(false); setShareOpen(false); }}/>
      )}

      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: '#1a1d23', color: '#fff',
          padding: '8px 18px', borderRadius: 20, fontSize: 13,
          boxShadow: 'var(--shadow-md)', zIndex: 999,
          animation: 'fadeIn 0.2s ease',
        }}>{toast}</div>
      )}
    </header>
  );
}

function Dropdown({ children }) {
  return (
    <div style={{
      position: 'absolute', right: 0, top: '100%', marginTop: 4,
      background: '#fff', border: '1px solid var(--border)',
      borderRadius: 10, boxShadow: 'var(--shadow-md)',
      minWidth: 180, zIndex: 200, overflow: 'hidden',
      animation: 'fadeIn 0.15s ease',
    }}>{children}</div>
  );
}

function DropItem({ onClick, icon, label, border }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 10,
      padding: '10px 14px', fontSize: 13, color: 'var(--text-1)',
      borderTop: border ? '1px solid var(--border)' : 'none',
      transition: 'background 0.1s', textAlign: 'left',
    }}
      onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
    >
      {icon}{label}
    </button>
  );
}
