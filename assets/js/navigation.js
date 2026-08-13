function initNavigation() {
    const navbar       = document.getElementById('navbar');
    const navLinks     = document.querySelectorAll('.nav-link');
    const navToggle    = document.getElementById('nav-toggle');
    const navCollapse  = document.getElementById('navbarNav');
    const overlay      = document.getElementById('mobile-menu-overlay');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });

    const closeMenu = () => {
        if (navToggle) {
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
        if (navCollapse) navCollapse.classList.remove('show');
        if (overlay) overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            const isOpen = navCollapse.classList.contains('show');
            if (isOpen) {
                closeMenu();
            } else {
                this.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                if (navCollapse) navCollapse.classList.add('show');
                if (overlay) overlay.classList.add('active');
                document.body.classList.add('menu-open');
            }
        });
    }

    if (overlay) overlay.addEventListener('click', closeMenu);

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navCollapse && navCollapse.classList.contains('show')) closeMenu();
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.slice(1));
                if (target) {
                    const offset = navbar ? navbar.offsetHeight + 8 : 0;
                    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
                    closeMenu();
                }
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const updateActive = () => {
        const offset = navbar ? navbar.offsetHeight : 0;
        const scrollY = window.scrollY + offset + 40;
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
