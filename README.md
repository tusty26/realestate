# CSE 414: Real Estate Management Portal (Lab Project)

This project provides a comparative demonstration of common web vulnerabilities (SQL Injection and Reflected XSS) and their respective mitigations.

## Lab Setup Instructions (Linux / Ubuntu)

Follow these steps on the university lab PC after cloning the repository.

### 1. Move Project to Web Server Directory
Copy the project files to the default Apache directory:
```bash
sudo cp -r * /var/www/html/
```

### 2. Set Permissions
Ensure the Apache user (`www-data`) can read and execute the files:
```bash
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
```

### 3. Start Services
Ensure the Apache2 and MySQL (MariaDB) services are running:
```bash
sudo systemctl start apache2
sudo systemctl start mysql
```

### 4. Database Setup
Import the database schema and sample data. (Note: You may need to provide the MySQL root password if set).
```bash
sudo mysql -u root < /var/www/html/database.sql
```

---

## Demonstration Guide

### A. Vulnerable Version (`index.php`)
Open `http://localhost/index.php` in your browser.

1.  **Reflected XSS Exploit:**
    In the search box, enter the following payload:
    `<script>alert('XSS Vulnerability Found!');</script>`
    *Observation:* The script executes because the input is directly echoed.

2.  **SQL Injection (SQLi) Exploit:**
    In the search box, enter the following payload:
    `' OR '1'='1`
    *Observation:* The query becomes `SELECT * FROM properties WHERE title LIKE '%' OR '1'='1'%'`, which bypasses the filter and returns all rows in the database.

### B. Secure Version (`secure.php`)
Open `http://localhost/secure.php` in your browser.

1.  **XSS Mitigation:**
    Try the same `<script>` payload.
    *Observation:* The script is displayed as plain text because of `htmlspecialchars()`.

2.  **SQLi Mitigation:**
    Try the `' OR '1'='1` payload.
    *Observation:* The application searches for the literal string instead of executing it as code, thanks to **PDO Prepared Statements**.
