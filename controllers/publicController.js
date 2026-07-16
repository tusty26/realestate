const { getDbConnection } = require('../config/db');
const renderPage = require('../views/homepage');

async function handleGetHome(req, res) {
    let properties = [];
    let inquiries = [];
    const searchTerm = req.query.search || '';
    const connection = await getDbConnection();
    
    if (connection) {
        try {
            let query = 'SELECT * FROM properties';
            if (searchTerm) {
                // VULNERABLE SINK: Concatenates search query string directly to execute SQLi & Reflected XSS
                query += ` WHERE title LIKE '%${searchTerm}%' OR location LIKE '%${searchTerm}%'`;
            }
            const [rows] = await connection.query(query);
            properties = rows;


            const [inquiryRows] = await connection.execute('SELECT * FROM inquiries ORDER BY created_at DESC');
            inquiries = inquiryRows;

            await connection.end();
        } catch (err) {
            console.error('MySQL Error:', err.message);
        }
    }
    
    res.send(renderPage(properties, searchTerm, inquiries));
}

async function handlePostInquiry(req, res) {
    const { name, message } = req.body;
    const connection = await getDbConnection();
    
    if (connection) {
        try {
            await connection.execute('INSERT INTO inquiries (name, message) VALUES (?, ?)', [name, message]);
            await connection.end();
        } catch (err) {
            console.error('MySQL Error:', err.message);
        }
    }
    res.redirect('/');
}

module.exports = {
    handleGetHome,
    handlePostInquiry
};
