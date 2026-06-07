const express = require('express');
const mysql = require('mysql2/promise');
const renderPage = require('./views/homepage');

const app = express();
const port = 3000;

/**
 * Kali Linux Optimized Database Configurations
 * Attempts local connection with no password (default for Kali/MariaDB)
 */
const dbConfigs = [
    // 1. Kali Default: Root access via local loopback with no password
    { host: '127.0.0.1', user: 'root', password: '', database: 'realestate_db' },
    
    // 2. Kali Default: Root access via localhost alias with no password
    { host: 'localhost', user: 'root', password: '', database: 'realestate_db' },
    
    // 3. Kali Socket: Direct connection via UNIX socket (extremely reliable on Linux)
    { socketPath: '/var/run/mysqld/mysqld.sock', user: 'root', password: '', database: 'realestate_db' },
    
    // 4. Fallback for 'kali' user with 'kali' password (default Kali credentials)
    { host: '127.0.0.1', user: 'kali', password: 'kali', database: 'realestate_db' }
];

async function getDbConnection() {
    for (const config of dbConfigs) {
        try {
            const connection = await mysql.createConnection(config);
            await connection.ping();
            return connection;
        } catch (err) {
            // Silently try the next configuration in the array
        }
    }
    return null;
}

app.get('/', async (req, res) => {
    let properties = [];
    const connection = await getDbConnection();
    
    if (connection) {
        try {
            const [rows] = await connection.execute('SELECT * FROM properties');
            properties = rows;
            await connection.end();
        } catch (err) {
            console.error('Database Error:', err.message);
        }
    }
    
    res.send(renderPage(properties));
});

app.listen(port, () => {
    console.log(`Server running on Kali Linux at http://localhost:${port}`);
});
