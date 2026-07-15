const mysql = require('mysql2/promise');

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

module.exports = {
    getDbConnection
};
