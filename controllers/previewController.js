/**
 * FEATURE: Welcome Banner Preview
 * VULNERABILITY CLASS: Reflected Cross-Site Scripting (XSS)
 * FILE LOCATION: controllers/previewController.js
 */
function handleWelcomePreview(req, res) {
    const sessionUser = req.cookies.admin_session;
    if (!sessionUser) {
        return res.status(403).send('Unauthorized access');
    }

    const { bannerText } = req.query;

    res.send(`
        <html>
        <body style="font-family: Arial; padding: 20px; background: #fffcf5;">
            <h2>Corporate Welcome Banner Preview</h2>
            <div style="padding: 20px; background: #000; color: #f8a715; font-size: 24px; font-weight: bold; margin-bottom: 20px;">
                <!-- VULNERABILITY SINK: Raw reflection of query parameter content input -->
                ${bannerText}
            </div>
            <p>Your header banner design has been generated for corporate campaign publishing.</p>

            <br><a href="/admin/dashboard">Back to Dashboard</a>
        </body>
        </html>
    `);
}

module.exports = {
    handleWelcomePreview
};
