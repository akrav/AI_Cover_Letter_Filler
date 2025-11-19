import fs from 'fs';
import vm from 'vm';
import path from 'path';
import { JSDOM } from 'jsdom';

export function createDom(html = '<!doctype html><html><head></head><body></body></html>', url = 'https://example.com/') {
  const dom = new JSDOM(html, { url, pretendToBeVisual: true, runScripts: 'outside-only' });
  return dom;
}

function evalFileInWindow(dom, filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const script = new vm.Script(code, { filename: path.basename(filePath) });
  const ctx = dom.getInternalVMContext();
  script.runInContext(ctx);
}

export function installChromeStorageMock(dom) {
  const store = {};
  dom.window.chrome = {
    storage: {
      local: {
        get(keys, cb) {
          if (!keys) return cb({ ...store });
          if (Array.isArray(keys)) {
            const out = {};
            keys.forEach(k => (out[k] = store[k]));
            cb(out);
          } else if (typeof keys === 'object') {
            const out = {};
            Object.keys(keys).forEach(k => (out[k] = store[k] ?? keys[k]));
            cb(out);
          } else {
            cb({ [keys]: store[keys] });
          }
        },
        set(obj, cb) {
          Object.assign(store, obj);
          cb && cb();
        },
        remove(keys, cb) {
          (Array.isArray(keys) ? keys : [keys]).forEach(k => delete store[k]);
          cb && cb();
        }
      }
    },
    runtime: {
      sendMessage() {}
    }
  };
  return store;
}

export function loadSharedModules(dom, repoRoot) {
  const files = [
    'extension/shared/jd_extract.js',
    'extension/shared/stylometry.js',
    'extension/shared/embedding_similarity.js',
    'extension/shared/authorship_classifier.js',
    'extension/shared/style_composite.js',
    'extension/shared/grounded_generation.js',
    'extension/shared/style_profile_builder.js',
    'extension/shared/style_rewrite.js',
    'extension/shared/html_render.js',
    'extension/shared/template_parser.js',
    'extension/shared/template_replace.js',
    'extension/shared/naming.js',
    'extension/shared/pdf_export.js',
    'extension/shared/docx_render.js',
    'extension/shared/qa_normalize.js',
    'extension/shared/qa_ingest_local.js',
    'extension/shared/qa_index.js',
    'extension/shared/qa_generate.js'
  ];
  for (const rel of files) {
    evalFileInWindow(dom, path.join(repoRoot, rel));
  }
}


