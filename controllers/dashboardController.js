const { getDbConnection } = require('../config/db');
const renderAdminDashboard = require('../views/adminDashboard');

/**
 * FEATURE: Administrative Workstation Control Board
 * VULNERABILITY CLASS: Stored Cross-Site Scripting (XSS)
 * FILE LOCATION: controllers/dashboardController.js
 */
async function handleGetDashboard(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.redirect('/admin/login');
    }

    const connection = await getDbConnection();
    let properties = [];
    let inquiries = [];
    let adminNotes = [];
    let agentRequests = [];
    let agents = [];

    if (connection) {
        try {
            const [propRows] = await connection.execute('SELECT * FROM properties');
            properties = propRows;

            const [inqRows] = await connection.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
            inquiries = inqRows;

            const [notesRows] = await connection.execute('SELECT * FROM admin_notes ORDER BY created_at DESC');
            adminNotes = notesRows;

            const [reqRows] = await connection.execute('SELECT * FROM agent_requests ORDER BY created_at DESC');
            agentRequests = reqRows;

            const [agentRows] = await connection.execute('SELECT * FROM agents');
            agents = agentRows;

            await connection.end();
        } catch (err) {
            console.error('Database Error:', err.message);
        }
    }

    // VULNERABILITY SINK: Renders output rows directly in templates unescaped
    res.send(renderAdminDashboard(properties, inquiries, { username: sessionUser }, adminNotes, agentRequests, agents));


}

async function handlePostSaveNote(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).send('Unauthorized access');
    }

    const { note } = req.body;
    const connection = await getDbConnection();

    if (connection) {
        try {
            await connection.execute('INSERT INTO admin_notes (note) VALUES (?)', [note]);
            await connection.end();
        } catch (err) {
            console.error('Note Save Error:', err.message);
        }
    }
    res.redirect('/admin/dashboard');
}

module.exports = {
    handleGetDashboard,
    handlePostSaveNote
};
