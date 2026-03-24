/* ============================================================
   NAVIGATION.JS — Navbar scroll, mobile drawer, active links
   ============================================================ */

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
