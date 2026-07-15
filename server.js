const express = require('express');

// Import feature-based controllers
const publicController = require('./controllers/publicController');
const authController = require('./controllers/authController');
const propertyController = require('./controllers/propertyController');
const agentController = require('./controllers/agentController');
const auditController = require('./controllers/auditController');
const propertyCheckController = require('./controllers/propertyCheckController');
const healthController = require('./controllers/healthController');
const dashboardController = require('./controllers/dashboardController');
const previewController = require('./controllers/previewController');

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
// SQLi Deletion & CSRF Feature
// ----------------------------------------------------
app.get('/admin/delete-property', propertyController.handleDeleteProperty);

// ----------------------------------------------------
// Error-Based SQLi Agent Lookup Feature
// ----------------------------------------------------
app.get('/admin/agent-lookup', agentController.handleAgentLookup);

// ----------------------------------------------------
// Union-Based SQLi Audit Logs Feature
// ----------------------------------------------------
app.get('/admin/audit-logs', auditController.handleAuditLogs);

// ----------------------------------------------------
// Boolean-Blind SQLi Property Check API Feature
// ----------------------------------------------------
app.get('/api/property-check', propertyCheckController.handlePropertyCheck);

// ----------------------------------------------------
// Time-Blind SQLi System Health Check API Feature
// ----------------------------------------------------
app.get('/api/system-health', healthController.handleSystemHealth);

app.listen(port, () => {
    console.log(`MySQL Server running on Kali Linux at http://localhost:${port}`);
});
