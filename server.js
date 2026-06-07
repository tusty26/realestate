const express = require('express');
const mysql = require('mysql2/promise');
const renderPage = require('./views/homepage');

const app = express();
const port = 3000;

const dbConfigs = [
    { host: '127.0.0.1', user: 'root', password: '', database: 'realestate_db' },
    { host: 'localhost', user: 'root', password: '', database: 'realestate_db' },
    { host: '127.0.0.1', user: 'kali', password: 'kali', database: 'realestate_db' },
    { socketPath: '/var/run/mysqld/mysqld.sock', user: 'root', password: '', database: 'realestate_db' }
];

async function getDbConnection() {
    for (const config of dbConfigs) {
        try {
            const connection = await mysql.createConnection(config);
            return connection;
        } catch (err) {
            // Silently attempt next configuration
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
            // Silently continue if query fails
        }
    }
    
    res.send(renderPage(properties));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
