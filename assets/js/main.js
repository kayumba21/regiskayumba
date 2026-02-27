/* ============================================================
   MAIN.JS — Entry point: initializes all modules on DOM ready
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();   // run first to avoid flash
    initNavigation();
    initTypingEffect();
    initScrollEffects();
    initContactForm();
    initBackToTop();
    initAnimations();
    initKeyboardShortcuts();
    initAccessibility();
    updateCurrentYear();
});
