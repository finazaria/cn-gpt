// ═══════════════════════════════════════════════════════════════════════════
// CARD AVAILABILITY CONFIG
// ─────────────────────────────────────────────────────────────────────────
// To enable/disable a card for a specific company, edit the object below.
// true  = card is enabled and clickable
// false = card is disabled (grayed out, not clickable)
//
// Card keys: COMPANY_OVERVIEW, FUNDING_LENDING, LEAKAGE, PRODUCTS, INCOME, ECOSYSTEM, MEETING_PREP
// Company keys: astra, kino, indofood
// ═══════════════════════════════════════════════════════════════════════════
export const CARD_CONFIG = {
  astra: {
    COMPANY_OVERVIEW: true,
    FUNDING_LENDING:  true,
    LEAKAGE:          true,
    PRODUCTS:         true,
    INCOME:           false,  // ← disabled: data still being prepared
    ECOSYSTEM:        true,
    MEETING_PREP:     true,
  },
  kino: {
    COMPANY_OVERVIEW: true,
    FUNDING_LENDING:  true,
    LEAKAGE:          true,
    PRODUCTS:         true,
    INCOME:           false,  // ← disabled: data still being prepared
    ECOSYSTEM:        true,
    MEETING_PREP:     true,
  },
  indofood: {
    COMPANY_OVERVIEW: true,
    FUNDING_LENDING:  true,
    LEAKAGE:          true,
    PRODUCTS:         false,  // ← disabled: product holding data not yet ready
    INCOME:           false,  // ← disabled: data still being prepared
    ECOSYSTEM:        true,
    MEETING_PREP:     true,
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// COMPANY REGISTRY
// The RM can only access companies in this list.
// Any company NOT in this list will be rejected by the agent.
// ═══════════════════════════════════════════════════════════════════════════
export const COMPANY_REGISTRY = [
  { id: 'astra',    name: 'PT Astra Internasional Tbk',     shortName: 'PT Astra',    initials: 'AI' },
  { id: 'kino',     name: 'PT Kino Indonesia Tbk',           shortName: 'PT Kino',     initials: 'KI' },
  { id: 'indofood', name: 'PT Indofood Sukses Makmur Tbk',   shortName: 'PT Indofood', initials: 'IF' },
];

// ═══════════════════════════════════════════════════════════════════════════
// PT ASTRA INTERNASIONAL TBK
// ═══════════════════════════════════════════════════════════════════════════
export const astraData = {
  company: {
    name: 'PT Astra Internasional Tbk',
    cif: '0012345678',
    industry: 'Fast-Moving Consumer Goods (FMCG)',
    group: 'ABC Group',
    segment: 'Corporate Banking',
    th: 'Budi Santoso',
    rm: 'Dewi Rahayu',
    cifStatus: 'ACTIVE',
    etb: true,
    since: '2018',
  },
  fundingLoan: {
    fundingAvg: 38700,
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
  },
  income: {
    fundingNII: 1100, loanNII: 2000, noii: 1100, total: 4200, yoy: 8.3,
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
  },
  leakage: {
    incoming: 12400, outgoing: 7600, leakagePct: 38, netFlow: 4800,
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
  },
  products: {
    total: 8,
    active: [
      { name: 'CASA (Giro & Tabungan)', category: 'Funding', since: '2018', revenue: 1100 },
      { name: 'Time Deposit', category: 'Funding', since: '2019', revenue: 420 },
      { name: 'Term Loan', category: 'Lending', since: '2018', revenue: 1600 },
      { name: 'Trade Finance (LC/SKBDN)', category: 'Lending', since: '2020', revenue: 400 },
      { name: 'FX Forward', category: 'Treasury', since: '2021', revenue: 380 },
      { name: 'BizChannel', category: 'Transactional', since: '2019', revenue: 180 },
      { name: 'Payroll', category: 'Transactional', since: '2020', revenue: 90 },
      { name: 'Virtual Account', category: 'Transactional', since: '2022', revenue: 30 },
    ],
    inactive: [
      { name: 'Cash Management / Pooling', category: 'Transactional', potential: 420 },
      { name: 'Supply Chain Finance', category: 'Lending', potential: 320 },
      { name: 'Bancassurance', category: 'Insurance', potential: 180 },
      { name: 'FX Option / Hedging', category: 'Treasury', potential: 150 },
    ],
  },
  findings: [
    {
      no: 1, category: 'Cross-Sell', priority: 'high',
      title: 'Cash Management Gap — Rp 420M potential income',
      detail: 'Customer has 430 monthly CASA transactions but no cash pooling product. FMCG industry peers have 78% penetration. Estimated incremental income: Rp 420M/year.',
      action: 'Offer BizChannel Cash Pooling',
    },
    {
      no: 2, category: 'Leakage', priority: 'high',
      title: '38% CASA leakage detected — Rp 7.6B outgoing monthly',
      detail: 'Top leakage destination is BCA (42%, Rp 3.2B/mo). Retaining 50% of this leakage can add ~Rp 45B annual average balance.',
      action: 'Discuss preferential FX & VA consolidation',
    },
    {
      no: 3, category: 'Ecosystem', priority: 'medium',
      title: '3 key suppliers are NTB leads — Supply Chain Finance',
      detail: 'PT Nestle, PT Wings Group, and PT P&G Indonesia (top 3 payment counterparties) are not CIMB Niaga clients.',
      action: 'Initiate NTB outreach for SCF',
    },
  ],
  meetingPrep: {
    snapshot: { industry: 'Fast-Moving Consumer Goods (FMCG)', group: 'ABC Group', segment: 'Corporate Banking — Tier 1', rm: 'Dewi Rahayu', lastMeeting: '15 Nov 2024' },
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
      { label: 'Lending Expansion', detail: 'Rp 40B gap vs. FMCG industry average' },
    ],
    talkingPoints: [
      'Open with CASA performance win: +6.2% — validate their treasury discipline.',
      'Introduce Cash Management / Pooling: "We noticed Rp 430 transactions monthly with no centralized pooling."',
      'Probe on leakage to BCA: "Are you managing supplier payments from a different account?"',
      'Explore working capital facility to replace the declining term loan exposure.',
      'Introduce Supply Chain Finance for Nestle and Wings Group payables.',
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// PT KINO INDONESIA TBK
// ═══════════════════════════════════════════════════════════════════════════
export const kinoData = {
  company: {
    name: 'PT Kino Indonesia Tbk',
    cif: '0023456789',
    industry: 'Consumer Goods — Personal Care & Food',
    group: 'Kino Group',
    segment: 'Corporate Banking',
    th: 'Reza Firmansyah',
    rm: 'Sari Puspita',
    cifStatus: 'ACTIVE',
    etb: true,
    since: '2020',
  },
  fundingLoan: {
    fundingAvg: 18400,
    fundingEnd: 19800,
    loanOS: 22500,
    loanAvg: 21900,
    fundingYoY: 11.4,
    loanYoY: 4.2,
    fundingTrend: [
      { month: 'Jan', avg: 14200, end: 15000 },
      { month: 'Feb', avg: 14800, end: 15500 },
      { month: 'Mar', avg: 15200, end: 16000 },
      { month: 'Apr', avg: 15800, end: 16600 },
      { month: 'May', avg: 16200, end: 17000 },
      { month: 'Jun', avg: 16600, end: 17400 },
      { month: 'Jul', avg: 17000, end: 17800 },
      { month: 'Aug', avg: 17400, end: 18200 },
      { month: 'Sep', avg: 17800, end: 18600 },
      { month: 'Oct', avg: 18000, end: 19000 },
      { month: 'Nov', avg: 18200, end: 19400 },
      { month: 'Dec', avg: 18400, end: 19800 },
    ],
    loanTrend: [
      { month: 'Jan', os: 21200, avg: 20900 },
      { month: 'Feb', os: 21400, avg: 21100 },
      { month: 'Mar', os: 21600, avg: 21300 },
      { month: 'Apr', os: 21700, avg: 21400 },
      { month: 'May', os: 21800, avg: 21500 },
      { month: 'Jun', os: 21900, avg: 21600 },
      { month: 'Jul', os: 22000, avg: 21700 },
      { month: 'Aug', os: 22100, avg: 21800 },
      { month: 'Sep', os: 22200, avg: 21850 },
      { month: 'Oct', os: 22300, avg: 21900 },
      { month: 'Nov', os: 22400, avg: 21950 },
      { month: 'Dec', os: 22500, avg: 21900 },
    ],
  },
  income: {
    fundingNII: 520, loanNII: 860, noii: 380, total: 1760, yoy: 13.5,
    trend: [
      { month: 'Jan', fundingNII: 380, loanNII: 650, noii: 280, total: 1310 },
      { month: 'Feb', fundingNII: 390, loanNII: 670, noii: 290, total: 1350 },
      { month: 'Mar', fundingNII: 400, loanNII: 690, noii: 300, total: 1390 },
      { month: 'Apr', fundingNII: 420, loanNII: 710, noii: 310, total: 1440 },
      { month: 'May', fundingNII: 440, loanNII: 730, noii: 325, total: 1495 },
      { month: 'Jun', fundingNII: 455, loanNII: 750, noii: 335, total: 1540 },
      { month: 'Jul', fundingNII: 470, loanNII: 770, noii: 345, total: 1585 },
      { month: 'Aug', fundingNII: 480, loanNII: 790, noii: 355, total: 1625 },
      { month: 'Sep', fundingNII: 490, loanNII: 810, noii: 360, total: 1660 },
      { month: 'Oct', fundingNII: 500, loanNII: 830, noii: 365, total: 1695 },
      { month: 'Nov', fundingNII: 510, loanNII: 845, noii: 372, total: 1727 },
      { month: 'Dec', fundingNII: 520, loanNII: 860, noii: 380, total: 1760 },
    ],
  },
  leakage: {
    incoming: 6800, outgoing: 3100, leakagePct: 31, netFlow: 3700,
    monthlyTrend: [
      { month: 'Jul', incoming: 5600, outgoing: 2400, pct: 30 },
      { month: 'Aug', incoming: 5900, outgoing: 2600, pct: 31 },
      { month: 'Sep', incoming: 6100, outgoing: 2700, pct: 31 },
      { month: 'Oct', incoming: 6300, outgoing: 2800, pct: 31 },
      { month: 'Nov', incoming: 6600, outgoing: 2950, pct: 31 },
      { month: 'Dec', incoming: 6800, outgoing: 3100, pct: 31 },
    ],
    topOutflow: [
      { rank: 1, name: 'BCA', amount: 1400, pct: 45, type: 'Transfer' },
      { rank: 2, name: 'BRI', amount: 900, pct: 29, type: 'Payment' },
      { rank: 3, name: 'BNI', amount: 500, pct: 16, type: 'Transfer' },
      { rank: 4, name: 'Others', amount: 300, pct: 10, type: 'Various' },
    ],
    topInflow: [
      { rank: 1, name: 'Internal CIMB', amount: 2800, pct: 41, type: 'Transfer' },
      { rank: 2, name: 'BCA', amount: 2200, pct: 32, type: 'Collection' },
      { rank: 3, name: 'Mandiri', amount: 1100, pct: 16, type: 'Payment' },
      { rank: 4, name: 'Others', amount: 700, pct: 11, type: 'Various' },
    ],
  },
  products: {
    total: 6,
    active: [
      { name: 'CASA (Giro & Tabungan)', category: 'Funding', since: '2020', revenue: 520 },
      { name: 'Time Deposit', category: 'Funding', since: '2021', revenue: 180 },
      { name: 'Term Loan', category: 'Lending', since: '2020', revenue: 680 },
      { name: 'Working Capital Loan', category: 'Lending', since: '2022', revenue: 180 },
      { name: 'BizChannel', category: 'Transactional', since: '2021', revenue: 120 },
      { name: 'Payroll', category: 'Transactional', since: '2022', revenue: 80 },
    ],
    inactive: [
      { name: 'Trade Finance (LC/SKBDN)', category: 'Lending', potential: 280 },
      { name: 'Cash Management / Pooling', category: 'Transactional', potential: 190 },
      { name: 'FX Forward', category: 'Treasury', potential: 140 },
      { name: 'Bancassurance', category: 'Insurance', potential: 90 },
    ],
  },
  findings: [
    {
      no: 1, category: 'Cross-Sell', priority: 'high',
      title: 'Trade Finance Opportunity — Rp 280M potential income',
      detail: 'Kino has active import activities (personal care raw materials) but no LC or SKBDN product. Consumer goods peers show 62% penetration in Trade Finance.',
      action: 'Offer Trade Finance / LC facility',
    },
    {
      no: 2, category: 'Leakage', priority: 'medium',
      title: '31% CASA leakage to BCA — Rp 1.4B/month',
      detail: 'BCA receives 45% of outflows. Customer likely maintaining a secondary operational account. Opportunity to consolidate via virtual account.',
      action: 'Propose VA consolidation & loyalty FX pricing',
    },
    {
      no: 3, category: 'Growth', priority: 'medium',
      title: 'Strong funding growth +11.4% YoY — deepen relationship',
      detail: 'Funding balance growing faster than peers. Customer shows strong trust signal. Ideal time to introduce premium cash management and FX hedging.',
      action: 'Schedule strategic review meeting',
    },
  ],
  meetingPrep: {
    snapshot: { industry: 'Consumer Goods — Personal Care & Food', group: 'Kino Group', segment: 'Commercial Banking', rm: 'Sari Puspita', lastMeeting: '3 Oct 2024' },
    keyMetrics: [
      { label: 'CASA Balance', value: '+11.4% YoY', trend: 'up' },
      { label: 'Loan OS', value: '+4.2% YoY', trend: 'up' },
      { label: 'Total Income', value: '+13.5% YoY', trend: 'up' },
      { label: 'CASA Leakage', value: '31%', trend: 'down' },
    ],
    risks: [
      { label: 'Leakage to BCA', detail: 'Rp 1.4B/mo — 45% of total outflow going to BCA' },
      { label: 'No Trade Finance', detail: 'Import activities unhedged — raw material FX risk exposed' },
    ],
    opportunities: [
      { label: 'Trade Finance / LC', detail: 'Rp 280M potential income — active importer with no facility' },
      { label: 'FX Forward', detail: 'USD payables to overseas suppliers — hedging need identified' },
      { label: 'Cash Management', detail: 'Rp 190M potential — growing transactional activity' },
    ],
    talkingPoints: [
      'Celebrate strong CASA growth: +11.4% YoY — acknowledge their business momentum.',
      'Introduce Trade Finance for import activities: "We noticed recurring USD payments to overseas suppliers — we can protect you from FX volatility with an LC facility."',
      'Probe secondary BCA account: "Are most of your distributor collections going through another bank?"',
      'Offer FX Forward for upcoming import cycle.',
      'Propose relationship review meeting with TH to discuss full banking needs.',
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// PT INDOFOOD SUKSES MAKMUR TBK
// ═══════════════════════════════════════════════════════════════════════════
export const indofoodData = {
  company: {
    name: 'PT Indofood Sukses Makmur Tbk',
    cif: '0034567890',
    industry: 'Food & Beverage Manufacturing',
    group: 'Salim Group',
    segment: 'Corporate Banking',
    th: 'Hartono Wijaya',
    rm: 'Rina Kusuma',
    cifStatus: 'ACTIVE',
    etb: true,
    since: '2016',
  },
  fundingLoan: {
    fundingAvg: 72300,
    fundingEnd: 78500,
    loanOS: 148000,
    loanAvg: 144500,
    fundingYoY: 3.8,
    loanYoY: 7.2,
    fundingTrend: [
      { month: 'Jan', avg: 64200, end: 67000 },
      { month: 'Feb', avg: 65500, end: 68400 },
      { month: 'Mar', avg: 66800, end: 69800 },
      { month: 'Apr', avg: 67400, end: 71000 },
      { month: 'May', avg: 68200, end: 72000 },
      { month: 'Jun', avg: 69000, end: 73200 },
      { month: 'Jul', avg: 70000, end: 74500 },
      { month: 'Aug', avg: 70800, end: 75600 },
      { month: 'Sep', avg: 71400, end: 76400 },
      { month: 'Oct', avg: 71800, end: 77000 },
      { month: 'Nov', avg: 72100, end: 77800 },
      { month: 'Dec', avg: 72300, end: 78500 },
    ],
    loanTrend: [
      { month: 'Jan', os: 136000, avg: 133000 },
      { month: 'Feb', os: 137500, avg: 134500 },
      { month: 'Mar', os: 139000, avg: 136000 },
      { month: 'Apr', os: 140500, avg: 137500 },
      { month: 'May', os: 142000, avg: 139000 },
      { month: 'Jun', os: 143500, avg: 140500 },
      { month: 'Jul', os: 144500, avg: 141500 },
      { month: 'Aug', os: 145500, avg: 142500 },
      { month: 'Sep', os: 146000, avg: 143000 },
      { month: 'Oct', os: 146800, avg: 143800 },
      { month: 'Nov', os: 147500, avg: 144200 },
      { month: 'Dec', os: 148000, avg: 144500 },
    ],
  },
  income: {
    fundingNII: 2100, loanNII: 5800, noii: 1900, total: 9800, yoy: 7.2,
    trend: [
      { month: 'Jan', fundingNII: 1700, loanNII: 4800, noii: 1600, total: 8100 },
      { month: 'Feb', fundingNII: 1740, loanNII: 4900, noii: 1640, total: 8280 },
      { month: 'Mar', fundingNII: 1780, loanNII: 5000, noii: 1680, total: 8460 },
      { month: 'Apr', fundingNII: 1820, loanNII: 5100, noii: 1710, total: 8630 },
      { month: 'May', fundingNII: 1860, loanNII: 5200, noii: 1740, total: 8800 },
      { month: 'Jun', fundingNII: 1890, loanNII: 5350, noii: 1760, total: 9000 },
      { month: 'Jul', fundingNII: 1920, loanNII: 5450, noii: 1790, total: 9160 },
      { month: 'Aug', fundingNII: 1950, loanNII: 5550, noii: 1810, total: 9310 },
      { month: 'Sep', fundingNII: 1980, loanNII: 5620, noii: 1830, total: 9430 },
      { month: 'Oct', fundingNII: 2020, loanNII: 5680, noii: 1860, total: 9560 },
      { month: 'Nov', fundingNII: 2060, loanNII: 5740, noii: 1880, total: 9680 },
      { month: 'Dec', fundingNII: 2100, loanNII: 5800, noii: 1900, total: 9800 },
    ],
  },
  leakage: {
    incoming: 28400, outgoing: 14200, leakagePct: 33, netFlow: 14200,
    monthlyTrend: [
      { month: 'Jul', incoming: 24000, outgoing: 11200, pct: 32 },
      { month: 'Aug', incoming: 25000, outgoing: 11800, pct: 32 },
      { month: 'Sep', incoming: 25800, outgoing: 12400, pct: 32 },
      { month: 'Oct', incoming: 26800, outgoing: 13000, pct: 33 },
      { month: 'Nov', incoming: 27600, outgoing: 13600, pct: 33 },
      { month: 'Dec', incoming: 28400, outgoing: 14200, pct: 33 },
    ],
    topOutflow: [
      { rank: 1, name: 'BCA', amount: 5800, pct: 41, type: 'Transfer' },
      { rank: 2, name: 'Mandiri', amount: 4200, pct: 30, type: 'Payment' },
      { rank: 3, name: 'BNI', amount: 2600, pct: 18, type: 'Transfer' },
      { rank: 4, name: 'Others', amount: 1600, pct: 11, type: 'Various' },
    ],
    topInflow: [
      { rank: 1, name: 'Internal CIMB', amount: 9800, pct: 34, type: 'Transfer' },
      { rank: 2, name: 'BCA', amount: 8600, pct: 30, type: 'Collection' },
      { rank: 3, name: 'Mandiri', amount: 6200, pct: 22, type: 'Payment' },
      { rank: 4, name: 'Others', amount: 3800, pct: 14, type: 'Various' },
    ],
  },
  products: {
    total: 9,
    active: [
      { name: 'CASA (Giro & Tabungan)', category: 'Funding', since: '2016', revenue: 2100 },
      { name: 'Time Deposit', category: 'Funding', since: '2016', revenue: 980 },
      { name: 'Term Loan', category: 'Lending', since: '2016', revenue: 3200 },
      { name: 'Revolving Credit Facility', category: 'Lending', since: '2018', revenue: 1400 },
      { name: 'Trade Finance (LC/SKBDN)', category: 'Lending', since: '2017', revenue: 1200 },
      { name: 'FX Forward', category: 'Treasury', since: '2017', revenue: 620 },
      { name: 'BizChannel', category: 'Transactional', since: '2016', revenue: 180 },
      { name: 'Payroll', category: 'Transactional', since: '2016', revenue: 90 },
      { name: 'Virtual Account', category: 'Transactional', since: '2019', revenue: 30 },
    ],
    inactive: [
      { name: 'Cash Management / Pooling', category: 'Transactional', potential: 680 },
      { name: 'Supply Chain Finance', category: 'Lending', potential: 540 },
      { name: 'FX Option / Hedging', category: 'Treasury', potential: 290 },
      { name: 'Bancassurance', category: 'Insurance', potential: 150 },
    ],
  },
  findings: [
    {
      no: 1, category: 'Cross-Sell', priority: 'high',
      title: 'Cash Management — Rp 680M potential income',
      detail: 'Despite Rp 72B average CASA, Indofood has no cash pooling. F&B manufacturing peers show 84% penetration. High idle float across multiple accounts identified.',
      action: 'Present BizChannel Cash Pooling proposal',
    },
    {
      no: 2, category: 'Leakage', priority: 'high',
      title: '33% CASA leakage — Rp 14.2B/month leaving CIMB Niaga',
      detail: 'BCA receives 41% of outflows (Rp 5.8B/mo). Likely for distributor payments. Retaining 40% = +Rp 68B annual average balance and ~Rp 390M incremental income.',
      action: 'Propose Virtual Account for distributor collection',
    },
    {
      no: 3, category: 'Ecosystem', priority: 'medium',
      title: 'Supply Chain Finance for raw material suppliers',
      detail: 'Top 5 agricultural commodity suppliers identified via payment data — none are CIMB Niaga clients. SCF can deepen relationship and retain payable flows.',
      action: 'Initiate SCF program for top suppliers',
    },
  ],
  meetingPrep: {
    snapshot: { industry: 'Food & Beverage Manufacturing', group: 'Salim Group', segment: 'Corporate Banking — Tier 1', rm: 'Rina Kusuma', lastMeeting: '8 Jan 2025' },
    keyMetrics: [
      { label: 'CASA Balance', value: '+3.8% YoY', trend: 'up' },
      { label: 'Loan OS', value: '+7.2% YoY', trend: 'up' },
      { label: 'Total Income', value: '+7.2% YoY', trend: 'up' },
      { label: 'CASA Leakage', value: '33%', trend: 'down' },
    ],
    risks: [
      { label: 'CASA Leakage to BCA', detail: 'Rp 5.8B/mo — 41% of total outflow going to BCA' },
      { label: 'Loan Growth vs CASA', detail: 'Loan growing 7.2% but CASA only 3.8% — funding gap widening' },
    ],
    opportunities: [
      { label: 'Cash Management', detail: 'Rp 680M potential income — largest cross-sell opportunity' },
      { label: 'Supply Chain Finance', detail: 'Top 5 agricultural suppliers identified — SCF pipeline' },
      { label: 'FX Options', detail: 'Seasonal commodity hedging needs — FX option product' },
    ],
    talkingPoints: [
      'Acknowledge loan growth: +7.2% YoY — positive momentum, express commitment to support expansion.',
      'Raise Cash Management: "With Rp 72B average CASA across multiple accounts, a pooling structure could optimize your interest yield significantly."',
      'Discuss leakage: "We see significant distributor payment flows going through BCA — a Virtual Account structure at CIMB Niaga can centralize this."',
      'Explore Supply Chain Finance for seasonal procurement (wheat, palm oil suppliers).',
      'Offer FX hedging calendar for upcoming commodity purchase cycle.',
    ],
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// ECOSYSTEM DATA
// ─────────────────────────────────────────────────────────────────────────
// ⚠️  EcoWeb redirect URL — change this when EcoWeb goes live
// Find this constant and replace the placeholder with the real URL.
// ═══════════════════════════════════════════════════════════════════════════
export const ECOWEB_URL = 'https://ecoweb.cimbniaga.co.id';

export const ecosystemData = {
  astra: {
    ecosystemType: 'Fast-Moving Consumer Goods (FMCG)',
    anchor: 'PT Astra Internasional Tbk',
    summary: {
      totalMembers: 1245,
      etbMembers: 430,
      ntbMembers: 815,
      casaBalance: 185,      // IDR Bn
      transactionVolume: 2400, // IDR Bn
    },
    layers: [
      { layer: 'L0', desc: 'Selected anchor / principal customer',     total: 1,   etb: 1,   ntb: 0,   casa: 45,   trxVol: 320 },
      { layer: 'L1', desc: 'Direct counterparties of anchor',          total: 120, etb: 55,  ntb: 65,  casa: 90,   trxVol: 1100 },
      { layer: 'L2', desc: 'Counterparties connected through L1',      total: 420, etb: 150, ntb: 270, casa: 65,   trxVol: 850 },
      { layer: 'L3', desc: 'Extended ecosystem connected through L2',  total: 705, etb: 225, ntb: 480, casa: 30,   trxVol: 450 },
    ],
    top10Collection: {
      etb: [
        { rank: 1, name: 'PT Unilever Indonesia Tbk',    banks: [{ bank: 'Bank Mandiri', amount: 4200, pct: 52 }, { bank: 'Bank BCA', amount: 2400, pct: 30 }, { bank: 'CIMB Niaga', amount: 1456, pct: 18 }] },
        { rank: 2, name: 'PT Carrefour Indonesia',       banks: [{ bank: 'Bank BCA', amount: 3100, pct: 48 }, { bank: 'Bank BNI', amount: 2100, pct: 32 }, { bank: 'CIMB Niaga', amount: 1300, pct: 20 }] },
        { rank: 3, name: 'PT Alfamart Pratama',          banks: [{ bank: 'CIMB Niaga', amount: 2800, pct: 55 }, { bank: 'Bank Mandiri', amount: 1400, pct: 27 }, { bank: 'Bank BRI', amount: 920, pct: 18 }] },
        { rank: 4, name: 'PT Indofood Sukses Makmur Tbk', banks: [{ bank: 'CIMB Niaga', amount: 2200, pct: 42 }, { bank: 'Bank Mandiri', amount: 1800, pct: 34 }, { bank: 'Bank BNI', amount: 1250, pct: 24 }] },
        { rank: 5, name: 'PT Mayora Indah Tbk',          banks: [{ bank: 'Bank BCA', amount: 1900, pct: 44 }, { bank: 'Bank Mandiri', amount: 1400, pct: 32 }, { bank: 'CIMB Niaga', amount: 1030, pct: 24 }] },
      ],
      ntb: [
        { rank: 6,  name: 'PT Wings Food Indonesia',    banks: [{ bank: 'Bank BCA', amount: 2600, pct: 58 }, { bank: 'Bank Mandiri', amount: 1200, pct: 27 }, { bank: 'Bank BNI', amount: 680, pct: 15 }] },
        { rank: 7,  name: 'PT Garudafood Putra Putri',  banks: [{ bank: 'Bank Mandiri', amount: 1800, pct: 50 }, { bank: 'Bank BRI', amount: 900, pct: 25 }, { bank: 'Bank BNI', amount: 900, pct: 25 }] },
        { rank: 8,  name: 'PT Siantar Top Tbk',         banks: [{ bank: 'Bank BCA', amount: 1400, pct: 55 }, { bank: 'Bank BNI', amount: 700, pct: 27 }, { bank: 'Bank Mandiri', amount: 468, pct: 18 }] },
        { rank: 9,  name: 'PT Nippon Indosari Tbk',     banks: [{ bank: 'Bank Mandiri', amount: 1200, pct: 46 }, { bank: 'Bank BCA', amount: 800, pct: 31 }, { bank: 'Bank BNI', amount: 600, pct: 23 }] },
        { rank: 10, name: 'PT Ultrajaya Milk Tbk',      banks: [{ bank: 'Bank BRI', amount: 1100, pct: 48 }, { bank: 'Bank BCA', amount: 700, pct: 31 }, { bank: 'Bank Mandiri', amount: 490, pct: 21 }] },
      ],
    },
    top10Payment: {
      etb: [
        { rank: 1, name: 'PT Nestle Indonesia',          banks: [{ bank: 'Bank BCA', amount: 3800, pct: 56 }, { bank: 'Bank Mandiri', amount: 1900, pct: 28 }, { bank: 'CIMB Niaga', amount: 1100, pct: 16 }] },
        { rank: 2, name: 'PT P&G Indonesia',             banks: [{ bank: 'Bank BNI', amount: 2400, pct: 52 }, { bank: 'Bank BCA', amount: 1400, pct: 30 }, { bank: 'CIMB Niaga', amount: 830, pct: 18 }] },
        { rank: 3, name: 'PT Kimia Farma Tbk',           banks: [{ bank: 'CIMB Niaga', amount: 1800, pct: 45 }, { bank: 'Bank Mandiri', amount: 1200, pct: 30 }, { bank: 'Bank BCA', amount: 1000, pct: 25 }] },
        { rank: 4, name: 'PT Kalbe Farma Tbk',           banks: [{ bank: 'Bank BCA', amount: 1600, pct: 42 }, { bank: 'Bank BNI', amount: 1200, pct: 31 }, { bank: 'CIMB Niaga', amount: 1040, pct: 27 }] },
        { rank: 5, name: 'PT Indofood CBP Sukses Makmur', banks: [{ bank: 'Bank Mandiri', amount: 2100, pct: 48 }, { bank: 'CIMB Niaga', amount: 1400, pct: 32 }, { bank: 'Bank BCA', amount: 880, pct: 20 }] },
      ],
      ntb: [
        { rank: 6,  name: 'PT Charoen Pokphand Indonesia', banks: [{ bank: 'Bank BCA', amount: 2800, pct: 60 }, { bank: 'Bank Mandiri', amount: 1100, pct: 24 }, { bank: 'Bank BNI', amount: 740, pct: 16 }] },
        { rank: 7,  name: 'PT Japfa Comfeed Indonesia',    banks: [{ bank: 'Bank BCA', amount: 1900, pct: 54 }, { bank: 'Bank Mandiri', amount: 1000, pct: 28 }, { bank: 'Bank BNI', amount: 640, pct: 18 }] },
        { rank: 8,  name: 'PT Sierad Produce Tbk',         banks: [{ bank: 'Bank Mandiri', amount: 1400, pct: 50 }, { bank: 'Bank BRI', amount: 700, pct: 25 }, { bank: 'Bank BCA', amount: 700, pct: 25 }] },
        { rank: 9,  name: 'PT Indofood Agri Resources',    banks: [{ bank: 'Bank BNI', amount: 1100, pct: 44 }, { bank: 'Bank BCA', amount: 800, pct: 32 }, { bank: 'Bank Mandiri', amount: 600, pct: 24 }] },
        { rank: 10, name: 'PT Smart Tbk',                  banks: [{ bank: 'Bank BCA', amount: 900, pct: 46 }, { bank: 'Bank Mandiri', amount: 600, pct: 31 }, { bank: 'Bank BNI', amount: 460, pct: 23 }] },
      ],
    },
  },

  kino: {
    ecosystemType: 'Consumer Goods — Personal Care & Food',
    anchor: 'PT Kino Indonesia Tbk',
    summary: {
      totalMembers: 684,
      etbMembers: 210,
      ntbMembers: 474,
      casaBalance: 92,
      transactionVolume: 1100,
    },
    layers: [
      { layer: 'L0', desc: 'Selected anchor / principal customer',     total: 1,   etb: 1,   ntb: 0,   casa: 18,  trxVol: 110 },
      { layer: 'L1', desc: 'Direct counterparties of anchor',          total: 68,  etb: 28,  ntb: 40,  casa: 34,  trxVol: 420 },
      { layer: 'L2', desc: 'Counterparties connected through L1',      total: 215, etb: 72,  ntb: 143, casa: 28,  trxVol: 380 },
      { layer: 'L3', desc: 'Extended ecosystem connected through L2',  total: 400, etb: 109, ntb: 291, casa: 12,  trxVol: 190 },
    ],
    top10Collection: {
      etb: [
        { rank: 1, name: 'PT Alfamart Pratama',         banks: [{ bank: 'CIMB Niaga', amount: 1800, pct: 54 }, { bank: 'Bank Mandiri', amount: 900, pct: 27 }, { bank: 'Bank BCA', amount: 630, pct: 19 }] },
        { rank: 2, name: 'PT Indomarco Adi Prima',      banks: [{ bank: 'Bank BCA', amount: 1400, pct: 50 }, { bank: 'CIMB Niaga', amount: 840, pct: 30 }, { bank: 'Bank BNI', amount: 560, pct: 20 }] },
        { rank: 3, name: 'PT Hero Supermarket Tbk',     banks: [{ bank: 'CIMB Niaga', amount: 1100, pct: 46 }, { bank: 'Bank BCA', amount: 700, pct: 29 }, { bank: 'Bank Mandiri', amount: 600, pct: 25 }] },
        { rank: 4, name: 'PT Midi Utama Indonesia Tbk', banks: [{ bank: 'Bank Mandiri', amount: 900, pct: 48 }, { bank: 'Bank BCA', amount: 600, pct: 32 }, { bank: 'CIMB Niaga', amount: 380, pct: 20 }] },
        { rank: 5, name: 'PT Matahari Putra Prima Tbk', banks: [{ bank: 'Bank BCA', amount: 780, pct: 44 }, { bank: 'Bank Mandiri', amount: 560, pct: 32 }, { bank: 'CIMB Niaga', amount: 424, pct: 24 }] },
      ],
      ntb: [
        { rank: 6,  name: 'PT Erafone Artha Retailindo', banks: [{ bank: 'Bank BCA', amount: 1100, pct: 62 }, { bank: 'Bank Mandiri', amount: 440, pct: 25 }, { bank: 'Bank BRI', amount: 230, pct: 13 }] },
        { rank: 7,  name: 'PT Ramayana Lestari Sentosa', banks: [{ bank: 'Bank Mandiri', amount: 850, pct: 55 }, { bank: 'Bank BCA', amount: 420, pct: 27 }, { bank: 'Bank BNI', amount: 280, pct: 18 }] },
        { rank: 8,  name: 'PT Gramedia Asri Media',      banks: [{ bank: 'Bank BCA', amount: 700, pct: 52 }, { bank: 'Bank BNI', amount: 380, pct: 28 }, { bank: 'Bank Mandiri', amount: 270, pct: 20 }] },
        { rank: 9,  name: 'PT Ace Hardware Indonesia',   banks: [{ bank: 'Bank BCA', amount: 640, pct: 58 }, { bank: 'Bank Mandiri', amount: 320, pct: 29 }, { bank: 'Bank BNI', amount: 144, pct: 13 }] },
        { rank: 10, name: 'PT Mitra Adiperkasa Tbk',     banks: [{ bank: 'Bank BCA', amount: 590, pct: 54 }, { bank: 'Bank BRI', amount: 300, pct: 27 }, { bank: 'Bank Mandiri', amount: 210, pct: 19 }] },
      ],
    },
    top10Payment: {
      etb: [
        { rank: 1, name: 'PT Rohto Laboratories Indonesia', banks: [{ bank: 'Bank BCA', amount: 1200, pct: 52 }, { bank: 'CIMB Niaga', amount: 700, pct: 30 }, { bank: 'Bank BNI', amount: 420, pct: 18 }] },
        { rank: 2, name: 'PT Tempo Scan Pacific Tbk',       banks: [{ bank: 'CIMB Niaga', amount: 980, pct: 48 }, { bank: 'Bank BCA', amount: 620, pct: 30 }, { bank: 'Bank Mandiri', amount: 440, pct: 22 }] },
        { rank: 3, name: 'PT Mandom Indonesia Tbk',         banks: [{ bank: 'Bank BCA', amount: 860, pct: 44 }, { bank: 'Bank Mandiri', amount: 600, pct: 31 }, { bank: 'CIMB Niaga', amount: 490, pct: 25 }] },
        { rank: 4, name: 'PT Darya-Varia Laboratoria',      banks: [{ bank: 'Bank Mandiri', amount: 780, pct: 46 }, { bank: 'CIMB Niaga', amount: 560, pct: 33 }, { bank: 'Bank BNI', amount: 360, pct: 21 }] },
        { rank: 5, name: 'PT Martina Berto Tbk',            banks: [{ bank: 'CIMB Niaga', amount: 680, pct: 50 }, { bank: 'Bank BCA', amount: 408, pct: 30 }, { bank: 'Bank Mandiri', amount: 272, pct: 20 }] },
      ],
      ntb: [
        { rank: 6,  name: 'PT Beiersdorf Indonesia',        banks: [{ bank: 'Bank BCA', amount: 1400, pct: 65 }, { bank: 'Bank Mandiri', amount: 490, pct: 23 }, { bank: 'Bank BNI', amount: 260, pct: 12 }] },
        { rank: 7,  name: 'PT L\'Oreal Indonesia',          banks: [{ bank: 'Bank BCA', amount: 1200, pct: 60 }, { bank: 'Bank HSBC', amount: 480, pct: 24 }, { bank: 'Bank Mandiri', amount: 320, pct: 16 }] },
        { rank: 8,  name: 'PT Unza Vitalis',                banks: [{ bank: 'Bank BCA', amount: 900, pct: 55 }, { bank: 'Bank BNI', amount: 450, pct: 27 }, { bank: 'Bank BRI', amount: 295, pct: 18 }] },
        { rank: 9,  name: 'PT Coty Indonesia',              banks: [{ bank: 'Bank BCA', amount: 780, pct: 58 }, { bank: 'Bank Mandiri', amount: 360, pct: 27 }, { bank: 'Bank BNI', amount: 200, pct: 15 }] },
        { rank: 10, name: 'PT Revlon Indonesia',            banks: [{ bank: 'Bank BCA', amount: 650, pct: 56 }, { bank: 'Bank Mandiri', amount: 325, pct: 28 }, { bank: 'Bank BNI', amount: 185, pct: 16 }] },
      ],
    },
  },

  indofood: {
    ecosystemType: 'Food & Beverage Manufacturing',
    anchor: 'PT Indofood Sukses Makmur Tbk',
    summary: {
      totalMembers: 2180,
      etbMembers: 720,
      ntbMembers: 1460,
      casaBalance: 420,
      transactionVolume: 6800,
    },
    layers: [
      { layer: 'L0', desc: 'Selected anchor / principal customer',     total: 1,    etb: 1,   ntb: 0,    casa: 72,  trxVol: 840 },
      { layer: 'L1', desc: 'Direct counterparties of anchor',          total: 280,  etb: 110, ntb: 170,  casa: 168, trxVol: 2600 },
      { layer: 'L2', desc: 'Counterparties connected through L1',      total: 790,  etb: 280, ntb: 510,  casa: 124, trxVol: 2100 },
      { layer: 'L3', desc: 'Extended ecosystem connected through L2',  total: 1109, etb: 329, ntb: 780,  casa: 56,  trxVol: 1260 },
    ],
    top10Collection: {
      etb: [
        { rank: 1, name: 'PT Indomarco Adi Prima',          banks: [{ bank: 'CIMB Niaga', amount: 8400, pct: 44 }, { bank: 'Bank BCA', amount: 5700, pct: 30 }, { bank: 'Bank Mandiri', amount: 4900, pct: 26 }] },
        { rank: 2, name: 'PT Indogrosir Indonesia',         banks: [{ bank: 'Bank BCA', amount: 6800, pct: 48 }, { bank: 'CIMB Niaga', amount: 4200, pct: 30 }, { bank: 'Bank Mandiri', amount: 3100, pct: 22 }] },
        { rank: 3, name: 'PT Alfamart Pratama',             banks: [{ bank: 'Bank Mandiri', amount: 5600, pct: 46 }, { bank: 'Bank BCA', amount: 4000, pct: 33 }, { bank: 'CIMB Niaga', amount: 2600, pct: 21 }] },
        { rank: 4, name: 'PT Hero Supermarket Tbk',         banks: [{ bank: 'CIMB Niaga', amount: 4800, pct: 50 }, { bank: 'Bank BCA', amount: 2880, pct: 30 }, { bank: 'Bank BNI', amount: 1920, pct: 20 }] },
        { rank: 5, name: 'PT Carrefour Indonesia',          banks: [{ bank: 'Bank BCA', amount: 4200, pct: 52 }, { bank: 'Bank Mandiri', amount: 2520, pct: 31 }, { bank: 'CIMB Niaga', amount: 1380, pct: 17 }] },
      ],
      ntb: [
        { rank: 6,  name: 'PT Sumber Alfaria Trijaya Tbk', banks: [{ bank: 'Bank BCA', amount: 7200, pct: 58 }, { bank: 'Bank Mandiri', amount: 3240, pct: 26 }, { bank: 'Bank BNI', amount: 2000, pct: 16 }] },
        { rank: 7,  name: 'PT Midi Utama Indonesia Tbk',   banks: [{ bank: 'Bank BCA', amount: 5400, pct: 55 }, { bank: 'Bank Mandiri', amount: 2700, pct: 27 }, { bank: 'Bank BNI', amount: 1800, pct: 18 }] },
        { rank: 8,  name: 'PT Matahari Putra Prima Tbk',   banks: [{ bank: 'Bank BCA', amount: 4600, pct: 54 }, { bank: 'Bank Mandiri', amount: 2300, pct: 27 }, { bank: 'Bank BNI', amount: 1640, pct: 19 }] },
        { rank: 9,  name: 'PT Lotte Mart Indonesia',       banks: [{ bank: 'Bank BCA', amount: 3800, pct: 50 }, { bank: 'Bank BNI', amount: 2280, pct: 30 }, { bank: 'Bank Mandiri', amount: 1520, pct: 20 }] },
        { rank: 10, name: 'PT Trans Retail Indonesia',     banks: [{ bank: 'Bank Mandiri', amount: 3400, pct: 48 }, { bank: 'Bank BCA', amount: 2550, pct: 36 }, { bank: 'Bank BNI', amount: 1140, pct: 16 }] },
      ],
    },
    top10Payment: {
      etb: [
        { rank: 1, name: 'PT Bogasari Flour Mills',         banks: [{ bank: 'CIMB Niaga', amount: 9600, pct: 46 }, { bank: 'Bank BCA', amount: 6240, pct: 30 }, { bank: 'Bank Mandiri', amount: 5040, pct: 24 }] },
        { rank: 2, name: 'PT Salim Ivomas Pratama Tbk',     banks: [{ bank: 'Bank BCA', amount: 7800, pct: 50 }, { bank: 'CIMB Niaga', amount: 4680, pct: 30 }, { bank: 'Bank Mandiri', amount: 3120, pct: 20 }] },
        { rank: 3, name: 'PT Indofood Agri Resources',      banks: [{ bank: 'CIMB Niaga', amount: 6400, pct: 52 }, { bank: 'Bank BCA', amount: 3840, pct: 31 }, { bank: 'Bank Mandiri', amount: 2120, pct: 17 }] },
        { rank: 4, name: 'PT Bumi Resources Minerals Tbk',  banks: [{ bank: 'Bank BCA', amount: 5200, pct: 48 }, { bank: 'Bank Mandiri', amount: 3120, pct: 29 }, { bank: 'CIMB Niaga', amount: 2480, pct: 23 }] },
        { rank: 5, name: 'PT Sari Husada Generasi Mahardhika', banks: [{ bank: 'CIMB Niaga', amount: 4400, pct: 44 }, { bank: 'Bank BCA', amount: 3080, pct: 31 }, { bank: 'Bank Mandiri', amount: 2520, pct: 25 }] },
      ],
      ntb: [
        { rank: 6,  name: 'Cargill Indonesia',              banks: [{ bank: 'Citibank', amount: 8200, pct: 62 }, { bank: 'Bank BCA', amount: 3074, pct: 23 }, { bank: 'HSBC Indonesia', amount: 2000, pct: 15 }] },
        { rank: 7,  name: 'Louis Dreyfus Company Asia',     banks: [{ bank: 'Bank BCA', amount: 6400, pct: 58 }, { bank: 'Citibank', amount: 2880, pct: 26 }, { bank: 'HSBC Indonesia', amount: 1760, pct: 16 }] },
        { rank: 8,  name: 'Wilmar International Ltd',       banks: [{ bank: 'Bank BCA', amount: 5600, pct: 55 }, { bank: 'Bank Mandiri', amount: 2800, pct: 27 }, { bank: 'DBS Indonesia', amount: 1840, pct: 18 }] },
        { rank: 9,  name: 'PT Sumber Mas Indah Plywood',    banks: [{ bank: 'Bank Mandiri', amount: 4200, pct: 52 }, { bank: 'Bank BCA', amount: 2520, pct: 31 }, { bank: 'Bank BNI', amount: 1380, pct: 17 }] },
        { rank: 10, name: 'PT Miwon Indonesia',             banks: [{ bank: 'Bank BCA', amount: 3600, pct: 50 }, { bank: 'Bank Mandiri', amount: 2160, pct: 30 }, { bank: 'Bank BNI', amount: 1440, pct: 20 }] },
      ],
    },
  },
};

// ─── Helper: get data by company ID ─────────────────────────────────────────
export function getCompanyData(companyId) {
  const map = { astra: astraData, kino: kinoData, indofood: indofoodData };
  return map[companyId] || null;
}
