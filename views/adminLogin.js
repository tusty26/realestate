module.exports = (errorMsg = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ABC Real Estate | Administrator Portal</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --gold: #f8a715;
            --black: #0c0c0e;
            --dark-grey: #1a1a22;
            --slate-footer: #15151a;
            --light-grey: #f8f9fc;
            --text-grey: #a0aec0;
            --error-red: #fc8181;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body { background-color: var(--black); color: #fff; line-height: 1.6; display: flex; flex-direction: column; min-height: 100vh; }

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
            border-bottom: 1px solid #edf2f7;
        }
        .logo { font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 800; color: var(--black); letter-spacing: 0.5px; }
        .logo span { color: var(--gold); }
        .nav-links { list-style: none; display: flex; gap: 25px; align-items: center; }
        .nav-links a { text-decoration: none; color: var(--black); font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 15px; transition: 0.3s; }
        .nav-links a:hover { color: var(--gold); }

        /* Login Container */
        .login-wrapper {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 10%;
            background: linear-gradient(rgba(12,12,14,0.85), rgba(12,12,14,0.95)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80');
            background-size: cover;
            background-position: center;
        }

        .login-card {
            background: rgba(26, 26, 34, 0.75);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-top: 5px solid var(--gold);
            padding: 45px 40px;
            width: 100%;
            max-width: 450px;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .login-card h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 5px;
            text-align: center;
            color: #fff;
        }

        .login-card p {
            font-size: 13px;
            color: var(--text-grey);
            text-align: center;
            margin-bottom: 30px;
            letter-spacing: 0.5px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            color: var(--gold);
            letter-spacing: 0.5px;
        }

        .form-group input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid rgba(255, 255, 255, 0.15);
            background: rgba(12, 12, 14, 0.5);
            color: #fff;
            border-radius: 8px;
            font-size: 15px;
            transition: all 0.3s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: var(--gold);
            box-shadow: 0 0 0 3px rgba(248, 167, 21, 0.2);
        }

        .error-message {
            background: rgba(252, 129, 129, 0.1);
            border-left: 4px solid var(--error-red);
            color: var(--error-red);
            padding: 12px 16px;
            margin-bottom: 20px;
            font-size: 14px;
            border-radius: 6px;
        }

        .login-btn {
            width: 100%;
            padding: 14px;
            background: var(--gold);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 15px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(248, 167, 21, 0.2);
        }

        .login-btn:hover {
            background: #fff;
            color: var(--black);
            transform: translateY(-1px);
        }

        /* Footer */
        footer {
            background: var(--slate-footer);
            color: var(--text-grey);
            padding: 25px 10%;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            font-size: 13px;
        }
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    </style>
</head>
<body>

    <nav>
        <div class="logo">ABC <span>REAL ESTATE</span></div>
        <ul class="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Projects</a></li>
            <li><a href="#">Contact</a></li>
        </ul>
    </nav>

    <div class="login-wrapper">
        <div class="login-card">
            <h2>Admin Portal</h2>
            <p>Constructing Since 1972</p>

            ${errorMsg ? `
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
                    ${errorMsg}
                </div>
            ` : ''}

            <form action="/admin/login" method="POST">
                <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" required autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                </div>
                <button type="submit" class="login-btn">Secure Login</button>
            </form>
        </div>
    </div>

    <footer>
        <div class="footer-content">
            <p>&copy; 2026 ABC Real Estate. Internal Administration Portal.</p>
            <p>Authorized Personnel Only.</p>
        </div>
    </footer>

</body>
</html>
`;
