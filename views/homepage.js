module.exports = (properties, searchTerm = '', inquiries = []) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ABC Real Estate | Constructing Since 1972</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        :root {
            --gold: #f8a715;
            --black: #000000;
            --dark-grey: #1a1a1a;
            --slate-footer: #222222;
            --light-grey: #f4f4f4;
            --text-grey: #666666;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        body { background-color: #fff; color: var(--black); line-height: 1.6; }

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

        /* Search Section */
        .search-section { padding: 40px 10%; background: #fff; text-align: center; }
        .search-form { display: flex; justify-content: center; gap: 10px; margin-bottom: 20px; }
        .search-input { padding: 10px 15px; width: 300px; border: 1px solid #ddd; border-radius: 4px; }
        .search-btn { padding: 10px 20px; background: var(--gold); color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }

        /* Hero Banner */
        .hero {
            height: 60vh;
            background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80');
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            text-align: center;
        }
        .hero-content h1 { font-size: 48px; text-transform: uppercase; letter-spacing: 2px; }
        .hero-content p { font-size: 18px; margin-top: 10px; font-weight: 300; }

        /* Welcome Section (DOM XSS) */
        .welcome-msg { padding: 20px 10%; background: var(--light-grey); text-align: right; font-weight: bold; }

        /* About Section */
        .about { padding: 80px 10%; text-align: center; }
        .about h2 { font-size: 32px; font-weight: 800; margin-bottom: 5px; }
        .about h3 { color: var(--gold); font-size: 14px; letter-spacing: 3px; margin-bottom: 30px; }
        .vision-box { max-width: 800px; margin: 0 auto; padding: 40px; border-left: 5px solid var(--gold); background: var(--light-grey); font-size: 18px; font-style: italic; }

        /* Property Grid */
        .properties-section { padding: 60px 10%; background: var(--light-grey); }
        .section-header { text-align: center; margin-bottom: 50px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; }
        .card { background: #fff; border-radius: 4px; overflow: hidden; box-shadow: 0 5px 15px rgba(0,0,0,0.05); transition: 0.3s; position: relative; }
        .card:hover { transform: translateY(-10px); }
        .card-img { height: 250px; width: 100%; object-fit: cover; }
        .badge { position: absolute; top: 15px; left: 15px; background: var(--gold); color: #fff; padding: 5px 12px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
        .card-body { padding: 25px; }
        .card-title { font-size: 20px; font-weight: 700; margin-bottom: 10px; color: var(--black); }
        .card-text { font-size: 14px; color: var(--text-grey); margin-bottom: 20px; }
        .meta { display: flex; justify-content: space-between; border-top: 1px solid #eee; padding-top: 15px; margin-bottom: 20px; font-size: 13px; color: var(--text-grey); }
        .meta i { color: var(--gold); margin-right: 5px; }
        .btn-details { display: block; width: 100%; padding: 12px; background: var(--gold); color: #fff; text-align: center; text-decoration: none; font-weight: bold; transition: 0.3s; }
        .btn-details:hover { background: var(--black); }

        /* Landmarks & News */
        .landmarks { padding: 60px 10%; }
        .landmark-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; }
        .landmark-item { height: 200px; background-size: cover; background-position: center; border-radius: 4px; }

        /* Inquiry Section */
        .inquiry-section { padding: 60px 10%; background: var(--light-grey); }
        .inquiry-form { max-width: 600px; margin: 0 auto 40px; background: #fff; padding: 30px; border-radius: 4px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .inquiry-form h3 { margin-bottom: 20px; text-align: center; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
        .form-group textarea { height: 100px; }
        .submit-btn { width: 100%; padding: 12px; background: var(--gold); color: #fff; border: none; border-radius: 4px; font-weight: bold; cursor: pointer; }

        .inquiry-list { max-width: 800px; margin: 0 auto; }
        .inquiry-item { background: #fff; padding: 20px; border-radius: 4px; margin-bottom: 15px; border-left: 5px solid var(--gold); }
        .inquiry-name { font-weight: bold; color: var(--gold); margin-bottom: 5px; }
        .inquiry-message { font-size: 14px; color: var(--text-grey); }

        /* Footer */
        footer { background: var(--slate-footer); color: #fff; padding: 60px 10% 20px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 50px; margin-bottom: 40px; }
        .footer-about p { color: #aaa; margin-top: 20px; max-width: 400px; }
        .footer-contact h4 { margin-bottom: 20px; color: var(--gold); }
        .footer-contact p { margin-bottom: 10px; color: #aaa; }
        .footer-bottom { border-top: 1px solid #444; padding-top: 20px; display: flex; justify-content: space-between; font-size: 13px; color: #888; }
        .social-icons a { color: #fff; margin-left: 15px; font-size: 18px; transition: 0.3s; }
        .social-icons a:hover { color: var(--gold); }

        @media (max-width: 768px) {
            .nav-links { display: none; }
            .landmark-grid { grid-template-columns: repeat(2, 1fr); }
            .footer-grid { grid-template-columns: 1fr; }
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

    <div class="welcome-msg" id="welcome-msg">
        Welcome, Guest!
    </div>

    <header class="hero">
        <div class="hero-content">
            <h1>Excellence in Construction</h1>
            <p>Building Landmarks Since 1972</p>
        </div>
    </header>

    <section class="search-section">
        <form action="/" method="GET" class="search-form">
            <input type="text" name="search" placeholder="Search properties..." class="search-input" value="${searchTerm}">
            <button type="submit" class="search-btn">Search</button>
        </form>
        ${searchTerm ? `<div class="search-results">Showing results for: <strong>${searchTerm}</strong></div>` : ''}
    </section>

    <section class="about">
        <h2>ABC REAL ESTATE</h2>
        <h3>CONSTRUCTING SINCE 1972</h3>
        <div class="vision-box">
            "To be the leader in the real estate industry by providing enhanced services, relationship and profitability through quality and innovation."
        </div>
    </section>

    <section class="properties-section">
        <div class="section-header">
            <h2>Our Featured Projects</h2>
            <p>Discover our range of premium properties designed for your lifestyle.</p>
        </div>
        <div class="grid">
            ${properties.length > 0 ? properties.map(p => `
                <div class="card">
                    ${p.is_featured ? '<div class="badge">Featured</div>' : ''}
                    <img src="${p.image_url}" alt="${p.title}" class="card-img">
                    <div class="card-body">
                        <h3 class="card-title">${p.title}</h3>
                        <p class="card-text">${p.description}</p>
                        <div class="meta">
                            <span><i class="fas fa-bed"></i> ${p.rooms} Beds</span>
                            <span><i class="fas fa-bath"></i> ${p.baths} Baths</span>
                            <span><i class="fas fa-expand"></i> ${p.size} Sqft</span>
                        </div>
                        <a href="#" class="btn-details">Details</a>
                    </div>
                </div>
            `).join('') : '<p style="text-align:center; width: 100%;">No properties found matching your search.</p>'}
        </div>
    </section>

    <section class="inquiry-section">
        <div class="section-header">
            <h2>Customer Inquiries</h2>
            <p>Leave us a message and we will get back to you.</p>
        </div>
        
        <form action="/inquiry" method="POST" class="inquiry-form">
            <h3>Send an Inquiry</h3>
            <div class="form-group">
                <label>Name</label>
                <input type="text" name="name" required>
            </div>
            <div class="form-group">
                <label>Message</label>
                <textarea name="message" required></textarea>
            </div>
            <button type="submit" class="submit-btn">Submit Inquiry</button>
        </form>

        <div class="inquiry-list">
            ${inquiries.map(i => `
                <div class="inquiry-item">
                    <div class="inquiry-name">${i.name}</div>
                    <div class="inquiry-message">${i.message}</div>
                </div>
            `).join('')}
        </div>
    </section>

    <footer>
        <div class="footer-grid">
            <div class="footer-about">
                <div class="logo" style="color: #fff;">ABC REAL ESTATE</div>
                <p>Leading the way in premium residential and commercial developments across Bangladesh. Quality and integrity are our core pillars.</p>
            </div>
            <div class="footer-contact">
                <h4>Contact Us</h4>
                <p><i class="fas fa-map-marker-alt" style="margin-right: 10px; color: var(--gold);"></i> 123 Corporate Road, Gulshan, Dhaka</p>
                <p><i class="fas fa-phone" style="margin-right: 10px; color: var(--gold);"></i> +880 123 456 7890</p>
                <p><i class="fas fa-envelope" style="margin-right: 10px; color: var(--gold);"></i> info@abcrealestate.com</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 ABC Real Estate. All Rights Reserved.</p>
            <div class="social-icons">
                <a href="#"><i class="fab fa-facebook-f"></i></a>
                <a href="#"><i class="fab fa-twitter"></i></a>
                <a href="#"><i class="fab fa-instagram"></i></a>
                <a href="#"><i class="fab fa-linkedin-in"></i></a>
            </div>
        </div>
    </footer>

    <script>
        // DOM XSS Sink
        const params = new URLSearchParams(window.location.hash.substring(1));
        const userName = params.get('name');
        if (userName) {
            document.getElementById('welcome-msg').innerHTML = 'Welcome, ' + userName + '!';
        }
    </script>

</body>
</html>
`;
