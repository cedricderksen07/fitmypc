// Clear cookie to ensure banner appears every time (as requested)
document.cookie = 'cc_cookie=; Max-Age=0; path=/';

// Create a site-blocking overlay so the website is not usable until the cookie banner
// has been interacted with. The overlay prevents pointer events and scrolling.
function showSiteBlocker() {
    if (document.getElementById('siteBlocker')) return;
    const blocker = document.createElement('div');
    blocker.id = 'siteBlocker';
    blocker.style.position = 'fixed';
    blocker.style.top = '0';
    blocker.style.left = '0';
    blocker.style.width = '100%';
    blocker.style.height = '100%';
    blocker.style.background = 'transparent';
    blocker.style.zIndex = '90000';
    blocker.style.pointerEvents = 'auto';
    blocker.style.cursor = 'default';
    // Do NOT set aria-hidden on the blocker (accessibility issue when focused).
    // Instead mark main page content as inert/aria-hidden so assistive tech ignores it.
    const blocked = [];
    // helper to set inert or polyfill by disabling focusable children and using aria-hidden
    function setElementInertState(el) {
        const prev = {
            node: el,
            ariaHidden: el.getAttribute ? el.getAttribute('aria-hidden') : null,
            inert: el.inert,
            modifiedFocusables: []
        };

        // Try native inert
        if (typeof el.inert !== 'undefined') {
            try { el.inert = true; } catch (e) {}
            return prev;
        }

        // Polyfill: disable focusable elements and set aria-hidden
        const focusableSel = 'a, button, input, textarea, select, [tabindex]';
        let focusables = [];
        try {
            focusables = el.querySelector ? Array.from(el.querySelectorAll(focusableSel)) : [];
        } catch (e) { focusables = []; }

        focusables.forEach(f => {
            try {
                const getAttr = f.getAttribute ? f.getAttribute('tabindex') : (f.attributes && f.attributes['tabindex']);
                const prevTab = (typeof getAttr !== 'undefined') ? getAttr : null;
                // store previous
                prev.modifiedFocusables.push({ node: f, prevTab: prevTab });
                // set disabled tabindex
                if (f.setAttribute) f.setAttribute('tabindex', '-1'); else if (f.attributes) f.attributes['tabindex'] = '-1';
            } catch (e) {}
        });

        try { el.setAttribute && el.setAttribute('aria-hidden', 'true'); } catch (e) {}
        return prev;
    }

    Array.from((document.body && document.body.children) || []).forEach(el => {
        try {
            // skip scripts, styles, and cookie modal elements
            const tag = (el.tagName || '').toUpperCase();
            if (tag === 'SCRIPT' || tag === 'STYLE') return;
            if (el.classList && (el.classList.contains('cm') || el.classList.contains('cm__popup') || el.classList.contains('cm__buttons'))) return;
            if (el.id === 'siteBlocker') return;

            const prev = setElementInertState(el);
            blocked.push(prev);
        } catch (e) {}
    });
    // remember blocked nodes so we can revert later
    window.__blockedNodes = blocked;

    if (document.body) {
        document.body.appendChild(blocker);
    } else {
        document.addEventListener('DOMContentLoaded', () => document.body.appendChild(blocker));
    }

    // disable scrolling
    document.documentElement.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
}

function removeSiteBlocker() {
    const b = document.getElementById('siteBlocker');
    if (b) b.remove();

    // revert inert/aria-hidden on previously blocked nodes
    try {
        const blocked = window.__blockedNodes || [];
        blocked.forEach(p => {
            try {
                // restore native inert if supported
                if (typeof p.node.inert !== 'undefined') {
                    p.node.inert = p.inert;
                }

                // restore aria-hidden
                if (p.ariaHidden === null || p.ariaHidden === undefined) {
                    p.node.removeAttribute && p.node.removeAttribute('aria-hidden');
                } else {
                    p.node.setAttribute && p.node.setAttribute('aria-hidden', p.ariaHidden);
                }

                // restore modified focusables from polyfill
                if (p.modifiedFocusables && Array.isArray(p.modifiedFocusables)) {
                    p.modifiedFocusables.forEach(m => {
                        try {
                            if (m.prevTab === null || typeof m.prevTab === 'undefined') {
                                m.node.removeAttribute && m.node.removeAttribute('tabindex');
                                if (m.node.attributes) delete m.node.attributes['tabindex'];
                            } else {
                                m.node.setAttribute && m.node.setAttribute('tabindex', m.prevTab);
                            }
                        } catch (e) {}
                    });
                }
            } catch (e) {}
        });
    } catch (e) {}
    window.__blockedNodes = null;

    document.documentElement.style.overflow = '';
    document.body.style.touchAction = '';
}

// Show blocker as soon as possible so the site is blocked until the user interacts
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', showSiteBlocker);
} else {
    showSiteBlocker();
}

CookieConsent.run({
    guiOptions: {
        consentModal: {
            layout: 'box',
            position: 'middle center',
            equalWeightButtons: true,
            flipButtons: false
        },
        preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false
        }
    },
    
    categories: {
        necessary: {
            readOnly: true,
            enabled: true
        },
        analytics: {
            enabled: false,
            autoClear: {
                cookies: [
                    {
                        name: /^_ga/,   // regex: match all cookies starting with '_ga'
                    },
                    {
                        name: '_gid',   // string: exact cookie name
                    }
                ]
            }
        },
        advertising: {
            enabled: false,
            autoClear: {
                cookies: [
                    { name: /^_fbp/ },
                    { name: /^_fbc/ },
                    { name: /^ads_/ }
                ]
            }
        },
        targeting: {
            enabled: false,
            autoClear: {
                cookies: [
                    { name: /^test_cookie/ },
                    { name: /^gcl/ }
                ]
            }
        }
    },

    language: {
        default: 'de',
        autoDetect: 'browser',
        translations: {
            de: {
                consentModal: {
                    title: 'Cookie & Datenschutz',
                    description: 'Wir nutzen Cookies, um Ihre Erfahrung zu verbessern und Analytics zu sammeln. Notwendige Cookies werden in der Regel bis zu 12 Monate gespeichert; Analytics-Cookies bis zu 24 Monate. Detaillierte Informationen zur Speicherdauer und Verarbeitung finden Sie in unserer <a href="datenschutz.html">Datenschutzerklärung</a>.',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Nur notwendig',
                    rejectAllBtn: 'Alles ablehnen',
                    acceptAllExplain: 'Akzeptiert alle Cookies inklusive Analyse, Werbung und Zielgruppenerstellung.',
                    acceptNecessaryExplain: 'Erlaubt nur unbedingt notwendige Cookies für die Funktionsfähigkeit.',
                    rejectAllExplain: 'Lehnt alle nicht-essentiellen Cookies ab (nur notwendige bleiben aktiv).',
                    showPreferencesBtn: 'Einstellungen anpassen'
                },
                preferencesModal: {
                    title: 'Cookie-Einstellungen',
                    acceptAllBtn: 'Alle akzeptieren',
                    acceptNecessaryBtn: 'Nur notwendig',
                    savePreferencesBtn: 'Einstellungen speichern',
                    closeIconLabel: 'Schließen',
                    sections: [
                        {
                            title: 'Notwendige Cookies',
                            description: 'Diese Cookies sind erforderlich damit die Webseite ordnungsgemäß funktioniert. Sie können nicht deaktiviert werden.',
                            linkedCategory: 'necessary'
                        },
                        {
                            title: 'Analytics',
                            description: 'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Webseite nutzen.',
                            linkedCategory: 'analytics'
                        },
                        {
                            title: 'Werbung',
                            description: 'Cookies, die für personalisierte Werbung und Auslieferung von Anzeigen verwendet werden.',
                            linkedCategory: 'advertising'
                        },
                        {
                            title: 'Zielgruppen & Forderungen',
                            description: 'Cookies zur Zielgruppenerstellung und Reichweitenmessung.',
                            linkedCategory: 'targeting'
                        }
                    ]
                }
            }
        }
    },

    onFirstConsent: ({ cookie }) => {
        console.log('Consent given on first visit');
        // Allow site interaction now that the user made a choice
        removeSiteBlocker();
        if (CookieConsent.acceptedCategory('analytics')) {
            loadGoogleAnalytics();
        } else {
            disableAnalytics();
        }
    },

    onConsent: ({ cookie }) => {
        console.log('User preferences saved');
        // Allow site interaction after the user saved preferences
        removeSiteBlocker();
        if (CookieConsent.acceptedCategory('analytics')) {
            loadGoogleAnalytics();
        } else {
            disableAnalytics();
        }
    },

    onChange: ({ changedCategories, changedServices }) => {
        console.log('Cookie preferences changed');
        // If the user has changed preferences, allow site interaction
        removeSiteBlocker();
        if (CookieConsent.acceptedCategory('analytics')) {
            loadGoogleAnalytics();
        } else {
            disableAnalytics();
        }
    }
});

function loadGoogleAnalytics() {
    if (window.gtag) {
        return;
    }
    
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID';
    script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
            dataLayer.push(arguments);
        }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-YOUR_MEASUREMENT_ID', {
            'anonymize_ip': true
        });
    };
    // Append to head if present, otherwise body
    try {
        if (document.head && document.head.appendChild) {
            document.head.appendChild(script);
        } else if (document.body && document.body.appendChild) {
            document.body.appendChild(script);
        }
    } catch (e) {
        console.error('Failed to append GA script', e);
    }
}

// Remove GA script and clear GA variables and cookies to ensure no data is sent
function disableAnalytics() {
    try {
        // remove known GA globals
        try { delete window.gtag; } catch (e) { window.gtag = undefined; }
        try { delete window.dataLayer; } catch (e) { window.dataLayer = undefined; }

        // remove script tags that look like GA
        const children = [];
        if (document.head && document.head.children) children.push(...Array.from(document.head.children));
        if (document.body && document.body.children) children.push(...Array.from(document.body.children));
        children.forEach(ch => {
            try {
                if (ch && ch.tagName && ch.tagName.toUpperCase() === 'SCRIPT' && ch.src && (ch.src.indexOf('googletagmanager') !== -1 || ch.src.indexOf('gtag/js') !== -1 || ch.src.indexOf('google-analytics') !== -1)) {
                    if (typeof ch.remove === 'function') ch.remove();
                }
            } catch (e) {}
        });

        // Clear common GA cookies
        ['_ga', '_gid', '_gcl_au', '_gcl_aw'].forEach(name => {
            try { document.cookie = name + '=; Max-Age=0; path=/'; } catch (e) {}
        });
    } catch (e) {
        console.error('disableAnalytics error', e);
    }
}

// Load analytics if already consented
document.addEventListener('DOMContentLoaded', function() {
    if (typeof CookieConsent !== 'undefined' && CookieConsent.acceptedCategory('analytics')) {
        loadGoogleAnalytics();
    }
});

// Prevent closing the consent modal by clicking the overlay or pressing Escape.
// User must press one of the modal buttons to close ("Alle akzeptieren" / "Nur notwendig" / "Einstellungen anpassen").
document.addEventListener('click', function(e) {
    if (e.target.closest('.cm__overlay')) {
        e.stopImmediatePropagation();
        e.preventDefault();
    }
}, true);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.querySelector('.cm__popup') && document.querySelector('.cm__popup').offsetParent !== null) {
        e.stopImmediatePropagation();
        e.preventDefault();
    }
}, true);

// Trap focus inside the consent modal so keyboard navigation can't move to the page
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    const modal = document.querySelector('.cm__popup');
    if (!modal || modal.offsetParent === null) return;
    const focusable = modal.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) {
        e.preventDefault();
        return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
        last.focus();
        e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === last) {
        first.focus();
        e.preventDefault();
    }
}, true);

// Try to focus the primary consent button when the modal appears so user can press it immediately.
(function focusConsentButton() {
    const tryFocus = () => {
        const btn = document.querySelector('.cm__btn--all') || document.querySelector('.cm__btn--reject') || document.querySelector('.cm__btn--necessary') || document.querySelector('.cm__btn');
        if (btn) {
            btn.focus();
            return true;
        }
        return false;
    };

    const observer = new MutationObserver(() => {
        if (tryFocus()) {
            observer.disconnect();
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    // also try immediately
    tryFocus();
})();

// Ensure a visible "Alles ablehnen" button exists and wired to choose only necessary cookies.
function ensureRejectButton() {
    let btnContainer = document.querySelector('.cm__buttons');
    if (!btnContainer && document.body && document.body.children) {
        btnContainer = Array.from(document.body.children).find(c => c && c.className && c.className.indexOf('cm__buttons') !== -1);
    }
    if (!btnContainer) return;
    if (btnContainer.querySelector && btnContainer.querySelector('.cm__btn--reject')) return; // already added

    const rejectBtn = document.createElement('button');
    rejectBtn.type = 'button';
    rejectBtn.className = 'cm__btn cm__btn--reject';
    rejectBtn.textContent = CookieConsent && CookieConsent._cfg && CookieConsent._cfg.language && CookieConsent._cfg.language.translations && CookieConsent._cfg.language.translations.de && CookieConsent._cfg.language.translations.de.consentModal && CookieConsent._cfg.language.translations.de.consentModal.rejectAllBtn ? CookieConsent._cfg.language.translations.de.consentModal.rejectAllBtn : 'Alles ablehnen';

    rejectBtn.addEventListener('click', function () {
        // First, ensure analytics are disabled and site is unblocked
        try { handleRejectAll(); } catch (e) { console.error(e); }

        // Try to trigger the library's "necessary only" action by clicking the related button
        const necessaryBtn = btnContainer.querySelector('.cm__btn--necessary');
        if (necessaryBtn) {
            if (typeof necessaryBtn.click === 'function') {
                necessaryBtn.click();
            } else if (necessaryBtn.listeners && necessaryBtn.listeners.click) {
                necessaryBtn.listeners.click.forEach(fn => { try { fn(); } catch (e) {} });
            }
        } else {
            // Fallback: simulate saving only necessary categories by manipulating CookieConsent if available
            if (typeof CookieConsent !== 'undefined' && CookieConsent._cfg && CookieConsent._cfg.categories) {
                const cats = CookieConsent._cfg.categories;
                Object.keys(cats).forEach(k => {
                    if (k !== 'necessary') {
                        cats[k].enabled = false;
                    }
                });
            }
            // If the library exposes an API to save preferences, call it; otherwise try to close the modal by clicking first available button.
            const btn = btnContainer.querySelector('.cm__btn--all, .cm__btn');
            if (btn) btn.click();
        }
    });

    // Insert reject button before acceptAll to make it prominent
    const acceptAll = btnContainer.querySelector('.cm__btn--all');
    if (acceptAll) {
        btnContainer.insertBefore(rejectBtn, acceptAll);
    } else {
        btnContainer.appendChild(rejectBtn);
    }
}

// Ensure explanations for buttons are present (idempotent)
function ensureButtonExplanations() {
    const cfg = CookieConsent && CookieConsent._cfg && CookieConsent._cfg.language && CookieConsent._cfg.language.translations && CookieConsent._cfg.language.translations.de && CookieConsent._cfg.language.translations.de.consentModal ? CookieConsent._cfg.language.translations.de.consentModal : {};

    const ensureFor = (btnSel, textKey) => {
        let btn = document.querySelector(btnSel);
        // fallback: search in body children
        if (!btn && document.body && document.body.children) {
            for (const c of document.body.children) {
                if (c && c.className && c.className.indexOf('cm__buttons') !== -1) {
                    if (c.querySelector) btn = c.querySelector(btnSel);
                    else {
                        btn = c.children && c.children.find && c.children.find(ch => ch && ch.className && ch.className.indexOf(btnSel.replace('.', '')) !== -1);
                    }
                }
                if (btn) break;
            }
        }
        if (!btn) return;
        // check if explanation exists as sibling or child
        const parent = btn.parentNode || btn;
        const exists = (parent.children || []).find(ch => ch && ch.className && ch.className.indexOf('cm__explain') !== -1);
        if (exists) return;
        const explain = document.createElement('div');
        explain.className = 'cm__explain';
        explain.textContent = cfg[textKey] || '';
        if (parent.appendChild) parent.appendChild(explain);
        else if (btn.appendChild) btn.appendChild(explain);
    };

    ensureFor('.cm__btn--all', 'acceptAllExplain');
    ensureFor('.cm__btn--necessary', 'acceptNecessaryExplain');
    ensureFor('.cm__btn--reject', 'rejectAllExplain');
}

// Helper to handle full 'reject all' behavior programmatically
function handleRejectAll() {
    // set categories to necessary only if possible
    if (typeof CookieConsent !== 'undefined' && CookieConsent._cfg && CookieConsent._cfg.categories) {
        const cats = CookieConsent._cfg.categories;
        Object.keys(cats).forEach(k => {
            if (k !== 'necessary') cats[k].enabled = false;
        });
    }
    // disable analytics immediately
    disableAnalytics();
    // remove site blocker so the site becomes usable
    try { removeSiteBlocker(); } catch (e) {}
}

// Observe DOM for the modal buttons and ensure reject button and explanations exist
const _rejectObserver = new MutationObserver(() => { ensureRejectButton(); ensureButtonExplanations(); });
_rejectObserver.observe(document.documentElement, { childList: true, subtree: true });

// expose for tests
if (typeof window !== 'undefined') {
    window.ensureRejectButton = ensureRejectButton;
    window.ensureButtonExplanations = ensureButtonExplanations;
    window.handleRejectAll = handleRejectAll;
}
