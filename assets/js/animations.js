/* ============================================================
   ANIMATIONS.JS — Typing effect, scroll reveal, parallax, misc
   ============================================================ */

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

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

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
