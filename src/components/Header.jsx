import React from 'react';
import { Plus } from 'lucide-react';

export default function Header({ currentCompany, onNew }) {
  return (
    <header style={{
      height: 54, background: 'var(--topbar-bg)',
      borderBottom: '1px solid var(--topbar-border)',
      display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: 12, flexShrink: 0,
      position: 'relative', zIndex: 50,
    }}>
      {/* CIMB Niaga logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{
            width: 20, height: 20, borderRadius: 4, background: 'var(--red)',
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
            {currentCompany ? currentCompany.name : 'Data Analytics Agent'}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-3)', lineHeight: 1.2 }}>CN-GPT AI Assistant v1.0</div>
        </div>
      </div>

      <div style={{ flex: 1 }}/>

      {/* Right side — New Chat + user */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button onClick={onNew} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '6px 14px', borderRadius: 8,
          background: 'var(--red)', color: '#fff',
          fontSize: 12, fontWeight: 600, transition: 'background 0.15s',
        }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
        >
          <Plus size={13}/> New Chat
        </button>

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
    </header>
  );
}
