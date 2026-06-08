import React from 'react';
import {
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle,
  ArrowUpRight, ArrowDownRight, Package, Zap, Target,
  Users, Building2, Calendar, Star, ChevronRight, ShieldX,
  Network, ExternalLink, ChevronDown,
} from 'lucide-react';
import { ecosystemData, ECOWEB_URL } from '../data/mockData.js';
import {
  FundingTrendChart, LoanTrendChart, IncomeTrendChart,
  IncomePieChart, LeakageTrendChart, LeakageDonut,
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
                <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                  <Badge color="green">ETB</Badge>
                  <Badge color="green">CIF Active</Badge>
                  <Badge color="blue">{company.industry.split(' ')[0]}</Badge>
                  <Badge color="default">Since {company.since}</Badge>
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
            <MetricCard label="Avg Funding Balance" value={`Rp ${(fundingLoan.fundingAvg/1000).toFixed(1)}B`} sub={`+${fundingLoan.fundingYoY}% YoY`} trend="up"/>
            <MetricCard label="OS Loan Balance" value={`Rp ${(fundingLoan.loanOS/1000).toFixed(1)}B`} sub={`${fundingLoan.loanYoY}% YoY`} trend={fundingLoan.loanYoY >= 0 ? 'up' : 'down'}/>
            <MetricCard label="Total Income (YTD)" value={`Rp ${(income.total/1000).toFixed(1)}B`} sub={`+${income.yoy}% YoY`} trend="up"/>
          </div>
        </div>
      )}
      {show(0.4) && (
        <Card className="fade-in">
          <SectionTitle icon={Target}>Income Breakdown (Dec 2024)</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 12 }}>
            <MetricCard label="Funding NII" value={`Rp ${income.fundingNII.toLocaleString()}M`} sub={`${Math.round(income.fundingNII/income.total*100)}% of total`}/>
            <MetricCard label="Loan NII" value={`Rp ${income.loanNII.toLocaleString()}M`} sub={`${Math.round(income.loanNII/income.total*100)}% of total`}/>
            <MetricCard label="NOII" value={`Rp ${income.noii.toLocaleString()}M`} sub={`${Math.round(income.noii/income.total*100)}% of total`}/>
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
            <MetricCard label="Avg Funding Balance" value={`Rp ${(fundingLoan.fundingAvg/1000).toFixed(1)}B`} sub={`+${fundingLoan.fundingYoY}% YoY`} trend="up"/>
            <MetricCard label="Ending Funding Balance" value={`Rp ${(fundingLoan.fundingEnd/1000).toFixed(1)}B`} sub="Dec 2024" trend="up"/>
            <MetricCard label="Funding vs Loan Ratio" value={`${Math.round(fundingLoan.fundingAvg/fundingLoan.loanOS*100)}:100`} sub="CASA to Loan coverage"/>
          </div>
        </div>
      )}
      {show(0.2) && (
        <Card className="fade-in">
          <SectionTitle icon={TrendingUp}>Funding Balance Trend (Jan – Dec 2024)</SectionTitle>
          <FundingTrendChart data={fundingLoan.fundingTrend}/>
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
            <MetricCard label="OS Loan Balance" value={`Rp ${(fundingLoan.loanOS/1000).toFixed(1)}B`} sub={`${fundingLoan.loanYoY}% YoY`} trend={fundingLoan.loanYoY >= 0 ? 'up' : 'down'}/>
            <MetricCard label="Average Loan" value={`Rp ${(fundingLoan.loanAvg/1000).toFixed(1)}B`} sub="Dec 2024"/>
            <MetricCard label="Loan vs CASA" value={`${Math.round(fundingLoan.loanOS/fundingLoan.fundingAvg*100)}%`} sub="Loan/CASA multiplier"/>
          </div>
        </div>
      )}
      {show(0.65) && (
        <Card className="fade-in">
          <SectionTitle icon={TrendingDown}>Loan Balance Trend (Jan – Dec 2024)</SectionTitle>
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
                <MetricCard label="Incoming Flow" value={`Rp ${(leakage.incoming/1000).toFixed(1)}B`} sub="+8.7% MoM" trend="up"/>
                <MetricCard label="Outgoing Leakage" value={`Rp ${(leakage.outgoing/1000).toFixed(1)}B`} sub="⚠️ Alert" trend="down"/>
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 10, background: 'var(--red-neg-bg)', border: '1px solid var(--red-neg-border)', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--red-neg)' }}>{leakage.leakagePct}%</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--red-neg)' }}>CASA Leakage Rate</div>
                  <div style={{ fontSize: 11, color: 'var(--text-2)' }}>Rp {(leakage.outgoing/1000).toFixed(1)}B/month leaving CIMB Niaga</div>
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
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--red-neg)' }}>Rp {item.amount.toLocaleString()}M</span>
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
                    {item.name === 'Internal CIMB' && <Badge color="green">Internal</Badge>}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>Rp {item.amount.toLocaleString()}M</span>
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
                <strong>{leakage.topOutflow[0].name}</strong> is receiving <strong>Rp {leakage.topOutflow[0].amount.toLocaleString()}M/mo ({leakage.topOutflow[0].pct}%)</strong> of outflows. Propose <strong>Virtual Account consolidation</strong> and <strong>preferential FX rate</strong> to retain these flows.
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }} className="fade-in">
          <MetricCard label="Total Active Products" value={products.total} sub="Across all categories"/>
          <MetricCard label="Inactive / Untapped" value={products.inactive.length} sub={`Rp ${products.inactive.reduce((a,p)=>a+p.potential,0)}M potential income`} trend="up"/>
          <MetricCard label="Est. Revenue from PH" value={`Rp ${(products.active.reduce((a,p)=>a+p.revenue,0)/1000).toFixed(1)}B`} sub="From active products"/>
        </div>
      )}
      {show(0.25) && (
        <Card className="fade-in">
          <SectionTitle icon={Package}>Active Product Holding</SectionTitle>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-3)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{cat}</div>
              {products.active.filter(p => p.category === cat).map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--bg-2)', borderRadius: 8, marginBottom: 4, border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <CheckCircle size={13} style={{ color: 'var(--green)' }}/>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: 10, color: 'var(--text-3)' }}>Since {p.since}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>Rp {p.revenue.toLocaleString()}M</div>
                    <div style={{ fontSize: 10, color: 'var(--text-3)' }}>rev/mo</div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </Card>
      )}
      {show(0.7) && (
        <Card style={{ borderTop: '3px solid var(--amber)' }} className="fade-in">
          <SectionTitle icon={Star}>Untapped Products — Growth Opportunities</SectionTitle>
          {products.inactive.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: 'var(--amber-bg)', borderRadius: 8, marginBottom: 8, border: '1px solid var(--amber-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ChevronRight size={13} style={{ color: 'var(--amber)' }}/>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <Badge color="default">{p.category}</Badge>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber)' }}>+Rp {p.potential}M</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)' }}>potential income</div>
              </div>
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
  const badgeColor = isETB ? { bg: 'var(--green-bg)', color: 'var(--green)', border: 'var(--green-border)' }
                           : { bg: 'var(--amber-bg)', color: 'var(--amber)', border: 'var(--amber-border)' };
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
        }}>{isETB ? 'ETB' : 'NTB'}</span>
        <span style={{ fontSize: 11, color: 'var(--text-3)', marginLeft: 4 }}>
          {item.banks.length} banks
        </span>
        <ChevronDown size={12} style={{
          color: 'var(--text-3)', transform: expanded ? 'rotate(180deg)' : 'none',
          transition: 'transform 0.2s',
        }} onClick={e => { e.stopPropagation(); setExpanded(p => !p); }}/>
      </button>

      {expanded && (
        <div style={{ padding: '0 12px 12px 40px' }}>
          {item.banks.map((b, i) => (
            <BankBar key={i} bank={b.bank} amount={b.amount} pct={b.pct}
              isCIMB={b.bank.toLowerCase().includes('cimb')}/>
          ))}
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 6 }}>
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
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--amber)',
              background: 'var(--amber-bg)', border: '1px solid var(--amber-border)',
              padding: '2px 8px', borderRadius: 20 }}>NTB — Top 5</span>
            <span style={{ fontSize: 10, color: 'var(--text-3)' }}>New to Bank</span>
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

      {/* Summary KPIs */}
      {show(0.05) && (
        <div className="fade-in">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginBottom: 4 }}>
            {[
              { label: 'Total Members', value: summary.totalMembers.toLocaleString(), sub: 'L0 to L3' },
              { label: 'ETB Members', value: summary.etbMembers.toLocaleString(), sub: 'Existing to Bank', color: 'var(--green)' },
              { label: 'NTB Members', value: summary.ntbMembers.toLocaleString(), sub: 'Potential leads', color: 'var(--amber)' },
              { label: 'CASA Balance', value: `IDR ${summary.casaBalance} Bn`, sub: 'Across ecosystem' },
              { label: 'Transaction Vol.', value: `IDR ${summary.transactionVolume >= 1000 ? (summary.transactionVolume/1000).toFixed(1)+'T' : summary.transactionVolume+' Bn'}`, sub: 'In + out flow' },
            ].map((m, i) => (
              <div key={i} style={{ background: 'var(--bg-2)', borderRadius: 10, padding: '10px 12px', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 3 }}>{m.label}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: m.color || 'var(--text-1)' }}>{m.value}</div>
                <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Layer Breakdown */}
      {show(0.2) && (
        <Card className="fade-in">
          <SectionTitle icon={Network}>Layer Breakdown</SectionTitle>
          <div style={{ fontSize: 10, color: 'var(--text-3)', marginBottom: 10, textAlign: 'right' }}>
            L0 to L3 summary by ETB / NTB and financial value
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: 'var(--bg-2)' }}>
                  {['Layer','Description','Total Members','ETB','NTB','CASA (Bn)','Trx Vol (Bn)'].map(h => (
                    <th key={h} style={{ padding: '8px 10px', textAlign: h === 'Layer' || h === 'Description' ? 'left' : 'right',
                      fontWeight: 600, color: 'var(--text-2)', fontSize: 11, borderBottom: '1px solid var(--border)',
                      whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {layers.map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i === 0 ? 'var(--red-light)' : '#fff' }}>
                    <td style={{ padding: '9px 10px', fontWeight: 700, color: 'var(--red)' }}>{row.layer}</td>
                    <td style={{ padding: '9px 10px', color: 'var(--text-2)', fontSize: 11 }}>{row.desc}</td>
                    <td style={{ padding: '9px 10px', textAlign: 'right', fontWeight: 600 }}>{row.total.toLocaleString()}</td>
                    <td style={{ padding: '9px 10px', textAlign: 'right' }}>
                      <span style={{ color: 'var(--green)', fontWeight: 600, background: 'var(--green-bg)', padding: '2px 6px', borderRadius: 4 }}>
                        {row.etb} ETB
                      </span>
                    </td>
                    <td style={{ padding: '9px 10px', textAlign: 'right' }}>
                      <span style={{ color: 'var(--amber)', fontWeight: 600, background: 'var(--amber-bg)', padding: '2px 6px', borderRadius: 4 }}>
                        {row.ntb} NTB
                      </span>
                    </td>
                    <td style={{ padding: '9px 10px', textAlign: 'right', color: 'var(--text-1)' }}>IDR {row.casa} Bn</td>
                    <td style={{ padding: '9px 10px', textAlign: 'right', color: 'var(--text-1)' }}>
                      IDR {row.trxVol >= 1000 ? `${(row.trxVol/1000).toFixed(1)}T` : `${row.trxVol} Bn`}
                    </td>
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
