// Node E2E pipeline runner (URL → cover letter + Q&A exports)
// Usage:
//   node scripts/run_pipeline.mjs --url "<job URL>" --out "./out" [--firstName Adam] [--styleDir ./samples] [--qaManifest ./tests/style/fixtures/dataset_manifest.json] [--topK 5]
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';
import { createDom, loadSharedModules, installChromeStorageMock } from './lib/load_shared_into_dom.mjs';
import { createClient } from '@supabase/supabase-js';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

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
  if (!args.url) throw new Error('Missing --url');
  if (!args.out) throw new Error('Missing --out');
  return args;
}

async function readStyleSamples(styleDir) {
  if (!styleDir) return [];
  const files = fs.readdirSync(styleDir).filter(f => f.endsWith('.txt') || f.endsWith('.md'));
  return files.map(f => fs.readFileSync(path.join(styleDir, f), 'utf8'));
}

async function extractTextFromFile(absPath) {
  const lower = absPath.toLowerCase();
  if (lower.endsWith('.txt') || lower.endsWith('.md')) {
    return fs.readFileSync(absPath, 'utf8');
  }
  if (lower.endsWith('.docx')) {
    const buffer = fs.readFileSync(absPath);
    const { value: html } = await mammoth.convertToHtml({ buffer });
    // strip tags to plain text, preserve paragraph breaks
    return html.replace(/<br\s*\/?>/gi, '\n').replace(/<\/p>/gi, '\n\n').replace(/<[^>]+>/g, '');
  }
  if (lower.endsWith('.pdf')) {
    const buffer = fs.readFileSync(absPath);
    const data = await pdfParse(buffer);
    return data.text || '';
  }
  return '';
}

function walkFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkFiles(p));
    else out.push(p);
  }
  return out;
}

async function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function guessCompanyFromUrl(u) {
  try {
    const { hostname } = new URL(u);
    if (hostname.includes('ashbyhq.com')) {
      const parts = u.split('/').filter(Boolean);
      const idx = parts.findIndex(p => p.includes('ashbyhq.com'));
      const tenant = parts[idx + 1] || 'Company';
      return tenant.charAt(0).toUpperCase() + tenant.slice(1);
    }
    return hostname.split('.').slice(-2, -1)[0];
  } catch {
    return 'Company';
  }
}

async function blobToFile(blob, filePath) {
  const ab = await blob.arrayBuffer();
  fs.writeFileSync(filePath, Buffer.from(ab));
}

async function main() {
  const args = parseArgs(process.argv);
  const url = args.url;
  const outDir = path.resolve(args.out);
  const topK = Number(args.topK || 5);
  const firstName = args.firstName || 'Candidate';
  const ingestDir = args.ingestDir ? path.resolve(args.ingestDir) : null;
  const templateDocx = args.templateDocx ? path.resolve(args.templateDocx) : null;
  await ensureDir(outDir);

  const res = await fetch(url);
  const html = await res.text();
  const dom = createDom(html, url);
  installChromeStorageMock(dom);
  loadSharedModules(dom, path.resolve(repoRoot, '..'));

  const { window } = dom;
  const jd = window.JDExtract.extractJD(window.document, url);
  const companyName = args.company || guessCompanyFromUrl(url);

  // Build a simple evidence set from job page paragraphs
  const quotes = Array.from(window.document.querySelectorAll('p, li'))
    .map(n => n.textContent.trim())
    .filter(Boolean)
    .slice(0, 10)
    .map(q => ({ quote: q, url }));

  // Grounded generation (stub)
  const gen = window.GroundedGeneration.generateDraft(`${jd.title}\n${jd.location}\n${jd.description}`, quotes, ['company_mission']);
  if (gen.error) throw new Error(`Generation failed: ${gen.error}`);
  const draftSnippet = gen.variables[0]?.draft || '';

  // Style profile (optional)
  const samples = await readStyleSamples(args.styleDir);
  const styleProfile = samples.length ? window.StyleProfileBuilder.buildStyleProfile(samples) : { tone: 'neutral', cadence: { bucket: 'medium' } };
  const finalText = window.StyleRewrite.rewriteToStyle(draftSnippet, styleProfile);

  // Ingest style/Q&A from directory recursively (DOCX/PDF/TXT/MD)
  const styleSamples = [];
  const qaPairs = [];
  if (ingestDir && fs.existsSync(ingestDir)) {
    const files = walkFiles(ingestDir).filter(f => /\.(txt|md|docx|pdf)$/i.test(f));
    for (const f of files) {
      try {
        const text = await extractTextFromFile(f);
        if (text) {
          styleSamples.push(text);
          const parsed = window.QAIngestLocal.parsePlainTextToPairs(text);
          parsed.forEach(p => qaPairs.push({ ...p, source: f, company: companyName, date: new Date().toISOString().slice(0,10) }));
        }
      } catch {}
    }
  }

  // Q&A retrieval (optional index + manifest fallback)
  let qaItems = [];
  if (args.qaManifest || qaPairs.length) {
    // Build a trivial index from manifest file paths (plaintext Q/A)
    const pairs = [...qaPairs];
    if (args.qaManifest) {
      const manifest = JSON.parse(fs.readFileSync(path.resolve(args.qaManifest), 'utf8'));
      for (const s of manifest.samples || []) {
        const p = path.resolve(path.dirname(args.qaManifest), s.path);
        if (fs.existsSync(p)) {
          const content = fs.readFileSync(p, 'utf8');
          const parsed = window.QAIngestLocal.parsePlainTextToPairs(content);
          parsed.forEach(pair => pairs.push({ ...pair, company: companyName, date: new Date().toISOString().slice(0, 10) }));
        }
      }
    }
    window.QAIndex.indexQAPairs(pairs);
    const exampleQuestions = ['Why are you interested in this role?', 'Describe a relevant achievement.'];
    for (const q of exampleQuestions) {
      const retrieved = await window.QAIndex.searchNearest(q, topK);
      const qaDraft = window.QAGenerate.generateDraft(q, retrieved);
      qaItems.push({ question: q, draft: qaDraft.draft || qaDraft.variables?.[0]?.draft || '', final: qaDraft.draft || '', citations: qaDraft.citations || [] });
    }
  }

  // Prepare cover letter content (templateDocx if provided, otherwise markdown draft)
  let htmlOut;
  if (templateDocx && fs.existsSync(templateDocx)) {
    const { value: templateHtml } = await mammoth.convertToHtml({ buffer: fs.readFileSync(templateDocx) });
    const variablesMap = {
      first_name: firstName,
      company_name: companyName,
      job_title: jd.title || '',
      location: jd.location || '',
      company_mission: finalText
    };
    if (window.TemplateReplace && window.TemplateReplace.replaceInTemplate) {
      const repl = window.TemplateReplace.replaceInTemplate(templateHtml, variablesMap);
      htmlOut = repl.error ? templateHtml : repl;
    } else {
      htmlOut = templateHtml;
    }
  } else {
    const markdown = `# Cover Letter\n\n${finalText}`;
    htmlOut = window.HtmlRender ? window.HtmlRender.renderHtmlFromMarkdown(markdown) : `<pre>${markdown}</pre>`;
  }

  // Export cover letter DOCX/PDF
  const docxBlob = await window.DocxRender.renderDocxFromHtml(htmlOut);
  const pdfBlob = await window.PdfExport.renderPdfFromHtml(htmlOut);
  const docxName = (window.Naming.buildFilename(firstName, companyName, 'docx'));
  const pdfName = (window.Naming.buildFilename(firstName, companyName, 'pdf'));
  await blobToFile(docxBlob, path.join(outDir, docxName));
  await blobToFile(pdfBlob, path.join(outDir, pdfName));

  // Export Q&A if present
  if (qaItems.length) {
    const qaTitle = `${firstName}'s ${companyName} Q&A`;
    const qaHtml = `<h1>${qaTitle}</h1>` + qaItems.map(it => `<h2>Q: ${it.question}</h2><p>${it.final || it.draft}</p>`).join('');
    const qaDocx = await window.DocxRender.renderDocxFromHtml(qaHtml);
    const qaPdf = await window.PdfExport.renderPdfFromHtml(qaHtml);
    const qaDocxName = window.Naming.buildFilename(firstName, companyName, 'docx').replace('Cover Letter', 'Q&A');
    const qaPdfName = window.Naming.buildFilename(firstName, companyName, 'pdf').replace('Cover Letter', 'Q&A');
    await blobToFile(qaDocx, path.join(outDir, qaDocxName));
    await blobToFile(qaPdf, path.join(outDir, qaPdfName));
  }

  // Save evidence bundle
  const evidence = {
    job: { url, title: jd.title, location: jd.location },
    quotes: quotes.slice(0, 10),
    style_profile: styleProfile,
    qa: qaItems,
    ingest: { dir: ingestDir || null, filesIndexed: (ingestDir ? walkFiles(ingestDir).length : 0) }
  };
  fs.writeFileSync(path.join(outDir, 'evidence.json'), JSON.stringify(evidence, null, 2));

  // Optional: Supabase sync if env vars present
  if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    try {
      const { data: companyRow } = await supabase
        .from('companies')
        .upsert({ name: companyName, website_url: new URL(url).origin }, { onConflict: 'name' })
        .select()
        .single();
      const { data: jobRow } = await supabase
        .from('jobs')
        .insert({ company_id: companyRow?.id, title: jd.title, location: jd.location, description: jd.description?.slice(0, 8000), job_url: url })
        .select()
        .single();
      const { data: sessionRow } = await supabase
        .from('job_sessions')
        .insert({ user_id: null, job_id: jobRow?.id, status: 'approved', notes: 'Node pipeline runner' })
        .select()
        .single();
      await supabase.from('outputs').insert([
        { job_session_id: sessionRow?.id, content: markdown, format: 'markdown', version: 1 }
      ]);
    } catch (e) {
      console.error('Supabase sync skipped due to error:', e.message);
    }
  }

  // Console summary
  console.log(JSON.stringify({
    ok: true,
    url,
    companyName,
    outDir,
    outputs: [docxName, pdfName, ...(qaItems.length ? [docxName.replace('.docx', ' Q&A.docx'), pdfName.replace('.pdf', ' Q&A.pdf')] : [])],
    jd: { title: jd.title, location: jd.location },
    qaCount: qaItems.length
  }, null, 2));
}

main().catch(err => {
  console.error('Pipeline failed:', err);
  process.exit(1);
});


