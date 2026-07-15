const { getDbConnection } = require('../config/db');

/**
 * FEATURE: Property Existence Checker
 * VULNERABILITY CLASS: Boolean-Based Blind SQL Injection (SQLi)
 * FILE LOCATION: controllers/propertyCheckController.js
 */
async function handlePropertyCheck(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title } = req.query;
    const connection = await getDbConnection();

    if (!connection) {
        return res.status(500).json({ error: 'DB Connection Failed' });
    }

    try {
        // VULNERABILITY SINK: String concatenated query
        const sql = `SELECT * FROM properties WHERE title = '${title}'`;
        const [rows] = await connection.query(sql);
        
        await connection.end();

        if (rows.length > 0) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        // Suppress SQL syntax exception outputs to enforce boolean conditions
        res.json({ exists: false });
    }
}

module.exports = {
    handlePropertyCheck
};
