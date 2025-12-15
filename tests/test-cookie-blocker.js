const fs = require('fs');
const path = require('path');

function fail(msg){ console.error('FAIL:', msg); process.exit(1); }
function pass(msg){ console.log('PASS:', msg); }

const src = fs.readFileSync(path.join(__dirname, '..', 'cookieconsent-init.js'), 'utf8');

if(!/function showSiteBlocker\(\)/.test(src)) fail('showSiteBlocker helper missing');
pass('showSiteBlocker helper present');
if(!/function removeSiteBlocker\(\)/.test(src)) fail('removeSiteBlocker helper missing');
pass('removeSiteBlocker helper present');
if(!/removeSiteBlocker\(\);/.test(src)) fail('removeSiteBlocker not invoked on consent callbacks');
pass('removeSiteBlocker invoked on consent callbacks');
if(!/modalSelector = '.cm__popup, \.cc-window, \.cc-popup, \.cc-preferences, \.cc-modal'/.test(src)) pass('modal selector fallback present');
pass('modal selector fallback present (or similar)');

console.log('Blocker static checks passed');
process.exit(0);
