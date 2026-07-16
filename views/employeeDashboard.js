module.exports = (properties = [], agent = {}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Broker Workspace | ABC Real Estate</title>
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
            --border-color: #edf2f7;
            --success-green: #2ecc71;
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
        .nav-links { display: flex; list-style: none; align-items: center; gap: 25px; }
        .nav-links a { text-decoration: none; color: var(--black); font-size: 14px; font-weight: 600; transition: 0.3s; }
        .nav-links a:hover { color: var(--gold); }
        .user-badge { background: var(--light-grey); border: 1px solid var(--border-color); padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .logout-btn { color: #e74c3c !important; }

        /* Header */
        .dashboard-header {
            background: var(--dark-grey);
            color: #fff;
            padding: 60px 10% 40px;
            position: relative;
        }
        .dashboard-header h1 { font-family: 'Outfit', sans-serif; font-size: 32px; font-weight: 800; margin-bottom: 10px; }
        .dashboard-header p { color: #a0aec0; font-size: 15px; }

        /* Main Content */
        .main-content {
            padding: 40px 10%;
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 40px;
            flex: 1;
        }

        .panel {
            background: #fff;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .panel h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
            color: var(--dark-grey);
            border-bottom: 2px solid #edf2f7;
            padding-bottom: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .panel h2 span {
            font-size: 12px;
            background: rgba(248, 167, 21, 0.15);
            color: var(--gold);
            padding: 4px 10px;
            border-radius: 12px;
        }

        /* Property Listings Grid */
        .property-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .property-card {
            display: flex;
            border: 1px solid var(--border-color);
            border-radius: 10px;
            overflow: hidden;
            background: #fff;
            transition: transform 0.3s ease;
        }
        .property-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.02);
        }

        .property-img {
            width: 180px;
            height: 130px;
            object-fit: cover;
        }

        .property-details {
            padding: 20px;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .prop-title { font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: var(--dark-grey); }
        .prop-loc { font-size: 13px; color: var(--text-grey); margin-bottom: 8px; }
        .prop-price { font-size: 16px; font-weight: 700; color: var(--gold); }

        /* Form Controls */
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            color: var(--text-grey);
        }
        select, input[type="text"], textarea {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: #fff;
        }
        select:focus, input[type="text"]:focus, textarea:focus {
            border-color: var(--gold);
            outline: none;
            box-shadow: 0 0 0 3px rgba(248, 167, 21, 0.15);
        }

        .submit-btn {
            width: 100%;
            padding: 14px;
            background: var(--black);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .submit-btn:hover {
            background: var(--gold);
            transform: translateY(-1px);
        }

        /* Footer */
        footer { background: var(--slate-footer); color: #fff; padding: 30px 10% 20px; text-align: center; }
        .footer-bottom { font-size: 13px; color: #888; }
    </style>
</head>
<body>

    <nav>
        <div class="logo">ABC <span>PARTNERS</span></div>
        <ul class="nav-links">
            <li><span class="user-badge"><i class="fas fa-user-circle" style="color: var(--gold);"></i> ${agent.name || 'Broker'}</span></li>
            <li><a href="/employee/logout" class="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
        </ul>
    </nav>

    <div class="dashboard-header">
        <h1>Broker Operations Panel</h1>
        <p>Review assigned properties and request pricing updates from Super Administrators.</p>
    </div>

    <div class="main-content">
        <!-- Assigned Listings -->
        <div class="panel">
            <h2>Assigned Portfolios <span>${properties.length} Properties</span></h2>
            <div class="property-list">
                ${properties.map(p => `
                    <div class="property-card">
                        <img src="${p.image_url}" class="property-img" alt="Property Image">
                        <div class="property-details">
                            <div>
                                <div class="prop-title">${p.title}</div>
                                <div class="prop-loc"><i class="fas fa-map-marker-alt" style="margin-right: 5px;"></i> ${p.location}</div>
                            </div>
                            <div class="prop-price">${p.price}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Request Modification Form -->
        <div class="panel">
            <h2>Submit Action Request</h2>
            <form action="/employee/submit-request" method="POST">
                <div class="form-group">
                    <label>Select Listing</label>
                    <select name="property_title" required>
                        ${properties.map(p => `<option value="${p.title}">${p.title}</option>`).join('')}
                    </select>
                </div>

                <div class="form-group">
                    <label>Request Category</label>
                    <select name="request_type" required>
                        <option value="Price Adjustment Request">Price Correction / Valuation Update</option>
                        <option value="Information Correction">Description & Copy Changes</option>
                        <option value="Unlist Portfolio Request">Listing Removal Request</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Detailed Message</label>
                    <textarea name="message" rows="5" placeholder="State your proposed adjustments here..." required></textarea>
                </div>

                <button type="submit" class="submit-btn">File Request</button>
            </form>
        </div>
    </div>

    <footer>
        <div class="footer-bottom">
            <p>&copy; 2026 ABC Real Estate. Agent Portal.</p>
        </div>
    </footer>

</body>
</html>
`;
