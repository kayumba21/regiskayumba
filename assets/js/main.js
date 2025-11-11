// ===== MAIN JAVASCRIPT FILE =====

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingEffect();
    initScrollEffects();
    initExperienceTabs();
    initProjectModals();
    initContactForm();
    initBackToTop();
    initAnimations();
    updateCurrentYear();

    // Add keyboard shortcuts
    initKeyboardShortcuts();
});

// ===== NAVIGATION FUNCTIONALITY =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.getElementById('nav-toggle');
    const navbarCollapse = document.getElementById('navbarNav');
    const mobileOverlay = document.getElementById('mobile-menu-overlay');
    
    // Sticky navbar: keep header visible at all times
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Add scrolled class for styling, but never hide the navbar
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Ensure navbar is always visible
        navbar.style.transform = 'translateY(0)';
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navbarCollapse.classList.toggle('show');
        mobileOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close mobile menu when clicking overlay
    mobileOverlay.addEventListener('click', function() {
        navToggle.classList.remove('active');
        navbarCollapse.classList.remove('show');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navToggle.classList.remove('active');
                navbarCollapse.classList.remove('show');
                mobileOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navToggle.classList.remove('active');
                        navMenu.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
    const typingElement = document.getElementById('typing-text');
    if (!typingElement) return;

    const text = 'Igirimbabazi Kayumba Regis';
    const speed = 100; // milliseconds per character
    const pauseTime = 2000; // pause at the end

    let index = 0;
    typingElement.textContent = '';

    function typeCharacter() {
        if (index < text.length) {
            typingElement.textContent += text.charAt(index);
            index++;
            setTimeout(typeCharacter, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, pauseTime);
        }
    }

    // Start typing effect after a short delay
    setTimeout(typeCharacter, 500);
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.about-content, .experience-content, .projects-grid, .contact-content');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(2rem)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');

        if (heroSection) {
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        }
    });
}

// ===== EXPERIENCE TABS =====
function initExperienceTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to clicked button and corresponding panel
            this.classList.add('active');
            const targetPanel = document.getElementById(targetTab);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });
}

// ===== PROJECT MODALS =====
function initProjectModals() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    // Project data
    const projectData = {
        1: {
            title: 'Number Guessing Game',
            description: 'A number guessing game where the user uses hints to guess a random number between 1-100 until they guess the correct number.',
            longDescription: `This interactive number guessing game challenges users to guess a randomly generated number between 1 and 100. The game provides helpful hints to guide the player toward the correct answer.

            Key features include:
            • Random number generation between 1-100
            • Hint system to guide user guesses
            • Score tracking and attempt counting
            • Clean and intuitive user interface
            • Input validation and error handling

            This project demonstrates fundamental programming concepts including loops, conditionals, user input handling, and game logic implementation.`,
            technologies: ['Java'],
            github: 'https://github.com/kayumba21/Number-Guessing-Game',
            demo: 'https://github.com/kayumba21/Number-Guessing-Game',
            image: 'https://i.imgur.com/FjNSjBQ.png'
        },
        2: {
            title: 'Bank System',
            description: 'A simple banking system that lets the user withdraw and deposit money in their bank account with secure transaction handling.',
            longDescription: `This banking system simulation provides users with essential banking operations in a secure environment. The system handles basic financial transactions with proper validation and security measures.

            Core functionalities include:
            • Account balance management
            • Secure deposit operations
            • Withdrawal with balance validation
            • Transaction history tracking
            • User authentication system
            • Error handling for invalid operations

            The project showcases object-oriented programming principles and demonstrates understanding of financial software requirements and security considerations.`,
            technologies: ['Java'],
            github: 'https://github.com/kayumba21/Bank-System-Image',
            demo: 'https://github.com/kayumba21/Bank-System-Image',
            image: 'https://i.imgur.com/3T5apcF.png'
        },
        3: {
            title: 'Employee Management System',
            description: 'An Employee Management System that counts bonuses according to age and current salary with comprehensive HR features.',
            longDescription: `This comprehensive Employee Management System provides HR departments with tools to manage workforce data and calculate compensation packages. The system includes sophisticated bonus calculation algorithms based on employee demographics and performance metrics.

            Advanced features include:
            • Employee profile and data management
            • Age-based bonus calculation algorithms
            • Salary management and payroll integration
            • Performance tracking and evaluation
            • Comprehensive reporting system
            • Data export and import capabilities

            This project demonstrates advanced programming concepts including database management, complex calculations, and enterprise-level software architecture.`,
            technologies: ['Java'],
            github: 'https://github.com/kayumba21/Employee-Management-System',
            demo: 'https://github.com/kayumba21/Employee-Management-System',
            image: 'https://i.imgur.com/lW1cEry.png'
        },
        4: {
            title: 'Gaming Console Inventory System',
            description: 'Inventory Management System for Gaming Consoles that helps manage stock, record new inventory, view console specs and calculate bulk discounts.',
            longDescription: `This specialized inventory management system is designed for gaming console retailers and distributors. It provides comprehensive tools for managing gaming hardware inventory with features tailored to the gaming industry.

            Specialized features include:
            • Gaming console inventory tracking
            • Detailed console specifications database
            • Stock level monitoring and alerts
            • Bulk discount calculation system
            • New inventory recording and management
            • Sales reporting and analytics

            The system helps gaming retailers optimize their inventory management while providing customers with detailed product information and competitive pricing through bulk discount features.`,
            technologies: ['Java'],
            github: 'https://github.com/kayumba21/Gaming-Console-Inventory-System',
            demo: 'https://github.com/kayumba21/Gaming-Console-Inventory-System',
            image: 'https://i.imgur.com/2IX2dDY.png'
        },
        5: {
            title: 'Museum of Culture',
            description: 'A simple landing page for a Museum built with modern web technologies featuring elegant design and smooth user experience.',
            longDescription: `This elegant museum landing page showcases cultural artifacts and exhibitions through a modern, responsive web design. The project demonstrates advanced front-end development skills and attention to user experience design.

            Design and technical features include:
            • Responsive design for all device types
            • Modern CSS techniques and animations
            • Optimized image galleries and exhibitions
            • Smooth scrolling and navigation
            • Accessibility-compliant design
            • Cross-browser compatibility

            This project highlights expertise in modern web development practices, visual design principles, and creating engaging user experiences for cultural institutions.`,
            technologies: ['HTML', 'CSS', 'JavaScript'],
            github: 'https://codepen.io/kayumba21/pen/oNVdqNm',
            demo: 'https://codepen.io/kayumba21/full/oNVdqNm',
            image: 'https://i.ibb.co/6HZ6Wm9/Allentown-Art-Museum-Gallery01-Discover-Lehigh-Valley-2450c76f-4de5-402c-a060-d0a8ff3b1d37.jpg'
        },
        6: {
            title: 'Clock',
            description: 'A clean clock project with elegant design and smooth animations showcasing modern CSS techniques and responsive design.',
            longDescription: `This sophisticated digital clock project demonstrates advanced CSS animation techniques and modern web design principles. The clock features smooth transitions and an elegant interface that adapts to different screen sizes.

            Technical highlights include:
            • Real-time clock functionality with JavaScript
            • Smooth CSS animations and transitions
            • Responsive design for mobile and desktop
            • Modern typography and color schemes
            • Clean, minimalist user interface
            • Cross-browser compatibility

            This project showcases proficiency in front-end technologies and demonstrates attention to detail in creating polished, professional web applications.`,
            technologies: ['HTML', 'CSS'],
            github: 'https://codepen.io/kayumba21/pen/rNbdqbG',
            demo: 'https://codepen.io/kayumba21/full/rNbdqbG',
            image: 'https://i.ibb.co/tKBNThJ/Clock.jpg'
        },
        7: {
            title: 'Bouncing Ball Game',
            description: 'A calming bouncing ball game project with interactive gameplay and smooth animations built using modern web technologies.',
            longDescription: `This interactive bouncing ball game provides a relaxing gaming experience with smooth physics-based animations. The project demonstrates game development skills using web technologies and interactive design principles.

            Game features include:
            • Physics-based ball movement and collision detection
            • Interactive gameplay with user controls
            • Smooth animations and visual effects
            • Responsive game canvas for different screen sizes
            • Score tracking and game state management
            • Optimized performance for smooth gameplay

            This project showcases game development capabilities using web technologies and demonstrates understanding of physics simulation, user interaction, and performance optimization in browser-based games.`,
            technologies: ['HTML', 'CSS', 'JavaScript'],
            github: 'https://codepen.io/kayumba21/pen/rNbdqOG',
            demo: 'https://codepen.io/kayumba21/full/rNbdqOG',
            image: 'https://i.ibb.co/bgx4DpS/Bouncing-Ball-Game.jpg'
        }
    };

    // Open modal
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectData[projectId];

            if (project && modal && modalBody) {
                modalBody.innerHTML = `
                    <div class="modal-project">
                        <img src="${project.image}" alt="${project.title}" class="modal-project-image">
                        <div class="modal-project-content">
                            <h2 class="modal-project-title">${project.title}</h2>
                            <p class="modal-project-description">${project.description}</p>
                            <div class="modal-project-details">
                                <h3>Project Overview</h3>
                                <div class="modal-project-long-description">${project.longDescription.replace(/\n/g, '<br>')}</div>
                            </div>
                            <div class="modal-project-tech">
                                <h3>Technologies Used</h3>
                                <div class="tech-tags">
                                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                            <div class="modal-project-links">
                                <a href="${project.github}" class="btn btn-primary" target="_blank" rel="noopener noreferrer">
                                    <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    View on GitHub
                                </a>
                                ${project.demo !== '#' ? `
                                    <a href="${project.demo}" class="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                                        <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.364 5.636L16.95 7.05A7 7 0 1 0 19 12l1.414-1.414A9 9 0 1 1 18.364 5.636zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10z"/>
                                            <path d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"/>
                                        </svg>
                                        Live Demo
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                `;

                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModal);
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = form?.querySelector('.form-submit');
    const btnText = submitBtn?.querySelector('.btn-text');
    const btnLoading = submitBtn?.querySelector('.btn-loading');

    if (!form) return;

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Clear previous errors
        clearFormErrors();

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            subject: formData.get('subject'),
            message: formData.get('message')
        };

        // Validate form
        if (!validateForm(data)) {
            return;
        }

        // Show loading state
        if (submitBtn && btnText && btnLoading) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
        }

        try {
            // Submit to Formspree
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                showFormStatus('Thank you for your message! I\'ll get back to you soon.', 'success');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }

        } catch (error) {
            // Show error message
            showFormStatus('Sorry, there was an error sending your message. Please try again.', 'error');
        } finally {
            // Reset button state
            if (submitBtn && btnText && btnLoading) {
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                const form = document.querySelector("form");
                const btnText = form.querySelector(".btn-text");
                const btnLoading = form.querySelector(".btn-loading");

  form.addEventListener("submit", function () {
    btnText.style.display = "none";
    btnLoading.style.display = "inline";
  });
            }
        }
    });

    function validateForm(data) {
        let isValid = true;

        // Name validation
        if (!data.name || data.name.trim().length < 2) {
            showFieldError('name', 'Please enter a valid name (at least 2 characters)');
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            showFieldError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Subject validation
        if (!data.subject || data.subject.trim().length < 3) {
            showFieldError('subject', 'Please enter a subject (at least 3 characters)');
            isValid = false;
        }

        // Message validation
        if (!data.message || data.message.trim().length < 10) {
            showFieldError('message', 'Please enter a message (at least 10 characters)');
            isValid = false;
        }

        return isValid;
    }

    function showFieldError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    function clearFormErrors() {
        const errorElements = form.querySelectorAll('.form-error');
        errorElements.forEach(element => {
            element.textContent = '';
        });
    }

    function showFormStatus(message, type) {
        if (formStatus) {
            formStatus.textContent = message;
            formStatus.className = `form-status ${type}`;
            formStatus.style.display = 'block';

            // Hide status after 5 seconds
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    }


}

// ===== BACK TO TOP BUTTON =====
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return;

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Add stagger animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });

        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== KEYBOARD SHORTCUTS =====
function initKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Press 'R' to scroll to resume/CV
        if (e.key.toLowerCase() === 'r' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            const resumeBtn = document.querySelector('.resume-btn');
            if (resumeBtn && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                resumeBtn.click();
            }
        }

        // Press 'H' to scroll to home
        if (e.key.toLowerCase() === 'h' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }

        // Press 'C' to scroll to contact
        if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.altKey && !e.metaKey) {
            const contactSection = document.getElementById('contact');
            if (contactSection && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
}

// ===== UTILITY FUNCTIONS =====
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== LOADING ANIMATION =====
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;

    document.body.appendChild(loadingOverlay);

    // Hide loading after page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 1000);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== ACCESSIBILITY ENHANCEMENTS =====
function initAccessibility() {
    // Focus management for modal
    const modal = document.getElementById('project-modal');
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

    if (modal) {
        modal.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                const focusableContent = modal.querySelectorAll(focusableElements);
                const firstFocusableElement = focusableContent[0];
                const lastFocusableElement = focusableContent[focusableContent.length - 1];

                if (e.shiftKey) {
                    if (document.activeElement === firstFocusableElement) {
                        lastFocusableElement.focus();
                        e.preventDefault();
                    }
                } else {
                    if (document.activeElement === lastFocusableElement) {
                        firstFocusableElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });
    }

    // Announce page changes to screen readers
    function announcePageChange(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = message;

        document.body.appendChild(announcement);

        setTimeout(() => {
            document.body.removeChild(announcement);
        }, 1000);
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initAccessibility);

// ===== CSS FOR DYNAMIC ELEMENTS =====
// Add dynamic styles for JavaScript-generated elements
const dynamicStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    }

    .loading-spinner {
        text-align: center;
        color: var(--text-primary);
    }

    .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid var(--border-color);
        border-top: 3px solid var(--accent-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    .modal-project-image {
        width: 100%;
        height: 300px;
        object-fit: cover;
        border-radius: var(--radius-lg);
        margin-bottom: var(--space-xl);
    }

    .modal-project-title {
        font-family: var(--font-heading);
        font-size: var(--font-size-3xl);
        color: var(--text-primary);
        margin-bottom: var(--space-md);
    }

    .modal-project-description {
        font-size: var(--font-size-lg);
        color: var(--text-secondary);
        margin-bottom: var(--space-xl);
        line-height: 1.6;
    }

    .modal-project-details h3,
    .modal-project-tech h3 {
        font-family: var(--font-heading);
        font-size: var(--font-size-xl);
        color: var(--text-primary);
        margin-bottom: var(--space-md);
        margin-top: var(--space-xl);
    }

    .modal-project-long-description {
        color: var(--text-secondary);
        line-height: 1.7;
        margin-bottom: var(--space-xl);
    }

    .modal-project-links {
        display: flex;
        gap: var(--space-lg);
        margin-top: var(--space-xl);
        flex-wrap: wrap;
    }

    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);
