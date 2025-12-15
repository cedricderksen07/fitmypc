(function () {
  const BLOCKER_ID = 'siteBlocker';

  /* =========================
     Helper
  ========================= */

  function hasConsent() {
    try {
      // localStorage (bei dir vorhanden)
      if (localStorage.getItem('cookieConsent') === 'accepted') return true;

      // Cookie-basierte Consent-Tools (cc_cookie etc.)
      if (document.cookie.includes('cc_cookie=')) return true;
      if (document.cookie.includes('cookie_warning_dismissed=true')) return true;

      return false;
    } catch (e) {
      return false;
    }
  }

  function showSiteBlocker() {
    if (document.getElementById(BLOCKER_ID)) return;

    const blocker = document.createElement('div');
    blocker.id = BLOCKER_ID;
    blocker.className = 'site-blocker';

    blocker.style.position = 'fixed';
    blocker.style.inset = '0';
    blocker.style.zIndex = '9999';
    blocker.style.background = 'transparent';
    blocker.style.pointerEvents = 'auto';

    document.body.appendChild(blocker);
    document.body.style.overflow = 'hidden';
  }

  function removeSiteBlocker() {
    const blocker = document.getElementById(BLOCKER_ID);
    if (blocker) blocker.remove();

    document.body.style.overflow = '';
  }

  /* =========================
     INIT (DER WICHTIGE FIX)
  ========================= */

  function init() {
    if (hasConsent()) {
      // ✅ WICHTIG: sofort freigeben
      removeSiteBlocker();
    } else {
      showSiteBlocker();
      waitForConsent();
    }
  }

  /* =========================
     Consent Detection
  ========================= */

  function waitForConsent() {
    const modalSelector =
      '.cm__popup, .cc-window, .cc-popup, .cc-preferences, .cc-modal';

    // Beobachtet DOM-Änderungen (Button-Klicks, Banner-Schließen etc.)
    const observer = new MutationObserver(() => {
      if (hasConsent()) {
        removeSiteBlocker();
        observer.disconnect();
      }
    });

    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    // 🔥 Fail-Safe: selbst wenn kein Banner existiert
    setTimeout(() => {
      if (hasConsent()) {
        removeSiteBlocker();
        observer.disconnect();
      }
    }, 1000);
  }

  /* =========================
     DOM READY
  ========================= */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
