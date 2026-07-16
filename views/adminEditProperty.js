module.exports = (property = {}) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Listing | ABC Real Estate</title>
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

        /* Wrapper */
        .wrapper {
            flex: 1;
            padding: 50px 10%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .edit-card {
            background: #fff;
            border: 1px solid var(--border-color);
            border-radius: 12px;
            padding: 40px;
            width: 100%;
            max-width: 650px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.02);
        }

        .edit-card h2 {
            font-family: 'Outfit', sans-serif;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 25px;
            color: var(--dark-grey);
            border-bottom: 2px solid #edf2f7;
            padding-bottom: 12px;
        }

        .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 20px;
        }

        .form-group-full {
            grid-column: span 2;
        }

        label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            font-size: 13px;
            text-transform: uppercase;
            color: var(--text-grey);
        }

        input[type="text"], input[type="number"], textarea {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: #fff;
        }

        input[type="text"]:focus, input[type="number"]:focus, textarea:focus {
            border-color: var(--gold);
            outline: none;
            box-shadow: 0 0 0 3px rgba(248, 167, 21, 0.15);
        }

        .btn-group {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }

        .submit-btn {
            flex: 1;
            padding: 14px;
            background: var(--black);
            color: #fff;
            border: none;
            border-radius: 8px;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }

        .submit-btn:hover {
            background: var(--gold);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(248, 167, 21, 0.2);
        }

        .cancel-btn {
            padding: 14px 25px;
            background: #e2e8f0;
            color: var(--dark-grey);
            border: none;
            border-radius: 8px;
            text-decoration: none;
            font-family: 'Outfit', sans-serif;
            font-weight: 600;
            font-size: 14px;
            text-transform: uppercase;
            transition: 0.3s;
            text-align: center;
        }

        .cancel-btn:hover {
            background: #cbd5e0;
        }
    </style>
</head>
<body>

    <nav>
        <div class="logo">ABC <span>REAL ESTATE</span></div>
    </nav>

    <div class="wrapper">
        <div class="edit-card">
            <h2>Edit Property Listing</h2>
            <form action="/admin/edit-property" method="POST">
                <input type="hidden" name="id" value="${property.id}">
                
                <div class="form-grid">
                    <div class="form-group-full">
                        <label>Property Title</label>
                        <input type="text" name="title" value="${property.title}" required>
                    </div>

                    <div>
                        <label>Location</label>
                        <input type="text" name="location" value="${property.location}" required>
                    </div>

                    <div>
                        <label>Price</label>
                        <input type="text" name="price" value="${property.price}" placeholder="e.g. $450,000" required>
                    </div>

                    <div>
                        <label>Rooms</label>
                        <input type="number" name="rooms" value="${property.rooms}" required>
                    </div>

                    <div>
                        <label>Baths</label>
                        <input type="number" name="baths" value="${property.baths}" required>
                    </div>

                    <div>
                        <label>Size (Sqft)</label>
                        <input type="number" name="size" value="${property.size}" required>
                    </div>

                    <div>
                        <label>Featured Listing</label>
                        <input type="number" name="is_featured" value="${property.is_featured ? 1 : 0}" placeholder="1 = Yes, 0 = No" min="0" max="1" required>
                    </div>

                    <div class="form-group-full">
                        <label>Image URL</label>
                        <input type="text" name="image_url" value="${property.image_url}" required>
                    </div>

                    <div class="form-group-full">
                        <label>Description</label>
                        <textarea name="description" rows="4" required>${property.description}</textarea>
                    </div>
                </div>

                <div class="btn-group">
                    <button type="submit" class="submit-btn">Save Changes</button>
                    <a href="/admin/dashboard" class="cancel-btn">Cancel</a>
                </div>
            </form>
        </div>
    </div>

</body>
</html>
`;
