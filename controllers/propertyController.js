const { getDbConnection } = require('../config/db');
const renderEditPage = require('../views/adminEditProperty');

/**
 * FEATURE: Property Inventory CRUD Management
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
            // VULNERABILITY SINK: Raw id value concatenation (SQLi Deletion & CSRF Demo)
            const sql = `DELETE FROM properties WHERE id = ${id}`;
            await connection.query(sql);
            await connection.end();
        } catch (err) {
            console.error('Delete Error:', err.message);
        }
    }
    res.redirect('/admin/dashboard');
}

async function handlePostAddProperty(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).send('Unauthorized access');
    }

    const { title, location, description, price, rooms, baths, size, image_url, is_featured } = req.body;
    const connection = await getDbConnection();

    if (connection) {
        try {
            const sql = 'INSERT INTO properties (title, location, description, price, rooms, baths, size, image_url, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
            const featuredVal = is_featured === '1' || is_featured === 1 ? 1 : 0;
            await connection.execute(sql, [title, location, description, price, rooms, baths, size, image_url, featuredVal]);
            await connection.end();
        } catch (err) {
            console.error('Add Property Error:', err.message);
        }
    }
    res.redirect('/admin/dashboard');
}

async function handleGetEditProperty(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.redirect('/admin/login');
    }

    const { id } = req.query;
    const connection = await getDbConnection();
    let property = null;

    if (connection) {
        try {
            const [rows] = await connection.execute('SELECT * FROM properties WHERE id = ?', [id]);
            if (rows.length > 0) {
                property = rows[0];
            }
            await connection.end();
        } catch (err) {
            console.error('Fetch Edit Property Error:', err.message);
        }
    }

    if (!property) {
        return res.status(404).send('Property not found');
    }

    res.send(renderEditPage(property));
}

async function handlePostEditProperty(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).send('Unauthorized access');
    }

    const { id, title, location, description, price, rooms, baths, size, image_url, is_featured } = req.body;
    const connection = await getDbConnection();

    if (connection) {
        try {
            const sql = 'UPDATE properties SET title = ?, location = ?, description = ?, price = ?, rooms = ?, baths = ?, size = ?, image_url = ?, is_featured = ? WHERE id = ?';
            const featuredVal = is_featured === '1' || is_featured === 1 ? 1 : 0;
            await connection.execute(sql, [title, location, description, price, rooms, baths, size, image_url, featuredVal, id]);
            await connection.end();
        } catch (err) {
            console.error('Update Property Error:', err.message);
        }
    }
    res.redirect('/admin/dashboard');
}

module.exports = {
    handleDeleteProperty,
    handlePostAddProperty,
    handleGetEditProperty,
    handlePostEditProperty
};

