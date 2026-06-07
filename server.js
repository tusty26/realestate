const express = require('express');
const mysql = require('mysql2/promise');
const renderPage = require('./views/homepage');

const app = express();
const port = 3000;

/**
 * MySQL Connection Configurations
 * The server will attempt these sequentially until one succeeds.
 * Update the password fields below with your actual MySQL root password.
 */
const dbConfigs = [
    // Standard Local MySQL (No Password - Common in Dev)
    { host: '127.0.0.1', user: 'root', password: '', database: 'realestate_db' },
    
    // Standard Local MySQL (With Password 'root' - Common in MAMP/WAMP)
    { host: '127.0.0.1', user: 'root', password: 'root', database: 'realestate_db' },
    
    // Localhost Alias
    { host: 'localhost', user: 'root', password: '', database: 'realestate_db' },
    
    // Custom Development User
    { host: '127.0.0.1', user: 'dev_user', password: 'password', database: 'realestate_db' },
    
    // UNIX Socket (Linux specific)
    { socketPath: '/var/run/mysqld/mysqld.sock', user: 'root', password: '', database: 'realestate_db' }
];

async function getDbConnection() {
    for (const config of dbConfigs) {
        try {
            const connection = await mysql.createConnection(config);
            // Verify connection is alive
            await connection.ping();
            return connection;
        } catch (err) {
            // Log connection attempts if needed for debugging
            // console.log(`Failed connection to ${config.host || 'Socket'}: ${err.message}`);
        }
    }
    return null;
}

app.get('/', async (req, res) => {
    let properties = [];
    const connection = await getDbConnection();
    
    if (connection) {
        try {
            // Fetching active property rows for the 3-column grid
            const [rows] = await connection.execute('SELECT * FROM properties');
            properties = rows;
            await connection.end();
        } catch (err) {
            console.error('MySQL Query Error:', err.message);
        }
    }
    
    // Serve the UI template with the database results (or empty array)
    res.send(renderPage(properties));
});

app.listen(port, () => {
    console.log(`MySQL Server running at http://localhost:${port}`);
});
