document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initTypingEffect();
    initScrollEffects();
    initExperienceTabs();
    initProjectModals();
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

function initProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');

    const projects = {
        1: { title: 'Number Guessing Game', description: 'A number guessing game where the user uses hints to guess a random number between 1-100 until they guess the correct number.', longDescription: 'This interactive number guessing game challenges users to guess a randomly generated number between 1 and 100. The game provides helpful hints to guide the player toward the correct answer.\n\nKey features include:\n• Random number generation between 1-100\n• Hint system to guide user guesses\n• Score tracking and attempt counting\n• Clean and intuitive user interface\n• Input validation and error handling\n\nThis project demonstrates fundamental programming concepts including loops, conditionals, user input handling, and game logic implementation.', technologies: ['Java'], github: 'https://github.com/kayumba21/Number-Guessing-Game', demo: 'https://github.com/kayumba21/Number-Guessing-Game', image: 'https://i.imgur.com/FjNSjBQ.png' },
        2: { title: 'Bank System', description: 'A simple banking system that lets the user withdraw and deposit money in their bank account with secure transaction handling.', longDescription: 'This banking system simulation provides users with essential banking operations in a secure environment. The system handles basic financial transactions with proper validation and security measures.\n\nCore functionalities include:\n• Account balance management\n• Secure deposit operations\n• Withdrawal with balance validation\n• Transaction history tracking\n• User authentication system\n• Error handling for invalid operations\n\nThe project showcases object-oriented programming principles and demonstrates understanding of financial software requirements and security considerations.', technologies: ['Java'], github: 'https://github.com/kayumba21/Bank-System-Image', demo: 'https://github.com/kayumba21/Bank-System-Image', image: 'https://i.imgur.com/3T5apcF.png' },
        3: { title: 'Employee Management System', description: 'An Employee Management System that counts bonuses according to age and current salary with comprehensive HR features.', longDescription: 'This comprehensive Employee Management System provides HR departments with tools to manage workforce data and calculate compensation packages. The system includes sophisticated bonus calculation algorithms based on employee demographics and performance metrics.\n\nAdvanced features include:\n• Employee profile and data management\n• Age-based bonus calculation algorithms\n• Salary management and payroll integration\n• Performance tracking and evaluation\n• Comprehensive reporting system\n• Data export and import capabilities\n\nThis project demonstrates advanced programming concepts including database management, complex calculations, and enterprise-level software architecture.', technologies: ['Java'], github: 'https://github.com/kayumba21/Employee-Management-System', demo: 'https://github.com/kayumba21/Employee-Management-System', image: 'https://i.imgur.com/lW1cEry.png' },
        4: { title: 'Gaming Console Inventory System', description: 'Inventory Management System for Gaming Consoles that helps manage stock, record new inventory, view console specs and calculate bulk discounts.', longDescription: 'This specialized inventory management system is designed for gaming console retailers and distributors. It provides comprehensive tools for managing gaming hardware inventory with features tailored to the gaming industry.\n\nSpecialized features include:\n• Gaming console inventory tracking\n• Detailed console specifications database\n• Stock level monitoring and alerts\n• Bulk discount calculation system\n• New inventory recording and management\n• Sales reporting and analytics\n\nThe system helps gaming retailers optimize their inventory management while providing customers with detailed product information and competitive pricing through bulk discount features.', technologies: ['Java'], github: 'https://github.com/kayumba21/Gaming-Console-Inventory-System', demo: 'https://github.com/kayumba21/Gaming-Console-Inventory-System', image: 'https://i.imgur.com/2IX2dDY.png' },
        5: { title: 'Museum of Culture', description: 'A simple landing page for a Museum built with modern web technologies featuring elegant design and smooth user experience.', longDescription: 'This elegant museum landing page showcases cultural artifacts and exhibitions through a modern, responsive web design. The project demonstrates advanced front-end development skills and attention to user experience design.\n\nDesign and technical features include:\n• Responsive design for all device types\n• Modern CSS techniques and animations\n• Optimized image galleries and exhibitions\n• Smooth scrolling and navigation\n• Accessibility-compliant design\n• Cross-browser compatibility\n\nThis project highlights expertise in modern web development practices, visual design principles, and creating engaging user experiences for cultural institutions.', technologies: ['HTML', 'CSS', 'JavaScript'], github: 'https://codepen.io/kayumba21/pen/oNVdqNm', demo: 'https://codepen.io/kayumba21/full/oNVdqNm', image: 'https://i.ibb.co/6HZ6Wm9/Allentown-Art-Museum-Gallery01-Discover-Lehigh-Valley-2450c76f-4de5-402c-a060-d0a8ff3b1d37.jpg' },
        6: { title: 'Clock', description: 'A clean clock project with elegant design and smooth animations showcasing modern CSS techniques and responsive design.', longDescription: 'This sophisticated digital clock project demonstrates advanced CSS animation techniques and modern web design principles. The clock features smooth transitions and an elegant interface that adapts to different screen sizes.\n\nTechnical highlights include:\n• Real-time clock functionality with JavaScript\n• Smooth CSS animations and transitions\n• Responsive design for mobile and desktop\n• Modern typography and color schemes\n• Clean, minimalist user interface\n• Cross-browser compatibility\n\nThis project showcases proficiency in front-end technologies and demonstrates attention to detail in creating polished, professional web applications.', technologies: ['HTML', 'CSS'], github: 'https://codepen.io/kayumba21/pen/rNbdqbG', demo: 'https://codepen.io/kayumba21/full/rNbdqbG', image: 'https://i.ibb.co/tKBNThJ/Clock.jpg' },
        7: { title: 'Bouncing Ball Game', description: 'A calming bouncing ball game project with interactive gameplay and smooth animations built using modern web technologies.', longDescription: 'This interactive bouncing ball game provides a relaxing gaming experience with smooth physics-based animations. The project demonstrates game development skills using web technologies and interactive design principles.\n\nGame features include:\n• Physics-based ball movement and collision detection\n• Interactive gameplay with user controls\n• Smooth animations and visual effects\n• Responsive game canvas for different screen sizes\n• Score tracking and game state management\n• Optimized performance for smooth gameplay\n\nThis project showcases game development capabilities using web technologies and demonstrates understanding of physics simulation, user interaction, and performance optimization in browser-based games.', technologies: ['HTML', 'CSS', 'JavaScript'], github: 'https://codepen.io/kayumba21/pen/rNbdqOG', demo: 'https://codepen.io/kayumba21/full/rNbdqOG', image: 'https://i.ibb.co/bgx4DpS/Bouncing-Ball-Game.jpg' }
    };

    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function() {
            const p = projects[this.getAttribute('data-project')];
            if (p && modal && modalBody) {
                modalBody.innerHTML = `
                    <div class="modal-project">
                        <img src="${p.image}" alt="${p.title}" class="modal-project-image">
                        <div class="modal-project-content">
                            <h2 class="modal-project-title">${p.title}</h2>
                            <p class="modal-project-description">${p.description}</p>
                            <div class="modal-project-details">
                                <h3>Project Overview</h3>
                                <div class="modal-project-long-description">${p.longDescription.replace(/\n/g, '<br>')}</div>
                            </div>
                            <div class="modal-project-tech">
                                <h3>Technologies Used</h3>
                                <div class="tech-tags">${p.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                            </div>
                            <div class="modal-project-links">
                                <a href="${p.github}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    View on GitHub
                                </a>
                                ${p.demo !== '#' ? `<a href="${p.demo}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor"><path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12l1.414-1.414A9 9 0 1 1 18.364 5.636zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/><path d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/></svg>
                                    Live Demo
                                </a>` : ''}
                            </div>
                        </div>
                    </div>`;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.getElementById('modal-close')?.addEventListener('click', closeModal);
    document.getElementById('modal-overlay')?.addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) closeModal();
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
