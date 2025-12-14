const fs = require('fs');
const vm = require('vm');

// Minimal DOM mock that supports appendChild/getElementById/addEventListener
function createDOM() {
  const nodes = {};
  const body = {
    children: [],
    style: {},
    appendChild(node) {
      this.children.push(node);
      if (node && node.id) nodes[node.id] = node;
    }
  };

  const document = {
    readyState: 'complete',
    body,
    documentElement: { style: {} },
    _listeners: {},
    addEventListener(event, fn) {
      this._listeners[event] = this._listeners[event] || [];
      this._listeners[event].push(fn);
      if (event === 'DOMContentLoaded') fn();
    },
    getElementById(id) {
      return nodes[id] || null;
    },
    querySelector(selector) {
      const key = selector.replace('.', '');
      const search = (node) => {
        if (!node) return null;
        if (node.className && node.className.indexOf(key) !== -1) return node;
        if (node.children && node.children.length) {
          for (const c of node.children) {
            const f = search(c);
            if (f) return f;
          }
        }
        return null;
      };
      return search(body) || null;
    },
    createElement(tag) {
      const el = { tagName: tag.toUpperCase(), style: {}, attributes: {}, listeners: {}, id: undefined };
        el.setAttribute = function (name, value) { this.attributes[name] = value; };
      el.addEventListener = function (name, fn) { this.listeners[name] = this.listeners[name] || []; this.listeners[name].push(fn); };
      el.remove = function () { if (this.id) delete nodes[this.id]; const i = body.children.indexOf(this); if (i > -1) body.children.splice(i, 1); };
      el.children = [];
      el.appendChild = function(child) { this.children.push(child); child.parentNode = this; if (child && child.id) nodes[child.id] = child; };
      el.insertBefore = function(newNode, refNode) { const idx = this.children.indexOf(refNode); if (idx === -1) this.children.push(newNode); else this.children.splice(idx, 0, newNode); newNode.parentNode = this; };
      el.querySelector = function(sel) { const key = sel.replace('.', ''); return this.children.find(c => c && c.className && c.className.indexOf(key) !== -1) || null; };
      el.querySelectorAll = function(sel) {
        const parts = sel.split(',').map(s => s.trim());
        const res = [];
        const walk = (node) => {
          if (!node || !node.children) return;
          node.children.forEach(c => {
            parts.forEach(p => {
              if (p.startsWith('[') && p.endsWith(']')) {
                const attr = p.slice(1, -1);
                const hasAttr = (c.attributes && typeof c.attributes[attr] !== 'undefined') || (typeof c.getAttribute === 'function' && c.getAttribute(attr) !== null);
                if (hasAttr) res.push(c);
              } else {
                if (c.tagName && c.tagName.toLowerCase() === p.toLowerCase()) res.push(c);
              }
            });
            walk(c);
          });
        };
        walk(this);
        return res;
      };
      return el;
    }
  };

  return document;
}

// Stubs for MutationObserver
global.MutationObserver = function(cb) {
  this.observe = function() {};
  this.disconnect = function() {};
};

// CookieConsent stub: capture callbacks so test can call them
global.CookieConsent = {
  _cfg: null,
  run(cfg) { this._cfg = cfg; },
  acceptedCategory() { return false; }
};

const document = createDOM();
  const window = {};
  const console = global.console;

  // add a focusable element inside a main content node so polyfill will affect it
  const mainTest = document.createElement('div'); mainTest.id = 'mainTest';
  const focusLink = document.createElement('a'); focusLink.setAttribute('href', '#'); focusLink.setAttribute('tabindex', '0');
  mainTest.appendChild(focusLink);
  document.body.appendChild(mainTest);

  // Put our test nodes into the created document before loading the script
const context = { window, document, console, MutationObserver, CookieConsent, setTimeout };
vm.createContext(context);

const code = fs.readFileSync('cookieconsent-init.js', 'utf8');
vm.runInContext(code, context);

// Test: siteBlocker should exist and must not have aria-hidden or tabIndex
const siteBlocker = document.getElementById('siteBlocker');
if (!siteBlocker) {
  console.error('FAIL: siteBlocker not created');
  process.exit(1);
}
if (typeof siteBlocker.getAttribute === 'function' && siteBlocker.getAttribute('aria-hidden')) {
  console.error('FAIL: siteBlocker must not have aria-hidden set');
  process.exit(1);
}
if (siteBlocker.hasOwnProperty('tabIndex') && siteBlocker.tabIndex !== undefined && siteBlocker.tabIndex !== null) {
  console.error('FAIL: siteBlocker must not be focusable (no tabIndex)');
  process.exit(1);
}
console.log('PASS: siteBlocker present and not aria-hidden/focusable');

// Verify new categories exist
if (!CookieConsent._cfg || !CookieConsent._cfg.categories || !CookieConsent._cfg.categories.advertising || !CookieConsent._cfg.categories.targeting) {
  console.error('FAIL: New categories not registered');
  process.exit(1);
}
console.log('PASS: advertising and targeting categories registered');

// Verify inert polyfill applied: our mainTest should be recorded in blocked nodes
const blocked = window.__blockedNodes || [];
const mainBlocked = blocked.find(p => p.node && p.node.id === 'mainTest');
if (!mainBlocked) {
  console.error('FAIL: mainTest not blocked');
  process.exit(1);
}
console.log('PASS: mainTest has been blocked (inert polyfill)');

// The focusable child should have been modified (tabindex set to -1)
const focusChild = mainBlocked.node.children && mainBlocked.node.children[0];
const childTab = (focusChild && focusChild.getAttribute) ? focusChild.getAttribute('tabindex') : (focusChild && focusChild.attributes && focusChild.attributes['tabindex']);
if (childTab !== '-1') {
  console.error('FAIL: focusable child not disabled');
  process.exit(1);
}
console.log('PASS: focusable child disabled (tabindex=-1)');

// Simulate user giving consent by calling onFirstConsent
if (CookieConsent._cfg && typeof CookieConsent._cfg.onFirstConsent === 'function') {
  CookieConsent._cfg.onFirstConsent({ cookie: {} });
  if (document.getElementById('siteBlocker')) {
    console.error('FAIL: siteBlocker not removed after onFirstConsent');
    process.exit(1);
  }
  console.log('PASS: siteBlocker removed after onFirstConsent');
} else {
  console.error('FAIL: CookieConsent.onFirstConsent not found');
  process.exit(1);
}

// Test ensureRejectButton + explanations: create a fake modal with buttons and call the helpers
const modal = document.createElement('div');
modal.className = 'cm__popup';
const btnContainer = document.createElement('div');
btnContainer.className = 'cm__buttons';
const btnAll = document.createElement('button'); btnAll.className = 'cm__btn cm__btn--all';
const btnNecessary = document.createElement('button'); btnNecessary.className = 'cm__btn cm__btn--necessary';
btnContainer.appendChild(btnNecessary);
btnContainer.appendChild(btnAll);
modal.appendChild(btnContainer);
document.body.appendChild(modal);

if (typeof window.ensureRejectButton === 'function' && typeof window.ensureButtonExplanations === 'function') {
  window.ensureRejectButton();
  window.ensureButtonExplanations();
  // find the added reject button
  const added = btnContainer.children.find(c => c.className && c.className.indexOf('cm__btn--reject') !== -1);
  if (!added) {
    console.error('FAIL: reject button not added to modal');
    process.exit(1);
  }
  console.log('PASS: reject button injected');

  // check explanations exist for each button container
  const explainExists = btnContainer.children.find(c => c.className && c.className.indexOf('cm__explain') !== -1);
  if (!explainExists) {
    console.error('FAIL: explanation not injected for buttons');
    process.exit(1);
  }
  console.log('PASS: explanations injected for buttons');

  // Simulate GA being present and ensure clicking reject removes it
  window.gtag = function() { return true; };
  window.dataLayer = [];
  const gaScript = document.createElement('script'); gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-TEST'; document.body.appendChild(gaScript);

  // Call the reject handler directly (simulate click)
  const listener = added.listeners && added.listeners.click && added.listeners.click[0];
  if (listener) listener();

  if (window.gtag) {
    console.error('FAIL: gtag not removed after reject');
    process.exit(1);
  }

  const stillHasGaScript = (document.body.children || []).find(c => c && c.src && c.src.indexOf('googletagmanager') !== -1);
  if (stillHasGaScript) {
    console.error('FAIL: GA script not removed after reject');
    process.exit(1);
  }
  console.log('PASS: GA removed after reject');
} else {
  console.error('FAIL: ensureRejectButton/ensureButtonExplanations not available');
  process.exit(1);
}

console.log('All tests passed');
