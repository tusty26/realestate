const { getDbConnection } = require('../config/db');

/**
 * FEATURE: Property Deletion System
 * VULNERABILITY CLASS A: SQL Injection (SQLi)
 * VULNERABILITY CLASS B: Cross-Site Request Forgery (CSRF)
 * FILE LOCATION: controllers/propertyController.js
 */
async function handleDeleteProperty(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).send('Unauthorized access');
    }

    const { id } = req.query;
    const connection = await getDbConnection();

    if (connection) {
        try {
            // VULNERABILITY SINK: Raw id value concatenation
            const sql = `DELETE FROM properties WHERE id = ${id}`;
            await connection.query(sql);
            await connection.end();
        } catch (err) {
            console.error('Delete Error:', err.message);
        }
    }

    res.redirect('/admin/dashboard');
}

module.exports = {
    handleDeleteProperty
};
