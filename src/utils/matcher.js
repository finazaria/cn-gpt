import { COMPANY_REGISTRY } from '../data/mockData.js';

// ─── Response type keys ────────────────────────────────────────────────────
export const RESPONSE_TYPES = {
  COMPANY_OVERVIEW: 'COMPANY_OVERVIEW',
  FUNDING_LENDING:  'FUNDING_LENDING',
  LEAKAGE:          'LEAKAGE',
  PRODUCTS:         'PRODUCTS',
  INCOME:           'INCOME',
  MEETING_PREP:     'MEETING_PREP',
  ACCESS_DENIED:    'ACCESS_DENIED',
  UNKNOWN:          'UNKNOWN',
};

// ─── Pattern matching ──────────────────────────────────────────────────────
const patterns = [
  {
    key: RESPONSE_TYPES.COMPANY_OVERVIEW,
    triggers: [/tell me about/i, /company profile/i, /overview/i, /who is/i, /client profile/i, /customer profile/i, /performance/i, /give me.*overview/i, /about pt/i],
  },
  {
    key: RESPONSE_TYPES.FUNDING_LENDING,
    triggers: [/funding.*lending/i, /lending.*funding/i, /balance trend/i, /funding balance/i, /loan balance/i, /casa.*loan/i, /loan.*casa/i, /funding.*trend/i, /lending.*trend/i, /balance.*trend/i],
  },
  {
    key: RESPONSE_TYPES.LEAKAGE,
    triggers: [/leakage/i, /analyze.*leak/i, /leak.*analysis/i, /outgoing/i, /cash.*leak/i],
  },
  {
    key: RESPONSE_TYPES.PRODUCTS,
    triggers: [/product/i, /product holding/i, /what product/i, /current.*use/i, /using.*product/i, /which product/i],
  },
  {
    key: RESPONSE_TYPES.INCOME,
    triggers: [/income/i, /revenue/i, /nii/i, /noii/i, /income.*trend/i, /earnings/i, /how.*income/i],
  },
  {
    key: RESPONSE_TYPES.MEETING_PREP,
    triggers: [/meeting/i, /prepare.*meeting/i, /meeting prep/i, /prepare me/i, /talking point/i, /call prep/i, /visit prep/i],
  },
];

// ─── Check if text mentions a company NOT in the RM's access list ──────────
export function checkAccessDenied(text) {
  // Lowercase names of allowed companies for matching
  const allowedNames = COMPANY_REGISTRY.map(c => c.name.toLowerCase());
  const allowedKeywords = ['astra', 'kino', 'indofood'];

  // Common PT patterns to detect company mentions
  const ptMentionRegex = /pt\s+[a-z]+(?:\s+[a-z]+)*/gi;
  const mentions = text.match(ptMentionRegex) || [];

  for (const mention of mentions) {
    const m = mention.toLowerCase().trim();
    // If it mentions a PT name that doesn't match any allowed company
    const isAllowed = allowedKeywords.some(k => m.includes(k)) ||
                      allowedNames.some(n => n.includes(m.replace('pt ', '').trim()));
    if (!isAllowed) {
      // Extract the company name for the error message
      const companyName = mention.replace(/^pt\s+/i, '').trim();
      const fullName = mention.charAt(0).toUpperCase() + mention.slice(1).toLowerCase()
        .split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return { denied: true, attemptedCompany: mention.trim() };
    }
  }
  return { denied: false };
}

// ─── Main matcher ──────────────────────────────────────────────────────────
export function matchQuestion(text) {
  const lower = text.toLowerCase().trim();
  for (const p of patterns) {
    for (const trigger of p.triggers) {
      if (trigger.test(lower)) return p.key;
    }
  }
  return RESPONSE_TYPES.UNKNOWN;
}

// ─── Card definitions (used for Welcome Screen cards) ─────────────────────
export const CARD_DEFINITIONS = [
  {
    key: 'COMPANY_OVERVIEW',
    label: 'Company Overview',
    desc: 'Full profile, financials, and key metrics at a glance',
    icon: 'building',
    prompt: (name) => `Tell me about ${name}`,
    color: 'var(--red)',
    bg: 'var(--red-light)',
    border: 'var(--red-border)',
  },
  {
    key: 'FUNDING_LENDING',
    label: 'Balance Trends',
    desc: 'Funding & lending trends with COBA analysis',
    icon: 'trending-up',
    prompt: (name) => `Show funding & lending balance trend for ${name}`,
    color: 'var(--blue)',
    bg: 'var(--blue-bg)',
    border: 'var(--blue-border)',
  },
  {
    key: 'LEAKAGE',
    label: 'Leakage Analysis',
    desc: 'CASA leakage rate and top flow destinations',
    icon: 'alert-triangle',
    prompt: (name) => `Analyze leakage for ${name}`,
    color: 'var(--red-neg)',
    bg: 'var(--red-neg-bg)',
    border: 'var(--red-neg-border)',
  },
  {
    key: 'PRODUCTS',
    label: 'Product Holding',
    desc: 'Active products, gaps, and cross-sell opportunities',
    icon: 'package',
    prompt: (name) => `What products does ${name} currently use?`,
    color: 'var(--amber)',
    bg: 'var(--amber-bg)',
    border: 'var(--amber-border)',
  },
  {
    key: 'INCOME',
    label: 'Income Trend',
    desc: 'NII and NOII breakdown across 12 months',
    icon: 'bar-chart',
    prompt: (name) => `How's the income trend for ${name}?`,
    color: 'var(--green)',
    bg: 'var(--green-bg)',
    border: 'var(--green-border)',
  },
  {
    key: 'MEETING_PREP',
    label: 'Meeting Prep',
    desc: 'AI-curated brief with talking points for your visit',
    icon: 'calendar',
    prompt: (name) => `Prepare me for my customer meeting with ${name}`,
    color: '#6264A7',
    bg: '#f3f0ff',
    border: '#c4b5fd',
  },
];
