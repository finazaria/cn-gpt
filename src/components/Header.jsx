import React, { useState } from 'react';
import {
  Menu, Download, Share2, FileText, File,
  ExternalLink, ChevronDown, X
} from 'lucide-react';
import { exportToPDF, exportToWord, shareToTeams } from '../utils/export.js';

export default function Header({ activeSession, onToggleSidebar }) {
  const [exportOpen, setExportOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleExportPDF = () => {
    exportToPDF(activeSession);
    setExportOpen(false);
    showToast('Exported as HTML/PDF');
  };

  const handleExportWord = () => {
    exportToWord(activeSession);
    setExportOpen(false);
    showToast('Exported as Word (.doc)');
  };

  const handleShareTeams = () => {
    shareToTeams(activeSession);
    setShareOpen(false);
    showToast('Opening Teams share dialog…');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareOpen(false);
    showToast('Link copied to clipboard');
  };

  return (
    <header style={{
      height: 52, background: '#fff',
      borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center',
      padding: '0 16px', gap: 10,
      flexShrink: 0, position: 'relative', zIndex: 50,
    }}>
      {/* Sidebar toggle */}
      <button onClick={onToggleSidebar} style={{
        width: 32, height: 32, borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--text-2)',
        border: '1px solid var(--border)',
        transition: 'all 0.15s',
      }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        <Menu size={16} />
      </button>

      {/* CIMB Logo text */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          width: 26, height: 26, borderRadius: 6, background: 'var(--red)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: '#fff', fontSize: 9, fontWeight: 700 }}>CN</span>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-1)' }}>CN-GPT</div>
        <div style={{
          fontSize: 10, padding: '2px 7px', borderRadius: 20,
          background: 'var(--red-light)', color: 'var(--red)',
          border: '1px solid var(--red-border)', fontWeight: 500,
        }}>Data Analytics · Pilot</div>
      </div>

      {/* Current session title */}
      {activeSession && (
        <div style={{
          flex: 1, textAlign: 'center',
          fontSize: 13, color: 'var(--text-2)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          maxWidth: 300, margin: '0 auto',
        }}>
          {activeSession.title !== 'New Chat' ? activeSession.title : ''}
        </div>
      )}

      <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
        {/* Export dropdown */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setExportOpen(!exportOpen); setShareOpen(false); }} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 8, fontSize: 12,
            border: '1px solid var(--border)', color: 'var(--text-2)',
            background: exportOpen ? 'var(--bg-2)' : 'transparent',
            transition: 'all 0.15s',
          }}>
            <Download size={13} /> Export <ChevronDown size={11} />
          </button>
          {exportOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 4,
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: 10, boxShadow: 'var(--shadow-md)',
              minWidth: 160, zIndex: 200, overflow: 'hidden',
              animation: 'fadeIn 0.15s ease',
            }}>
              <button onClick={handleExportPDF} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', fontSize: 13, color: 'var(--text-1)',
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <FileText size={14} style={{ color: 'var(--red-neg)' }} />
                Export as PDF
              </button>
              <button onClick={handleExportWord} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', fontSize: 13, color: 'var(--text-1)',
                borderTop: '1px solid var(--border)',
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <File size={14} style={{ color: 'var(--blue)' }} />
                Export as Word
              </button>
            </div>
          )}
        </div>

        {/* Share dropdown */}
        <div style={{ position: 'relative' }}>
          <button onClick={() => { setShareOpen(!shareOpen); setExportOpen(false); }} style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 8, fontSize: 12,
            border: '1px solid var(--border)', color: 'var(--text-2)',
            background: shareOpen ? 'var(--bg-2)' : 'transparent',
            transition: 'all 0.15s',
          }}>
            <Share2 size={13} /> Share <ChevronDown size={11} />
          </button>
          {shareOpen && (
            <div style={{
              position: 'absolute', right: 0, top: '100%', marginTop: 4,
              background: '#fff', border: '1px solid var(--border)',
              borderRadius: 10, boxShadow: 'var(--shadow-md)',
              minWidth: 180, zIndex: 200, overflow: 'hidden',
              animation: 'fadeIn 0.15s ease',
            }}>
              <button onClick={handleShareTeams} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', fontSize: 13, color: 'var(--text-1)',
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <ExternalLink size={14} style={{ color: '#6264A7' }} />
                Share to Microsoft Teams
              </button>
              <button onClick={handleCopyLink} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', fontSize: 13, color: 'var(--text-1)',
                borderTop: '1px solid var(--border)',
                transition: 'background 0.1s',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <Share2 size={14} style={{ color: 'var(--text-2)' }} />
                Copy link
              </button>
            </div>
          )}
        </div>

        {/* RM Badge */}
        <div style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'var(--red-light)', border: '2px solid var(--red-border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: 'var(--red)',
        }}>DR</div>
      </div>

      {/* Close dropdowns on outside click */}
      {(exportOpen || shareOpen) && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}
          onClick={() => { setExportOpen(false); setShareOpen(false); }} />
      )}

      {/* Toast notification */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          background: 'var(--text-1)', color: '#fff',
          padding: '8px 18px', borderRadius: 20, fontSize: 13,
          boxShadow: 'var(--shadow-md)', zIndex: 999,
          animation: 'fadeIn 0.2s ease',
        }}>
          {toast}
        </div>
      )}
    </header>
  );
}
