// Lightweight export helpers — no heavy deps, uses browser APIs

export function exportToPDF(session) {
  const lines = [];
  lines.push('CN-GPT Data Analytics Agent — Chat Export');
  lines.push('CIMB Niaga Business Banking');
  lines.push('─'.repeat(60));
  lines.push(`Session: ${session.title}`);
  lines.push(`Exported: ${new Date().toLocaleString('id-ID')}`);
  lines.push('─'.repeat(60));
  lines.push('');

  session.messages.forEach(m => {
    if (m.role === 'user') {
      lines.push(`[YOU] ${m.text}`);
    } else {
      lines.push(`[CN-GPT] ${m.type || 'Response'}`);
      lines.push('(Rich response — see app for charts and tables)');
    }
    lines.push('');
  });

  const content = lines.join('\n');
  // Use a data URI with text/plain wrapped as "PDF-like" printable
  const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8">
<title>CN-GPT Export</title>
<style>
  body { font-family: Arial, sans-serif; font-size: 13px; padding: 40px; max-width: 800px; margin: 0 auto; }
  h1 { color: #CC0001; font-size: 18px; }
  .sub { color: #666; font-size: 12px; }
  pre { white-space: pre-wrap; line-height: 1.7; }
</style></head>
<body>
  <h1>CN-GPT Data Analytics Agent</h1>
  <div class="sub">CIMB Niaga Business Banking · ${new Date().toLocaleString('id-ID')}</div>
  <hr/>
  <pre>${content}</pre>
</body></html>`;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CN-GPT_${session.title.replace(/[^a-z0-9]/gi,'_')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToWord(session) {
  const lines = [];
  lines.push('CN-GPT Data Analytics Agent — Chat Export');
  lines.push(`Session: ${session.title}`);
  lines.push(`Exported: ${new Date().toLocaleString('id-ID')}`);
  lines.push('');
  session.messages.forEach(m => {
    if (m.role === 'user') lines.push(`YOU: ${m.text}\n`);
    else lines.push(`CN-GPT: [Rich response — ${m.type || 'Response'}]\n`);
  });
  const blob = new Blob([lines.join('\n')], {
    type: 'application/msword'
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CN-GPT_${session.title.replace(/[^a-z0-9]/gi,'_')}.doc`;
  a.click();
  URL.revokeObjectURL(url);
}

export function shareToTeams(session) {
  const text = encodeURIComponent(`CN-GPT Analysis: ${session.title} — ${window.location.href}`);
  window.open(`https://teams.microsoft.com/share?href=${encodeURIComponent(window.location.href)}&msgText=${text}`, '_blank');
}

export function copyToClipboard(text) {
  return navigator.clipboard.writeText(text).catch(() => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  });
}
