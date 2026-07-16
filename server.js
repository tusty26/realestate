const express = require('express');

// Import feature-based controllers
const publicController = require('./controllers/publicController');
const authController = require('./controllers/authController');
const propertyController = require('./controllers/propertyController');
const agentController = require('./controllers/agentController');
const transactionController = require('./controllers/transactionController');
const propertyCheckController = require('./controllers/propertyCheckController');
const healthController = require('./controllers/healthController');
const dashboardController = require('./controllers/dashboardController');
const previewController = require('./controllers/previewController');
const employeeController = require('./controllers/employeeController');



const app = express();
const port = 3000;

// Simple custom cookie parser middleware for session demonstration (no extra dependencies required)
app.use((req, res, next) => {
    const list = {};
    const rc = req.headers.cookie;
    if (rc) {
        rc.split(';').forEach((cookie) => {
            const parts = cookie.split('=');
            list[parts.shift().trim()] = decodeURI(parts.join('='));
        });
    }
    req.cookies = list;
    next();
});

app.use(express.urlencoded({ extended: true }));

// ----------------------------------------------------
// Public Routes
// ----------------------------------------------------
app.get('/', publicController.handleGetHome);
app.post('/inquiry', publicController.handlePostInquiry);

// ----------------------------------------------------
// Authentication Routes (SQLi Login Bypass Feature)
// ----------------------------------------------------
app.get('/admin/login', authController.handleGetLogin);
app.post('/admin/login', authController.handlePostLogin);
app.get('/admin/logout', authController.handleGetLogout);

// ----------------------------------------------------
// Dashboard & Stored XSS Notes Feature
// ----------------------------------------------------
app.get('/admin/dashboard', dashboardController.handleGetDashboard);
app.post('/admin/save-note', dashboardController.handlePostSaveNote);

// ----------------------------------------------------
// Reflected XSS Welcome Preview Feature
// ----------------------------------------------------
app.get('/admin/welcome-preview', previewController.handleWelcomePreview);

// ----------------------------------------------------
// Property CRUD Feature
// ----------------------------------------------------
app.get('/admin/delete-property', propertyController.handleDeleteProperty);
app.post('/admin/add-property', propertyController.handlePostAddProperty);
app.get('/admin/edit-property', propertyController.handleGetEditProperty);
app.post('/admin/edit-property', propertyController.handlePostEditProperty);


// ----------------------------------------------------
// Error-Based SQLi Agent Lookup Feature
// ----------------------------------------------------
app.get('/admin/agent-lookup', agentController.handleAgentLookup);

// ----------------------------------------------------
// Union-Based SQLi Transactions Ledger Feature
// ----------------------------------------------------
app.get('/admin/transaction-ledger', transactionController.handleTransactionSearch);


// ----------------------------------------------------
// Boolean-Blind SQLi Property Check API Feature
// ----------------------------------------------------
app.get('/api/property-check', propertyCheckController.handlePropertyCheck);

// ----------------------------------------------------
// Time-Blind SQLi System Health Check API Feature
// ----------------------------------------------------
app.get('/api/system-health', healthController.handleSystemHealth);

// ----------------------------------------------------
// Broker Portal Routes
// ----------------------------------------------------
app.get('/employee/login', employeeController.handleGetLogin);
app.post('/employee/login', employeeController.handlePostLogin);
app.get('/employee/dashboard', employeeController.handleGetDashboard);
app.post('/employee/submit-request', employeeController.handlePostSubmitRequest);
app.get('/employee/logout', employeeController.handleLogout);

app.listen(port, () => {
    console.log(`MySQL Server running on Kali Linux at http://localhost:${port}`);
});

