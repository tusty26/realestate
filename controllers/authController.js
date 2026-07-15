const { getDbConnection } = require('../config/db');
const renderAdminLogin = require('../views/adminLogin');

function handleGetLogin(req, res) {
    res.send(renderAdminLogin());
}

/**
 * FEATURE: Administrative Authentication
 * VULNERABILITY CLASS: SQL Injection (SQLi) Authentication Bypass
 * FILE LOCATION: controllers/authController.js
 */
async function handlePostLogin(req, res) {
    const { username, password } = req.body;
    const connection = await getDbConnection();

    if (!connection) {
        return res.send(renderAdminLogin('Database connection failed. Please try again.'));
    }

    try {
        // VULNERABILITY SINK: Raw string concatenation of inputs
        const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        const [rows] = await connection.query(sql);
        
        await connection.end();

        if (rows.length > 0) {
            res.cookie('admin_session', rows[0].username, { httpOnly: false });
            return res.redirect('/admin/dashboard');
        } else {
            return res.send(renderAdminLogin('Invalid administrative credentials.'));
        }
    } catch (err) {
        console.error('SQLi Error:', err.message);
        return res.send(renderAdminLogin(`Database Error: ${err.message}`));
    }
}

function handleGetLogout(req, res) {
    res.clearCookie('admin_session');
    res.redirect('/admin/login');
}

module.exports = {
    handleGetLogin,
    handlePostLogin,
    handleGetLogout
};
