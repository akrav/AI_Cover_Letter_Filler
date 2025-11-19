// Inspect a DOCX template and list {{variable}} placeholders
// Usage: node scripts/inspect_template.mjs --templateDocx "/path/to/template.docx"
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const k = argv[i];
    if (k.startsWith('--')) {
      const key = k.slice(2);
      const val = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      args[key] = val;
    }
  }
  if (!args.templateDocx) throw new Error('Missing --templateDocx');
  return args;
}

async function main() {
  const { templateDocx } = parseArgs(process.argv);
  if (!fs.existsSync(templateDocx)) throw new Error(`Template not found: ${templateDocx}`);
  const buffer = fs.readFileSync(templateDocx);
  const { value: html } = await mammoth.convertToHtml({ buffer });
  const text = html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<[^>]+>/g, '');
  const re = /\{\{\s*([A-Za-z0-9_.-]+)\s*\}\}/g;
  const keys = new Set();
  let m;
  while ((m = re.exec(text)) !== null) {
    keys.add(m[1]);
  }
  const list = Array.from(keys);
  console.log(JSON.stringify({ ok: true, count: list.length, variables: list }, null, 2));
}

main().catch(err => {
  console.error('inspect_template failed:', err.message);
  process.exit(1);
});


