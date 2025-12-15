const fs = require('fs');
const path = require('path');
function fail(msg){ console.error('FAIL:', msg); process.exit(1); }
function pass(msg){ console.log('PASS:', msg); }
const src = fs.readFileSync(path.join(__dirname, '..', 'cookieconsent-init.js'), 'utf8');

if(!/datenschutz\.html/.test(src)) fail('datenschutz.html link missing');
pass('datenschutz.html link present');
if(!/impressum\.html/.test(src)) fail('impressum.html link missing');
pass('impressum.html link present');

if(!/if \(!isPrivacyPage\)\s*\{[\s\S]*?CookieConsent\.run\(/.test(src)) fail('CookieConsent.run should be skipped on privacy pages');
pass('CookieConsent.run is conditional on not being a privacy page');
if(/target=\"_blank\"/.test(src) || /rel=\"noopener\"/.test(src)) fail('links should open in same tab and must not include target/_blank or rel noopener');
pass('links open in same tab (no target/_blank) and no rel attribute');

if(!/history\.back\(\)/.test(src)) fail('no history.back() Zurück/Back link present for privacy pages');
pass('history.back() return link present');

console.log('All link checks passed');
process.exit(0);
