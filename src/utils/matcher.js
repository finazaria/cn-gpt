// Maps user question to a response TYPE key
// The actual rendering is done by rich components

const patterns = [
  {
    key: 'COMPANY_OVERVIEW',
    triggers: [
      /tell me about/i, /company profile/i, /overview/i, /who is pt/i,
      /about pt abc/i, /client profile/i, /customer profile/i,
    ],
  },
  {
    key: 'FUNDING_LENDING',
    triggers: [
      /funding.*lending/i, /lending.*funding/i, /balance trend/i,
      /funding balance/i, /loan balance/i, /casa.*loan/i, /loan.*casa/i,
      /funding.*trend/i, /lending.*trend/i,
    ],
  },
  {
    key: 'LEAKAGE',
    triggers: [
      /leakage/i, /analyze.*leak/i, /leak.*analysis/i,
      /outgoing/i, /incoming flow/i, /cash.*leak/i,
    ],
  },
  {
    key: 'PRODUCTS',
    triggers: [
      /product/i, /product holding/i, /what product/i,
      /current.*use/i, /using.*product/i, /which product/i,
    ],
  },
  {
    key: 'INCOME',
    triggers: [
      /income/i, /revenue/i, /nii/i, /noii/i,
      /income.*trend/i, /earnings/i, /how.*income/i,
    ],
  },
  {
    key: 'MEETING_PREP',
    triggers: [
      /meeting/i, /prepare.*meeting/i, /meeting prep/i,
      /prepare me/i, /talking point/i, /call prep/i, /visit prep/i,
    ],
  },
];

export function matchQuestion(text) {
  const lower = text.toLowerCase().trim();
  for (const p of patterns) {
    for (const trigger of p.triggers) {
      if (trigger.test(lower)) return p.key;
    }
  }
  return 'UNKNOWN';
}

export const RESPONSE_TYPES = {
  COMPANY_OVERVIEW: 'COMPANY_OVERVIEW',
  FUNDING_LENDING: 'FUNDING_LENDING',
  LEAKAGE: 'LEAKAGE',
  PRODUCTS: 'PRODUCTS',
  INCOME: 'INCOME',
  MEETING_PREP: 'MEETING_PREP',
  UNKNOWN: 'UNKNOWN',
};

export const SUGGESTED_QUESTIONS = [
  { label: 'Company Overview', text: 'Tell me about PT ABC', icon: 'building' },
  { label: 'Balance Trend', text: 'Show funding & lending balance trend', icon: 'trending-up' },
  { label: 'Leakage Analysis', text: 'Analyze leakage for PT ABC', icon: 'alert-triangle' },
  { label: 'Product Holding', text: 'What products does PT ABC currently use?', icon: 'package' },
  { label: 'Income Trend', text: "How's the income trend?", icon: 'bar-chart-2' },
  { label: 'Meeting Prep', text: 'Prepare me for my customer meeting', icon: 'calendar' },
];
