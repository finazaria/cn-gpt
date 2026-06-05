import React, { useState } from 'react';
import {
  Plus, Search, MessageSquare, Pencil, Trash2, Check, X, ChevronRight
} from 'lucide-react';

export default function Sidebar({ sessions, activeId, onNew, onSelect, onRename, onDelete, collapsed, onToggle }) {
  const [search, setSearch] = useState('');
  const [renaming, setRenaming] = useState(null);
  const [renameVal, setRenameVal] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const filtered = sessions.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  const startRename = (s, e) => {
    e.stopPropagation();
    setRenaming(s.id);
    setRenameVal(s.title);
  };

  const commitRename = (id) => {
    if (renameVal.trim()) onRename(id, renameVal.trim());
    setRenaming(null);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    setDeleteConfirm(id);
  };

  const confirmDelete = (id, e) => {
    e.stopPropagation();
    onDelete(id);
    setDeleteConfirm(null);
  };

  return (
    <aside style={{
      width: collapsed ? 0 : 260,
      minWidth: collapsed ? 0 : 260,
      background: '#fff',
      borderRight: `1px solid var(--border)`,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      transition: 'width 0.22s ease, min-width 0.22s ease',
      flexShrink: 0,
    }}>
      {/* Logo + New Chat */}
      <div style={{ padding: '16px 14px 10px', borderBottom: `1px solid var(--border)`, flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 30, height: 30, borderRadius: 8,
              background: 'var(--red)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ color: '#fff', fontSize: 11, fontWeight: 600, letterSpacing: 0.3 }}>CN</span>
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', lineHeight: 1.2 }}>CN-GPT</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', lineHeight: 1.2 }}>Data Analytics Agent</div>
            </div>
          </div>
        </div>

        <button onClick={onNew} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '8px 10px', borderRadius: 8,
          background: 'var(--red)', color: '#fff',
          fontSize: 13, fontWeight: 500,
          transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
        >
          <Plus size={15} />
          New Chat
        </button>
      </div>

      {/* Search */}
      <div style={{ padding: '10px 14px 8px', flexShrink: 0 }}>
        <div style={{ position: 'relative' }}>
          <Search size={13} style={{
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
            color: 'var(--text-3)',
          }} />
          <input
            placeholder="Search chats..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '7px 10px 7px 30px',
              border: `1px solid var(--border)`, borderRadius: 8,
              fontSize: 12, background: 'var(--bg-2)', color: 'var(--text-1)',
              outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Session list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 8px 12px' }}>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: 12, padding: '20px 8px' }}>
            No chats found
          </div>
        )}
        {filtered.map(s => (
          <div key={s.id}
            onClick={() => onSelect(s.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 8px', borderRadius: 8, cursor: 'pointer',
              background: s.id === activeId ? 'var(--red-light)' : 'transparent',
              marginBottom: 2,
              transition: 'background 0.12s',
              border: s.id === activeId ? `1px solid var(--red-border)` : '1px solid transparent',
            }}
            onMouseEnter={e => { if (s.id !== activeId) e.currentTarget.style.background = 'var(--bg-hover)'; }}
            onMouseLeave={e => { if (s.id !== activeId) e.currentTarget.style.background = 'transparent'; }}
          >
            <MessageSquare size={13} style={{
              color: s.id === activeId ? 'var(--red)' : 'var(--text-3)',
              flexShrink: 0,
            }} />

            <div style={{ flex: 1, minWidth: 0 }}>
              {renaming === s.id ? (
                <input
                  autoFocus
                  value={renameVal}
                  onChange={e => setRenameVal(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') commitRename(s.id);
                    if (e.key === 'Escape') setRenaming(null);
                  }}
                  onClick={e => e.stopPropagation()}
                  style={{
                    width: '100%', fontSize: 12, padding: '2px 4px',
                    border: `1px solid var(--red-border)`, borderRadius: 4,
                    outline: 'none', background: '#fff',
                  }}
                />
              ) : (
                <div style={{
                  fontSize: 12, fontWeight: s.id === activeId ? 500 : 400,
                  color: s.id === activeId ? 'var(--red-dark)' : 'var(--text-1)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {s.title}
                </div>
              )}
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>
                {s.messages.length} messages
              </div>
            </div>

            {renaming === s.id ? (
              <div style={{ display: 'flex', gap: 4 }}>
                <button onClick={e => { e.stopPropagation(); commitRename(s.id); }}
                  style={{ color: 'var(--green)', padding: 2 }}>
                  <Check size={12} />
                </button>
                <button onClick={e => { e.stopPropagation(); setRenaming(null); }}
                  style={{ color: 'var(--text-3)', padding: 2 }}>
                  <X size={12} />
                </button>
              </div>
            ) : deleteConfirm === s.id ? (
              <div style={{ display: 'flex', gap: 4 }} onClick={e => e.stopPropagation()}>
                <button onClick={e => confirmDelete(s.id, e)}
                  style={{ color: 'var(--red-neg)', fontSize: 10, fontWeight: 600 }}>
                  Del
                </button>
                <button onClick={e => { e.stopPropagation(); setDeleteConfirm(null); }}
                  style={{ color: 'var(--text-3)', fontSize: 10 }}>
                  No
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: 2, opacity: 0 }}
                className="session-actions"
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
              >
                <button onClick={e => startRename(s, e)} style={{ padding: 3, color: 'var(--text-3)', borderRadius: 4 }}
                  title="Rename">
                  <Pencil size={11} />
                </button>
                <button onClick={e => handleDelete(s.id, e)} style={{ padding: 3, color: 'var(--text-3)', borderRadius: 4 }}
                  title="Delete">
                  <Trash2 size={11} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        padding: '10px 14px', borderTop: `1px solid var(--border)`,
        fontSize: 11, color: 'var(--text-3)', flexShrink: 0,
      }}>
        CIMB Niaga · Business Banking
      </div>
    </aside>
  );
}
