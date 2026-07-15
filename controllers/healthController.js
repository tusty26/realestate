const { getDbConnection } = require('../config/db');

/**
 * FEATURE: Diagnostics System Performance Checker
 * VULNERABILITY CLASS: Time-Based Blind SQL Injection (SQLi)
 * FILE LOCATION: controllers/healthController.js
 */
async function handleSystemHealth(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const { id } = req.query;
    const connection = await getDbConnection();

    if (!connection) {
        return res.status(500).json({ error: 'DB Connection Failed' });
    }

    try {
        // VULNERABILITY SINK: Synchronous database statement query concatenation
        const sql = `SELECT * FROM properties WHERE id = ${id}`;
        await connection.query(sql);
        await connection.end();
    } catch (err) {
        // Suppress all execution errors to enforce time-based measurements
    }

    // Static output response structure
    res.json({ status: "healthy", timestamp: Date.now() });
}

module.exports = {
    handleSystemHealth
};
