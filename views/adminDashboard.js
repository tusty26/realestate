module.exports = (properties = [], inquiries = [], sessionUser = {}) => `
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
