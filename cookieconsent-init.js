/**
 * Cookie consent initializer (standalone, robust)
 * - No ES module import (UMD script must be included separately)
 * - Centers modal, blocks page until explicit choice (except on privacy pages)
 */

// If CookieConsent UMD isn't available, warn and skip execution.
if (typeof CookieConsent === 'undefined') {
    console.warn('CookieConsent not found. Ensure the UMD build is included before cookieconsent-init.js');
    // Provide a lightweight fallback so privacy pages can attempt to open preferences before the library loads.
    if (typeof window !== 'undefined'){
        window.CookiePrefs = window.CookiePrefs || {};
        if (!window.CookiePrefs.open) {
            window.CookiePrefs.open = function(){
                const start = Date.now();
                const timer = setInterval(()=>{
                    const el = document.querySelector('[data-cc="show-preferencesModal"]');
                    if(el && typeof el.click === 'function'){ clearInterval(timer); el.click(); return; }
                    if (typeof CookieConsent !== 'undefined'){
                        clearInterval(timer);
                        // real init may attach a proper open; try to click again
                        const e2 = document.querySelector('[data-cc="show-preferencesModal"]');
                        if(e2 && typeof e2.click === 'function') e2.click();
                        return;
                    }
                    if(Date.now() - start > 5000){ clearInterval(timer); alert('Cookie-Einstellungen können momentan nicht geöffnet werden.'); }
                }, 250);
            };
        }
    }
} else {
    const isPrivacyPage = (typeof window !== 'undefined' && (/datenschutz\.html$/.test(window.location.pathname) || /impressum\.html$/.test(window.location.pathname)));

    function showSiteBlocker(){
        if(document.getElementById('siteBlocker')) return;
        const d = document.createElement('div');
        d.id = 'siteBlocker';
        d.className = 'site-blocker';
        d.setAttribute('aria-hidden','true');
        document.body.appendChild(d);
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function removeSiteBlocker(){
        const el = document.getElementById('siteBlocker');
        if(el) el.remove();
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    function centerConsentModal(node){
        if(!node || !(node instanceof HTMLElement)) return;
        node.style.setProperty('position','fixed','important');
        node.style.setProperty('left','50%','important');
        node.style.setProperty('top','50%','important');
        node.style.setProperty('right','auto','important');
        node.style.setProperty('bottom','auto','important');
        node.style.setProperty('transform','translate(-50%,-50%)','important');
        node.style.setProperty('z-index','99999','important');
        node.style.setProperty('margin','0','important');
        node.style.setProperty('padding','18px','important');
        node.style.setProperty('box-sizing','border-box','important');
    }

    const modalSelector = '.cm__popup, .cc-window, .cc-popup, .cc-preferences, .cc-modal';
    const mo = new MutationObserver((mutations)=>{
        for(const m of mutations){
            if(m.type === 'childList'){
                for(const n of m.addedNodes){
                    if(n instanceof HTMLElement){
                        if(n.matches(modalSelector)) centerConsentModal(n);
                        n.querySelectorAll && n.querySelectorAll(modalSelector).forEach(centerConsentModal);
                    }
                }
            } else if(m.type === 'attributes' && m.target instanceof HTMLElement){
                const t = m.target;
                const s = (t.getAttribute('style')||'').replace(/\s+/g,'');
                if(s.includes('bottom:0') || t.matches(modalSelector)) centerConsentModal(t);
            }
        }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['style','class'] });
    document.querySelectorAll(modalSelector).forEach(centerConsentModal);

    if (!isPrivacyPage){
        if (document.readyState === 'loading'){
            window.addEventListener('DOMContentLoaded', showSiteBlocker, { once: true });
        } else {
            showSiteBlocker();
        }
    }

    // periodic retry to catch late modifications
    let retries = 0;
    const interval = setInterval(()=>{
        document.querySelectorAll(modalSelector).forEach(centerConsentModal);
        retries += 1;
        if(retries > 30) clearInterval(interval);
    }, 100);

    // Helpers to read stored consent cookie (best-effort)
    function getCookie(name){
        const m = document.cookie.match(new RegExp('(?:^|; )'+name+'=([^;]*)'));
        return m ? decodeURIComponent(m[1]) : null;
    }

    function parseConsentCookie(){
        const raw = getCookie('cc_cookie_demo1');
        if(!raw) return null;
        try{
            return JSON.parse(raw);
        }catch(e){
            // sometimes the cookie may be URL encoded JSON or other format
            try{ return JSON.parse(decodeURIComponent(raw)); }catch(e){ return null; }
        }
    }

    function isCategoryEnabled(cat){
        // Attempt library API
        try{
            if(window.CookieConsent && typeof CookieConsent.get === 'function'){
                const prefs = CookieConsent.get();
                if(prefs && prefs.categories && prefs.categories[cat] && typeof prefs.categories[cat].enabled !== 'undefined'){
                    return !!prefs.categories[cat].enabled;
                }
            }
        }catch(e){}
        // Fallback: read cookie
        const parsed = parseConsentCookie();
        if(parsed && parsed.categories && typeof parsed.categories[cat] !== 'undefined'){
            return !!parsed.categories[cat];
        }
        return false;
    }

    // Analytics provider control
    function loadGoogleAnalytics(){
        if(window.__cc_ga_loaded) return;
        const s = document.createElement('script');
        s.src = 'https://www.googletagmanager.com/gtag/js?id=G-YFM6ZCS2VX';
        s.async = true;
        s.setAttribute('data-cc-analytics','ga');
        document.head.appendChild(s);
        const i = document.createElement('script');
        i.setAttribute('data-cc-analytics','ga');
        i.textContent = "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config','G-YFM6ZCS2VX',{ 'anonymize_ip': true });";
        document.head.appendChild(i);
        window.__cc_ga_loaded = true;
    }

    function disableGoogleAnalytics(){
        document.querySelectorAll('script[data-cc-analytics]').forEach(n=>n.remove());
        window.__cc_ga_loaded = false;
        // clear common GA cookies
        ['_ga','_gid','_gat','_gcl_au'].forEach(c=>{ document.cookie = c + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; });
        try{ delete window.gtag; delete window.dataLayer; }catch(e){}
    }

    // Advertising placeholder control
    function loadAdvertising(){
        if(window.__cc_ads_loaded) return;
        // Placeholder: real ad script should be added here when consent is given
        window.__cc_ads_loaded = true;
    }

    function disableAdvertising(){
        // Remove any advertising scripts we added earlier (marked with data-cc-ad)
        document.querySelectorAll('script[data-cc-ad]').forEach(n=>n.remove());
        window.__cc_ads_loaded = false;
    }

    function applyPreferences(){
        if(isCategoryEnabled('analytics')){
            loadGoogleAnalytics();
        } else {
            disableGoogleAnalytics();
        }
        if(isCategoryEnabled('advertising')){
            loadAdvertising();
        } else {
            disableAdvertising();
        }
    }

    // Enhance buttons in modal: add prominent classes for styling
    function enhanceButtons(root){
        const container = root || document;
        const tryTextMatch = (el, txt) => el && el.textContent && el.textContent.trim().toLowerCase().includes(txt.toLowerCase());
        container.querySelectorAll('button, a').forEach(btn=>{
            if(tryTextMatch(btn,'Alle akzeptieren') || tryTextMatch(btn,'Accept all')) btn.classList.add('cm__btn--accept');
            if(tryTextMatch(btn,'Alles ablehnen') || tryTextMatch(btn,'Reject all') || tryTextMatch(btn,'Reject')) btn.classList.add('cm__btn--reject');
            if(tryTextMatch(btn,'Einstellungen speichern') || tryTextMatch(btn,'Save preferences')) btn.classList.add('cm__btn--save');
        });
    }

    // Apply preferences immediately if user already set them
    try{ applyPreferences(); }catch(e){}

    // Track initial checkbox/radio states inside preferences modal so we can detect
    // when the user enables (adds) an option and adjust the save button style.
    let initialChecks = new WeakMap();
    function captureInitialChecks(root){
        if(!root || !(root instanceof HTMLElement)) return;
        root.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(el=>{
            initialChecks.set(el, !!el.checked);
        });
    }

    function updateSaveButtonState(root){
        const saveBtns = Array.from((root || document).querySelectorAll('button.cm__btn--save, a.cm__btn--save'));
        if(saveBtns.length === 0) return;
        const inputs = Array.from((root || document).querySelectorAll(modalSelector + ' input[type="checkbox"], ' + modalSelector + ' input[type="radio"]'));
        const anyAdded = inputs.some(i => i.checked && initialChecks.get(i) === false);
        saveBtns.forEach(b=>{
            if(anyAdded) b.classList.add('cm__btn--save--active'); else b.classList.remove('cm__btn--save--active');
        });
    }

    // Enhance buttons when modal appears and capture initial checks
    const btnObserver = new MutationObserver((ms)=>{ ms.forEach(m=>{ m.addedNodes && m.addedNodes.forEach(n=>{ if(n instanceof HTMLElement){ if(n.matches && n.matches(modalSelector)) { enhanceButtons(n); captureInitialChecks(n); updateSaveButtonState(n); } n.querySelectorAll && n.querySelectorAll(modalSelector).forEach(el=>{ enhanceButtons(el); captureInitialChecks(el); updateSaveButtonState(el); }); } }); }); });
    btnObserver.observe(document.documentElement,{ childList:true, subtree:true });

    // Build simple footer strings (avoid nested template expressions)
    const deFooter = ' <a href="datenschutz.html">Datenschutzerklärung</a> <a href="impressum.html">Impressum</a>' + (isPrivacyPage ? ' <a href="javascript:history.back()" class="cm__back">Zurück</a>' : '');
    const enFooter = ' <a href="datenschutz.html">Privacy Policy</a> <a href="impressum.html">Impressum</a>' + (isPrivacyPage ? ' <a href="javascript:history.back()" class="cm__back">Back</a>' : '');

    // allow initialisation on demand (e.g. from privacy page) and centralise config
    const consentConfig = {
        // Show on first visit and refresh consent every 30 days
        cookie: { name: 'cc_cookie_demo1', expiresAfterDays: 30 },
        guiOptions: {
            consentModal: { layout: 'box inline', flipButtons: false },
            preferencesModal: { layout: 'box', position: 'left', flipButtons: false }
        },
        onFirstConsent: () => { removeSiteBlocker(); applyPreferences(); resetInitialChecks(); },
        onConsent: () => { removeSiteBlocker(); applyPreferences(); resetInitialChecks(); },
        onChange: () => { removeSiteBlocker(); applyPreferences(); resetInitialChecks(); },
        categories: {
            necessary: { readOnly: true, enabled: true },
            analytics: { autoClear: { cookies: [{ name: /^(_ga|_gid)/ }] } },
            advertising: { enabled: false, autoClear: { cookies: [{ name: /^(_gcl_|_fbp|fr|IDE)/ }] } }
        },
        language: {
            default: 'de',
            translations: {
                de: {
                    consentModal: { title: 'Willkommen — Cookie Einstellungen', description: 'Unsere Website verwendet Tracking- und Werbe-Cookies. Die Verwendung erfolgt nur mit Ihrer Zustimmung. <a href="#privacy-policy" data-cc="show-preferencesModal" class="cc__link">Einstellungen öffnen</a>', acceptAllBtn: 'Alle akzeptieren', acceptNecessaryBtn: 'Alles ablehnen', footer: deFooter },
                    preferencesModal: { title: 'Cookie Einstellungen', acceptAllBtn: 'Alle akzeptieren', acceptNecessaryBtn: 'Alles ablehnen', savePreferencesBtn: 'Einstellungen speichern', closeIconLabel: 'Schließen', sections: [ { title: 'Cookie Verwendung', description: 'Wir verwenden Cookies und ähnliche Technologien, um die Sicherheit der Website zu gewährleisten (z.B. Schutz vor Missbrauch, Lastverteilung), um grundlegende Funktionen wie Warenkorb, Anmeldung und Einstellungen zu ermöglichen, und — nur mit Ihrer Zustimmung — zur Analyse und Personalisierung (siehe unten). Sie können die Zustimmung für Analyse- und Werbezwecke separat erteilen oder ablehnen.' }, { title: 'Unbedingt erforderliche Cookies', description: 'Diese Cookies sind für das Betrieb der Website erforderlich: Session-/Authentifizierungs-Cookies, Lastverteilung, Sicherheits-Cookies (z.B. CSRF-Token) und technisch notwendige Einstellungen. Ohne diese Cookies funktionieren Kernfunktionen (Login, Warenkorb, Sprachwahl) nicht zuverlässig.', linkedCategory: 'necessary' }, { title: 'Analyse & Performance', description: 'Diese Cookies (z.B. Google Analytics) helfen uns, die Nutzung der Website zu analysieren, Seitenladezeiten zu messen und Fehler zu erkennen. Detaillierte Anbieter: Google LLC (Google Analytics) — Zweck: Seitenanalyse; Erhobene Daten: anonymisierte IP, Client-ID, Referrer; Rechtsgrundlage: Einwilligung.', linkedCategory: 'analytics' }, { title: 'Werbung & Targeting', description: 'Diese Cookies (z.B. Google Ads, Facebook Pixel) werden verwendet, um personalisierte Werbung zu liefern und Kampagnenleistung zu messen. Anbieter: Google LLC (Ads), Meta Platforms, Inc. (Facebook Pixel) — Zweck: Targeting & Conversion-Tracking; keine Weitergabe persönlicher Daten durch uns ohne Ihre Zustimmung.', linkedCategory: 'advertising' }, { title: 'Weitere Informationen', description: 'Bei Fragen zu Cookies und Datenschutz informiert unsere Datenschutzerklärung.' } ] }
                },
                en: {
                    consentModal: { title: "Hello traveller, it's cookie time!", description: 'Our website uses tracking cookies to understand how you interact with it. The tracking will be enabled only if you accept explicitly. <a href="#privacy-policy" data-cc="show-preferencesModal" class="cc__link">Manage preferences</a>', acceptAllBtn: 'Accept all', acceptNecessaryBtn: 'Reject all', footer: enFooter },
                    preferencesModal: { title: 'Cookie preferences', acceptAllBtn: 'Accept all', acceptNecessaryBtn: 'Reject all', savePreferencesBtn: 'Save preferences', closeIconLabel: 'Close', sections: [ { title: 'Cookie usage', description: 'For more details, refer to our privacy policy.' }, { title: 'Strictly necessary cookies', description: 'Required for site operation.', linkedCategory: 'necessary' }, { title: 'Performance and analytics cookies', description: 'Help us understand site usage.', linkedCategory: 'analytics' }, { title: 'Advertising & targeting cookies', description: 'Used to deliver personalised ads.', linkedCategory: 'advertising' } ] }
                }
            }
        }
    };

    // initialise consent on demand (exposed API below)
    let consentInitialized = false;
    function initConsent(){
        if(consentInitialized) return;
        CookieConsent.run(consentConfig);
        // after running the library ensure we capture initial state for existing modals
        document.querySelectorAll(modalSelector).forEach(n=>{ captureInitialChecks(n); updateSaveButtonState(n); });
        consentInitialized = true;
    }

    // initialize now on non-privacy pages
    if(!isPrivacyPage) { initConsent(); }

    // expose a small API to allow opening preferences from privacy page
    window.CookiePrefs = window.CookiePrefs || {};
    window.CookiePrefs.open = function(){
        initConsent();
        // try to open preferences modal
        setTimeout(()=>{
            const el = document.querySelector('[data-cc="show-preferencesModal"]');
            if(el && typeof el.click === 'function') el.click();
            // after it's opened, capture state and ensure save button state reflects changes
            setTimeout(()=>{
                const root = document.querySelector(modalSelector);
                if(root) { captureInitialChecks(root); updateSaveButtonState(root); }
            }, 80);
        }, 50);
    };

    // Listen for changes in preferences modal and update save button accordingly
    document.addEventListener('change', (ev)=>{
        const t = ev.target;
        if(!(t instanceof HTMLElement)) return;
        const root = t.closest(modalSelector);
        if(!root) return;
        // ensure we have initial capture for this modal
        if(!initialChecks.has(t)) captureInitialChecks(root);
        updateSaveButtonState(root);
    });

    // When preferences are saved or consent changes, reset captured initial state
    const resetInitialChecks = ()=>{ initialChecks = new WeakMap(); };
    // attach to consent events from the config callbacks
}
