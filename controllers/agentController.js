const { getDbConnection } = require('../config/db');

/**
 * FEATURE: Agent Directory Search
 * VULNERABILITY CLASS: Error-Based SQL Injection (SQLi)
 * FILE LOCATION: controllers/agentController.js
 */
async function handleAgentLookup(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).send('Unauthorized access');
    }

    const { name } = req.query;
    const connection = await getDbConnection();

    if (!connection) {
        return res.status(500).send('Database connection failed');
    }

    try {
        // VULNERABILITY SINK: Raw search parameter concatenation
        const sql = `SELECT * FROM agents WHERE name = '${name}'`;
        const [rows] = await connection.query(sql);
        
        await connection.end();

        if (rows.length > 0) {
            res.send(`
                <html>
                <body style="font-family: Arial; padding: 20px; background: #fafafa;">
                    <h2>Agent Record Found</h2>
                    <table border="1" cellpadding="10" style="border-collapse: collapse; background: #fff;">
                        <tr><th>Name</th><td>${rows[0].name}</td></tr>
                        <tr><th>Phone</th><td>${rows[0].phone}</td></tr>
                        <tr><th>Email</th><td>${rows[0].email}</td></tr>
                    </table>
                    <br><a href="/admin/dashboard">Back to Dashboard</a>
                </body>
                </html>
            `);
        } else {
            res.send('No agent found matching search name.<br><a href="/admin/dashboard">Back to Dashboard</a>');
        }
    } catch (err) {
        // VULNERABILITY SINK: Verbose syntax errors printed to client response stream
        res.status(500).send(`
            <html>
            <body style="font-family: monospace; padding: 20px; background: #fee;">
                <h3 style="color: #a00;">Database Query Exception: Error-Based SQLi Lab</h3>
                <p><strong>Error Message:</strong> ${err.message}</p>
                <p><strong>Query Executed:</strong> SELECT * FROM agents WHERE name = '${name}'</p>
                <br><a href="/admin/dashboard">Back to Dashboard</a>
            </body>
            </html>
        `);
    }
}

module.exports = {
    handleAgentLookup
};
