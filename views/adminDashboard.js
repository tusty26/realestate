module.exports = (properties = [], inquiries = [], sessionUser = {}, adminNotes = []) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ABC Real Estate | Admin Dashboard</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --gold: #f8a715;
            --black: #0c0c0e;
            --dark-grey: #1a1a22;
            --slate-footer: #15151a;
            --light-grey: #f8f9fc;
            --text-grey: #718096;
            --danger-red: #e53e3e;
            --border-color: #edf2f7;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: var(--light-grey); color: var(--black); line-height: 1.6; display: flex; flex-direction: column; min-height: 100vh; }

        /* Navbar */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10%;
            background: #fff;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.02);
            border-bottom: 1px solid var(--border-color);
        }
        .logo { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: var(--black); letter-spacing: 0.5px; }
        .logo span { color: var(--gold); }
        .nav-links { list-style: none; display: flex; gap: 25px; align-items: center; }
        .nav-links a { text-decoration: none; color: var(--black); font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 15px; transition: 0.3s; }
        .nav-links a:hover { color: var(--gold); }
        
        .user-badge { 
            background: #f7fafc; 
            color: var(--dark-grey); 
            border: 1px solid var(--border-color);
            padding: 6px 14px; 
            border-radius: 999px; 
            font-size: 13px; 
            font-weight: 600; 
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .logout-btn { 
            background: var(--black); 
            color: #fff !important; 
            padding: 8px 18px; 
            border-radius: 8px; 
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            transition: all 0.3s ease;
        }
        .logout-btn:hover { background: var(--gold) !important; transform: translateY(-1px); }

        /* Banner */
        .dashboard-header {
            background: var(--black);
            color: #fff;
            padding: 50px 10%;
            border-bottom: 4px solid var(--gold);
        }
        .dashboard-header h1 { font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 700; letter-spacing: 0.5px; }
        .dashboard-header p { color: var(--text-grey); font-size: 15px; margin-top: 5px; }

        /* Main Container */
        .main-content {
            padding: 50px 10%;
            flex: 1;
            display: grid;
            grid-template-columns: 1fr;
            gap: 40px;
        }

        /* Inventory Panel */
        .panel {
            background: #fff;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.02);
            transition: all 0.3s ease;
        }
        .panel:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(0,0,0,0.04);
        }
        .panel h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
            border-bottom: 2px solid #edf2f7;
            padding-bottom: 12px;
            color: var(--dark-grey);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .panel h2 span { font-size: 14px; color: var(--text-grey); font-family: 'Inter', sans-serif; font-weight: 500; }

        /* Form styling */
        input[type="text"], textarea {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            background-color: #fff;
            color: var(--black);
            transition: all 0.3s ease;
            margin-bottom: 15px;
        }
        input[type="text"]:focus, textarea:focus {
            border-color: var(--gold);
            outline: none;
            box-shadow: 0 0 0 3px rgba(248, 167, 21, 0.15);
        }

        /* Buttons */
        .submit-btn {
            width: 100%;
            padding: 12px 20px;
            background: var(--black);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            display: inline-block;
        }
        .submit-btn:hover {
            background: var(--gold);
            color: #fff;
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(248, 167, 21, 0.2);
        }
        .submit-btn-gold {
            background: var(--gold);
        }
        .submit-btn-gold:hover {
            background: var(--black);
        }

        /* Inventory Table */
        .inventory-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            text-align: left;
        }
        .inventory-table th, .inventory-table td {
            padding: 16px 20px;
            border-bottom: 1px solid var(--border-color);
        }
        .inventory-table th {
            background-color: #f7fafc;
            color: var(--text-grey);
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
            border-bottom: 2px solid #edf2f7;
        }
        .inventory-table td {
            font-size: 14px;
            color: var(--dark-grey);
        }
        .inventory-table tr:last-child td {
            border-bottom: none;
        }
        .inventory-table tr:hover td {
            background-color: #fafbfc;
        }

        .action-delete-btn {
            background: var(--danger-red);
            color: #fff;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            font-family: 'Outfit', sans-serif;
            font-size: 13px;
            font-weight: 600;
            transition: all 0.3s ease;
            display: inline-block;
        }
        .action-delete-btn:hover {
            background: var(--black);
            transform: translateY(-1px);
        }

        /* Inquiry Items */
        .inquiry-feed {
            max-height: 500px;
            overflow-y: auto;
            padding-right: 5px;
        }
        .inquiry-item {
            background: #f7fafc;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 15px;
            border-left: 4px solid var(--gold);
            border: 1px solid var(--border-color);
            border-left-width: 4px;
        }
        .inquiry-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: var(--text-grey);
            margin-bottom: 8px;
        }
        .inquiry-name {
            font-weight: 600;
            color: var(--gold);
            font-size: 15px;
        }
        .inquiry-msg {
            font-size: 14px;
            color: var(--dark-grey);
            word-break: break-word;
        }

        /* Footer */
        footer { background: var(--slate-footer); color: #fff; padding: 40px 10% 20px; }
        .footer-bottom { border-top: 1px solid #2d2d39; padding-top: 20px; display: flex; justify-content: space-between; font-size: 13px; color: #888; }

        @media (max-width: 1024px) {
            .main-content {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>

    <nav>
        <div class="logo">ABC <span>REAL ESTATE</span></div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><span class="user-badge"><i class="fas fa-user-shield" style="color: var(--gold);"></i> ${sessionUser.username || 'Admin'}</span></li>
            <li><a href="/admin/logout" class="logout-btn">Logout</a></li>
        </ul>
    </nav>

    <div class="dashboard-header">
        <h1>Administrative Workstation</h1>
        <p>Real-time property inventories, listing inspections, and client moderation pipelines.</p>
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

        <!-- Marketing Department: Reflected XSS Preview Banner -->
        <div class="panel" style="grid-column: span 2;">
            <h2><i class="fas fa-ad" style="margin-right: 10px; color: var(--gold);"></i> Marketing Banners Customizer</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Generate real-time welcome banner headers for corporate campaigns.</p>
            <form action="/admin/welcome-preview" method="GET" target="_blank" style="display: flex; gap: 15px;">
                <input type="text" name="bannerText" placeholder="Enter headline text..." style="flex: 1; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px;" required>
                <button type="submit" class="submit-btn" style="width: auto; padding: 10px 30px;">Preview Corporate Banner</button>
            </form>
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
