// Build the deployed dashboard: compile the JSX source (dashboard_src.html) into
// plain-JS index.html so the browser does NOT run Babel at load (was blanking on the
// 400KB+ inline JSX). Requires: npm i @babel/standalone
//   node build.cjs   →  writes index.html
const fs = require('fs');
const babel = require('@babel/standalone');
const src = fs.readFileSync('dashboard_src.html', 'utf8');
const m = src.match(/<script type="text\/babel">([\s\S]*?)<\/script>/);
if (!m) { console.error('no <script type="text/babel"> in dashboard_src.html'); process.exit(1); }
// Force the CLASSIC runtime → emits React.createElement (uses the React UMD global).
// Do NOT use the automatic runtime: Babel 8 emits `import ... from "react/jsx-runtime"`,
// an ESM import in a plain <script> → SyntaxError → blank page.
const compiled = babel.transform(m[1], { presets: [['react', { runtime: 'classic' }]] }).code;
let out = src.replace(m[0], '<script>\n' + compiled + '\n</script>');
out = out.replace(/\s*<script src="https:\/\/unpkg\.com\/@babel\/standalone\/babel\.min\.js"><\/script>/, '');
fs.writeFileSync('index.html', out);
console.log('built index.html (' + out.length + ' chars)');
