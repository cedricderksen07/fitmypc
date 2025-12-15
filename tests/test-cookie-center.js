const fs = require('fs');
const path = require('path');

function fail(msg){
  console.error('FAIL:', msg);
  process.exit(1);
}
function pass(msg){
  console.log('PASS:', msg);
}

const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
if(!/left:\s*50%\s*!important/.test(css)) fail('cm__popup not centered (left)');
pass('cm__popup has left:50% !important');
if(!/top:\s*50%\s*!important/.test(css)) fail('cm__popup not centered (top)');
pass('cm__popup has top:50% !important');
if(!/transform:\s*translate\(-50%,\s*-50%\)\s*!important/.test(css)) fail('cm__popup transform not set');
pass('cm__popup transform is set');

console.log('Center CSS checks passed');
process.exit(0);
