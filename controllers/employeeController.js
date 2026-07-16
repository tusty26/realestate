const { getDbConnection } = require('../config/db');
const renderLogin = require('../views/employeeLogin');
const renderDashboard = require('../views/employeeDashboard');

async function handleGetLogin(req, res) {
    res.send(renderLogin());
}

async function handlePostLogin(req, res) {
    const { username, password } = req.body;
    const connection = await getDbConnection();

    if (!connection) {
        return res.status(500).send('Database connection failed');
    }

    try {
        const sql = 'SELECT * FROM agents WHERE username = ? AND password = ?';
        const [rows] = await connection.execute(sql, [username, password]);
        await connection.end();

        if (rows.length > 0) {
            // Set cookie session
            res.setHeader('Set-Cookie', `agent_session=${rows[0].username}; Path=/; HttpOnly`);
            return res.redirect('/employee/dashboard');
        } else {
            return res.send(renderLogin('Invalid Broker Username or Password'));
        }
    } catch (err) {
        console.error('Broker Login Error:', err.message);
        res.send(renderLogin('A system error occurred.'));
    }
}

async function handleGetDashboard(req, res) {
    const agentSession = req.cookies.agent_session;
    if (!agentSession) {
        return res.redirect('/employee/login');
    }

    const connection = await getDbConnection();
    if (!connection) {
        return res.status(500).send('Database connection failed');
    }

    try {
        // Fetch broker agent profile
        const [agentRows] = await connection.execute('SELECT * FROM agents WHERE username = ?', [agentSession]);
        if (agentRows.length === 0) {
            await connection.end();
            return res.redirect('/employee/login');
        }
        const agent = agentRows[0];

        // Fetch assigned property listings
        const [properties] = await connection.execute('SELECT * FROM properties WHERE assigned_agent_id = ?', [agent.id]);
        await connection.end();

        res.send(renderDashboard(properties, agent));
    } catch (err) {
        console.error('Broker Dashboard Error:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

async function handlePostSubmitRequest(req, res) {
    const agentSession = req.cookies.agent_session;
    if (!agentSession) {
        return res.status(403).send('Unauthorized access');
    }

    const { property_title, request_type, message } = req.body;
    const connection = await getDbConnection();

    if (!connection) {
        return res.status(500).send('Database connection failed');
    }

    try {
        // Fetch agent name
        const [agentRows] = await connection.execute('SELECT name FROM agents WHERE username = ?', [agentSession]);
        const agentName = agentRows.length > 0 ? agentRows[0].name : 'Unknown Broker';

        // VULNERABILITY NOTE: Stored XSS Sink. We store the raw unescaped request message.
        const sql = 'INSERT INTO agent_requests (agent_name, property_title, request_type, message) VALUES (?, ?, ?, ?)';
        await connection.execute(sql, [agentName, property_title, request_type, message]);
        await connection.end();

        res.send(`
            <script>
                alert('Request filed successfully to Super Administrators.');
                window.location.href = '/employee/dashboard';
            </script>
        `);
    } catch (err) {
        console.error('Request File Error:', err.message);
        res.status(500).send('Internal Server Error');
    }
}

function handleLogout(req, res) {
    res.setHeader('Set-Cookie', 'agent_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT');
    res.redirect('/employee/login');
}

module.exports = {
    handleGetLogin,
    handlePostLogin,
    handleGetDashboard,
    handlePostSubmitRequest,
    handleLogout
};
