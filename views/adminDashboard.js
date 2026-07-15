module.exports = (properties = [], inquiries = [], sessionUser = {}, adminNotes = []) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ABC Real Estate | Admin Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --gold: #f8a715;
            --black: #000000;
            --dark-grey: #1a1a1a;
            --slate-footer: #222222;
            --light-grey: #f4f4f4;
            --text-grey: #666666;
            --danger-red: #d9534f;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #fff; color: var(--black); line-height: 1.6; display: flex; flex-direction: column; min-height: 100vh; }

        /* Navbar */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px 10%;
            background: #fff;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .logo { font-size: 24px; font-weight: bold; color: var(--black); }
        .nav-links { list-style: none; display: flex; gap: 30px; align-items: center; }
        .nav-links a { text-decoration: none; color: var(--black); font-weight: 600; font-size: 14px; text-transform: uppercase; transition: 0.3s; }
        .nav-links a:hover { color: var(--gold); }
        .user-badge { background: var(--gold); color: #fff; padding: 5px 12px; border-radius: 4px; font-size: 13px; font-weight: bold; }
        .logout-btn { background: var(--black); color: #fff !important; padding: 8px 16px; border-radius: 4px; }
        .logout-btn:hover { background: var(--gold) !important; color: #fff !important; }

        /* Banner */
        .dashboard-header {
            background: var(--black);
            color: #fff;
            padding: 40px 10%;
            border-bottom: 4px solid var(--gold);
        }
        .dashboard-header h1 { font-size: 32px; text-transform: uppercase; letter-spacing: 1px; }
        .dashboard-header p { color: var(--text-grey); font-size: 15px; margin-top: 5px; }

        /* Main Container */
        .main-content {
            padding: 50px 10%;
            flex: 1;
            display: grid;
            grid-template-columns: 3fr 2fr;
            gap: 40px;
        }

        /* Inventory Panel */
        .panel {
            background: #fff;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 30px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        .panel h2 {
            font-size: 22px;
            margin-bottom: 25px;
            border-bottom: 2px solid var(--gold);
            padding-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .panel h2 span { font-size: 14px; color: var(--text-grey); text-transform: none; }

        /* Inventory Table */
        .inventory-table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }
        .inventory-table th, .inventory-table td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }
        .inventory-table th {
            background-color: var(--light-grey);
            font-weight: bold;
            text-transform: uppercase;
            font-size: 13px;
        }
        .inventory-table td {
            font-size: 14px;
        }
        .action-delete-btn {
            background: var(--danger-red);
            color: #fff;
            border: none;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            text-decoration: none;
            font-size: 12px;
            font-weight: bold;
            transition: 0.3s;
            display: inline-block;
        }
        .action-delete-btn:hover {
            background: var(--black);
        }

        /* Inquiry Items */
        .inquiry-feed {
            max-height: 600px;
            overflow-y: auto;
        }
        .inquiry-item {
            background: var(--light-grey);
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
            border-left: 5px solid var(--gold);
        }
        .inquiry-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: var(--text-grey);
            margin-bottom: 10px;
        }
        .inquiry-name {
            font-weight: bold;
            color: var(--gold);
            font-size: 15px;
        }
        .inquiry-msg {
            font-size: 14px;
            color: var(--black);
            word-break: break-word;
        }

        /* Footer */
        footer { background: var(--slate-footer); color: #fff; padding: 40px 10% 20px; }
        .footer-bottom { border-top: 1px solid #444; padding-top: 20px; display: flex; justify-content: space-between; font-size: 13px; color: #888; }

        @media (max-width: 1024px) {
            .main-content {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>

    <nav>
        <div class="logo">ABC REAL ESTATE</div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><span class="user-badge"><i class="fas fa-user-shield" style="margin-right: 5px;"></i> ${sessionUser.username || 'Admin'}</span></li>
            <li><a href="/admin/logout" class="logout-btn">Logout</a></li>
        </ul>
    </nav>

    <div class="dashboard-header">
        <h1>Administrative Dashboard</h1>
        <p>Real-time inventory control and message moderation pipeline.</p>
    </div>

    <div class="main-content" style="grid-column: span 2; display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 30px; margin-bottom: 30px;">
        
        <!-- HR Department: Agent Lookup -->
        <div class="panel">
            <h2><i class="fas fa-users-cog" style="margin-right: 10px; color: var(--gold);"></i> Human Resources</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Search and verify registered agents within the corporate directory.</p>
            <form action="/admin/agent-lookup" method="GET" target="_blank">
                <input type="text" name="name" placeholder="Search Agent Name (e.g., Sarah Jenkins)" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 4px;" required>
                <button type="submit" class="submit-btn" style="background: var(--black);">Lookup Agent</button>
            </form>
        </div>

        <!-- System Auditing Department: Access Logs Search -->
        <div class="panel">
            <h2><i class="fas fa-shield-alt" style="margin-right: 10px; color: var(--gold);"></i> Security Auditing</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Query administrative operation logs for system access events.</p>
            <form action="/admin/audit-logs" method="GET" target="_blank">
                <input type="text" name="search" placeholder="Filter by event (e.g., LOGIN, VIEW)" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 4px;" required>
                <button type="submit" class="submit-btn">Filter Logs</button>
            </form>
        </div>

        <!-- Inventory Inspector Department: Reference Check -->
        <div class="panel">
            <h2><i class="fas fa-search-location" style="margin-right: 10px; color: var(--gold);"></i> Inventory Checker</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Verify property listings status against database index references.</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" id="booleanSearchInput" placeholder="Property Title (e.g., Oasis)" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px;">
                <button onclick="testBooleanSqli()" class="submit-btn" style="background: var(--dark-grey);">Inspect Listing</button>
                <div id="booleanResult" style="font-size: 13px; font-weight: bold; min-height: 20px; text-align: center; border-radius: 4px; padding: 5px;"></div>
            </div>
        </div>

        <!-- Diagnostics Department: Diagnostics checker -->
        <div class="panel">
            <h2><i class="fas fa-server" style="margin-right: 10px; color: var(--gold);"></i> Server Diagnostics</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Probe backend systems to measure active response times.</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" id="timeSearchInput" placeholder="Diagnostic Code (e.g., 1)" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px;">
                <button onclick="testTimeSqli()" class="submit-btn" style="background: var(--danger-red);">Ping Diagnostic Probe</button>
                <div id="timeResult" style="font-size: 13px; text-align: center; color: var(--text-grey); padding: 5px;"></div>
            </div>
        </div>

        <!-- Corporate Communications Department: Stored Notes Broadcast -->
        <div class="panel" style="grid-column: span 2;">
            <h2><i class="fas fa-bullhorn" style="margin-right: 10px; color: var(--gold);"></i> Team Communications Board</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Post sticky notes and operational broadcasts for administrative staff.</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <form action="/admin/save-note" method="POST">
                    <textarea name="note" placeholder="Write bulletin notes..." style="width: 100%; height: 90px; padding: 10px; font-size: 14px; border: 1px solid #ddd; margin-bottom: 15px; border-radius: 4px;" required></textarea>
                    <button type="submit" class="submit-btn">Broadcast Bulletin</button>
                </form>
                
                <div style="max-height: 150px; overflow-y: auto; border: 1px solid #eee; border-radius: 4px; padding: 10px; background: var(--light-grey);">
                    <h4 style="font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px;">
                        Active Broadcast Bulletins
                    </h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${adminNotes.map(n => `
                            <div style="background: #fff; padding: 10px; border-left: 4px solid var(--gold); font-size: 13px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
                                <div style="font-size: 11px; color: var(--text-grey); margin-bottom: 3px;">
                                    ${new Date(n.created_at).toLocaleString()}
                                </div>
                                <!-- VULNERABILITY SINK: Raw unescaped note render -->
                                <div>${n.note}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Marketing Department: Reflected XSS Preview Banner -->
        <div class="panel" style="grid-column: span 2;">
            <h2><i class="fas fa-ad" style="margin-right: 10px; color: var(--gold);"></i> Marketing Banners Customizer</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Generate real-time corporate campaign welcome banner headers for review.</p>
            <form action="/admin/welcome-preview" method="GET" target="_blank" style="display: flex; gap: 15px;">
                <input type="text" name="bannerText" placeholder="Enter headline text..." style="flex: 1; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px;" required>
                <button type="submit" class="submit-btn" style="width: auto; padding: 10px 30px;">Preview Corporate Banner</button>
            </form>
        </div>

        <!-- DOM XSS Simulation widgets (Client-side feedback metrics dashboard mock) -->
        <div class="panel" style="grid-column: span 2;">
            <h2><i class="fas fa-desktop" style="margin-right: 10px; color: var(--gold);"></i> Workstation UI State Monitor</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Simulate and debug client-side navigation UI feedback states.</p>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
                <div style="background: var(--light-grey); padding: 15px; border-radius: 4px;">
                    <h3 style="font-size: 14px; margin-bottom: 8px;">Location Hash Buffer Selector</h3>
                    <button onclick="triggerHashDomXss()" class="submit-btn" style="background: var(--black); margin-bottom: 10px;">Select Hash Buffer</button>
                    <div id="hashDemoTarget" style="font-size: 12px; padding: 10px; background: #fff; border: 1px solid #ddd; min-height: 38px; border-radius: 4px;"></div>
                </div>
                <div style="background: var(--light-grey); padding: 15px; border-radius: 4px;">
                    <h3 style="font-size: 14px; margin-bottom: 8px;">History Search Buffer Selector</h3>
                    <button onclick="triggerQueryDomXss()" class="submit-btn" style="background: var(--dark-grey); margin-bottom: 10px;">Select Query Buffer</button>
                    <div id="queryDemoTarget" style="font-size: 12px; padding: 10px; background: #fff; border: 1px solid #ddd; min-height: 38px; border-radius: 4px;"></div>
                </div>
            </div>
        </div>

    </div>

    <!-- Main Content split layout -->
    <div class="main-content" style="padding-top: 0;">
        <!-- Inventory Grid -->
        <div class="panel">
            <h2>Inventory Management <span>${properties.length} Properties</span></h2>
            <div style="overflow-x: auto;">
                <table class="inventory-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${properties.map(p => `
                            <tr>
                                <td>${p.id}</td>
                                <td><strong>${p.title}</strong></td>
                                <td>${p.location}</td>
                                <td>${p.price}</td>
                                <td>
                                    <!-- CSRF Vulnerable Delete Endpoint -->
                                    <a href="/admin/delete-property?id=${p.id}" class="action-delete-btn" onclick="return confirm('Are you sure you want to delete this property?');">
                                        <i class="fas fa-trash-alt" style="margin-right: 5px;"></i> Delete
                                    </a>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Inquiries Moderation -->
        <div class="panel">
            <h2>Moderation Feed <span>${inquiries.length} Messages</span></h2>
            <div class="inquiry-feed">
                <!-- Stored XSS Vulnerability: Raw rendering of name and message -->
                ${inquiries.map(i => `
                    <div class="inquiry-item">
                        <div class="inquiry-meta">
                            <span class="inquiry-name">${i.name}</span>
                            <span>${new Date(i.created_at).toLocaleString()}</span>
                        </div>
                        <!-- VULNERABILITY NOTE: Explicitly rendering unescaped output -->
                        <div class="inquiry-msg">${i.message}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>

    <footer>
        <div class="footer-bottom">
            <p>&copy; 2026 ABC Real Estate. Internal Administration Portal.</p>
            <p>Authorized Personnel Only.</p>
        </div>
    </footer>

    <script>
        // Trigger simulators to allow convenient testing in standard workspace setups
        function triggerHashDomXss() {
            window.location.hash = "#banner=<img src=x onerror=alert('DOM-Hash-XSS')>";
            processHashFragment();
        }

        function triggerQueryDomXss() {
            const testUrl = window.location.pathname + '?query=' + encodeURIComponent('<img src=y onerror=alert("DOM-Query-XSS")>');
            window.history.pushState({}, '', testUrl);
            processQuerySearch();
        }

        function processHashFragment() {
            const hashValue = window.location.hash;
            if (hashValue.startsWith('#banner=')) {
                const cleanValue = decodeURIComponent(hashValue.substring(8));
                // VULNERABLE SINK: Direct innerHTML write from location.hash
                document.getElementById('hashDemoTarget').innerHTML = cleanValue;
            }
        }

        function processQuerySearch() {
            const params = new URLSearchParams(window.location.search);
            const queryVal = params.get('query');
            if (queryVal) {
                // VULNERABLE SINK: Direct innerHTML write from location.search query string
                document.getElementById('queryDemoTarget').innerHTML = queryVal;
            }
        }

        // Run processing handlers on load
        window.addEventListener('DOMContentLoaded', () => {
            processHashFragment();
            processQuerySearch();
        });
        window.addEventListener('hashchange', processHashFragment);
    </script>

    <script>
        async function testBooleanSqli() {
            const title = document.getElementById('booleanSearchInput').value;
            const resultDiv = document.getElementById('booleanResult');
            resultDiv.innerText = 'Inspecting...';
            resultDiv.style.background = '#eee';
            resultDiv.style.color = '#333';
            try {
                const response = await fetch('/api/property-check?title=' + encodeURIComponent(title));
                const data = await response.json();
                if (data.exists) {
                    resultDiv.innerText = 'Active Listing Verified';
                    resultDiv.style.background = '#dff0d8';
                    resultDiv.style.color = '#3c763d';
                } else {
                    resultDiv.innerText = 'Listing Not Found';
                    resultDiv.style.background = '#f2dede';
                    resultDiv.style.color = '#a94442';
                }
            } catch(e) {
                resultDiv.innerText = 'Error: ' + e.message;
                resultDiv.style.background = '#f2dede';
                resultDiv.style.color = '#a94442';
            }
        }

        async function testTimeSqli() {
            const id = document.getElementById('timeSearchInput').value;
            const resultDiv = document.getElementById('timeResult');
            resultDiv.innerText = 'Connecting to socket...';
            const startTime = Date.now();
            try {
                const response = await fetch('/api/system-health?id=' + encodeURIComponent(id));
                const data = await response.json();
                const duration = ((Date.now() - startTime) / 1000).toFixed(2);
                resultDiv.innerText = 'Connection: Online (Response latency: ' + duration + 's)';
            } catch(e) {
                resultDiv.innerText = 'Error: ' + e.message;
            }
        }
    </script>
</body>
</html>
`;
