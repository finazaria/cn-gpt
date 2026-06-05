import React from 'react';
import { Building2, TrendingUp, AlertTriangle, Package, BarChart2, Calendar } from 'lucide-react';

const cards = [
  {
    icon: Building2,
    title: 'Company Overview',
    desc: 'Full profile, financials, and key metrics at a glance',
    prompt: 'Tell me about PT ABC',
    color: 'var(--red)',
    bg: 'var(--red-light)',
    border: 'var(--red-border)',
  },
  {
    icon: TrendingUp,
    title: 'Balance Trends',
    desc: 'Funding & lending trends with COBA analysis',
    prompt: 'Show funding & lending balance trend',
    color: 'var(--blue)',
    bg: 'var(--blue-bg)',
    border: 'var(--blue-border)',
  },
  {
    icon: AlertTriangle,
    title: 'Leakage Analysis',
    desc: 'CASA leakage rate and top flow destinations',
    prompt: 'Analyze leakage for PT ABC',
    color: 'var(--red-neg)',
    bg: 'var(--red-neg-bg)',
    border: 'var(--red-neg-border)',
  },
  {
    icon: Package,
    title: 'Product Holding',
    desc: 'Active products, gaps, and cross-sell opportunities',
    prompt: 'What products does PT ABC currently use?',
    color: 'var(--amber)',
    bg: 'var(--amber-bg)',
    border: 'var(--amber-border)',
  },
  {
    icon: BarChart2,
    title: 'Income Trend',
    desc: 'NII and NOII breakdown across 12 months',
    prompt: "How's the income trend?",
    color: 'var(--green)',
    bg: 'var(--green-bg)',
    border: 'var(--green-border)',
  },
  {
    icon: Calendar,
    title: 'Meeting Prep',
    desc: 'AI-curated brief with talking points for your visit',
    prompt: 'Prepare me for my customer meeting',
    color: '#6264A7',
    bg: '#f3f0ff',
    border: '#c4b5fd',
  },
];

export default function WelcomeScreen({ onSend }) {
  return (
    <div style={{
      flex: 1, overflowY: 'auto', padding: '40px 24px',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
    }}>
      {/* Hero */}
      <div style={{ textAlign: 'center', marginBottom: 36, maxWidth: 500 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: 'var(--red)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 16px', boxShadow: '0 8px 24px rgba(204,0,1,0.2)',
        }}>
          <span style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>CN</span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-1)', marginBottom: 8 }}>
          CN-GPT Data Analytics Agent
        </h1>
        <p style={{ fontSize: 14, color: 'var(--text-2)', lineHeight: 1.7 }}>
          Your AI-powered relationship intelligence tool for Business Banking.
          Ask about any customer's performance, trends, and opportunities.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 10,
          padding: '4px 14px', borderRadius: 20,
          background: 'var(--red-light)', border: '1px solid var(--red-border)',
          fontSize: 12, color: 'var(--red-dark)', fontWeight: 500,
        }}>
          Currently loaded: <strong>PT ABC Makmur Tbk</strong>
        </div>
      </div>

      {/* Capability cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12,
        maxWidth: 700, width: '100%',
      }}>
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <button key={i} onClick={() => onSend(c.prompt)} style={{
              textAlign: 'left', padding: '16px',
              background: '#fff', border: `1px solid var(--border)`,
              borderRadius: 12, cursor: 'pointer',
              transition: 'all 0.2s',
              animation: `fadeIn 0.4s ${i * 0.06}s both`,
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                e.currentTarget.style.borderColor = c.color;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'var(--border)';
              }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: c.bg, border: `1px solid ${c.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 10,
              }}>
                <Icon size={16} style={{ color: c.color }} />
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)', marginBottom: 4 }}>
                {c.title}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-3)', lineHeight: 1.5 }}>{c.desc}</div>
            </button>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div style={{ marginTop: 32, fontSize: 11, color: 'var(--text-3)', textAlign: 'center', maxWidth: 480 }}>
        🔒 This is a <strong>pilot mockup</strong> using demo data. All figures shown are for demonstration purposes.
        CIMB Niaga Business Banking · Data Analytics Agent v0.1
      </div>
    </div>
  );
}
