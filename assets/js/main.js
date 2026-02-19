document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTypingEffect();
    initScrollEffects();
    initExperienceTabs();
    initProjectCardExpansion();
    initContactForm();
    initBackToTop();
    initAnimations();
    initThemeToggle();
    initKeyboardShortcuts();
    initAccessibility();
    updateCurrentYear();
});

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navbarCollapse = document.getElementById('navbarNav');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        navbar.classList.toggle('scrolled', scrollTop > 100);
        navbar.style.transform = 'translateY(0)';
    });

    const closeMenu = () => {
        navToggle.classList.remove('active');
        navbarCollapse.classList.remove('show');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarCollapse.classList.toggle('show');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    mobileOverlay.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) {
                    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
                    if (navbarCollapse.classList.contains('show')) closeMenu();
                }
            }
        });
    });
}

function initTypingEffect() {
    const elem = document.getElementById('typing-text');
    if (!elem) return;

    const text = 'Igirimbabazi Kayumba Regis';
    let i = 0;
    elem.textContent = '';

    function type() {
        if (i < text.length) {
            elem.textContent += text.charAt(i++);
            setTimeout(type, 100);
        } else {
            setTimeout(() => elem.style.borderRight = 'none', 2000);
        }
    }
    setTimeout(type, 500);
}

function initScrollEffects() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.about-content, .experience-content, .projects-grid, .contact-content').forEach(el => {
        el.style.cssText = 'opacity:0;transform:translateY(2rem);transition:opacity .6s ease-out,transform .6s ease-out';
        observer.observe(el);
    });

    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero-section');
        if (hero) hero.style.transform = `translateY(${window.pageYOffset * -0.5}px)`;
    });
}

function initExperienceTabs() {
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.tab-button, .tab-panel').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            const panel = document.getElementById(this.getAttribute('data-tab'));
            if (panel) panel.classList.add('active');
        });
    });
}

function initProjectCardExpansion() {
    const featuredCard = document.querySelector('.project-card-featured');
    if (!featuredCard) return;

    const toggleExpanded = () => featuredCard.classList.toggle('is-expanded');

    featuredCard.addEventListener('click', e => {
        if (e.target.closest('a')) return;
        toggleExpanded();
    });
    featuredCard.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpanded();
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const showError = (field, msg) => {
        const err = document.getElementById(`${field}-error`);
        if (err) err.textContent = msg;
    };

    const clearErrors = () => form.querySelectorAll('.form-error').forEach(e => e.textContent = '');

    const showStatus = (msg, type) => {
        const status = document.getElementById('form-status');
        if (status) {
            status.textContent = msg;
            status.className = `form-status ${type}`;
            status.style.display = 'block';
            setTimeout(() => status.style.display = 'none', 5000);
        }
    };

    const validate = data => {
        let valid = true;
        if (!data.name || data.name.trim().length < 2) { showError('name', 'Please enter a valid name (at least 2 characters)'); valid = false; }
        if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) { showError('email', 'Please enter a valid email address'); valid = false; }
        if (!data.subject || data.subject.trim().length < 3) { showError('subject', 'Please enter a subject (at least 3 characters)'); valid = false; }
        if (!data.message || data.message.trim().length < 10) { showError('message', 'Please enter a message (at least 10 characters)'); valid = false; }
        return valid;
    };

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        clearErrors();

        const fd = new FormData(form);
        const data = { name: fd.get('name'), email: fd.get('email'), subject: fd.get('subject'), message: fd.get('message') };

        if (!validate(data)) return;

        const btn = form.querySelector('.form-submit');
        const txt = btn?.querySelector('.btn-text');
        const load = btn?.querySelector('.btn-loading');

        if (btn && txt && load) {
            btn.disabled = true;
            txt.style.display = 'none';
            load.style.display = 'inline';
        }

        try {
            const res = await fetch(form.action, { method: 'POST', body: fd, headers: { 'Accept': 'application/json' } });
            if (res.ok) {
                showStatus("Thank you for your message! I'll get back to you soon.", 'success');
                form.reset();
            } else throw new Error('Form submission failed');
        } catch {
            showStatus('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            if (btn && txt && load) {
                btn.disabled = false;
                txt.style.display = 'inline';
                load.style.display = 'none';
            }
        }
    });
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.scrollY > 300));
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

function initAnimations() {
    document.querySelectorAll('.project-card').forEach((card, i) => card.style.animationDelay = `${i * 0.1}s`);

    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() { this.style.transform = 'translateY(-2px) scale(1.05)'; });
        link.addEventListener('mouseleave', function() { this.style.transform = 'translateY(0) scale(1)'; });
    });

    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size/2}px;top:${e.clientY - rect.top - size/2}px`;
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.altKey || e.metaKey || ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.key.toLowerCase() === 'r') {
            e.preventDefault();
            document.querySelector('.resume-btn')?.click();
        } else if (e.key.toLowerCase() === 'h') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (e.key.toLowerCase() === 'c') {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

function initAccessibility() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;

    modal.addEventListener('keydown', e => {
        if (e.key === 'Tab') {
            const focusable = Array.from(modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                last.focus();
                e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    });
}

function initThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const moon = document.querySelector('.moon-icon');
    const sun = document.querySelector('.sun-icon');
    const theme = localStorage.getItem('theme') || 'dark';

    if (theme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        moon.style.display = 'none';
        sun.style.display = 'block';
    }

    toggle.addEventListener('click', () => {
        const isLight = document.body.getAttribute('data-theme') === 'light';
        document.body[isLight ? 'removeAttribute' : 'setAttribute']('data-theme', isLight ? '' : 'light');
        localStorage.setItem('theme', isLight ? 'dark' : 'light');
        moon.style.display = isLight ? 'block' : 'none';
        sun.style.display = isLight ? 'none' : 'block';
    });
}

function updateCurrentYear() {
    const year = document.getElementById('current-year');
    if (year) year.textContent = new Date().getFullYear();
}
