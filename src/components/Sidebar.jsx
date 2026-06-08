import React, { useState } from 'react';
import {
  Home, MessageSquare, Search, Pencil, Trash2,
  Check, X, ChevronDown, ChevronRight, Plus
} from 'lucide-react';

export default function Sidebar({ sessions, activeId, onNew, onSelect, onRename, onDelete, currentCompany }) {
  const [search, setSearch] = useState('');
  const [renaming, setRenaming] = useState(null);
  const [renameVal, setRenameVal] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [historyOpen, setHistoryOpen] = useState(true);

  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const startRename = (s, e) => { e.stopPropagation(); setRenaming(s.id); setRenameVal(s.title); };
  const commitRename = (id) => { if (renameVal.trim()) onRename(id, renameVal.trim()); setRenaming(null); };
  const confirmDelete = (id, e) => { e.stopPropagation(); onDelete(id); setDeleteConfirm(null); };

  return (
    <aside style={{
      width: 240, minWidth: 240,
      background: 'var(--sidebar-bg)',
      display: 'flex', flexDirection: 'column',
      height: '100%', flexShrink: 0,
      borderRight: '1px solid var(--sidebar-border)',
    }}>
      {/* Logo */}
      <div style={{
        padding: '18px 16px 14px',
        borderBottom: '1px solid var(--sidebar-border)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'var(--red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: 0.3 }}>CN</span>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>CN-GPT</div>
            <div style={{ fontSize: 10, color: 'var(--sidebar-text-dim)', lineHeight: 1.2 }}>CIMB Niaga AI Assistant</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div style={{ padding: '10px 10px 0', flexShrink: 0 }}>
        <NavItem icon={<Home size={15}/>} label="Home" active />
        <NavItem icon={<MessageSquare size={15}/>} label="AI Market" />

        {/* Chat History collapsible */}
        <button
          onClick={() => setHistoryOpen(p => !p)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '9px 10px', borderRadius: 8, cursor: 'pointer',
            color: 'var(--sidebar-text)', fontSize: 13,
            transition: 'background 0.12s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--sidebar-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ opacity: 0.7 }}><MessageSquare size={15}/></span>
            Chat History
          </div>
          {historyOpen ? <ChevronDown size={13} style={{ opacity: 0.5 }}/> : <ChevronRight size={13} style={{ opacity: 0.5 }}/>}
        </button>
      </div>

      {/* History content */}
      {historyOpen && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '4px 10px 0' }}>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 6 }}>
            <Search size={11} style={{
              position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)',
              color: 'var(--sidebar-text-dim)',
            }}/>
            <input
              placeholder="Search chats..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '6px 8px 6px 26px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--sidebar-border)',
                borderRadius: 7, fontSize: 11,
                color: 'var(--sidebar-text)', outline: 'none',
              }}
            />
          </div>

          {/* Session list */}
          <div className="sidebar-scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--sidebar-text-dim)', fontSize: 11, padding: '16px 8px' }}>
                No chats found
              </div>
            )}
            {filtered.map(s => (
              <div key={s.id}
                onClick={() => onSelect(s.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '7px 8px', borderRadius: 7, cursor: 'pointer',
                  background: s.id === activeId ? 'rgba(204,0,1,0.15)' : 'transparent',
                  marginBottom: 1,
                  border: s.id === activeId ? '1px solid rgba(204,0,1,0.3)' : '1px solid transparent',
                  transition: 'background 0.12s',
                  position: 'relative',
                }}
                onMouseEnter={e => { if (s.id !== activeId) e.currentTarget.style.background = 'var(--sidebar-hover)'; }}
                onMouseLeave={e => { if (s.id !== activeId) e.currentTarget.style.background = 'transparent'; }}
              >
                <MessageSquare size={12} style={{
                  color: s.id === activeId ? 'var(--red)' : 'var(--sidebar-text-dim)',
                  flexShrink: 0,
                }}/>

                <div style={{ flex: 1, minWidth: 0 }}>
                  {renaming === s.id ? (
                    <input autoFocus value={renameVal}
                      onChange={e => setRenameVal(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') commitRename(s.id); if (e.key === 'Escape') setRenaming(null); }}
                      onClick={e => e.stopPropagation()}
                      style={{
                        width: '100%', fontSize: 11, padding: '1px 4px',
                        background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(204,0,1,0.4)',
                        borderRadius: 4, color: '#fff', outline: 'none',
                      }}
                    />
                  ) : (
                    <div style={{
                      fontSize: 12,
                      color: s.id === activeId ? '#fff' : 'var(--sidebar-text)',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      fontWeight: s.id === activeId ? 500 : 400,
                    }}>
                      {s.title}
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: 'var(--sidebar-text-dim)' }}>
                    {s.messages.length} messages
                  </div>
                </div>

                {renaming === s.id ? (
                  <div style={{ display: 'flex', gap: 3 }} onClick={e => e.stopPropagation()}>
                    <button onClick={() => commitRename(s.id)} style={{ color: '#4ade80', padding: 2 }}><Check size={11}/></button>
                    <button onClick={() => setRenaming(null)} style={{ color: 'var(--sidebar-text-dim)', padding: 2 }}><X size={11}/></button>
                  </div>
                ) : deleteConfirm === s.id ? (
                  <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                    <button onClick={e => confirmDelete(s.id, e)} style={{ color: '#f87171', fontSize: 10, fontWeight: 600 }}>Del</button>
                    <button onClick={e => { e.stopPropagation(); setDeleteConfirm(null); }} style={{ color: 'var(--sidebar-text-dim)', fontSize: 10 }}>No</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', gap: 2 }}
                    className="session-actions"
                    onClick={e => e.stopPropagation()}
                  >
                    <button
                      onClick={e => startRename(s, e)}
                      style={{ padding: 3, color: 'var(--sidebar-text-dim)', borderRadius: 4, opacity: 0.7 }}
                      title="Rename"
                    ><Pencil size={10}/></button>
                    <button
                      onClick={e => { e.stopPropagation(); setDeleteConfirm(s.id); }}
                      style={{ padding: 3, color: 'var(--sidebar-text-dim)', borderRadius: 4, opacity: 0.7 }}
                      title="Delete"
                    ><Trash2 size={10}/></button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom: User profile */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid var(--sidebar-border)',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 700 }}>DR</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Dewi Rahayu</div>
            <div style={{ fontSize: 10, color: 'var(--sidebar-text-dim)' }}>Relationship Manager</div>
          </div>
        </div>
        <div style={{ marginTop: 8, fontSize: 9, color: 'var(--sidebar-text-dim)', textAlign: 'center' }}>
          CN-GPT v1.0 · Powered by AI CoE Team
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 10px', borderRadius: 8, cursor: 'pointer', marginBottom: 2,
      background: active ? 'var(--red)' : 'transparent',
      color: active ? '#fff' : 'var(--sidebar-text)',
      fontSize: 13, fontWeight: active ? 600 : 400,
      transition: 'background 0.12s',
    }}
      onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'var(--sidebar-hover)'; }}
      onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      <span style={{ opacity: active ? 1 : 0.7 }}>{icon}</span>
      {label}
    </div>
  );
}
