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
Regis bridges deep hardware/software expertise with operational experience in IT support, customer service, and systems logistics.`,

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
  - <span class="t-green">LinkedIn:</span> <a href="https://rw.linkedin.com/in/kayumba-regis-4846161b8" target="_blank" class="t-link">Connect on LinkedIn</a>
  - <span class="t-green">GitHub:</span> <a href="https://github.com/kayumba21" target="_blank" class="t-link">github.com/kayumba21</a>`
};

function initWebTerminal() {
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    const termForm = document.getElementById('terminal-form');
    
    if (!termInput || !termBody || !termForm) return;

    termBody.parentElement.addEventListener('click', () => {
        termInput.focus();
    });

    termForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rawCmd = termInput.value.trim();
        termInput.value = '';
        
        if (!rawCmd) return;
        
        appendTerminalLine(`<span class="t-prompt">guest@regis.soc:~$</span> ${escapeHTML(rawCmd)}`);
        processCommand(rawCmd);
    });

    function appendTerminalLine(htmlContent, type = 'output') {
        const line = document.createElement('div');
        line.className = `terminal-line ${type}`;
        line.innerHTML = htmlContent;
        termBody.appendChild(line);
        termBody.scrollTop = termBody.scrollHeight;
    }

    function escapeHTML(str) {
        return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    async function processCommand(cmdLine) {
        const parts = cmdLine.split(/\s+/);
        const cmd = parts[0].toLowerCase();
        const args = parts.slice(1);
        
        if (cmd === 'clear') {
            termBody.innerHTML = '';
            return;
        }
        
        if (cmd === 'help') {
            appendTerminalLine(TERMINAL_COMMANDS.help);
            return;
        }
        
        if (cmd === 'about') {
            appendTerminalLine(TERMINAL_COMMANDS.about);
            return;
        }
        
        if (cmd === 'skills') {
            appendTerminalLine(TERMINAL_COMMANDS.skills);
            return;
        }
        
        if (cmd === 'projects') {
            appendTerminalLine(TERMINAL_COMMANDS.projects);
            return;
        }

        if (cmd === 'contact') {
            appendTerminalLine(TERMINAL_COMMANDS.contact);
            return;
        }
        
        appendTerminalLine(`<span class="t-error">Command not found: '${escapeHTML(cmd)}'. Type 'help' for available commands.</span>`);
    }
}
