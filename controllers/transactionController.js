const { getDbConnection } = require('../config/db');

/**
 * FEATURE: Sales Transactions Deal Search
 * VULNERABILITY CLASS: Union-Based SQL Injection (SQLi)
 * FILE LOCATION: controllers/transactionController.js
 */
async function handleTransactionSearch(req, res) {
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
        // VULNERABILITY SINK: Unsanitized search keyword concatenation
        const sql = `SELECT id, property_name, buyer_name, price_sold, broker_assigned FROM sales_transactions WHERE property_name LIKE '%${search}%'`;
        const [rows] = await connection.query(sql);

        await connection.end();

        let rowHtml = '';
        rows.forEach(r => {
            rowHtml += `
                <tr>
                    <td>${r.id}</td>
                    <td><strong>${r.property_name}</strong></td>
                    <td>${r.buyer_name}</td>
                    <td>${r.price_sold}</td>
                    <td>${r.broker_assigned}</td>
                </tr>
            `;
        });

        res.send(`
            <html>
            <head>
                <title>Deal Ledger Search</title>
                <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
                <style>
                    body { font-family: 'Inter', sans-serif; background-color: #09090b; padding: 40px; color: #f8fafc; }
                    h2 { font-family: 'Outfit', sans-serif; font-size: 24px; color: #f8fafc; margin-bottom: 5px; }
                    p { color: #8b9bb4; font-size: 14px; margin-bottom: 25px; }
                    .table-wrapper { background: #121217; border: 1px solid #1f1f27; border-radius: 12px; padding: 25px; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
                    table { width: 100%; border-collapse: separate; border-spacing: 0; text-align: left; }
                    th, td { padding: 14px 20px; border-bottom: 1px solid #1f1f27; font-size: 14px; }
                    th { background-color: #181822; color: #8b9bb4; font-family: 'Outfit', sans-serif; font-weight: 600; font-size: 12px; text-transform: uppercase; border-bottom: 2px solid #1f1f27; }
                    td { color: #d1d5db; }
                    .back-link { display: inline-block; margin-top: 25px; color: #dfa83d; text-decoration: none; font-weight: 600; font-family: 'Outfit', sans-serif; transition: 0.3s; }
                    .back-link:hover { color: #f8fafc; }
                </style>
            </head>
            <body>
                <div class="table-wrapper">
                    <h2>Sales Transactions Ledger</h2>
                    <p>Search term: <strong>${search}</strong></p>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Property Name</th>
                                <th>Buyer Name</th>
                                <th>Price Sold</th>
                                <th>Broker Assigned</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rowHtml}
                        </tbody>
                    </table>
                    <a href="/admin/dashboard" class="back-link">&larr; Back to Dashboard</a>
                </div>
            </body>
            </html>
        `);

    } catch (err) {
        res.status(500).send(`Search Deal Error: ${err.message}<br><a href="/admin/dashboard">Back to Dashboard</a>`);
    }
}

module.exports = {
    handleTransactionSearch
};
