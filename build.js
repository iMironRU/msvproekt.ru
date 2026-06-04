#!/usr/bin/env node
const fs   = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const yaml = require('js-yaml');

const ROOT = __dirname;
const SRC  = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');
const DATA = path.join(ROOT, 'data');

// Prepare dist directory
if (fs.existsSync(DIST)) fs.rmSync(DIST, { recursive: true });
fs.mkdirSync(DIST, { recursive: true });

// Load data
const meta = yaml.load(fs.readFileSync(path.join(DATA, 'meta.yml'), 'utf8'));
const site = JSON.parse(fs.readFileSync(path.join(DATA, 'site.json'), 'utf8'));

// Build template context
const context = {
  meta,
  ...site,
  current_year: new Date().getFullYear(),
};

// Compile template → dist/index.html
const templateSrc = fs.readFileSync(path.join(SRC, 'template.html'), 'utf8');
const html = Handlebars.compile(templateSrc)(context);
fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf8');

// Copy all static assets (skip template.html itself)
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === 'template.html') continue;
    const srcPath  = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDir(SRC, DIST);

console.log(`Build complete → dist/  (${new Date().toISOString()})`);
