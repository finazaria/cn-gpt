// ─── Currency formatter ───────────────────────────────────────────────────
// All monetary values are stored as IDR millions (Mn) in mockData.
// e.g. 38700 = IDR 38,700 Mn = IDR 38.7 Bn
// Usage: fmtIDR(38700) → "IDR 38.7 Bn"
//        fmtIDR(38700000) → "IDR 38.7 Tn"  (if stored as Mn)
//        fmtIDRBn(185) → "IDR 185 Bn"      (if already stored as Bn)

export function fmtIDR(valueMn) {
  // Input: IDR in millions (Mn)
  if (valueMn >= 1_000_000) {
    const tn = valueMn / 1_000_000;
    return `IDR ${tn % 1 === 0 ? tn.toFixed(0) : tn.toFixed(1)} Tn`;
  }
  if (valueMn >= 1_000) {
    const bn = valueMn / 1_000;
    return `IDR ${bn % 1 === 0 ? bn.toFixed(0) : bn.toFixed(1)} Bn`;
  }
  return `IDR ${valueMn.toLocaleString()} Mn`;
}

export function fmtIDRBn(valueBn) {
  // Input: IDR already in billions (Bn)
  if (valueBn >= 1_000) {
    const tn = valueBn / 1_000;
    return `IDR ${tn % 1 === 0 ? tn.toFixed(0) : tn.toFixed(1)} Tn`;
  }
  return `IDR ${valueBn % 1 === 0 ? valueBn.toFixed(0) : valueBn.toFixed(1)} Bn`;
}

export function fmtPct(value, decimals = 1) {
  return `${value > 0 ? '+' : ''}${value.toFixed(decimals)}%`;
}
