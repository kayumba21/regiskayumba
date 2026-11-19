document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initBackToTop();
    initContactForm();
    initKeyboardShortcuts();
    initWebTerminal();
    initFirewallSimulator();
    document.getElementById('current-year').textContent = new Date().getFullYear();
});

/* ===== Experience cards (called from onclick in index.html) ===== */
function toggleTimelineDetail(header) {
    const card = header.parentElement;
    const isOpen = card.classList.contains('active');
    document.querySelectorAll('.timeline-log-card').forEach(c => c.classList.remove('active'));
    if (!isOpen) card.classList.add('active');
}

/* ===== Navigation ===== */
function initNavigation() {
    const navbar      = document.getElementById('navbar');
    const navToggle   = document.getElementById('nav-toggle');
    const navCollapse = document.getElementById('navbarNav');
    const overlay     = document.getElementById('mobile-menu-overlay');
    const sections    = document.querySelectorAll('section[id]');

    const closeMenu = () => {
        navToggle.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navCollapse.classList.remove('show');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    };

    navToggle.addEventListener('click', () => {
        if (navCollapse.classList.contains('show')) return closeMenu();
        navToggle.classList.add('active');
        navToggle.setAttribute('aria-expanded', 'true');
        navCollapse.classList.add('show');
        overlay.classList.add('active');
        document.body.classList.add('menu-open');
    });

    overlay.addEventListener('click', closeMenu);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navCollapse.classList.contains('show')) closeMenu();
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            window.scrollTo({ top: target.offsetTop - navbar.offsetHeight - 8, behavior: 'smooth' });
            closeMenu();
        });
    });

    const onScroll = () => {
        navbar.classList.toggle('scrolled', window.scrollY > 80);
        const y = window.scrollY + navbar.offsetHeight + 40;
        sections.forEach(section => {
            const link = document.querySelector(`.nav-link[href="#${section.id}"]`);
            if (link) link.classList.toggle('active', y >= section.offsetTop && y < section.offsetTop + section.offsetHeight);
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ===== Scroll fade-in + back to top ===== */
function initScrollEffects() {
    const el = document.querySelector('.projects-section');
    el.style.cssText = 'opacity:0;transform:translateY(1.5rem);transition:opacity .65s ease-out,transform .65s ease-out';
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            observer.disconnect();
        }
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    observer.observe(el);
}

function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    const check = () => {
        const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 350;
        btn.classList.toggle('visible', nearBottom);
    };
    window.addEventListener('scroll', check, { passive: true });
    check();
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ===== Contact form ===== */
function initContactForm() {
    const form   = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const btn    = form.querySelector('.form-submit');
    const txt    = btn.querySelector('.btn-text');
    const load   = btn.querySelector('.btn-loading');

    const rules = {
        name:    [v => v.trim().length >= 2,  'Please enter a valid name (at least 2 characters)'],
        email:   [v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Please enter a valid email address'],
        subject: [v => v.trim().length >= 3,  'Please enter a subject (at least 3 characters)'],
        message: [v => v.trim().length >= 10, 'Please enter a message (at least 10 characters)']
    };

    const showStatus = (msg, type) => {
        status.textContent = msg;
        status.className = `form-status-noc ${type}`;
        status.style.display = 'block';
        setTimeout(() => { status.style.display = 'none'; }, 5000);
    };

    const setLoading = on => {
        btn.disabled = on;
        txt.style.display = on ? 'none' : 'inline';
        load.style.display = on ? 'inline' : 'none';
    };

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const fd = new FormData(form);
        let ok = true;
        for (const [field, [test, msg]] of Object.entries(rules)) {
            const valid = test(fd.get(field) || '');
            document.getElementById(`${field}-error`).textContent = valid ? '' : msg;
            if (!valid) ok = false;
        }
        if (!ok) return;

        setLoading(true);
        try {
            const res = await fetch(form.action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } });
            if (!res.ok) throw new Error('Failed');
            showStatus("Thank you! I'll get back to you soon.", 'success');
            form.reset();
        } catch {
            showStatus('Sorry, something went wrong. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    });
}

/* ===== Keyboard shortcuts: h = top, c = contact ===== */
function initKeyboardShortcuts() {
    document.addEventListener('keydown', e => {
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
        if (e.key === 'h') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
        if (e.key === 'c') { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }); }
    });
}

/* ===== Hero terminal ===== */
const TERMINAL_COMMANDS = {
    help: `Available commands:
  <span class="t-cmd">help</span>       - Display this menu
  <span class="t-cmd">clear</span>      - Clear the console screen
  <span class="t-cmd">about</span>      - View Regis's profile information
  <span class="t-cmd">skills</span>     - List technical & professional skills
  <span class="t-cmd">projects</span>   - List featured engineering projects
  <span class="t-cmd">contact</span>    - Show communication channels`,

    about: `<span class="t-green">SYSTEM OWNER:</span> Igirimbabazi Kayumba Regis
<span class="t-green">ROLE:</span> Computer Engineering Student
<span class="t-green">LOCATION:</span> Warsaw, Poland (Vistula University)
<span class="t-green">MISSION:</span> Detecting, analysing and defending against cyber threats.
Experience in IT support, hardware and software troubleshooting, and customer service.`,

    skills: `<span class="t-cyan">--- TECHNICAL CAPABILITIES ---</span>
  [PORT 22]  - <span class="t-green">Network Admin:</span> Cisco IOS, OSPF, HSRP, SVIs, EtherChannel, VLANs, VoIP, WLC Wireless
  [PORT 443] - <span class="t-green">Cyber Security:</span> Cisco ASA Firewall, Access Control Lists (ACL), BPDUGuard, Syslog Monitoring
  [PORT 80]  - <span class="t-green">Development:</span> HTML5, CSS3, JavaScript (basics)
  [PORT 3389] - <span class="t-green">IT Support:</span> Windows &amp; Linux Installation, Hardware Troubleshooting, Active Directory (coursework)`,

    projects: `<span class="t-cyan">--- FEATURED PROJECTS ---</span>
  1. <span class="t-green">Cisco Enterprise Multi-Floor Topology</span>
     - Full enterprise subnetted architecture designed and simulated in Cisco Packet Tracer.`,

    contact: `<span class="t-cyan">--- COMMUNICATION CHANNELS ---</span>
  - <span class="t-green">Email:</span> <a href="mailto:kayumbaregis03@gmail.com" class="t-link">kayumbaregis03@gmail.com</a>
  - <span class="t-green">LinkedIn:</span> <a href="https://rw.linkedin.com/in/kayumba-regis-4846161b8" target="_blank" rel="noopener noreferrer" class="t-link">Connect on LinkedIn</a>
  - <span class="t-green">GitHub:</span> <a href="https://github.com/kayumba21" target="_blank" rel="noopener noreferrer" class="t-link">github.com/kayumba21</a>`
};

function initWebTerminal() {
    const input = document.getElementById('terminal-input');
    const body  = document.getElementById('terminal-body');
    const form  = document.getElementById('terminal-form');

    const escapeHTML = str => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const print = html => {
        const line = document.createElement('div');
        line.className = 'terminal-line output';
        line.innerHTML = html;
        body.appendChild(line);
        body.scrollTop = body.scrollHeight;
    };

    body.parentElement.addEventListener('click', () => input.focus());

    form.addEventListener('submit', e => {
        e.preventDefault();
        const raw = input.value.trim();
        input.value = '';
        if (!raw) return;

        print(`<span class="t-prompt">guest@regis.soc:~$</span> ${escapeHTML(raw)}`);
        const cmd = raw.split(/\s+/)[0].toLowerCase();

        if (cmd === 'clear') body.innerHTML = '';
        else if (Object.hasOwn(TERMINAL_COMMANDS, cmd)) print(TERMINAL_COMMANDS[cmd]);
        else print(`<span class="t-error">Command not found: '${escapeHTML(cmd)}'. Type 'help' for available commands.</span>`);
    });
}

/* ===== Firewall sandbox ===== */
function initFirewallSimulator() {
    const runBtn     = document.getElementById('fw-run-btn');
    const statusText = document.getElementById('fw-status-text');
    const particle   = document.getElementById('fw-packet-particle');
    const firewall   = document.getElementById('fw-node-firewall');
    const server     = document.getElementById('fw-node-server');

    const evaluate = (protocol, source, action) => {
        const allow = action === 'ALLOW';
        if (protocol === '80' || protocol === '443') {
            return allow
                ? [true,  `Public access to Web Server (Port ${protocol}) is permitted.`]
                : [false, `Blocked: Public Port ${protocol} traffic was explicitly disabled.`];
        }
        if (protocol === '22') {
            if (source !== 'admin') return [false, 'DENIED: SSH (Port 22) requests from external network are blocked by standard firewall security posture.'];
            return allow ? [true, 'SSH Access permitted from Authorized IT Admin IP.'] : [false, 'Blocked: Rule override set to DENY.'];
        }
        // ICMP
        if (source !== 'admin') return [false, 'DENIED: Inbound ICMP Echo Requests (Ping) from untrusted external IPs are dropped to prevent reconnaissance.'];
        return allow ? [true, 'ICMP Ping request approved from internal gateway.'] : [false, 'Blocked: ICMP dropped by administrative action.'];
    };

    runBtn.addEventListener('click', () => {
        const protocol = document.getElementById('fw-protocol').value;
        const source   = document.getElementById('fw-source').value;
        const action   = document.getElementById('fw-action').value;

        runBtn.disabled = true;
        statusText.innerHTML = '<span class="t-warn">Dispatching test packet...</span>';

        particle.style.animation = 'none';
        particle.offsetHeight; // restart animation
        firewall.classList.remove('glow-red', 'glow-green');
        server.classList.remove('glow-green');
        particle.style.display = 'block';
        particle.style.animation = 'packetToFw 1.5s forwards linear';

        setTimeout(() => {
            const [allowed, details] = evaluate(protocol, source, action);

            if (!allowed) {
                firewall.classList.add('glow-red');
                particle.style.display = 'none';
                statusText.innerHTML = `<span class="t-error">STATUS: BLOCKED (SECURITY VIOLATION)</span><br>${details}`;
                runBtn.disabled = false;
                return;
            }

            particle.style.animation = 'packetToWeb 1.2s forwards linear';
            firewall.classList.add('glow-green');
            setTimeout(() => {
                server.classList.add('glow-green');
                particle.style.display = 'none';
                statusText.innerHTML = `<span class="t-green">STATUS: ACCEPTED</span><br>${details}`;
                runBtn.disabled = false;
            }, 1200);
        }, 1500);
    });
}
