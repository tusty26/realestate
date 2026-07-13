module.exports = (errorMsg = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ABC Real Estate | Administrator Portal</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --gold: #f8a715;
            --black: #000000;
            --dark-grey: #1a1a1a;
            --slate-footer: #222222;
            --light-grey: #f4f4f4;
            --text-grey: #666666;
            --error-red: #ff3333;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: var(--black); color: #fff; line-height: 1.6; display: flex; flex-direction: column; min-height: 100vh; }

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
        .nav-links { list-style: none; display: flex; gap: 30px; }
        .nav-links a { text-decoration: none; color: var(--black); font-weight: 600; font-size: 14px; text-transform: uppercase; transition: 0.3s; }
        .nav-links a:hover { color: var(--gold); }

        /* Login Container */
        .login-wrapper {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 40px 10%;
            background: linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80');
            background-size: cover;
            background-position: center;
        }

        .login-card {
            background: var(--dark-grey);
            border-top: 5px solid var(--gold);
            padding: 40px;
            width: 100%;
            max-width: 450px;
            border-radius: 4px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .login-card h2 {
            font-size: 24px;
            text-transform: uppercase;
            letter-spacing: 2px;
            margin-bottom: 5px;
            text-align: center;
        }

        .login-card p {
            font-size: 14px;
            color: var(--text-grey);
            text-align: center;
            margin-bottom: 30px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            color: var(--gold);
        }

        .form-group input {
            width: 100%;
            padding: 12px 15px;
            border: 1px solid #333;
            background: #222;
            color: #fff;
            border-radius: 4px;
            font-size: 16px;
            transition: 0.3s;
        }

        .form-group input:focus {
            outline: none;
            border-color: var(--gold);
        }

        .error-message {
            background: rgba(255, 51, 51, 0.1);
            border-left: 4px solid var(--error-red);
            color: var(--error-red);
            padding: 15px;
            margin-bottom: 20px;
            font-size: 14px;
            border-radius: 4px;
        }

        .login-btn {
            width: 100%;
            padding: 14px;
            background: var(--gold);
            color: #fff;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            font-size: 16px;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 1px;
            transition: 0.3s;
        }

        .login-btn:hover {
            background: #fff;
            color: var(--black);
        }

        /* Footer */
        footer {
            background: var(--slate-footer);
            color: #888;
            padding: 20px 10%;
            border-top: 1px solid #2a2a2a;
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
        <div class="logo">ABC REAL ESTATE</div>
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
