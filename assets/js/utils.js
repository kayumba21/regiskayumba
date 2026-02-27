/* ============================================================
   UTILS.JS — Theme toggle, contact form, keyboard shortcuts,
              accessibility helpers, and misc utilities
   ============================================================ */

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const moon   = toggle.querySelector('.moon-icon');
    const sun    = toggle.querySelector('.sun-icon');

    // Determine initial theme:
    // 1. User's saved preference, 2. OS preference, 3. Default dark
    function getPreferredTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function applyTheme(theme, animate) {
        const isLight = theme === 'light';

        // Apply to both html and body for maximum CSS compatibility
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);

        // Swap icons with a tiny cross-fade
        if (animate) {
            toggle.style.transform = 'scale(0.8)';
            setTimeout(() => { toggle.style.transform = ''; }, 200);
        }

        moon.style.display = isLight ? 'none'  : 'block';
        sun.style.display  = isLight ? 'block' : 'none';
    }

    // Apply on load (no animation)
    applyTheme(getPreferredTheme(), false);

    // Toggle on click
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next    = current === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', next);
        applyTheme(next, true);
    });

    // Automatically follow OS changes (if no manual preference saved)
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'light' : 'dark', true);
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const showError  = (field, msg) => { const e = document.getElementById(`${field}-error`); if (e) e.textContent = msg; };
    const clearErrors = () => form.querySelectorAll('.form-error').forEach(e => e.textContent = '');

    const showStatus = (msg, type) => {
        const status = document.getElementById('form-status');
        if (status) {
            status.textContent = msg;
            status.className = `form-status ${type}`;
            status.style.display = 'block';
            setTimeout(() => { status.style.display = 'none'; }, 5000);
        }
    };

    const validate = data => {
        let ok = true;
        if (!data.name    || data.name.trim().length    < 2)  { showError('name',    'Please enter a valid name (at least 2 characters)');    ok = false; }
        if (!data.email   || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showError('email', 'Please enter a valid email address'); ok = false; }
        if (!data.subject || data.subject.trim().length  < 3)  { showError('subject', 'Please enter a subject (at least 3 characters)');    ok = false; }
        if (!data.message || data.message.trim().length  < 10) { showError('message', 'Please enter a message (at least 10 characters)');  ok = false; }
        return ok;
    };

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        clearErrors();

        const fd   = new FormData(form);
        const data = { name: fd.get('name'), email: fd.get('email'), subject: fd.get('subject'), message: fd.get('message') };
        if (!validate(data)) return;

        const btn  = form.querySelector('.form-submit');
        const txt  = btn?.querySelector('.btn-text');
        const load = btn?.querySelector('.btn-loading');

        if (btn) { btn.disabled = true; if (txt) txt.style.display = 'none'; if (load) load.style.display = 'inline'; }

        try {
            const res = await fetch(form.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
            if (res.ok) { showStatus("Thank you! I'll get back to you soon.", 'success'); form.reset(); }
            else throw new Error('Failed');
        } catch {
            showStatus('Sorry, something went wrong. Please try again.', 'error');
        } finally {
            if (btn) { btn.disabled = false; if (txt) txt.style.display = 'inline'; if (load) load.style.display = 'none'; }
        }
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        if (e.key === 'h') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        if (e.key === 'c') { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }
    });
}

function initAccessibility() {
    document.addEventListener('keydown',   () => document.body.classList.add('keyboard-nav'));
    document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));
}

function updateCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}
