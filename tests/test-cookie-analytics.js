const fs = require('fs');
const path = require('path');
function fail(msg){ console.error('FAIL:', msg); process.exit(1); }
function pass(msg){ console.log('PASS:', msg); }
const src = fs.readFileSync(path.join(__dirname, '..', 'cookieconsent-init.js'), 'utf8');

if(!/function loadGoogleAnalytics\(\)/.test(src)) fail('loadGoogleAnalytics missing');
pass('loadGoogleAnalytics present');
if(!/function disableGoogleAnalytics\(\)/.test(src)) fail('disableGoogleAnalytics missing');
pass('disableGoogleAnalytics present');
if(!/function applyPreferences\(\)/.test(src)) fail('applyPreferences missing');
pass('applyPreferences present');
if(!/Google LLC \(Google Analytics\)/.test(src)) fail('provider detail for Google Analytics missing');
pass('provider details include Google Analytics');
console.log('All analytics checks passed');
process.exit(0);
