const fs = require('fs');
const path = require('path');
const src = fs.readFileSync(path.join(__dirname, '..', 'cookieconsent-init.js'), 'utf8');

if(!/attributeFilter: \['style','class'\]/.test(src)){
  console.error('FAIL: MutationObserver not watching style/class attributes'); process.exit(1);
}
console.log('PASS: MutationObserver watches style/class attributes');

if(!/setInterval\([\s\S]*?document\.querySelectorAll\(modalSelector\)/.test(src)){
  console.error('FAIL: periodic centering retry not found'); process.exit(1);
}
console.log('PASS: periodic centering retry present');

const css = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');
if(!/\* Aggressive fallback: override elements positioned bottom-right via inline styles \*/.test(css)){
  console.error('FAIL: aggressive CSS fallback not found'); process.exit(1);
}
console.log('PASS: aggressive CSS fallback present');

if(!/margin:\s*0\s*!important/.test(css) || !/box-sizing:\s*border-box\s*!important/.test(css)){
  console.error('FAIL: modal reset CSS (margin/box-sizing) not present'); process.exit(1);
}
console.log('PASS: modal reset CSS present');

console.log('All aggressive center checks passed');
process.exit(0);
