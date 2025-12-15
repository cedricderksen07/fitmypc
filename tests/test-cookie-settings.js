const fs = require('fs');
const path = require('path');

function fail(msg){
  console.error('FAIL:', msg);
  process.exit(1);
}

function pass(msg){
  console.log('PASS:', msg);
}

const file = path.join(__dirname, '..', 'cookieconsent-init.js');
if(!fs.existsSync(file)) fail('cookieconsent-init.js not found');
const src = fs.readFileSync(file, 'utf8');

// Check advertising category
if(!/advertising\s*:\s*\{/.test(src)) fail('advertising category not found');
pass('advertising category present');

// Check advertising linked in preferences
if(!/linkedCategory:\s*'advertising'/.test(src)) fail('preferences section for advertising not found');
pass('preferences section linked to advertising');

// Check German translations include keyword
if(!/Tracking- und Werbe-Cookies/.test(src) && !/Werbung & Targeting/.test(src)) fail('German advertising text not found');
pass('German translations for advertising present');

console.log('All static checks passed');
process.exit(0);
