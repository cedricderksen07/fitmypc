const fs = require('fs');
const path = require('path');
function fail(msg){ console.error('FAIL:', msg); process.exit(1); }
function pass(msg){ console.log('PASS:', msg); }
const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
if(!/\.cm__btn--accept/.test(css)) fail('accept button CSS missing');
pass('accept button CSS present');
if(!/\.cm__btn--save/.test(css)) fail('save button CSS missing');
pass('save button CSS present');
if(!/\.cm__btn--reject/.test(css)) fail('reject button CSS missing');
pass('reject button CSS present');
console.log('All button CSS checks passed');
process.exit(0);
