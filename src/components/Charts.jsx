import React from 'react';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell, ReferenceLine,
} from 'recharts';

const RED = '#CC0001';
const RED2 = '#ff6666';
const NAVY = '#003366';
const BLUE = '#2563eb';
const GREEN = '#16a34a';
const AMBER = '#d97706';
const GRAY = '#94a3b8';

function fmt(v) {
  if (v >= 1000) return `${(v/1000).toFixed(1)}T`;
  return `${v}B`;
}

const tooltipStyle = {
  background: '#fff',
  border: '1px solid #e8eaee',
  borderRadius: 8,
  fontSize: 12,
  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
};

const CustomTooltip = ({ active, payload, label, prefix = 'Rp ', suffix = 'M' }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={tooltipStyle}>
      <div style={{ padding: '6px 10px', borderBottom: '1px solid #f0f0f0', fontWeight: 600, fontSize: 12 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ padding: '4px 10px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: 2, background: p.color, display: 'inline-block' }} />
          <span style={{ color: '#4b5568', fontSize: 11 }}>{p.name}:</span>
          <span style={{ fontWeight: 600, fontSize: 11 }}>{prefix}{p.value?.toLocaleString()}{suffix}</span>
        </div>
      ))}
    </div>
  );
};

// ─── Funding Trend Chart ────────────────────────────────────────────────────
export function FundingTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9aa3b2' }} />
        <YAxis tick={{ fontSize: 10, fill: '#9aa3b2' }} tickFormatter={v => `${(v/1000).toFixed(0)}T`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="avg" name="Avg Balance" fill={RED} radius={[3,3,0,0]} />
        <Bar dataKey="end" name="Ending Balance" fill="#ff9999" radius={[3,3,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Loan Trend Chart ───────────────────────────────────────────────────────
export function LoanTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="loanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={NAVY} stopOpacity={0.15} />
            <stop offset="95%" stopColor={NAVY} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9aa3b2' }} />
        <YAxis tick={{ fontSize: 10, fill: '#9aa3b2' }} tickFormatter={v => `${(v/1000).toFixed(0)}T`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Area dataKey="os" name="OS Loan" stroke={NAVY} fill="url(#loanGrad)" strokeWidth={2} dot={false} />
        <Line dataKey="avg" name="Avg Loan" stroke={BLUE} strokeWidth={1.5} dot={false} strokeDasharray="4 2" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Income Trend Chart ─────────────────────────────────────────────────────
export function IncomeTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9aa3b2' }} />
        <YAxis tick={{ fontSize: 10, fill: '#9aa3b2' }} tickFormatter={v => `${v}M`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="fundingNII" name="Funding NII" stackId="a" fill={RED} radius={[0,0,0,0]} />
        <Bar dataKey="loanNII" name="Loan NII" stackId="a" fill={NAVY} radius={[0,0,0,0]} />
        <Bar dataKey="noii" name="NOII" stackId="a" fill={AMBER} radius={[3,3,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Income Pie Chart ───────────────────────────────────────────────────────
export function IncomePieChart({ fundingNII, loanNII, noii }) {
  const data = [
    { name: 'Funding NII', value: fundingNII, color: RED },
    { name: 'Loan NII', value: loanNII, color: NAVY },
    { name: 'NOII', value: noii, color: AMBER },
  ];
  const total = fundingNII + loanNII + noii;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={38} outerRadius={60}
            dataKey="value" stroke="none">
            {data.map((d, i) => <Cell key={i} fill={d.color} />)}
          </Pie>
          <Tooltip formatter={(v) => [`Rp ${v.toLocaleString()}M`, '']} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ flex: 1 }}>
        {data.map((d, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 12, color: 'var(--text-2)' }}>{d.name}</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Rp {d.value.toLocaleString()}M</span>
            <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 32, textAlign: 'right' }}>
              {Math.round(d.value / total * 100)}%
            </span>
          </div>
        ))}
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Total</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: RED }}>Rp {total.toLocaleString()}M</span>
        </div>
      </div>
    </div>
  );
}

// ─── Leakage Chart ──────────────────────────────────────────────────────────
export function LeakageTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9aa3b2' }} />
        <YAxis tick={{ fontSize: 10, fill: '#9aa3b2' }} tickFormatter={v => `${(v/1000).toFixed(0)}T`} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="incoming" name="Incoming" fill={GREEN} radius={[3,3,0,0]} />
        <Bar dataKey="outgoing" name="Outgoing" fill={RED} radius={[3,3,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Leakage Donut ──────────────────────────────────────────────────────────
export function LeakageDonut({ incoming, outgoing }) {
  const data = [
    { name: 'Retained', value: incoming - outgoing, color: GREEN },
    { name: 'Leaked', value: outgoing, color: RED },
  ];
  return (
    <ResponsiveContainer width={120} height={120}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={34} outerRadius={52}
          dataKey="value" stroke="none" startAngle={90} endAngle={-270}>
          {data.map((d, i) => <Cell key={i} fill={d.color} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

// ─── Ending Balance Only Bar Chart (v5 revision: avg removed) ───────────────
export function EndingBalanceBarChart({ data, tooltipContent }) {
  const fmtAxis = (v) => {
    if (v >= 1000000) return `${(v/1000000).toFixed(0)}Tn`;
    if (v >= 1000) return `${(v/1000).toFixed(0)}Bn`;
    return `${v}Mn`;
  };
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9aa3b2' }} />
        <YAxis tick={{ fontSize: 10, fill: '#9aa3b2' }} tickFormatter={fmtAxis} />
        <Tooltip content={tooltipContent}/>
        <Bar dataKey="end" name="Ending Balance" fill={RED} radius={[3,3,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
