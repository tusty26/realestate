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

    <div class="main-content">
        <!-- Security Lab Controls (Col-span on wide view or separate section) -->
        <div class="panel" style="grid-column: span 2; margin-bottom: 20px; border: 2px dashed var(--gold); background: #fffcf5;">
            <h2 style="border-bottom: 2px solid var(--black); color: var(--black);">
                <i class="fas fa-flask" style="margin-right: 10px; color: var(--gold);"></i> Security Lab: SQLi Demonstration Suite
            </h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 20px;">
                Demonstrate the four classes of SQL Injection vulnerabilities targeting dynamic database interactions on ABC Real Estate.
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
                <!-- 1. Error-Based (Agent Lookup) -->
                <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid var(--gold); padding-bottom: 5px; margin-bottom: 10px;">
                        1. Error-Based SQLi
                    </h3>
                    <p style="font-size: 11px; color: var(--text-grey); margin-bottom: 10px;">Lookup Agent Directory. Failures output raw MySQL exception stacks.</p>
                    <form action="/admin/agent-lookup" method="GET" target="_blank">
                        <input type="text" name="name" placeholder="Agent Name (e.g. Sarah Jenkins)" style="width: 100%; padding: 8px; font-size: 13px; border: 1px solid #ccc; margin-bottom: 10px; border-radius: 4px;" required>
                        <button type="submit" class="submit-btn" style="padding: 8px; font-size: 12px;">Query Agent</button>
                    </form>
                </div>

                <!-- 2. Union-Based (Audit Logs) -->
                <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid var(--gold); padding-bottom: 5px; margin-bottom: 10px;">
                        2. Union-Based SQLi
                    </h3>
                    <p style="font-size: 11px; color: var(--text-grey); margin-bottom: 10px;">Search System Audit Logs. Query outputs tabular data matching multi-column records.</p>
                    <form action="/admin/audit-logs" method="GET" target="_blank">
                        <input type="text" name="search" placeholder="Search Logs (e.g. LOGIN)" style="width: 100%; padding: 8px; font-size: 13px; border: 1px solid #ccc; margin-bottom: 10px; border-radius: 4px;" required>
                        <button type="submit" class="submit-btn" style="padding: 8px; font-size: 12px; background: var(--black);">Search Logs</button>
                    </form>
                </div>

                <!-- 3. Boolean-Blind (Property Checker) -->
                <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid var(--gold); padding-bottom: 5px; margin-bottom: 10px;">
                        3. Boolean-Blind SQLi
                    </h3>
                    <p style="font-size: 11px; color: var(--text-grey); margin-bottom: 10px;">Property Title Reference Checker API. Outputs boolean values in raw JSON format.</p>
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <input type="text" id="booleanSearchInput" placeholder="Property Title (e.g. Oasis)" style="width: 100%; padding: 8px; font-size: 13px; border: 1px solid #ccc; border-radius: 4px;">
                        <button onclick="testBooleanSqli()" class="submit-btn" style="padding: 8px; font-size: 12px; background: var(--slate-footer);">Test API</button>
                        <div id="booleanResult" style="font-size: 12px; margin-top: 5px; font-weight: bold; min-height: 18px; word-break: break-all;"></div>
                    </div>
                </div>

                <!-- 4. Time-Blind (System Health Check) -->
                <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid var(--gold); padding-bottom: 5px; margin-bottom: 10px;">
                        4. Time-Blind SQLi
                    </h3>
                    <p style="font-size: 11px; color: var(--text-grey); margin-bottom: 10px;">Run backend diagnostic probe. Returns a static health status regardless of execution.</p>
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <input type="text" id="timeSearchInput" placeholder="Component ID (e.g. 1)" style="width: 100%; padding: 8px; font-size: 13px; border: 1px solid #ccc; border-radius: 4px;">
                        <button onclick="testTimeSqli()" class="submit-btn" style="padding: 8px; font-size: 12px; background: var(--danger-red);">Trigger Health Check</button>
                        <div id="timeResult" style="font-size: 12px; margin-top: 5px; color: var(--text-grey);"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Security Lab Controls: XSS Demonstration Suite -->
        <div class="panel" style="grid-column: span 2; margin-bottom: 20px; border: 2px dashed #9c27b0; background: #fdf5ff;">
            <h2 style="border-bottom: 2px solid var(--black); color: var(--black);">
                <i class="fas fa-code" style="margin-right: 10px; color: #9c27b0;"></i> Security Lab: XSS Demonstration Suite
            </h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 20px;">
                Demonstrate the three main types of Cross-Site Scripting (Stored, Reflected, and DOM-based) on the ABC Real Estate platform.
            </p>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 20px;">
                <!-- 1. Stored XSS: Admin Notes Broadcast -->
                <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #9c27b0; padding-bottom: 5px; margin-bottom: 10px;">
                        1. Stored XSS
                    </h3>
                    <p style="font-size: 11px; color: var(--text-grey); margin-bottom: 10px;">Post administrative broadcasts. Output renders directly without filtering.</p>
                    <form action="/admin/save-note" method="POST">
                        <textarea name="note" placeholder="Write broadcast message..." style="width: 100%; height: 60px; padding: 8px; font-size: 13px; border: 1px solid #ccc; margin-bottom: 10px; border-radius: 4px;" required></textarea>
                        <button type="submit" class="submit-btn" style="padding: 8px; font-size: 12px; background: #9c27b0;">Broadcast Note</button>
                    </form>
                </div>

                <!-- 2. Reflected XSS: Welcome Banner Preview -->
                <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #9c27b0; padding-bottom: 5px; margin-bottom: 10px;">
                        2. Reflected XSS
                    </h3>
                    <p style="font-size: 11px; color: var(--text-grey); margin-bottom: 10px;">Preview corporate banner header content reflected instantly from server parameters.</p>
                    <form action="/admin/welcome-preview" method="GET" target="_blank">
                        <input type="text" name="bannerText" placeholder="Banner text to preview" style="width: 100%; padding: 8px; font-size: 13px; border: 1px solid #ccc; margin-bottom: 10px; border-radius: 4px;" required>
                        <button type="submit" class="submit-btn" style="padding: 8px; font-size: 12px; background: var(--black);">Preview Banner</button>
                    </form>
                </div>

                <!-- 3. DOM-Based XSS (Hash source) -->
                <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #9c27b0; padding-bottom: 5px; margin-bottom: 10px;">
                        3. DOM XSS (Hash Source)
                    </h3>
                    <p style="font-size: 11px; color: var(--text-grey); margin-bottom: 10px;">Reads content from the URL location hash fragment and writes directly to target.</p>
                    <button onclick="triggerHashDomXss()" class="submit-btn" style="padding: 8px; font-size: 12px; background: var(--slate-footer);">Simulate Hash Injection</button>
                    <div id="hashDemoTarget" style="font-size: 12px; margin-top: 10px; padding: 5px; background: #fafafa; border: 1px solid #eee; min-height: 25px;"></div>
                </div>

                <!-- 4. DOM-Based XSS (Search query source) -->
                <div style="background: #fff; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
                    <h3 style="font-size: 14px; text-transform: uppercase; border-bottom: 2px solid #9c27b0; padding-bottom: 5px; margin-bottom: 10px;">
                        4. DOM XSS (Query Source)
                    </h3>
                    <p style="font-size: 11px; color: var(--text-grey); margin-bottom: 10px;">Reads values from the search query parameter and outputs them unsafely using innerHTML.</p>
                    <button onclick="triggerQueryDomXss()" class="submit-btn" style="padding: 8px; font-size: 12px; background: var(--danger-red);">Simulate Query Injection</button>
                    <div id="queryDemoTarget" style="font-size: 12px; margin-top: 10px; padding: 5px; background: #fafafa; border: 1px solid #eee; min-height: 25px;"></div>
                </div>
            </div>

            <!-- Stored Broadcast Notes Render Zone -->
            <div style="background: #fff; border: 1px solid #ddd; border-radius: 4px; padding: 15px;">
                <h4 style="font-size: 14px; text-transform: uppercase; margin-bottom: 10px; color: #9c27b0;">
                    Live Broadcast Board (Stored Outputs)
                </h4>
                <div style="display: flex; flex-direction: column; gap: 8px;">
                    ${adminNotes.map(n => `
                        <div style="background: #fafafa; padding: 10px; border-left: 4px solid #9c27b0; font-size: 13px;">
                            <div style="font-size: 11px; color: var(--text-grey); margin-bottom: 3px;">
                                ${new Date(n.created_at).toLocaleString()}
                            </div>
                            <!-- VULNERABILITY SINK: Unescaped database notes rendering -->
                            <div>${n.note}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>

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
                resultDiv.innerText = 'Testing...';
                try {
                    const response = await fetch('/api/property-check?title=' + encodeURIComponent(title));
                    const data = await response.json();
                    resultDiv.innerText = JSON.stringify(data);
                    resultDiv.style.color = data.exists ? 'green' : 'red';
                } catch(e) {
                    resultDiv.innerText = 'Error: ' + e.message;
                    resultDiv.style.color = 'red';
                }
            }

            async function testTimeSqli() {
                const id = document.getElementById('timeSearchInput').value;
                const resultDiv = document.getElementById('timeResult');
                resultDiv.innerText = 'Sending request...';
                const startTime = Date.now();
                try {
                    const response = await fetch('/api/system-health?id=' + encodeURIComponent(id));
                    const data = await response.json();
                    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
                    resultDiv.innerText = 'Status: ' + data.status + ' (Response took ' + duration + 's)';
                } catch(e) {
                    resultDiv.innerText = 'Error: ' + e.message;
                }
            }
        </script>

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

</body>
</html>
`;
