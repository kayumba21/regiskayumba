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

/* ── Theme Toggle ─────────────────────────────────────── */
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

/* ── Navigation ───────────────────────────────────────── */
function initNavigation() {
    const navbar       = document.getElementById('navbar');
    const navLinks     = document.querySelectorAll('.nav-link');
    const navToggle    = document.getElementById('nav-toggle');
    const navCollapse  = document.getElementById('navbarNav');
    const overlay      = document.getElementById('mobile-menu-overlay');

    // Navbar scroll behaviour
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });

    // Close drawer helper
    const closeMenu = () => {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navCollapse.classList.remove('show');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    // Open / close on hamburger click
    navToggle.addEventListener('click', function () {
        const isOpen = navCollapse.classList.contains('show');
        if (isOpen) {
            closeMenu();
        } else {
            this.classList.add('active');
            this.setAttribute('aria-expanded', 'true');
            navCollapse.classList.add('show');
            overlay.classList.add('active');
            document.body.classList.add('menu-open');
        }
    });

    // Close on overlay click
    overlay.addEventListener('click', closeMenu);

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navCollapse.classList.contains('show')) closeMenu();
    });

    // Smooth scroll + close drawer on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.slice(1));
                if (target) {
                    const offset = navbar.offsetHeight + 8;
                    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
                    closeMenu();
                }
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const updateActive = () => {
        const scrollY = window.scrollY + navbar.offsetHeight + 40;
        sections.forEach(section => {
            const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (!link) return;
            const inView = scrollY >= section.offsetTop &&
                           scrollY < section.offsetTop + section.offsetHeight;
            link.classList.toggle('active', inView);
        });
    };
    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
}

/* ── Typing Effect ─────────────────────────────────────── */
function initTypingEffect() {
    const elem = document.getElementById('typing-text');
    if (!elem) return;
    const text = 'Igirimbabazi Kayumba Regis';
    let i = 0;
    elem.textContent = '';

    function type() {
        if (i < text.length) {
            elem.textContent += text.charAt(i++);
            setTimeout(type, 95);
        } else {
            setTimeout(() => { elem.style.borderRight = 'none'; }, 2000);
        }
    }
    setTimeout(type, 600);
}

/* ── Scroll Reveal ─────────────────────────────────────── */
function initScrollEffects() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(
        '.about-content, .experience-content, .projects-grid, .contact-content'
    ).forEach(el => {
        el.style.cssText = 'opacity:0;transform:translateY(2rem);transition:opacity .65s ease-out,transform .65s ease-out';
        observer.observe(el);
    });

    // Subtle hero parallax
    const hero = document.querySelector('.hero-section');
    if (hero) {
        window.addEventListener('scroll', () => {
            hero.style.transform = `translateY(${window.scrollY * -0.3}px)`;
        }, { passive: true });
    }
}

/* ── Contact Form ──────────────────────────────────────── */
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

/* ── Back To Top ───────────────────────────────────────── */
function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Misc Animations ───────────────────────────────────── */
function initAnimations() {
    // Social link hover
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-2px) scale(1.05)'; });
        link.addEventListener('mouseleave', function () { this.style.transform = ''; });
    });

    // Button ripple
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect   = this.getBoundingClientRect();
            const size   = Math.max(rect.width, rect.height);
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

/* ── Keyboard Shortcuts ────────────────────────────────── */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;
        if (e.key === 'h') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        if (e.key === 'c') { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }
    });
}

/* ── Accessibility ─────────────────────────────────────── */
function initAccessibility() {
    document.addEventListener('keydown',   () => document.body.classList.add('keyboard-nav'));
    document.addEventListener('mousedown', () => document.body.classList.remove('keyboard-nav'));
}

/* ── Year ──────────────────────────────────────────────── */
function updateCurrentYear() {
    const el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
}
