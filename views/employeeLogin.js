module.exports = (errorMsg = '') => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Broker Login | ABC Real Estate</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --gold: #f8a715;
            --black: #0c0c0e;
            --dark-grey: #1a1a22;
            --light-grey: #f8f9fc;
            --text-grey: #718096;
            --border-color: #edf2f7;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; }
        body {
            background-color: var(--light-grey);
            color: var(--black);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }

        .login-card {
            background: #fff;
            border: 1px solid var(--border-color);
            border-radius: 16px;
            padding: 45px;
            width: 100%;
            max-width: 440px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.03);
            text-align: center;
        }

        .logo {
            font-family: 'Outfit', sans-serif;
            font-size: 26px;
            font-weight: 800;
            color: var(--black);
            letter-spacing: 0.5px;
            margin-bottom: 10px;
        }
        .logo span { color: var(--gold); }

        .subtitle {
            font-size: 14px;
            color: var(--text-grey);
            margin-bottom: 35px;
        }

        .form-group {
            text-align: left;
            margin-bottom: 22px;
            position: relative;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            color: var(--text-grey);
            letter-spacing: 0.5px;
        }

        .input-wrapper {
            position: relative;
        }

        .input-wrapper i {
            position: absolute;
            left: 16px;
            top: 50%;
            transform: translateY(-50%);
            color: var(--text-grey);
            font-size: 16px;
        }

        input {
            width: 100%;
            padding: 14px 16px 14px 45px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: var(--light-grey);
        }

        input:focus {
            border-color: var(--gold);
            outline: none;
            background: #fff;
            box-shadow: 0 0 0 4px rgba(248, 167, 21, 0.15);
        }

        .error-banner {
            background: #fdf2f2;
            border: 1px solid #f8b4b4;
            color: #9b1c1c;
            padding: 12px;
            border-radius: 8px;
            font-size: 13px;
            margin-bottom: 25px;
            text-align: left;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .login-btn {
            width: 100%;
            padding: 15px;
            background: var(--black);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-weight: 700;
            font-size: 14px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 10px;
            letter-spacing: 0.5px;
        }

        .login-btn:hover {
            background: var(--gold);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(248, 167, 21, 0.25);
        }

        .back-home {
            display: inline-block;
            margin-top: 25px;
            color: var(--text-grey);
            text-decoration: none;
            font-size: 13px;
            transition: 0.3s;
        }
        .back-home:hover {
            color: var(--gold);
        }
    </style>
</head>
<body>

    <div class="login-card">
        <div class="logo">ABC <span>PARTNERS</span></div>
        <div class="subtitle">Brokerage & Agent Operations Portal</div>

        ${errorMsg ? `
            <div class="error-banner">
                <i class="fas fa-exclamation-circle"></i>
                <span>${errorMsg}</span>
            </div>
        ` : ''}

        <form action="/employee/login" method="POST">
            <div class="form-group">
                <label>Broker Username</label>
                <div class="input-wrapper">
                    <i class="fas fa-user"></i>
                    <input type="text" name="username" placeholder="e.g. sarah" required>
                </div>
            </div>

            <div class="form-group">
                <label>Security Password</label>
                <div class="input-wrapper">
                    <i class="fas fa-lock"></i>
                    <input type="password" name="password" placeholder="••••••••" required>
                </div>
            </div>

            <button type="submit" class="login-btn">Secure Login</button>
        </form>

        <a href="/" class="back-home"><i class="fas fa-arrow-left"></i> Back to Main Portal</a>
    </div>

</body>
</html>
`;
