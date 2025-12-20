/**
 * Cookie consent initializer (standalone, robust)
 * - No ES module import (UMD script must be included separately)
 * - Centers modal, blocks page until explicit choice (except on privacy pages)
 */

// Cookie-Funktionen für GTM-Integration
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

function setCookieAccepted() {
    console.log('✅ Alle Cookies akzeptiert');
    document.cookie = 'cookieAccepted=true; path=/; max-age=31536000';
    document.cookie = 'cookieAnalytics=true; path=/; max-age=31536000';
    document.cookie = 'cookieAdvertising=true; path=/; max-age=31536000';
    
    // Google Consent Mode v2 Update
    gtag('consent', 'update', {
        'analytics_storage': 'granted',
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted'
    });

    // Sende Event an GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'cookie_consent_update',
        cookie_analytics: true,
        cookie_advertising: true,
        cookie_necessary: true
    });
    
    return true;
}

function setCookieRejected() {
    console.log('❌ Alle Cookies abgelehnt');
    document.cookie = 'cookieAccepted=false; path=/; max-age=31536000';
    document.cookie = 'cookieAnalytics=false; path=/; max-age=31536000';
    document.cookie = 'cookieAdvertising=false; path=/; max-age=31536000';
    
    // Google Consent Mode v2 Update
    gtag('consent', 'update', {
        'analytics_storage': 'denied',
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied'
    });

    // Sende Event an GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'cookie_consent_update',
        cookie_analytics: false,
        cookie_advertising: false,
        cookie_necessary: true
    });
    
    return false;
}

function setCookieSettings(analytics, advertising) {
    console.log('⚙️ Cookie-Einstellungen gespeichert:', { analytics: analytics, advertising: advertising });
    document.cookie = 'cookieAccepted=' + (analytics || advertising) + '; path=/; max-age=31536000';
    document.cookie = 'cookieAnalytics=' + analytics + '; path=/; max-age=31536000';
    document.cookie = 'cookieAdvertising=' + advertising + '; path=/; max-age=31536000';
    
    // Google Consent Mode v2 Update
    gtag('consent', 'update', {
        'analytics_storage': analytics ? 'granted' : 'denied',
        'ad_storage': advertising ? 'granted' : 'denied',
        'ad_user_data': advertising ? 'granted' : 'denied',
        'ad_personalization': advertising ? 'granted' : 'denied'
    });

    // Sende Event an GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'cookie_consent_update',
        cookie_analytics: analytics,
        cookie_advertising: advertising,
        cookie_necessary: true
    });
    
    return { analytics: analytics, advertising: advertising };
}

// Site blocker functions
function showSiteBlocker(){
    if(document.getElementById('siteBlocker')) return;
    console.log('🚫 Creating site blocker overlay');
    const d = document.createElement('div');
    d.id = 'siteBlocker';
    d.className = 'site-blocker';
    d.setAttribute('aria-hidden','true');
    document.body.appendChild(d);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Safety timeout: remove blocker after 8 seconds if consent modal fails
    setTimeout(() => {
        if(document.getElementById('siteBlocker')) {
            console.warn('⚠️ Site blocker removed by safety timeout');
            removeSiteBlocker();
        }
    }, 8000);
}

function removeSiteBlocker(){
    console.log('✅ Removing site blocker overlay');
    const el = document.getElementById('siteBlocker');
    if(el) el.remove();
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

// Global function to disable analytics (auch außerhalb des Cookie-Consent verfügbar)
function disableGoogleAnalytics(){
    console.log('❌ Analytics abgelehnt');
    
    // Google Consent Mode v2 Update
    gtag('consent', 'update', {
        'analytics_storage': 'denied'
    });

    // Sende Event an GTM
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({'event': 'analytics_rejected'});
    
    window.__cc_ga_loaded = false;
    
    // Clear common GA cookies
    ['_ga','_gid','_gat','_gcl_au'].forEach(c=>{ 
        document.cookie = c + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'; 
    });
}

function showFallbackNotice(){
    console.warn('⚠️ Cookie Banner konnte nicht geladen werden - zeige statischen Hinweis');
    
    // Entferne den grauen Blocker
    removeSiteBlocker();
    
    // Erstelle statischen Cookie-Hinweis
    const notice = document.createElement('div');
    notice.id = 'cookieFallbackNotice';
    notice.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c3e50;
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 999999;
        max-width: 600px;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.5;
    `;
    notice.innerHTML = `
        <strong style="display: block; margin-bottom: 10px; color: #ffa500;">⚠️ Cookie-Hinweis</strong>
        <p style="margin: 0 0 15px 0;">
            Aus technischen Gründen konnte der Cookie-Banner nicht geladen werden. 
            Diese Website verwendet derzeit nur <strong>technisch notwendige Cookies</strong> 
            für den Betrieb der Seite. Es werden keine Analyse- oder Werbe-Cookies geladen.
        </p>
        <button onclick="document.getElementById('cookieFallbackNotice').remove()" 
                style="background: #1565c0; color: white; border: none; padding: 8px 20px; 
                       border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 600;">
            Verstanden
        </button>
    `;
    document.body.appendChild(notice);
    
    // Stelle sicher, dass keine Analytics geladen werden
    window.__cc_consent_given = false;
    disableGoogleAnalytics();
}

// Main initialization function
function initializeCookieConsent() {
    console.log('🔄 Attempting to initialize Cookie Consent...');
    
    if (typeof CookieConsent === 'undefined') {
        console.warn('⚠️ CookieConsent library not loaded yet, will retry...');
        return false;
    }
    
    console.log('✅ CookieConsent library is available');
    
    const isPrivacyPage = (typeof window !== 'undefined' && (/datenschutz\.html$/.test(window.location.pathname) || /impressum\.html$/.test(window.location.pathname)));
    
    // Show blocker immediately if not on privacy page
    if (!isPrivacyPage) {
        console.log('🚫 Showing site blocker (not a privacy page)');
        showSiteBlocker();
    }
    
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

    // Helpers to read stored consent cookie (best-effort)
    function getCookie(name){
        const m = document.cookie.match(new RegExp('(?:^|; )'+name+'=([^;]*)'));
        return m ? decodeURIComponent(m[1]) : null;
    }

    function parseConsentCookie(){
        const raw = getCookie('cc_cookie_fitmypc_v2');
        if(!raw) return null;
        try{
            return JSON.parse(raw);
        }catch(e){
            // sometimes the cookie may be URL encoded JSON or other format
            try{ return JSON.parse(decodeURIComponent(raw)); }catch(e){ return null; }
        }
    }

    function isCategoryEnabled(cat){
        console.log(`🔍 isCategoryEnabled('${cat}') aufgerufen`);
        // Attempt library API
        try{
            if(window.CookieConsent && typeof CookieConsent.get === 'function'){
                const prefs = CookieConsent.get();
                if(prefs && prefs.categories && prefs.categories[cat] && typeof prefs.categories[cat].enabled !== 'undefined'){
                    const enabled = !!prefs.categories[cat].enabled;
                    return enabled;
                }
            }
        }catch(e){
            console.error('❌ Fehler beim Abrufen via API:', e);
        }
        // Fallback: read cookie
        const parsed = parseConsentCookie();
        if(parsed && parsed.categories && typeof parsed.categories[cat] !== 'undefined'){
            const enabled = !!parsed.categories[cat];
            return enabled;
        }
        return false;
    }

    // Analytics provider control
    function loadGoogleAnalytics(){
        if(window.__cc_ga_loaded) return;
        console.log('✅ Analytics akzeptiert - sende Event an Google Tag Manager');
        
        // Google Consent Mode v2 Update
        gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });

        // Sende Event an GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'event': 'analytics_accepted'});
        
        window.__cc_ga_loaded = true;
    }

    function loadAdvertising(){
        if(window.__cc_ads_loaded) return;
        console.log('✅ Advertising akzeptiert - sende Event an Google Tag Manager');
        
        // Google Consent Mode v2 Update
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        });

        // Sende Event an GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'event': 'advertising_accepted'});
        
        window.__cc_ads_loaded = true;
    }

    function disableAdvertising(){
        console.log('❌ Advertising abgelehnt');
        
        // Google Consent Mode v2 Update
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
        });

        // Sende Event an GTM
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'event': 'advertising_rejected'});
        
        window.__cc_ads_loaded = false;
    }

    function applyPreferences(){
        console.log('🔄 applyPreferences aufgerufen');
        const analyticsEnabled = isCategoryEnabled('analytics');
        const advertisingEnabled = isCategoryEnabled('advertising');
        
        // Erstelle Rückgabeobjekt mit Einstellungen
        const preferences = {
            analytics: analyticsEnabled ? 'accepted' : 'rejected',
            advertising: advertisingEnabled ? 'accepted' : 'rejected'
        };
        
        // Sende individuelle Einstellungen an GTM mit boolean-Werten (GTM-kompatibel)
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'cookie_consent_update',
            cookie_analytics: analyticsEnabled,
            cookie_advertising: advertisingEnabled,
            cookie_necessary: true
        });
        
        if(analyticsEnabled){
            loadGoogleAnalytics();
        } else {
            disableGoogleAnalytics();
        }
        if(advertisingEnabled){
            loadAdvertising();
        } else {
            disableAdvertising();
        }
        
        // Gebe Einstellungen zurück
        return preferences;
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

    const modalSelector = '.cm__popup, .cc-window, .cc-popup, .cc-preferences, .cc-modal';
    
    // Simplified observer: only watch for new nodes to enhance buttons, no aggressive centering
    const btnObserver = new MutationObserver((ms)=>{ 
        ms.forEach(m=>{ 
            m.addedNodes && m.addedNodes.forEach(n=>{ 
                if(n instanceof HTMLElement){ 
                    if(n.matches && n.matches(modalSelector)) { 
                        enhanceButtons(n); 
                        captureInitialChecks(n); 
                        updateSaveButtonState(n); 
                    } 
                    n.querySelectorAll && n.querySelectorAll(modalSelector).forEach(el=>{ 
                        enhanceButtons(el); 
                        captureInitialChecks(el); 
                        updateSaveButtonState(el); 
                    }); 
                } 
            }); 
        }); 
    });
    btnObserver.observe(document.documentElement,{ childList:true, subtree:true });

    // Build simple footer strings (avoid nested template expressions)
    const deFooter = ' <a href="datenschutz.html">Datenschutzerklärung</a> <a href="impressum.html">Impressum</a>' + (isPrivacyPage ? ' <a href="javascript:history.back()" class="cm__back">Zurück</a>' : '');
    const enFooter = ' <a href="datenschutz.html">Privacy Policy</a> <a href="impressum.html">Impressum</a>' + (isPrivacyPage ? ' <a href="javascript:history.back()" class="cm__back">Back</a>' : '');

    // allow initialisation on demand (e.g. from privacy page) and centralise config
    const consentConfig = {
        // Cookie läuft 182 Tage (ca. 6 Monate)
        cookie: { name: 'cc_cookie_fitmypc_v2', expiresAfterDays: 182 },
        guiOptions: {
            consentModal: { layout: 'box inline', flipButtons: false },
            preferencesModal: { layout: 'box', position: 'left', flipButtons: false }
        },
        onFirstConsent: () => { removeSiteBlocker(); applyPreferences(); resetInitialChecks(); },
        onConsent: () => { removeSiteBlocker(); applyPreferences(); resetInitialChecks(); },
        onChange: () => { removeSiteBlocker(); applyPreferences(); resetInitialChecks(); },
        categories: {
            necessary: { readOnly: true, enabled: true },
            analytics: { enabled: false, autoClear: { cookies: [{ name: /^(_ga|_gid)/ }] } },
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
        console.log('🍪 Initializing Cookie Consent...');
        CookieConsent.run(consentConfig);
        // after running the library ensure we capture initial state for existing modals
        document.querySelectorAll(modalSelector).forEach(n=>{ captureInitialChecks(n); updateSaveButtonState(n); });
        consentInitialized = true;
        console.log('✅ Cookie Consent initialized');
    }

    // initialize now on non-privacy pages
    if(!isPrivacyPage) { 
        console.log('🚀 Starting Cookie Consent (not a privacy page)');
        initConsent(); 
    } else {
        console.log('📄 Privacy page detected - Cookie Consent will be loaded on demand');
    }

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
    
    return true;
}

// Retry mechanism with multiple attempts
let retryCount = 0;
const maxRetries = 50; // 50 x 200ms = 10 Sekunden Wartezeit

// Lösche alte Cookie-Versionen beim Laden der Seite
function deleteOldCookies() {
    const oldCookieNames = ['cc_cookie_fitmypc', 'cc_cookie_fitmypc_test']; // v2 entfernt, da dies das aktuelle Cookie ist
    oldCookieNames.forEach(name => {
        document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = name + '=; path=/; domain=' + window.location.hostname + '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

// Lösche alte Cookies sofort
deleteOldCookies();

// Globale Funktion um Cookie-Einstellungen abzufragen (außerhalb der Init-Funktion)
window.getCookiePreferences = function(){
    // Lese Cookie direkt
    function getCookie(name){
        const m = document.cookie.match(new RegExp('(?:^|; )'+name+'=([^;]*)'));
        return m ? decodeURIComponent(m[1]) : null;
    }
    
    const raw = getCookie('cc_cookie_fitmypc_v2');
    if(!raw) {
        return {
            analytics: 'rejected',
            advertising: 'rejected',
            necessary: 'accepted'
        };
    }
    
    try {
        const parsed = JSON.parse(raw);
        return {
            analytics: parsed.categories && parsed.categories.analytics ? 'accepted' : 'rejected',
            advertising: parsed.categories && parsed.categories.advertising ? 'accepted' : 'rejected',
            necessary: 'accepted'
        };
    } catch(e) {
        return {
            analytics: 'rejected',
            advertising: 'rejected',
            necessary: 'accepted'
        };
    }
};

function tryInitialize() {
    console.log(`🔄 Initialization attempt ${retryCount + 1}/${maxRetries}`);
    
    if (initializeCookieConsent()) {
        console.log('✅ Cookie Consent successfully initialized!');
        return;
    }
    
    retryCount++;
    if (retryCount < maxRetries) {
        setTimeout(tryInitialize, 200); // Retry every 200ms
    } else {
        console.error('❌ Failed to initialize Cookie Consent after', maxRetries, 'attempts');
        // Zeige statischen Hinweis statt nur Blocker zu entfernen
        showFallbackNotice();
    }
}

// Start initialization when DOM is ready
if (document.readyState === 'loading') {
    console.log('📄 DOM is loading, waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('✅ DOM ready, starting Cookie Consent initialization');
        setTimeout(tryInitialize, 100); // Small delay to ensure all scripts are loaded
    });
} else {
    console.log('✅ DOM already ready, starting Cookie Consent initialization');
    setTimeout(tryInitialize, 100);
}
