document.addEventListener('DOMContentLoaded', () => {
    initNocMetrics();
    initSyslogFeed();
    initFirewallSimulator();
});

function initNocMetrics() {
    const cpuEl = document.getElementById('noc-cpu');
    const memEl = document.getElementById('noc-mem');
    const latencyEl = document.getElementById('noc-latency');
    const uptimeEl = document.getElementById('noc-uptime');

    if (!cpuEl || !memEl || !latencyEl || !uptimeEl) return;

    setInterval(() => {
        const mockCpu = (Math.random() * 8 + 14).toFixed(1);
        const mockMem = (Math.random() * 0.3 + 11.8).toFixed(2);
        const mockLatency = (Math.random() * 1.5 + 1.2).toFixed(1);

        cpuEl.textContent = `${mockCpu}%`;
        memEl.textContent = `${mockMem} GB`;
        latencyEl.textContent = `${mockLatency} ms`;
    }, 3000);

    let startTime = Date.now();
    setInterval(() => {
        let diff = Math.floor((Date.now() - startTime) / 1000);
        let hrs = Math.floor(diff / 3600).toString().padStart(2, '0');
        let mins = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
        let secs = (diff % 60).toString().padStart(2, '0');
        uptimeEl.textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
}

const MOCK_SYSLOGS = [
    { type: 'SEC', text: 'ASA-FW: Inbound packet verified; rule TCP/443 MATCH.' },
    { type: 'NET', text: 'OSPF: Adjacency established with neighbor Edge-Router-1 (10.0.0.2) on GigabitEthernet0/0.' },
    { type: 'SYS', text: 'DHCP-SRV: IP address 192.168.10.154 leased to client workstation-mac-7A.' },
    { type: 'NET', text: 'HSRP: SVI Vlan10 Standby router transitioned from active to standby.' },
    { type: 'SEC', text: 'PORT-SEC: BPDUGuard active on GigabitEthernet0/12; status: SECURE.' },
    { type: 'SYS', text: 'SOC-MON: SNMP trap received: CPU Temperature NOMINAL (38C).' },
    { type: 'SEC', text: 'SSH: Management login audit: successful authentication for admin:regis from 192.168.1.100.' },
    { type: 'NET', text: 'LACP: EtherChannel bundle Port-channel1 status updated to active (2 member links).' },
    { type: 'SYS', text: 'IT-SUP: Windows PE OS image deployed successfully to support laboratory lab-B.' },
    { type: 'SEC', text: 'FW-RULE: ICMP ping requests allowed from local networks; external ICMP dropped.' }
];

function initSyslogFeed() {
    const syslogBody = document.getElementById('syslog-feed-body');
    if (!syslogBody) return;

    for (let i = 0; i < 5; i++) {
        addSyslogLine(MOCK_SYSLOGS[Math.floor(Math.random() * MOCK_SYSLOGS.length)], false);
    }

    setInterval(() => {
        const randLog = MOCK_SYSLOGS[Math.floor(Math.random() * MOCK_SYSLOGS.length)];
        addSyslogLine(randLog, true);
    }, 4500);

    function addSyslogLine(logObj, animate) {
        const line = document.createElement('div');
        line.className = 'syslog-line';
        if (animate) line.classList.add('log-fade-in');

        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        
        let typeBadge = '';
        if (logObj.type === 'SEC') typeBadge = `<span class="sl-badge sl-sec">[SEC]</span>`;
        else if (logObj.type === 'NET') typeBadge = `<span class="sl-badge sl-net">[NET]</span>`;
        else typeBadge = `<span class="sl-badge sl-sys">[SYS]</span>`;

        line.innerHTML = `<span class="sl-time">${timeStr}</span> ${typeBadge} <span class="sl-text">${logObj.text}</span>`;
        
        syslogBody.appendChild(line);
        syslogBody.scrollTop = syslogBody.scrollHeight;

        if (syslogBody.children.length > 30) {
            syslogBody.removeChild(syslogBody.firstChild);
        }
    }
}

function initFirewallSimulator() {
    const runBtn = document.getElementById('fw-run-btn');
    if (!runBtn) return;

    runBtn.addEventListener('click', () => {
        const protocol = document.getElementById('fw-protocol').value;
        const source = document.getElementById('fw-source').value;
        const action = document.getElementById('fw-action').value;
        const statusText = document.getElementById('fw-status-text');
        const particle = document.getElementById('fw-packet-particle');
        const firewallNode = document.getElementById('fw-node-firewall');
        const serverNode = document.getElementById('fw-node-server');

        if (!statusText || !particle || !firewallNode || !serverNode) return;

        runBtn.disabled = true;
        statusText.innerHTML = `<span class="t-warn">Dispatching test packet...</span>`;
        
        particle.style.animation = 'none';
        particle.offsetHeight;
        firewallNode.classList.remove('glow-red', 'glow-green');
        serverNode.classList.remove('glow-green');
        particle.style.display = 'block';

        particle.style.animation = 'packetToFw 1.5s forwards linear';

        setTimeout(() => {
            let isAllowed = false;
            let details = '';

            if (protocol === '22') {
                if (source === 'admin') {
                    isAllowed = (action === 'ALLOW');
                    details = isAllowed 
                        ? 'SSH Access permitted from Authorized IT Admin IP.'
                        : 'Blocked: Rule override set to DENY.';
                } else {
                    isAllowed = false;
                    details = 'DENIED: SSH (Port 22) requests from external network are blocked by standard firewall security posture.';
                }
            } else if (protocol === '80' || protocol === '443') {
                isAllowed = (action === 'ALLOW');
                details = isAllowed 
                    ? `Public access to Web Server (Port ${protocol}) is permitted.`
                    : `Blocked: Public Port ${protocol} traffic was explicitly disabled.`;
            } else if (protocol === 'ICMP') {
                if (source === 'admin') {
                    isAllowed = (action === 'ALLOW');
                    details = isAllowed 
                        ? 'ICMP Ping request approved from internal gateway.'
                        : 'Blocked: ICMP dropped by administrative action.';
                } else {
                    isAllowed = false;
                    details = 'DENIED: Inbound ICMP Echo Requests (Ping) from untrusted external IPs are dropped to prevent reconnaissance.';
                }
            }

            if (isAllowed) {
                particle.style.animation = 'packetToWeb 1.2s forwards linear';
                firewallNode.classList.add('glow-green');
                
                setTimeout(() => {
                    serverNode.classList.add('glow-green');
                    particle.style.display = 'none';
                    statusText.innerHTML = `<span class="t-green">STATUS: ACCEPTED</span><br>${details}`;
                    
                    injectSyslog('SEC', `ASA-FW: Inbound packet TCP/${protocol} from ${source === 'admin' ? '192.168.1.10' : 'External'} ALLOWED. Connection Established.`);
                    runBtn.disabled = false;
                }, 1200);
            } else {
                firewallNode.classList.add('glow-red');
                particle.style.display = 'none';
                statusText.innerHTML = `<span class="t-error">STATUS: BLOCKED (SECURITY VIOLATION)</span><br>${details}`;
                
                injectSyslog('SEC', `[ALERT] ASA-FW: Packet TCP/${protocol} from ${source === 'admin' ? '192.168.1.10' : 'External'} DROPPED. Reason: ACL Security Violation.`);
                runBtn.disabled = false;
            }
        }, 1500);
    });

    function injectSyslog(type, msg) {
        const syslogBody = document.getElementById('syslog-feed-body');
        if (!syslogBody) return;
        const line = document.createElement('div');
        line.className = 'syslog-line log-fade-in';
        const now = new Date();
        const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
        const typeBadge = `<span class="sl-badge sl-sec">[${type}]</span>`;
        line.innerHTML = `<span class="sl-time">${timeStr}</span> ${typeBadge} <span class="sl-text">${msg}</span>`;
        syslogBody.appendChild(line);
        syslogBody.scrollTop = syslogBody.scrollHeight;
    }
}


