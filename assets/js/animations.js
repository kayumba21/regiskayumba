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
        '.about-content, .experience-content, .projects-section, .contact-content'
    ).forEach(el => {
        el.style.cssText = 'opacity:0;transform:translateY(1.5rem);transition:opacity .65s ease-out,transform .65s ease-out';
        observer.observe(el);
    });
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (!btn) return;

    function checkScroll() {
        const scrollPosition = window.scrollY + window.innerHeight;
        const totalHeight = document.documentElement.scrollHeight;
        const threshold = 350;
        
        if (scrollPosition >= totalHeight - threshold) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', checkScroll, { passive: true });
    checkScroll();

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initAnimations() {
    document.querySelectorAll('.social-link-noc').forEach(link => {
        link.addEventListener('mouseenter', function () { this.style.transform = 'translateY(-2px)'; });
        link.addEventListener('mouseleave', function () { this.style.transform = ''; });
    });
}
