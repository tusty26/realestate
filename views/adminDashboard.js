module.exports = (properties = [], inquiries = [], sessionUser = {}, adminNotes = [], agentRequests = []) => `
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
            --primary-gold: #dfa83d;
            --gold-hover: #f3c267;
            --charcoal-bg: #09090b;
            --card-dark: #121217;
            --card-border: #1f1f27;
            --text-muted: #8b9bb4;
            --text-white: #f8fafc;
            --input-bg: #181822;
            --danger-rose: #f43f5e;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: var(--charcoal-bg); color: var(--text-white); line-height: 1.6; display: flex; flex-direction: column; min-height: 100vh; }

        /* Navbar */
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 10%;
            background: var(--card-dark);
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 30px rgba(0,0,0,0.2);
            border-bottom: 1px solid rgba(223, 168, 61, 0.15);
        }
        .logo { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: var(--text-white); letter-spacing: 0.5px; }
        .logo span { color: var(--primary-gold); }
        .nav-links { list-style: none; display: flex; gap: 25px; align-items: center; }
        .nav-links a { text-decoration: none; color: var(--text-white); font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 15px; transition: 0.3s; }
        .nav-links a:hover { color: var(--primary-gold); }
        
        .user-badge { 
            background: #181822; 
            color: var(--primary-gold); 
            border: 1px solid rgba(223, 168, 61, 0.2);
            padding: 6px 14px; 
            border-radius: 999px; 
            font-size: 13px; 
            font-weight: 600; 
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .logout-btn { 
            background: var(--primary-gold); 
            color: var(--charcoal-bg) !important; 
            padding: 8px 18px; 
            border-radius: 8px; 
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            transition: all 0.3s ease;
        }
        .logout-btn:hover { background: var(--text-white) !important; transform: translateY(-1px); }

        /* Banner */
        .dashboard-header {
            background: linear-gradient(180deg, var(--card-dark) 0%, var(--charcoal-bg) 100%);
            color: #fff;
            padding: 60px 10% 40px;
            border-bottom: 1px solid var(--card-border);
        }
        .dashboard-header h1 { font-family: 'Outfit', sans-serif; font-size: 34px; font-weight: 800; letter-spacing: 0.5px; color: var(--text-white); }
        .dashboard-header p { color: var(--text-muted); font-size: 15px; margin-top: 5px; }

        /* Main Container */
        .main-content {
            padding: 40px 10%;
            flex: 1;
            display: grid;
            grid-template-columns: 1fr;
            gap: 30px;
        }

        /* Panels */
        .panel {
            background: var(--card-dark);
            border: 1px solid var(--card-border);
            border-radius: 14px;
            padding: 30px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .panel:hover {
            transform: translateY(-2px);
            border-color: rgba(223, 168, 61, 0.3);
            box-shadow: 0 15px 40px rgba(0,0,0,0.15);
        }
        .panel h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
            border-bottom: 1px solid var(--card-border);
            padding-bottom: 12px;
            color: var(--text-white);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .panel h2 span { font-size: 14px; color: var(--text-muted); font-family: 'Inter', sans-serif; font-weight: 500; }

        /* Form styling */
        input[type="text"], input[type="number"], textarea, select {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--card-border);
            border-radius: 8px;
            font-size: 14px;
            font-family: 'Inter', sans-serif;
            background-color: var(--input-bg);
            color: var(--text-white);
            transition: all 0.3s ease;
            margin-bottom: 15px;
        }
        input[type="text"]:focus, input[type="number"]:focus, textarea:focus, select:focus {
            border-color: var(--primary-gold);
            outline: none;
            box-shadow: 0 0 0 3px rgba(223, 168, 61, 0.15);
        }

        /* Buttons */
        .submit-btn {
            width: 100%;
            padding: 13px 20px;
            background: #181822;
            color: var(--primary-gold);
            border: 1px solid rgba(223, 168, 61, 0.3);
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
            display: inline-block;
        }
        .submit-btn:hover {
            background: var(--primary-gold);
            color: var(--charcoal-bg);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(223, 168, 61, 0.25);
        }
        .submit-btn-gold {
            background: var(--primary-gold);
            color: var(--charcoal-bg);
        }
        .submit-btn-gold:hover {
            background: var(--text-white);
            color: var(--charcoal-bg);
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
            border-bottom: 1px solid var(--card-border);
        }
        .inventory-table th {
            background-color: #181822;
            color: var(--text-muted);
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
            border-bottom: 2px solid var(--card-border);
        }
        .inventory-table td {
            font-size: 14px;
            color: #d1d5db;
        }
        .inventory-table tr:last-child td {
            border-bottom: none;
        }
        .inventory-table tr:hover td {
            background-color: rgba(255,255,255,0.01);
        }

        .action-delete-btn {
            background: var(--danger-rose);
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
            background: var(--text-white);
            color: var(--charcoal-bg);
            transform: translateY(-1px);
        }

        /* Inquiry Items */
        .inquiry-feed {
            max-height: 500px;
            overflow-y: auto;
            padding-right: 5px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 20px;
        }
        .inquiry-item {
            background: #181822;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid var(--primary-gold);
            border: 1px solid var(--card-border);
            border-left-width: 4px;
            border-left-color: var(--primary-gold);
        }
        .inquiry-meta {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: var(--text-muted);
            margin-bottom: 10px;
        }
        .inquiry-name {
            font-weight: 600;
            color: var(--primary-gold);
            font-size: 15px;
        }
        .inquiry-msg {
            font-size: 14px;
            color: #d1d5db;
            word-break: break-word;
        }

        /* Footer */
        footer { background: var(--slate-footer); color: #fff; padding: 40px 10% 20px; }
        .footer-bottom { border-top: 1px solid var(--card-border); padding-top: 20px; display: flex; justify-content: space-between; font-size: 13px; color: var(--text-muted); }

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
        
        <!-- HR Department: Broker Finder -->
        <div class="panel">
            <h2><i class="fas fa-users-cog" style="margin-right: 10px; color: var(--gold);"></i> Broker Directory</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Search and verify active brokerage agents for listing assignments.</p>
            <form action="/admin/agent-lookup" method="GET" target="_blank">
                <input type="text" name="name" placeholder="Search Agent Name (e.g., Sarah Jenkins)" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 4px;" required>
                <button type="submit" class="submit-btn" style="background: var(--black);">Lookup Agent</button>
            </form>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;"><i class="fas fa-info-circle" style="color: var(--primary-gold); margin-right: 5px;"></i> Active Brokers: <strong>Sarah Jenkins</strong>, <strong>Michael Chang</strong>, <strong>Rahat Kabir</strong></div>
        </div>

        <!-- Deal Ledger Search -->
        <div class="panel">
            <h2><i class="fas fa-file-invoice-dollar" style="margin-right: 10px; color: var(--gold);"></i> Deal Ledger Logs</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Query administrative operation logs for system access events.</p>
            <form action="/admin/transaction-ledger" method="GET" target="_blank">
                <input type="text" name="search" placeholder="Filter by event (e.g., LOGIN, VIEW)" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 4px;" required>
                <button type="submit" class="submit-btn">Filter Logs</button>
            </form>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;"><i class="fas fa-info-circle" style="color: var(--primary-gold); margin-right: 5px;"></i> Event Types: <strong>LOGIN</strong>, <strong>VIEW</strong>, <strong>PURCHASE</strong>, <strong>APPROVE</strong></div>
        </div>

        <!-- Listing Registry Inspector -->
        <div class="panel">
            <h2><i class="fas fa-search-location" style="margin-right: 10px; color: var(--gold);"></i> Registry Inspector</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Verify property listings status against database index references.</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" id="booleanSearchInput" placeholder="Property Title (e.g., Oasis)" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px;">
                <button onclick="testBooleanSqli()" class="submit-btn" style="background: var(--dark-grey);">Inspect Listing</button>
                <div id="booleanResult" style="font-size: 13px; font-weight: bold; min-height: 20px; text-align: center; border-radius: 4px; padding: 5px;"></div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;"><i class="fas fa-info-circle" style="color: var(--primary-gold); margin-right: 5px;"></i> Registered: <strong>The Oasis Apartments</strong>, <strong>Skyline Heights</strong>, <strong>Rosewood Court</strong></div>
        </div>

        <!-- Property Valuation Calculator -->
        <div class="panel">
            <h2><i class="fas fa-calculator" style="margin-right: 10px; color: var(--gold);"></i> Valuation Index Calculator</h2>
            <p style="font-size: 13px; color: var(--text-grey); margin-bottom: 15px;">Probe backend systems to measure active response times.</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <input type="text" id="timeSearchInput" placeholder="Property ID Reference (e.g., 1)" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ddd; border-radius: 4px;">
                <button onclick="testTimeSqli()" class="submit-btn" style="background: var(--danger-red);">Ping Diagnostic Probe</button>
                <div id="timeResult" style="font-size: 13px; text-align: center; color: var(--text-grey); padding: 5px;"></div>
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 8px;"><i class="fas fa-info-circle" style="color: var(--primary-gold); margin-right: 5px;"></i> Active IDs: <strong>1</strong>, <strong>2</strong>, <strong>3</strong>, <strong>5</strong>, <strong>6</strong></div>
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
    <div class="main-content" style="padding-top: 0; grid-template-columns: 1fr;">
        
        <!-- Add New Property Form -->
        <div class="panel" style="margin-bottom: 30px;">
            <h2><i class="fas fa-plus-circle" style="margin-right: 10px; color: var(--gold);"></i> Add New Property Listing</h2>
            <form action="/admin/add-property" method="POST" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px; align-items: flex-end;">
                <div>
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Property Title</label>
                    <input type="text" name="title" placeholder="e.g. Skyline Heights" required style="margin-bottom:0;">
                </div>
                <div>
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Location</label>
                    <input type="text" name="location" placeholder="e.g. Uttara, Dhaka" required style="margin-bottom:0;">
                </div>
                <div>
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Price</label>
                    <input type="text" name="price" placeholder="e.g. $420,000" required style="margin-bottom:0;">
                </div>
                <div>
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Rooms</label>
                    <input type="number" name="rooms" placeholder="Rooms count" required style="margin-bottom:0;">
                </div>
                <div>
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Baths</label>
                    <input type="number" name="baths" placeholder="Baths count" required style="margin-bottom:0;">
                </div>
                <div>
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Size (Sqft)</label>
                    <input type="number" name="size" placeholder="Size in sqft" required style="margin-bottom:0;">
                </div>
                <div>
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Featured Listing</label>
                    <input type="number" name="is_featured" placeholder="1 = Yes, 0 = No" min="0" max="1" required style="margin-bottom:0;">
                </div>
                <div style="grid-column: span 2;">
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Image URL</label>
                    <input type="text" name="image_url" placeholder="http://image-source-link..." required style="margin-bottom:0;">
                </div>
                <div style="grid-column: span 3;">
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:5px;">Description</label>
                    <textarea name="description" placeholder="Listing details..." required style="margin-bottom:0; height:46px;"></textarea>
                </div>
                <div>
                    <button type="submit" class="submit-btn submit-btn-gold" style="height:46px;">Publish Listing</button>
                </div>
            </form>
        </div>

        <!-- Inventory Grid -->
        <div class="panel" style="margin-bottom: 30px;">
            <h2>Inventory Management <span>${properties.length} Properties</span></h2>
            
            <input type="text" id="inventorySearch" placeholder="Search inventory listing titles or locations instantly..." onkeyup="filterInventory()" style="margin-bottom: 20px;">

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
                                    <!-- Edit Property Endpoint -->
                                    <a href="/admin/edit-property?id=${p.id}" class="action-delete-btn" style="background: var(--gold); margin-right: 5px;">
                                        <i class="fas fa-edit" style="margin-right: 5px;"></i> Edit
                                    </a>
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

        <!-- Agent Modification Requests (Stored XSS Price Takeover Sink) -->
        <div class="panel">
            <h2>Broker Price Requests <span>${agentRequests.length} Requests</span></h2>
            <div class="inquiry-feed">
                ${agentRequests.map(r => `
                    <div class="inquiry-item" style="border-left-color: #e74c3c;">
                        <div class="inquiry-meta">
                            <span class="inquiry-name" style="color: #e74c3c;">${r.agent_name}</span>
                            <span>${r.property_title} (${r.request_type})</span>
                        </div>
                        <!-- VULNERABILITY NOTE: Stored XSS Sink execution endpoint -->
                        <div class="inquiry-msg" style="color: #c0392b;">${r.message}</div>
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

        function filterInventory() {
            const input = document.getElementById('inventorySearch').value.toLowerCase();
            const rows = document.querySelectorAll('.inventory-table tbody tr');
            rows.forEach(row => {
                const title = row.querySelector('td:nth-child(2)').textContent.toLowerCase();
                const location = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
                if (title.includes(input) || location.includes(input)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
    </script>
</body>

</html>
`;
