// ─── Company master data ───────────────────────────────────────────────────
export const company = {
  name: 'PT ABC Makmur Tbk',
  cif: '0012345678',
  industry: 'Fast-Moving Consumer Goods (FMCG)',
  group: 'ABC Group',
  segment: 'Corporate Banking',
  th: 'Budi Santoso',
  rm: 'Dewi Rahayu',
  cifStatus: 'ACTIVE',
  etb: true,
  since: '2018',
};

// ─── Funding & Loan ─────────────────────────────────────────────────────────
export const fundingLoan = {
  fundingAvg: 38700,     // Rp million
  fundingEnd: 41200,
  loanOS: 55200,
  loanAvg: 53800,
  fundingYoY: 6.2,
  loanYoY: -2.1,
  fundingTrend: [
    { month: 'Jan', avg: 32400, end: 33100 },
    { month: 'Feb', avg: 33800, end: 34500 },
    { month: 'Mar', avg: 34200, end: 35000 },
    { month: 'Apr', avg: 35600, end: 36400 },
    { month: 'May', avg: 36800, end: 37900 },
    { month: 'Jun', avg: 37400, end: 38600 },
    { month: 'Jul', avg: 37900, end: 39200 },
    { month: 'Aug', avg: 38100, end: 40000 },
    { month: 'Sep', avg: 38400, end: 40500 },
    { month: 'Oct', avg: 38500, end: 40800 },
    { month: 'Nov', avg: 38600, end: 41000 },
    { month: 'Dec', avg: 38700, end: 41200 },
  ],
  loanTrend: [
    { month: 'Jan', os: 57200, avg: 56900 },
    { month: 'Feb', os: 57000, avg: 56800 },
    { month: 'Mar', os: 56800, avg: 56600 },
    { month: 'Apr', os: 56500, avg: 56200 },
    { month: 'May', os: 56200, avg: 55900 },
    { month: 'Jun', os: 55900, avg: 55600 },
    { month: 'Jul', os: 55700, avg: 55400 },
    { month: 'Aug', os: 55500, avg: 55100 },
    { month: 'Sep', os: 55400, avg: 54800 },
    { month: 'Oct', os: 55300, avg: 54400 },
    { month: 'Nov', os: 55250, avg: 54100 },
    { month: 'Dec', os: 55200, avg: 53800 },
  ],
};

// ─── Income ─────────────────────────────────────────────────────────────────
export const income = {
  fundingNII: 1100,
  loanNII: 2000,
  noii: 1100,
  total: 4200,
  yoy: 8.3,
  trend: [
    { month: 'Jan', fundingNII: 820, loanNII: 1680, noii: 880, total: 3380 },
    { month: 'Feb', fundingNII: 840, loanNII: 1700, noii: 890, total: 3430 },
    { month: 'Mar', fundingNII: 860, loanNII: 1730, noii: 910, total: 3500 },
    { month: 'Apr', fundingNII: 880, loanNII: 1760, noii: 940, total: 3580 },
    { month: 'May', fundingNII: 920, loanNII: 1810, noii: 960, total: 3690 },
    { month: 'Jun', fundingNII: 950, loanNII: 1840, noii: 980, total: 3770 },
    { month: 'Jul', fundingNII: 980, loanNII: 1870, noii: 1000, total: 3850 },
    { month: 'Aug', fundingNII: 1000, loanNII: 1900, noii: 1020, total: 3920 },
    { month: 'Sep', fundingNII: 1020, loanNII: 1930, noii: 1040, total: 3990 },
    { month: 'Oct', fundingNII: 1050, loanNII: 1960, noii: 1060, total: 4070 },
    { month: 'Nov', fundingNII: 1070, loanNII: 1980, noii: 1080, total: 4130 },
    { month: 'Dec', fundingNII: 1100, loanNII: 2000, noii: 1100, total: 4200 },
  ],
};

// ─── Leakage ─────────────────────────────────────────────────────────────────
export const leakage = {
  incoming: 12400,
  outgoing: 7600,
  leakagePct: 38,
  netFlow: 4800,
  monthlyTrend: [
    { month: 'Jul', incoming: 10200, outgoing: 5800, pct: 36 },
    { month: 'Aug', incoming: 10800, outgoing: 6200, pct: 37 },
    { month: 'Sep', incoming: 11200, outgoing: 6600, pct: 37 },
    { month: 'Oct', incoming: 11600, outgoing: 6900, pct: 37 },
    { month: 'Nov', incoming: 12000, outgoing: 7200, pct: 38 },
    { month: 'Dec', incoming: 12400, outgoing: 7600, pct: 38 },
  ],
  topOutflow: [
    { rank: 1, name: 'BCA', amount: 3200, pct: 42, type: 'Transfer' },
    { rank: 2, name: 'Mandiri', amount: 2100, pct: 28, type: 'Payment' },
    { rank: 3, name: 'BNI', amount: 1400, pct: 18, type: 'Transfer' },
    { rank: 4, name: 'Others', amount: 900, pct: 12, type: 'Various' },
  ],
  topInflow: [
    { rank: 1, name: 'BCA', amount: 4100, pct: 33, type: 'Collection' },
    { rank: 2, name: 'Internal CIMB', amount: 3800, pct: 31, type: 'Transfer' },
    { rank: 3, name: 'Mandiri', amount: 2700, pct: 22, type: 'Payment' },
    { rank: 4, name: 'Others', amount: 1800, pct: 14, type: 'Various' },
  ],
};

// ─── Product Holding ─────────────────────────────────────────────────────────
export const products = {
  total: 8,
  active: [
    { name: 'CASA (Giro & Tabungan)', category: 'Funding', since: '2018', status: 'Active', revenue: 1100 },
    { name: 'Time Deposit', category: 'Funding', since: '2019', status: 'Active', revenue: 420 },
    { name: 'Term Loan', category: 'Lending', since: '2018', status: 'Active', revenue: 1600 },
    { name: 'Trade Finance (LC/SKBDN)', category: 'Lending', since: '2020', status: 'Active', revenue: 400 },
    { name: 'FX Forward', category: 'Treasury', since: '2021', status: 'Active', revenue: 380 },
    { name: 'BizChannel', category: 'Transactional', since: '2019', status: 'Active', revenue: 180 },
    { name: 'Payroll', category: 'Transactional', since: '2020', status: 'Active', revenue: 90 },
    { name: 'Virtual Account', category: 'Transactional', since: '2022', status: 'Active', revenue: 30 },
  ],
  inactive: [
    { name: 'Cash Management / Pooling', category: 'Transactional', potential: 420 },
    { name: 'Supply Chain Finance', category: 'Lending', potential: 320 },
    { name: 'Bancassurance', category: 'Insurance', potential: 180 },
    { name: 'FX Option / Hedging', category: 'Treasury', potential: 150 },
  ],
};

// ─── Top 3 Findings ──────────────────────────────────────────────────────────
export const findings = [
  {
    no: 1,
    category: 'Cross-Sell',
    title: 'Cash Management Gap — Rp 420M potential income',
    detail: 'Customer has 430 monthly CASA transactions but no cash pooling product. FMCG industry peers have 78% penetration. Estimated incremental income: Rp 420M/year.',
    action: 'Offer BizChannel Cash Pooling',
    priority: 'high',
  },
  {
    no: 2,
    category: 'Leakage',
    title: '38% CASA leakage detected — Rp 7.6B outgoing monthly',
    detail: 'Top leakage destination is BCA (42%, Rp 3.2B/mo) primarily via transfer and payment transactions. Retaining 50% of this leakage can add ~Rp 45B annual average balance.',
    action: 'Discuss preferential FX & VA consolidation',
    priority: 'high',
  },
  {
    no: 3,
    category: 'Ecosystem',
    title: '3 key suppliers are NTB leads — Supply Chain Finance',
    detail: 'PT Nestle, PT Wings Group, and PT P&G Indonesia (top 3 payment counterparties) are not CIMB Niaga clients. Supply Chain Finance can deepen the relationship and retain payable flows.',
    action: 'Initiate NTB outreach for SCF',
    priority: 'medium',
  },
];

// ─── Meeting Prep ─────────────────────────────────────────────────────────────
export const meetingPrep = {
  snapshot: {
    industry: 'Fast-Moving Consumer Goods (FMCG)',
    group: 'ABC Group',
    segment: 'Corporate Banking — Tier 1',
    rm: 'Dewi Rahayu',
    lastMeeting: '15 Nov 2024',
  },
  keyMetrics: [
    { label: 'CASA Balance', value: '+6.2% YoY', trend: 'up' },
    { label: 'Loan OS', value: '-2.1% YoY', trend: 'down' },
    { label: 'Total Income', value: '+8.3% YoY', trend: 'up' },
    { label: 'MOCA Transactions', value: '430 trx/mo', trend: 'up' },
  ],
  risks: [
    { label: 'CASA Leakage', detail: 'Rp 7.6B/mo to BCA & Mandiri (38% leakage rate)' },
    { label: 'Loan Declining', detail: 'OS Loan down 2.1% YoY — risk of wallet share loss' },
  ],
  opportunities: [
    { label: 'Cash Management', detail: 'Rp 420M potential income — no pooling product currently' },
    { label: 'Supply Chain Finance', detail: '3 NTB supplier leads identified via payment data' },
    { label: 'Lending Expansion', detail: 'Rp 40B gap vs. FMCG industry average — WC facility opportunity' },
  ],
  talkingPoints: [
    'Open with CASA performance win: +6.2% — validate their treasury discipline.',
    'Introduce Cash Management / Pooling: "We noticed Rp 430 transactions monthly with no centralized pooling — we can optimize your idle float."',
    'Probe on leakage to BCA: "Are you managing supplier payments from a different account? We have a virtual account solution that can centralize this."',
    'Explore working capital facility to replace the declining term loan exposure.',
    'Introduce Supply Chain Finance for Nestle and Wings Group payables.',
    'Close with: offer a digital walkthrough of BizChannel 2.0 upgrade.',
  ],
};
