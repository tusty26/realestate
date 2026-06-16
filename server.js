const express = require('express');
const mysql = require('mysql2/promise');
const renderPage = require('./views/homepage');

const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`MySQL Server running on Kali Linux at http://localhost:${port}`);
});
