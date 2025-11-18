/* TICKET-208: Template variable parser */
const VAR_RE = /\{\{([\s\S]*?)\}\}/g;

function parseTokenContent(raw) {
  const parts = raw.trim().split('|').map(s => s.trim()).filter(Boolean);
  const keyRaw = (parts.shift() || '').trim();
  const isOptional = keyRaw.endsWith('?');
  const key = (isOptional ? keyRaw.slice(0, -1) : keyRaw).trim();
  const transforms = [];
  let defaultValue = undefined;
  for (const p of parts) {
    if (p.startsWith('default:')) {
      const m = p.match(/^default:\s*"([^"]*)"\s*$/);
      if (m) defaultValue = m[1];
    } else {
      transforms.push(p);
    }
  }
  return { key, optional: isOptional, transforms, defaultValue };
}

function parsePlaceholders(template) {
  const tokens = [];
  let m;
  while ((m = VAR_RE.exec(template)) !== null) {
    tokens.push({ raw: m[0], ...parseTokenContent(m[1]) });
  }
  return tokens;
}

function validateKeys(tokens) {
  const invalidKeys = [];
  const dupes = new Map();
  const keyRe = /^[a-z0-9_]{1,64}$/;
  for (const t of tokens) {
    if (!keyRe.test(t.key)) invalidKeys.push(t.key);
    dupes.set(t.key, (dupes.get(t.key) || 0) + 1);
  }
  const duplicates = Array.from(dupes.entries()).filter(([, n]) => n > 1).map(([k]) => k);
  return { invalidKeys, duplicates };
}

function detectMissing(tokens, provided) {
  const required = new Set(tokens.filter(t => !t.optional).map(t => t.key));
  for (const k of Object.keys(provided || {})) required.delete(k);
  return Array.from(required);
}

function applyTransforms(value, transforms) {
  let v = value;
  for (const t of transforms || []) {
    if (t === 'upper') v = String(v).toUpperCase();
    else if (t === 'lower') v = String(v).toLowerCase();
    else if (t === 'title') v = String(v).replace(/\b\w+/g, s => s[0].toUpperCase() + s.slice(1).toLowerCase());
    else if (t === 'capitalize') v = String(v).charAt(0).toUpperCase() + String(v).slice(1);
    // unknown transforms ignored
  }
  return v;
}

function replaceVariables(template, provided) {
  const tokens = parsePlaceholders(template);
  const { invalidKeys } = validateKeys(tokens);
  if (invalidKeys.length) {
    return { error: 'invalid_keys', invalidKeys };
  }
  const missing = detectMissing(tokens, provided);
  if (missing.length) {
    return { error: 'missing_required', missingKeys: missing };
  }
  let out = template;
  for (const t of tokens) {
    let v = provided && provided[t.key];
    if ((v === undefined || v === null || v === '') && t.defaultValue !== undefined) {
      v = t.defaultValue;
    }
    if ((v === undefined || v === null) && t.optional) {
      v = '';
    }
    if (v === undefined || v === null) {
      return { error: 'missing_required', missingKeys: [t.key] };
    }
    v = applyTransforms(v, t.transforms);
    out = out.split(t.raw).join(String(v));
  }
  return { content: out };
}

window.TemplateParser = { parsePlaceholders, validateKeys, detectMissing, replaceVariables };


