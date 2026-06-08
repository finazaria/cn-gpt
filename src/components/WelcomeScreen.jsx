import React from 'react';
import { Building2, TrendingUp, AlertTriangle, Package, BarChart2, Calendar, Lock } from 'lucide-react';
import { CARD_DEFINITIONS } from '../utils/matcher.js';
import { CARD_CONFIG } from '../data/mockData.js';

const ICON_MAP = {
  building: Building2,
  'trending-up': TrendingUp,
  'alert-triangle': AlertTriangle,
  package: Package,
  'bar-chart': BarChart2,
  calendar: Calendar,
};

export default function WelcomeScreen({ onSend, company }) {
  if (!company) return null;

  const cardConfig = CARD_CONFIG[company.id] || {};

  return (
    <div style={{
      flex: 1, overflowY: 'auto', padding: '32px 24px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      background: 'var(--bg)',
    }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 28, maxWidth: 560 }}>
        {/* Mascot / avatar area */}
        <div style={{
          width: 64, height: 64, borderRadius: 18, background: 'var(--red)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 14px',
          boxShadow: '0 8px 28px rgba(204,0,1,0.18)',
        }}>
          <span style={{ color: '#fff', fontSize: 22, fontWeight: 800 }}>CN</span>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)', marginBottom: 6 }}>
          CN-GPT Data Analytics Agent
        </h2>
        <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7, marginBottom: 12 }}>
          Your AI-powered relationship intelligence tool for Business Banking.<br/>
          Ask about your customer's performance, trends, and opportunities.
        </p>

        {/* Selected company badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px', borderRadius: 20,
          background: 'var(--red-light)', border: '1.5px solid var(--red-border)',
          fontSize: 12, color: 'var(--red-dark)', fontWeight: 500,
        }}>
          <Building2 size={13}/>
          Currently loaded: <strong>{company.name}</strong>
        </div>
      </div>

      {/* Capability cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        maxWidth: 720, width: '100%', marginBottom: 20,
      }}>
        {CARD_DEFINITIONS.map((card, i) => {
          const Icon = ICON_MAP[card.icon] || Building2;
          const enabled = cardConfig[card.key] !== false;

          return (
            <button
              key={card.key}
              onClick={() => enabled && onSend(card.prompt(company.name))}
              disabled={!enabled}
              style={{
                textAlign: 'left', padding: '16px',
                background: enabled ? '#fff' : 'var(--bg-2)',
                border: `1px solid ${enabled ? 'var(--border)' : 'var(--border)'}`,
                borderRadius: 12,
                cursor: enabled ? 'pointer' : 'not-allowed',
                opacity: enabled ? 1 : 0.55,
                transition: 'all 0.2s',
                animation: `fadeIn 0.4s ${i * 0.06}s both`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                if (enabled) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = card.color;
                }
              }}
              onMouseLeave={e => {
                if (enabled) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }
              }}
            >
              {/* Disabled badge */}
              {!enabled && (
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  display: 'flex', alignItems: 'center', gap: 3,
                  fontSize: 9, fontWeight: 600, color: 'var(--text-3)',
                  background: 'var(--bg-3)', padding: '2px 6px', borderRadius: 20,
                  border: '1px solid var(--border)',
                }}>
                  <Lock size={8}/> Coming Soon
                </div>
              )}

              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: enabled ? card.bg : 'var(--bg-3)',
                border: `1px solid ${enabled ? card.border : 'var(--border)'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10,
              }}>
                <Icon size={16} style={{ color: enabled ? card.color : 'var(--text-3)' }}/>
              </div>
              <div style={{
                fontSize: 13, fontWeight: 600,
                color: enabled ? 'var(--text-1)' : 'var(--text-3)', marginBottom: 4,
              }}>
                {card.label}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>
                {enabled ? card.desc : 'Data not yet available for this company'}
              </div>
            </button>
          );
        })}
      </div>

      {/* General chat hint */}
      <div style={{
        maxWidth: 720, width: '100%',
        padding: '12px 16px',
        background: '#fff',
        border: '1px solid var(--border)',
        borderRadius: 10,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 12, color: 'var(--text-2)',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8, background: 'var(--red-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <span style={{ fontSize: 13 }}>💬</span>
        </div>
        <span>
          Or <strong>type any question</strong> in the chat box below — the agent will identify and answer based on {company.name}'s data.
        </span>
      </div>

      <div style={{ marginTop: 20, fontSize: 11, color: 'var(--text-3)', textAlign: 'center' }}>
        🔒 Pilot mockup — all figures are for demonstration purposes only
      </div>
    </div>
  );
}
