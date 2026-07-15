const { getDbConnection } = require('../config/db');

/**
 * FEATURE: Administrative Audit Trail Search
 * VULNERABILITY CLASS: Union-Based SQL Injection (SQLi)
 * FILE LOCATION: controllers/auditController.js
 */
async function handleAuditLogs(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).send('Unauthorized access');
    }

    const { search } = req.query;
    const connection = await getDbConnection();

    if (!connection) {
        return res.status(500).send('Database connection failed');
    }

    try {
        // VULNERABILITY SINK: Search dynamic parameter concatenation
        const sql = `SELECT id, action, performed_by, ip_address, details FROM audit_logs WHERE action LIKE '%${search}%'`;
        const [rows] = await connection.query(sql);

        await connection.end();

        let rowHtml = '';
        rows.forEach(r => {
            rowHtml += `
                <tr>
                    <td>${r.id}</td>
                    <td><strong>${r.action}</strong></td>
                    <td>${r.performed_by}</td>
                    <td>${r.ip_address}</td>
                    <td>${r.details}</td>
                </tr>
            `;
        });

        res.send(`
            <html>
            <body style="font-family: Arial; padding: 20px; background: #fafafa;">
                <h2>System Audit Logs</h2>
                <p>Search term: <strong>${search}</strong></p>
                <table border="1" cellpadding="10" style="border-collapse: collapse; background: #fff; width: 100%;">
                    <thead>
                        <tr style="background: #eee;">
                            <th>ID</th>
                            <th>Action</th>
                            <th>Performed By</th>
                            <th>IP Address</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rowHtml}
                    </tbody>
                </table>
                <br><a href="/admin/dashboard">Back to Dashboard</a>
            </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send(`Search Log Error: ${err.message}<br><a href="/admin/dashboard">Back to Dashboard</a>`);
    }
}

module.exports = {
    handleAuditLogs
};
