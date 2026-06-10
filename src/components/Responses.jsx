import React from 'react';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  ArrowUpRight, ArrowDownRight, Package, Zap, Target,
  Users, Building2, Calendar, Star, ChevronRight, ShieldX,
  Network, ExternalLink, ChevronDown, Wifi, WifiOff, Activity,
} from 'lucide-react';
import { ecosystemData, ECOWEB_URL } from '../data/mockData.js';
import { fmtIDR, fmtIDRBn, fmtPct } from '../utils/format.js';
import {
  FundingTrendChart, LoanTrendChart, IncomeTrendChart,
  IncomePieChart, LeakageTrendChart, LeakageDonut,
  EndingBalanceBarChart,
} from './Charts.jsx';

// ─── Shared UI primitives ────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: '#fff', border: '1px solid var(--border)',
      borderRadius: 12, padding: '14px 16px', ...style,
    }}>{children}</div>
  );
}

function SectionTitle({ icon: Icon, children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 12 }}>
      {Icon && <Icon size={14} style={{ color: 'var(--red)' }}/>}
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {children}
      </span>
    </div>
  );
}

function MetricCard({ label, value, sub, trend }) {
  const up = trend === 'up';
  const down = trend === 'down';
  return (
    <div style={{ background: 'var(--bg-2)', borderRadius: 10, padding: '12px 14px', border: '1px solid var(--border)' }}>
      <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', lineHeight: 1.2 }}>{value}</div>
      {sub && (
        <div style={{ fontSize: 11, marginTop: 4, display: 'flex', alignItems: 'center', gap: 3,
          color: up ? 'var(--green)' : down ? 'var(--red-neg)' : 'var(--text-3)' }}>
          {up && <ArrowUpRight size={11}/>}
          {down && <ArrowDownRight size={11}/>}
          {sub}
        </div>
      )}
    </div>
  );
}

function Badge({ children, color = 'default' }) {
  const styles = {
    default: { bg: 'var(--bg-3)', color: 'var(--text-2)', border: 'var(--border)' },
    red:    { bg: 'var(--red-light)', color: 'var(--red-dark)', border: 'var(--red-border)' },
    green:  { bg: 'var(--green-bg)', color: 'var(--green)', border: 'var(--green-border)' },
    amber:  { bg: 'var(--amber-bg)', color: 'var(--amber)', border: 'var(--amber-border)' },
    blue:   { bg: 'var(--blue-bg)', color: 'var(--blue)', border: 'var(--blue-border)' },
  };
  const s = styles[color] || styles.default;
  return (
    <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}` }}>{children}</span>
  );
}

function PriorityDot({ p }) {
  const c = p === 'high' ? 'var(--red-neg)' : p === 'medium' ? 'var(--amber)' : 'var(--green)';
  return <span style={{ width: 7, height: 7, borderRadius: '50%', background: c, display: 'inline-block', flexShrink: 0, marginTop: 5 }}/>;
}

// ═══════════════════════════════════════════════════════════════════════════
// ACCESS DENIED
// ═══════════════════════════════════════════════════════════════════════════
export function AccessDenied({ attemptedCompany }) {
  return (
    <div style={{ padding: '8px 0' }}>
      <div style={{
        padding: '16px', borderRadius: 12,
        background: 'var(--red-neg-bg)', border: '1px solid var(--red-neg-border)',
        display: 'flex', gap: 12, alignItems: 'flex-start',
      }}>
        <ShieldX size={20} style={{ color: 'var(--red-neg)', flexShrink: 0, marginTop: 2 }}/>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--red-neg)', marginBottom: 4 }}>
            Access Denied
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.7 }}>
            I'm sorry, but you don't have access to information about <strong>{attemptedCompany}</strong>.
          </div>
          <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 6 }}>
            You can only query companies assigned to your RM portfolio. Please select one of your accessible clients from the company selector.
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Q1: Company Overview
// ═══════════════════════════════════════════════════════════════════════════

// MOCA badge helper
function MocaBadge({ moca }) {
  const map = {
    MOCA:  { label: 'MOCA', bg: 'var(--green-bg)', color: 'var(--green)', border: 'var(--green-border)', title: 'Main Operating Account' },
    OCA:   { label: 'OCA',  bg: 'var(--amber-bg)', color: 'var(--amber)', border: 'var(--amber-border)', title: 'Operating Account' },
    NOCA:  { label: 'NOCA', bg: 'var(--red-neg-bg)', color: 'var(--red-neg)', border: 'var(--red-neg-border)', title: 'Non Operating Account' },
  };
  const s = map[moca] || map.NOCA;
  return (
    <span title={s.title} style={{
      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
      background: s.bg, color: s.color, border: `1px solid ${s.border}`,
    }}>{s.label}</span>
  );
}

// BizChannel badge helper
function BizChannelBadge({ status }) {
  const active = status === 'ACTIVE';
  return (
    <span title="BizChannel Digital Banking" style={{
      fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 20,
      background: active ? 'var(--blue-bg)' : 'var(--bg-3)',
      color: active ? 'var(--blue)' : 'var(--text-3)',
      border: `1px solid ${active ? 'var(--blue-border)' : 'var(--border)'}`,
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>
      BizChannel {status}
    </span>
  );
}

export function CompanyOverview({ progress, companyData }) {
  const show = (t) => progress >= t;
  const { company, fundingLoan, income, products, findings } = companyData;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {show(0.05) && (
        <Card style={{ borderLeft: '4px solid var(--red)' }} className="fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 10, background: 'var(--red)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, color: '#fff', fontSize: 13, fontWeight: 700,
              }}>{company.name.split(' ').slice(1,3).map(w=>w[0]).join('')}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{company.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', marginTop: 2 }}>
                  CIF: {company.cif} &nbsp;·&nbsp; {company.segment}
                </div>
                {/* Tag order (UI/UX best practice: identity → status → behaviour → engagement → tenure) */}
                <div style={{ display: 'flex', gap: 6, marginTop: 7, flexWrap: 'wrap', alignItems: 'center' }}>
                  {/* 1. ETB/NTB — relationship identity */}
                  <Badge color="green">ETB</Badge>
                  {/* 2. CIF status — account health */}
                  <Badge color={company.cifStatus === 'ACTIVE' ? 'green' : 'red'}>
                    CIF {company.cifStatus}
                  </Badge>
                  {/* 3. MOCA — transactional behaviour */}
                  <MocaBadge moca={company.moca}/>
                  {/* 4. BizChannel — digital engagement */}
                  <BizChannelBadge status={company.bizChannel}/>
                  {/* 5. Customer since — tenure (last, least urgent) */}
                  <span style={{
                    fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 20,
                    background: 'var(--bg-3)', color: 'var(--text-2)', border: '1px solid var(--border)',
                  }}>Customer Since {company.since}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Team Head</div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{company.th}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 4 }}>Relationship Manager</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--red)' }}>{company.rm}</div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)' }}>
            <div style={{ fontSize: 12 }}><span style={{ color: 'var(--text-3)' }}>Group: </span>{company.group}</div>
            <div style={{ fontSize: 12 }}><span style={{ color: 'var(--text-3)' }}>Industry: </span>{company.industry}</div>
          </div>
        </Card>
      )}
      {show(0.2) && (
        <div className="fade-in">
          <SectionTitle icon={TrendingUp}>Key Financial Metrics</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <MetricCard label="Avg Funding Balance" value={fmtIDR(fundingLoan.fundingAvg)} sub={`+${fundingLoan.fundingYoY}% YoY`} trend="up"/>
            <MetricCard label="OS Loan Balance" value={fmtIDR(fundingLoan.loanOS)} sub={`${fundingLoan.loanYoY}% YoY`} trend={fundingLoan.loanYoY >= 0 ? 'up' : 'down'}/>
            <MetricCard label="Total Income (YTD)" value={fmtIDR(income.total)} sub={`+${income.yoy}% YoY`} trend="up"/>
          </div>
        </div>
      )}
      {show(0.4) && (
        <Card className="fade-in">
          <SectionTitle icon={Target}>Income Breakdown (Dec 2024)</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 12 }}>
            <MetricCard label="Funding NII" value={fmtIDR(income.fundingNII)} sub={`${Math.round(income.fundingNII/income.total*100)}% of total`}/>
            <MetricCard label="Loan NII" value={fmtIDR(income.loanNII)} sub={`${Math.round(income.loanNII/income.total*100)}% of total`}/>
            <MetricCard label="NOII" value={fmtIDR(income.noii)} sub={`${Math.round(income.noii/income.total*100)}% of total`}/>
          </div>
          <IncomePieChart fundingNII={income.fundingNII} loanNII={income.loanNII} noii={income.noii}/>
        </Card>
      )}
      {show(0.6) && (
        <Card className="fade-in">
          <SectionTitle icon={Package}>Product Holding ({products.total} Active)</SectionTitle>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {products.active.map((p, i) => (
              <span key={i} style={{
                fontSize: 11, padding: '4px 10px', borderRadius: 20,
                background: 'var(--red-light)', color: 'var(--red-dark)',
                border: '1px solid var(--red-border)', fontWeight: 500,
              }}>{p.name}</span>
            ))}
          </div>
          {products.inactive.length > 0 && (
            <div style={{ marginTop: 10, padding: '8px 10px', background: 'var(--bg-2)', borderRadius: 8 }}>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 4 }}>Not Yet Adopted (Opportunities)</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {products.inactive.map((p, i) => (
                  <span key={i} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 20, background: '#fff', color: 'var(--text-2)', border: '1px solid var(--border)' }}>{p.name}</span>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
      {show(0.8) && (
        <Card style={{ borderTop: '3px solid var(--red)' }} className="fade-in">
          <SectionTitle icon={Zap}>Top 3 AI-Generated Findings</SectionTitle>
          {findings.map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: i < findings.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <PriorityDot p={f.priority}/>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3, flexWrap: 'wrap' }}>
                  <Badge color={f.priority === 'high' ? 'red' : f.priority === 'medium' ? 'amber' : 'green'}>{f.category}</Badge>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{f.title}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6 }}>{f.detail}</div>
                <div style={{ fontSize: 11, marginTop: 6, color: 'var(--red)', fontWeight: 500 }}>→ {f.action}</div>
              </div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Q2: Funding & Lending Balance Trend
// ═══════════════════════════════════════════════════════════════════════════
export function FundingLendingTrend({ progress, companyData }) {
  const show = (t) => progress >= t;
  const { fundingLoan } = companyData;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {show(0.05) && (
        <div className="fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <MetricCard label="Ending Funding Balance" value={fmtIDR(fundingLoan.fundingEnd)} sub={`+${fundingLoan.fundingYoY}% YoY`} trend="up"/>
            <MetricCard label="Avg Funding Balance" value={fmtIDR(fundingLoan.fundingAvg)} sub="Dec 2026"/>
            <MetricCard label="Funding vs Loan Ratio" value={`${Math.round(fundingLoan.fundingAvg/fundingLoan.loanOS*100)}:100`} sub="CASA to Loan coverage"/>
          </div>
        </div>
      )}
      {show(0.2) && (
        <Card className="fade-in">
          <SectionTitle icon={TrendingUp}>Funding Balance Trend (Jan – Dec 2026)</SectionTitle>
          {/* Ending balance only chart — avg removed per revision */}
          <EndingOnlyFundingChart data={fundingLoan.fundingTrend}/>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
            {[{ label: '3M Change', value: '+2.8%' }, { label: '6M Change', value: '+4.1%' }, { label: 'YoY Change', value: `+${fundingLoan.fundingYoY}%` }].map((m, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '8px', background: 'var(--green-bg)', borderRadius: 8, border: '1px solid var(--green-border)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{m.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--green)' }}>{m.value}</div>
              </div>
            ))}
          </div>
        </Card>
      )}
      {show(0.5) && (
        <div className="fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            <MetricCard label="OS Loan Balance" value={fmtIDR(fundingLoan.loanOS)} sub={`${fundingLoan.loanYoY}% YoY`} trend={fundingLoan.loanYoY >= 0 ? 'up' : 'down'}/>
            <MetricCard label="Average Loan" value={fmtIDR(fundingLoan.loanAvg)} sub="Dec 2026"/>
            <MetricCard label="Loan vs CASA" value={`${Math.round(fundingLoan.loanOS/fundingLoan.fundingAvg*100)}%`} sub="Loan/CASA multiplier"/>
          </div>
        </div>
      )}
      {show(0.65) && (
        <Card className="fade-in">
          <SectionTitle icon={TrendingDown}>Loan Balance Trend (Jan – Dec 2026)</SectionTitle>
          <LoanTrendChart data={fundingLoan.loanTrend}/>
          {fundingLoan.loanYoY < 0 && (
            <div style={{ marginTop: 10, padding: '10px 12px', background: 'var(--amber-bg)', borderRadius: 8, border: '1px solid var(--amber-border)', display: 'flex', gap: 8 }}>
              <AlertTriangle size={14} style={{ color: 'var(--amber)', marginTop: 2, flexShrink: 0 }}/>
              <div style={{ fontSize: 12, color: 'var(--amber)' }}>
                <strong>Watch:</strong> Loan OS declining {fundingLoan.loanYoY}% YoY. Risk of losing wallet share. Consider exploring working capital or revolving credit facility.
              </div>
            </div>
          )}
        </Card>
      )}
      {show(0.85) && (
        <Card style={{ background: 'var(--bg-2)' }} className="fade-in">
          <SectionTitle icon={Target}>COBA Analysis (CASA vs Loan)</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>CASA Coverage of Loan</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ flex: 1, height: 8, background: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${Math.min(100, Math.round(fundingLoan.fundingAvg/fundingLoan.loanOS*100))}%`, height: '100%', background: 'var(--red)', borderRadius: 4 }}/>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600 }}>{Math.round(fundingLoan.fundingAvg/fundingLoan.loanOS*100)}%</span>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-2)' }}>
                CASA covers {Math.round(fundingLoan.fundingAvg/fundingLoan.loanOS*100)}% of loan — <strong>Underbalanced</strong>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 6 }}>Alert Status</div>
              <Badge color="amber">Underbalanced</Badge>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 6 }}>Excess loan not backed by proportionate funding. Encourage CASA growth or offer deposit product.</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// Ending-balance-only funding chart (avg removed per v5 revision)
function EndingOnlyFundingChart({ data }) {
  return <_EndingChart data={data}/>;
}

function _EndingChart({ data }) {
  const CustomTip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:8, padding:'6px 10px', fontSize:12 }}>
        <div style={{ fontWeight:600, marginBottom:4 }}>{label}</div>
        <div>Ending Balance: <strong>{fmtIDR(payload[0]?.value)}</strong></div>
      </div>
    );
  };
  // recharts is imported at the module level via Charts.jsx re-exports below
  return (
    <EndingBalanceBarChart data={data} tooltipContent={<CustomTip/>}/>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Q3: Leakage Analysis
// ═══════════════════════════════════════════════════════════════════════════
export function LeakageAnalysis({ progress, companyData }) {
  const show = (t) => progress >= t;
  const { leakage } = companyData;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {show(0.05) && (
        <Card style={{ borderLeft: '4px solid var(--red-neg)' }} className="fade-in">
          <SectionTitle icon={AlertTriangle}>CASA Leakage Summary</SectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <LeakageDonut incoming={leakage.incoming} outgoing={leakage.outgoing}/>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
                <MetricCard label="Incoming Flow" value={fmtIDR(leakage.incoming)} sub="+8.7% MoM" trend="up"/>
                <MetricCard label="Outgoing Leakage" value={fmtIDR(leakage.outgoing)} sub="⚠️ Alert" trend="down"/>
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 10, background: 'var(--red-neg-bg)', border: '1px solid var(--red-neg-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--red-neg)' }}>{leakage.leakagePct}%</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-neg)' }}>CASA Leakage Rate</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>{fmtIDR(leakage.outgoing)}/month leaving CIMB Niaga</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
      {show(0.25) && (
        <Card className="fade-in">
          <SectionTitle>Leakage Trend (Last 6 Months)</SectionTitle>
          <LeakageTrendChart data={leakage.monthlyTrend}/>
        </Card>
      )}
      {show(0.5) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="fade-in">
          <Card>
            <SectionTitle icon={TrendingDown}>Top Outflow Destinations</SectionTitle>
            {leakage.topOutflow.map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < leakage.topOutflow.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 14 }}>#{item.rank}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--red-neg)' }}>{fmtIDR(item.amount)}</span>
                </div>
                <div style={{ height: 5, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: '100%', background: 'var(--red-neg)', borderRadius: 3 }}/>
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{item.pct}% of total outflow</div>
              </div>
            ))}
          </Card>
          <Card>
            <SectionTitle icon={TrendingUp}>Top Inflow Sources</SectionTitle>
            {leakage.topInflow.map((item, i) => (
              <div key={i} style={{ padding: '8px 0', borderBottom: i < leakage.topInflow.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 14 }}>#{item.rank}</span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</span>
                    {item.name === 'CIMB Niaga' && <Badge color="green">Internal</Badge>}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>{fmtIDR(item.amount)}</span>
                </div>
                <div style={{ height: 5, background: 'var(--bg-3)', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: '100%', background: 'var(--green)', borderRadius: 3 }}/>
                </div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{item.pct}% of total inflow</div>
              </div>
            ))}
          </Card>
        </div>
      )}
      {show(0.8) && (
        <Card style={{ background: 'var(--red-neg-bg)', border: '1px solid var(--red-neg-border)' }} className="fade-in">
          <div style={{ display: 'flex', gap: 10 }}>
            <Zap size={16} style={{ color: 'var(--red-neg)', flexShrink: 0, marginTop: 2 }}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--red-neg)', marginBottom: 4 }}>Action Recommendation</div>
              <div style={{ fontSize: 12, color: 'var(--text-1)', lineHeight: 1.7 }}>
                <strong>{leakage.topOutflow[0].name}</strong> is receiving <strong>{fmtIDR(leakage.topOutflow[0].amount)}/mo ({leakage.topOutflow[0].pct}%)</strong> of outflows. Propose <strong>Virtual Account consolidation</strong> and <strong>preferential FX rate</strong> to retain these flows.
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Q4: Product Holding
// ═══════════════════════════════════════════════════════════════════════════
export function ProductHolding({ progress, companyData }) {
  const show = (t) => progress >= t;
  const { products } = companyData;
  const categories = [...new Set(products.active.map(p => p.category))];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {show(0.05) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }} className="fade-in">
          <MetricCard label="Total Active Products" value={products.total} sub="Across all categories"/>
          <MetricCard label="Product Opportunities" value={products.inactive.length} sub="Products not yet held" trend="up"/>
        </div>
      )}
      {show(0.25) && (
        <Card className="fade-in">
          <SectionTitle icon={Package}>Active Product Holding</SectionTitle>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{cat}</div>
              {products.active.filter(p => p.category === cat).map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '8px 10px', background: 'var(--bg-2)', borderRadius: 8, marginBottom: 4, border: '1px solid var(--border)' }}>
                  <CheckCircle size={13} style={{ color: 'var(--green)', flexShrink: 0, marginRight: 10 }}/>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Customer Since {p.since}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Card>
      )}
      {show(0.7) && (
        <Card style={{ borderTop: '3px solid var(--amber)' }} className="fade-in">
          <SectionTitle icon={Star}>Product Opportunities</SectionTitle>
          {products.inactive.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '10px 12px', background: 'var(--amber-bg)', borderRadius: 8, marginBottom: 8, border: '1px solid var(--amber-border)' }}>
              <ChevronRight size={13} style={{ color: 'var(--amber)', flexShrink: 0, marginRight: 10 }}/>
              <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Q5: Income Trend
// ═══════════════════════════════════════════════════════════════════════════
export function IncomeTrend({ progress, companyData }) {
  const show = (t) => progress >= t;
  const { income } = companyData;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {show(0.05) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }} className="fade-in">
          <MetricCard label="Funding NII" value={`Rp ${income.fundingNII.toLocaleString()}M`} sub="+34% vs Jan" trend="up"/>
          <MetricCard label="Loan NII" value={`Rp ${income.loanNII.toLocaleString()}M`} sub="+19% vs Jan" trend="up"/>
          <MetricCard label="NOII" value={`Rp ${income.noii.toLocaleString()}M`} sub="+25% vs Jan" trend="up"/>
          <MetricCard label="Total Income" value={`Rp ${(income.total/1000).toFixed(1)}B`} sub={`+${income.yoy}% YoY`} trend="up"/>
        </div>
      )}
      {show(0.25) && (
        <Card className="fade-in">
          <SectionTitle icon={TrendingUp}>Income Trend — Stacked by Component (12M)</SectionTitle>
          <IncomeTrendChart data={income.trend}/>
        </Card>
      )}
      {show(0.55) && (
        <Card className="fade-in">
          <SectionTitle>Income Distribution — Current Month</SectionTitle>
          <IncomePieChart fundingNII={income.fundingNII} loanNII={income.loanNII} noii={income.noii}/>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// Q6: Meeting Prep
// ═══════════════════════════════════════════════════════════════════════════
export function MeetingPrep({ progress, companyData }) {
  const show = (t) => progress >= t;
  const { company, meetingPrep } = companyData;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {show(0.05) && (
        <Card style={{ borderLeft: '4px solid var(--red)', background: 'var(--red-light)' }} className="fade-in">
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--red-dark)', marginBottom: 6 }}>📋 Meeting Brief — {company.name}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <span style={{ fontSize: 12 }}>🏭 <strong>Industry:</strong> {meetingPrep.snapshot.industry}</span>
                <span style={{ fontSize: 12 }}>🏢 <strong>Group:</strong> {meetingPrep.snapshot.group}</span>
                <span style={{ fontSize: 12 }}>👤 <strong>RM:</strong> {meetingPrep.snapshot.rm}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 12, color: 'var(--text-2)' }}>
              <div>Last Meeting</div>
              <div style={{ fontWeight: 600 }}>{meetingPrep.snapshot.lastMeeting}</div>
            </div>
          </div>
        </Card>
      )}
      {show(0.2) && (
        <Card className="fade-in">
          <SectionTitle icon={TrendingUp}>Key Metrics Snapshot</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
            {meetingPrep.keyMetrics.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: 'var(--bg-2)', borderRadius: 8, border: '1px solid var(--border)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-2)' }}>{m.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: m.trend === 'up' ? 'var(--green)' : m.trend === 'down' ? 'var(--red-neg)' : 'var(--text-1)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  {m.trend === 'up' ? <ArrowUpRight size={12}/> : m.trend === 'down' ? <ArrowDownRight size={12}/> : null}
                  {m.value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}
      {show(0.4) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }} className="fade-in">
          <Card style={{ borderTop: '3px solid var(--red-neg)' }}>
            <SectionTitle icon={AlertTriangle}>Risks to Discuss</SectionTitle>
            {meetingPrep.risks.map((r, i) => (
              <div key={i} style={{ padding: '8px 10px', background: 'var(--red-neg-bg)', borderRadius: 8, border: '1px solid var(--red-neg-border)', marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-neg)' }}>{r.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{r.detail}</div>
              </div>
            ))}
          </Card>
          <Card style={{ borderTop: '3px solid var(--green)' }}>
            <SectionTitle icon={Star}>Opportunities to Pitch</SectionTitle>
            {meetingPrep.opportunities.map((o, i) => (
              <div key={i} style={{ padding: '8px 10px', background: 'var(--green-bg)', borderRadius: 8, border: '1px solid var(--green-border)', marginBottom: 6 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--green)' }}>{o.label}</div>
                <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{o.detail}</div>
              </div>
            ))}
          </Card>
        </div>
      )}
      {show(0.65) && (
        <Card style={{ borderTop: '3px solid var(--red)' }} className="fade-in">
          <SectionTitle icon={Users}>Suggested Talking Points</SectionTitle>
          {meetingPrep.talkingPoints.map((tp, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, padding: '9px 0', borderBottom: i < meetingPrep.talkingPoints.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'var(--red)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i + 1}</div>
              <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.6 }}>{tp}</div>
            </div>
          ))}
        </Card>
      )}
      {show(0.88) && (
        <Card style={{ background: 'var(--bg-2)' }} className="fade-in">
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            <Calendar size={16} style={{ color: 'var(--red)', marginTop: 2, flexShrink: 0 }}/>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>Before the Meeting</div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.7 }}>
                Review the latest leakage report · Confirm FX rates with Treasury · Print relevant product sheets · Check if MOCA target met this month · Prepare any term sheets for identified opportunities.
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ECOSYSTEM ANALYSIS
// ═══════════════════════════════════════════════════════════════════════════
function BankBar({ bank, amount, pct, isCIMB }) {
  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <span style={{ fontSize: 11, color: isCIMB ? 'var(--red)' : 'var(--text-2)', fontWeight: isCIMB ? 600 : 400 }}>
          {bank}{isCIMB ? ' ✦' : ''}
        </span>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>{pct}%</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-1)', minWidth: 70, textAlign: 'right' }}>
            IDR {amount >= 1000 ? `${(amount/1000).toFixed(1)}B` : `${amount}M`}
          </span>
        </div>
      </div>
      <div style={{ height: 4, background: 'var(--bg-3)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: isCIMB ? 'var(--red)' : 'var(--text-3)', borderRadius: 2, opacity: isCIMB ? 1 : 0.4 }}/>
      </div>
    </div>
  );
}

function CounterpartyRow({ item, isETB, displayRank }) {
  const [expanded, setExpanded] = React.useState(false);
  const badgeColor = isETB
    ? { bg: 'var(--green-bg)', color: 'var(--green)', border: 'var(--green-border)', label: 'ETB' }
    : { bg: 'var(--red-neg-bg)', color: 'var(--red-neg)', border: 'var(--red-neg-border)', label: 'Non-CIMB' };
  return (
    <div style={{
      border: '1px solid var(--border)', borderRadius: 10, marginBottom: 6, overflow: 'hidden',
      background: expanded ? 'var(--bg-2)' : '#fff',
      transition: 'background 0.15s',
    }}>
      <button
        onClick={() => setExpanded(p => !p)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 12px', background: 'transparent', cursor: 'pointer',
        }}
      >
        <span style={{ fontSize: 11, color: 'var(--text-3)', minWidth: 20, textAlign: 'right' }}>#{displayRank}</span>
        <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: 'var(--text-1)', textAlign: 'left' }}>
          {item.name}
        </span>
        <span style={{
          fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 20,
          background: badgeColor.bg, color: badgeColor.color, border: `1px solid ${badgeColor.border}`,
        }}>{badgeColor.label}</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 4 }}>
          {item.banks.length} banks
        </span>
        <ChevronDown size={12} style={{
          color: 'var(--text-3)', transform: expanded ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s',
        }}/>
      </button>

      {expanded && (
        <div style={{ padding: '0 12px 12px' }}>
          {/* Sender Bank column header */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 40px 90px',
            padding: '4px 8px 4px 28px',
            borderBottom: '1px solid var(--border)',
            marginBottom: 4,
          }}>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sender Bank</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', textAlign: 'right' }}>%</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', textAlign: 'right' }}>Amount</span>
          </div>
          {item.banks.map((b, i) => (
            <BankBar key={i} bank={b.bank} amount={b.amount} pct={b.pct}
              isCIMB={b.bank.toLowerCase().includes('cimb')}/>
          ))}
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 6, paddingLeft: 20 }}>
            ✦ CIMB Niaga share highlighted
          </div>
        </div>
      )}
    </div>
  );
}

function Top10Table({ data, title, isCollection, show }) {
  if (!show) return null;
  const allItems = [...data.etb, ...data.ntb];
  return (
    <Card className="fade-in" style={{ marginTop: 0 }}>
      <SectionTitle icon={isCollection ? TrendingUp : TrendingDown}>{title}</SectionTitle>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
          Click any row to see bank distribution. &nbsp;✦ = CIMB Niaga share
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)',
              background: 'var(--green-bg)', border: '1px solid var(--green-border)',
              padding: '2px 8px', borderRadius: 20 }}>ETB — Top 5</span>
            <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Existing to Bank</span>
          </div>
          {data.etb.map((item, i) => (
            <CounterpartyRow key={i} item={item} isETB={true} displayRank={i + 1}/>
          ))}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--red-neg)',
              background: 'var(--red-neg-bg)', border: '1px solid var(--red-neg-border)',
              padding: '2px 8px', borderRadius: 20 }}>Non-CIMB — Top 5</span>
            <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Not yet banking with CIMB</span>
          </div>
          {data.ntb.map((item, i) => (
            <CounterpartyRow key={i} item={item} isETB={false} displayRank={i + 1}/>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function EcosystemAnalysis({ progress, companyData }) {
  const show = (t) => progress >= t;
  const ecoData = ecosystemData[companyData?.company?.name?.toLowerCase().includes('astra') ? 'astra'
    : companyData?.company?.name?.toLowerCase().includes('kino') ? 'kino' : 'indofood'];

  if (!ecoData) return <div style={{ fontSize: 13, color: 'var(--text-2)' }}>Ecosystem data not available.</div>;

  const { summary, layers, top10Collection, top10Payment } = ecoData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

      {/* Section label */}
      {show(0.02) && (
        <div className="fade-in" style={{ fontSize: 10, color: 'var(--text-3)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          ECOSYSTEM AT A GLANCE · as per {summary.asOf}
        </div>
      )}

      {/* 6 KPI cards matching new EcoWeb design */}
      {show(0.05) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }} className="fade-in">
          {/* Total Members */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Total Members</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-1)' }}>{summary.totalMembers.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Across the full network</div>
          </div>
          {/* ETB Members */}
          <div style={{ background: '#fff', border: '1px solid var(--green-border)', borderRadius: 10, padding: '12px 14px', borderLeft: '4px solid var(--green)' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>ETB Members</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--green)' }}>{summary.etbMembers.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Already bank with CIMB</div>
          </div>
          {/* Non-CIMB Members */}
          <div style={{ background: '#fff', border: '1px solid var(--red-neg-border)', borderRadius: 10, padding: '12px 14px', borderLeft: '4px solid var(--red-neg)' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Non-CIMB Members</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--red-neg)' }}>{summary.nonCimbMembers.toLocaleString()}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Don't bank with CIMB yet</div>
          </div>
          {/* MOCA Status */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>MOCA Status</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
              <div>
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>{summary.mocaCount}</span>
                <span style={{ fontSize: 11, color: 'var(--green)', marginLeft: 4, fontWeight: 600 }}>MOCA</span>
              </div>
              <div>
                <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>{summary.nonMocaCount}</span>
                <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 4 }}>Non-MOCA</span>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Split by MOCA category</div>
          </div>
          {/* EOM CASA Balance */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>EOM · CASA Balance</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>{fmtIDRBn(summary.casaBalance)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Total CASA across the network</div>
          </div>
          {/* Revenue */}
          <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 14px' }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>Revenue</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-1)' }}>{fmtIDRBn(summary.revenue)}</div>
            <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 3 }}>Total Revenue across the network</div>
          </div>
        </div>
      )}

      {/* Layer Breakdown */}
      {show(0.2) && (
        <Card className="fade-in">
          <SectionTitle icon={Network}>Layer Breakdown</SectionTitle>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 8 }}>
            L0 to L3 · ETB / Non-CIMB · MOCA / Non-MOCA · CASA & Revenue
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: 'var(--bg-2)' }}>
                  {['Layer','Description','Total','ETB','Non-CIMB','MOCA','Non-MOCA','CASA','Revenue'].map(h => (
                    <th key={h} style={{
                      padding: '8px 8px', textAlign: h === 'Layer' || h === 'Description' ? 'left' : 'right',
                      fontWeight: 600, color: 'var(--text-2)', fontSize: 10, borderBottom: '1px solid var(--border)',
                      whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {layers.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i === 0 ? 'var(--red-light)' : '#fff' }}>
                    <td style={{ padding: '8px 8px', fontWeight: 700, color: 'var(--red)', fontSize: 12 }}>{row.layer}</td>
                    <td style={{ padding: '8px 8px', color: 'var(--text-2)', fontSize: 11 }}>{row.desc}</td>
                    <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 600 }}>{row.total.toLocaleString()}</td>
                    <td style={{ padding: '8px 8px', textAlign: 'right' }}>
                      <span style={{ color: 'var(--green)', fontWeight: 600, background: 'var(--green-bg)', padding: '2px 5px', borderRadius: 4, fontSize: 11 }}>{row.etb}</span>
                    </td>
                    <td style={{ padding: '8px 8px', textAlign: 'right' }}>
                      <span style={{ color: 'var(--red-neg)', fontWeight: 600, background: 'var(--red-neg-bg)', padding: '2px 5px', borderRadius: 4, fontSize: 11 }}>{row.nonCimb}</span>
                    </td>
                    <td style={{ padding: '8px 8px', textAlign: 'right', fontWeight: 500, color: 'var(--green)' }}>{row.moca}</td>
                    <td style={{ padding: '8px 8px', textAlign: 'right', color: 'var(--text-2)' }}>{row.nonMoca}</td>
                    <td style={{ padding: '8px 8px', textAlign: 'right', color: 'var(--text-1)', fontSize: 11 }}>{fmtIDRBn(row.casa)}</td>
                    <td style={{ padding: '8px 8px', textAlign: 'right', color: 'var(--text-1)', fontSize: 11 }}>{fmtIDRBn(row.revenue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Top 10 Collection */}
      {show(0.45) && (
        <Top10Table data={top10Collection} title="Top 10 Collection Counterparties" isCollection={true} show={true}/>
      )}

      {/* Top 10 Payment */}
      {show(0.7) && (
        <Top10Table data={top10Payment} title="Top 10 Payment Counterparties" isCollection={false} show={true}/>
      )}

      {/* EcoWeb redirect CTA */}
      {show(0.9) && (
        <Card style={{
          background: 'linear-gradient(135deg, #1a1d23 0%, #2d3142 100%)',
          border: 'none', color: '#fff',
        }} className="fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(204,0,1,0.8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Network size={18} style={{ color: '#fff' }}/>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>
                  Explore the Full Ecosystem Network
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
                  View detailed transaction network graphs, counterparty relationships, and NTB acquisition leads via the EcoWeb Intelligence Portal.
                </div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginTop: 4 }}>
                  ETB/NTB data shown above is a summary view only. Full analysis available in EcoWeb.
                </div>
              </div>
            </div>
            <a
              href={ECOWEB_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', borderRadius: 10,
                background: 'var(--red)', color: '#fff',
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
                flexShrink: 0,
                transition: 'background 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--red-dark)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}
            >
              Open EcoWeb Graph
              <ExternalLink size={14}/>
            </a>
          </div>
        </Card>
      )}
    </div>
  );
}
export function UnknownResponse({ companyData }) {
  const name = companyData?.company?.name || 'the selected company';
  const suggestions = [
    `Tell me about ${name}`,
    `Show funding & lending balance trend for ${name}`,
    `Analyze leakage for ${name}`,
    `What products does ${name} currently use?`,
    `Prepare me for my customer meeting with ${name}`,
  ];
  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ fontSize: 14, color: 'var(--text-1)', marginBottom: 12 }}>
        I didn't quite catch that. Here are some questions I can help with for <strong>{name}</strong>:
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {suggestions.map((s, i) => (
          <div key={i} style={{ padding: '8px 12px', background: 'var(--bg-2)', borderRadius: 8, border: '1px solid var(--border)', fontSize: 13, color: 'var(--text-2)' }}>
            → {s}
          </div>
        ))}
      </div>
    </div>
  );
}

// Ecosystem follow-up redirect (for further ecosystem questions)
export function EcosystemRedirect() {
  return (
    <div style={{ padding: '4px 0' }}>
      <div style={{ padding: '14px 16px', borderRadius: 12, background: '#f3f0ff', border: '1px solid #c4b5fd' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#6264A7', marginBottom: 6 }}>
          🌐 For More Ecosystem Details — Visit EcoWeb
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-1)', lineHeight: 1.7, marginBottom: 10 }}>
          To gain more detailed information about this client's ecosystem — including full network graphs, 
          transaction flows, and NTB acquisition leads — please visit the <strong>EcoWeb Intelligence Portal</strong>.
        </div>
        <a
          href={ECOWEB_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '8px 16px', borderRadius: 8,
            background: '#6264A7', color: '#fff',
            fontSize: 12, fontWeight: 600, textDecoration: 'none',
          }}
        >
          Open EcoWeb Portal
          <ExternalLink size={12}/>
        </a>
      </div>
    </div>
  );
}
