const express = require('express');
const mysql = require('mysql2/promise');
const renderPage = require('./views/homepage');
const renderAdminLogin = require('./views/adminLogin');
const renderAdminDashboard = require('./views/adminDashboard');

const app = express();
const port = 3000;

// Simple custom cookie parser middleware for session demonstration (no extra dependencies required)
app.use((req, res, next) => {
    const list = {};
    const rc = req.headers.cookie;
    if (rc) {
        rc.split(';').forEach((cookie) => {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
    }
    req.cookies = list;
    next();
});

app.use(express.urlencoded({ extended: true }));

/**
 * MySQL Database Configurations (Optimized for Kali Linux)
 * The server attempts these sequentially until a connection is established.
 * Default Kali installations often use the root user with no password.
 */
const dbConfigs = [
    // 1. Standard MySQL: Root access via local loopback (No Password)
    { host: '127.0.0.1', user: 'root', password: '', database: 'realestate_db' },
    
    // 2. Standard MySQL: Root access via localhost alias (No Password)
    { host: 'localhost', user: 'root', password: '', database: 'realestate_db' },
    
    // 3. MySQL Socket: Direct connection via UNIX pipe (Reliable on Linux)
    { socketPath: '/var/run/mysqld/mysqld.sock', user: 'root', password: '', database: 'realestate_db' },
    
    // 4. Custom MySQL User: Using default Kali credentials
    { host: '127.0.0.1', user: 'kali', password: 'kali', database: 'realestate_db' }
];

async function getDbConnection() {
    for (const config of dbConfigs) {
        try {
            const connection = await mysql.createConnection(config);
            await connection.ping();
            return connection;
        } catch (err) {
            // Move to next configuration if this one fails
        }
    }
    return null;
}

// ----------------------------------------------------
// Public Routes
// ----------------------------------------------------

app.get('/', async (req, res) => {
    let properties = [];
    let inquiries = [];
    const searchTerm = req.query.search || '';
    const connection = await getDbConnection();
    
    if (connection) {
        try {
            // Querying MySQL for property listings
            let query = 'SELECT * FROM properties';
            let params = [];
            if (searchTerm) {
                query += ' WHERE title LIKE ? OR location LIKE ?';
                params = [`%${searchTerm}%`, `%${searchTerm}%`];
            }
            const [rows] = await connection.execute(query, params);
            properties = rows;

            // Querying MySQL for inquiries (Stored XSS source)
            const [inquiryRows] = await connection.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
            inquiries = inquiryRows;

            await connection.end();
        } catch (err) {
            console.error('MySQL Error:', err.message);
        }
    }
    
    res.send(renderPage(properties, searchTerm, inquiries));
});

app.post('/inquiry', async (req, res) => {
    const { name, message } = req.body;
    const connection = await getDbConnection();
    
    if (connection) {
        try {
            await connection.execute('INSERT INTO inquiries (name, message) VALUES (?, ?)', [name, message]);
            await connection.end();
        } catch (err) {
            console.error('MySQL Error:', err.message);
        }
    }
    res.redirect('/');
});

// ----------------------------------------------------
// Admin Routes (Vulnerable Security Lab Environment)
// ----------------------------------------------------

/**
 * 1. Admin Login View
 */
app.get('/admin/login', (req, res) => {
    res.send(renderAdminLogin());
});

/**
 * 2. Admin Authentication Handler
 * VULNERABILITY: SQL Injection (SQLi)
 * - Uses raw string concatenation of username and password inputs directly in the query.
 * - Demonstration payload: ' OR '1'='1
 */
app.post('/admin/login', async (req, res) => {
    const { username, password } = req.body;
    const connection = await getDbConnection();

    if (!connection) {
        return res.send(renderAdminLogin('Database connection failed. Please try again.'));
    }

    try {
        // VULNERABLE LINE: String concatenation directly in the SQL statement
        const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        const [rows] = await connection.query(sql);
        
        /* 
         * ----------------------------------------------------
         * MITIGATION / REMEDIATION (SECURE APPROACH):
         * Instead of concatenating input variables directly, use parameterized inputs:
         * 
         * const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
         * const [rows] = await connection.execute(sql, [username, password]);
         * 
         * Additionally, passwords should never be stored in plain text or MD5.
         * You should hash passwords with bcrypt:
         * const match = await bcrypt.compare(password, user.password_hash);
         * ----------------------------------------------------
         */

        await connection.end();

        if (rows.length > 0) {
            // Stateless Session: Set a simple session cookie without signing or encryption
            res.cookie('admin_session', rows[0].username, { httpOnly: false }); // httpOnly: false allows demonstration of cookie theft via Stored XSS
            return res.redirect('/admin/dashboard');
        } else {
            return res.send(renderAdminLogin('Invalid administrative credentials.'));
        }
    } catch (err) {
        console.error('SQLi Error:', err.message);
        return res.send(renderAdminLogin(`Database Error: ${err.message}`));
    }
});

/**
 * 3. Admin Dashboard (Vulnerable View rendering Stored XSS)
 * VULNERABILITY: Stored Cross-Site Scripting (XSS)
 * - Renders the database inputs directly without sanitization/escaping (handled inside renderAdminDashboard template).
 * - Cookie lacks HttpOnly/Secure flags, allowing demonstrative session hijacking via Stored XSS payload.
 */
app.get('/admin/dashboard', async (req, res) => {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.redirect('/admin/login');
    }

    const connection = await getDbConnection();
    let properties = [];
    let inquiries = [];

    if (connection) {
        try {
            const [propRows] = await connection.execute('SELECT * FROM properties');
            properties = propRows;

            const [inqRows] = await connection.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
            inquiries = inqRows;

            await connection.end();
        } catch (err) {
            console.error('Database Error:', err.message);
        }
    }

    res.send(renderAdminDashboard(properties, inquiries, { username: sessionUser }));
});

/**
 * 4. Delete Property Handler
 * VULNERABILITY A: SQL Injection (SQLi)
 * - Directly concatenates query string 'id' value without parsing or parameterizing.
 * - Injection payload example: /admin/delete-property?id=1 OR 1=1
 * 
 * VULNERABILITY B: Cross-Site Request Forgery (CSRF)
 * - State-changing GET endpoint without CSRF token verification.
 * - Relies entirely on the presence of the session cookie, which browsers attach automatically.
 * - Simple external forms or images can forge this request.
 */
app.get('/admin/delete-property', async (req, res) => {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).send('Unauthorized access');
    }

    const { id } = req.query;
    const connection = await getDbConnection();

    if (connection) {
        try {
            // VULNERABLE LINE: String concatenation directly in execution path
            const sql = `DELETE FROM properties WHERE id = ${id}`;
            await connection.query(sql);

            /*
             * ----------------------------------------------------
             * MITIGATION / REMEDIATION (SECURE APPROACH):
             * 1. Change the HTTP method from GET to POST for state-changing operations.
             * 2. Parameterize the inputs to avoid SQL Injection:
             *    const sql = 'DELETE FROM properties WHERE id = ?';
             *    await connection.execute(sql, [id]);
             * 3. Implement CSRF Protection:
             *    Use anti-CSRF challenge tokens (e.g. using the 'csurf' library) or strict 
             *    SameSite cookies (e.g. SameSite=Strict).
             * ----------------------------------------------------
             */

            await connection.end();
        } catch (err) {
            console.error('Delete Error:', err.message);
        }
    }

    res.redirect('/admin/dashboard');
});

/**
 * 5. Logout Handler
 */
app.get('/admin/logout', (req, res) => {
    res.clearCookie('admin_session');
    res.redirect('/admin/login');
});

app.listen(port, () => {
    console.log(`MySQL Server running on Kali Linux at http://localhost:${port}`);
});

