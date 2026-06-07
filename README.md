# ABC Real Estate - MySQL Setup Guide (Kali Linux)

This project is a standalone Node.js (Express) application for corporate real estate, optimized for **MySQL** on **Kali Linux** with a no-password configuration.

## 1. Install MySQL and Node.js
On Kali Linux, run these commands to install the required environment:

```bash
# Update package lists
sudo apt update

# Install Node.js, npm, and MySQL Server
sudo apt install -y nodejs npm mysql-server
```

## 2. Setup the MySQL Database
Start the service and import the project data.

```bash
# Start the MySQL service
sudo systemctl start mysql

# Ensure MySQL starts on boot
sudo systemctl enable mysql

# Import the database schema (No password required on default root)
sudo mysql < database.sql
```

## 3. Install Application Dependencies
Navigate to your project directory and run:

```bash
# Install express and mysql2 modules
npm install
```

## 4. Launch the Project
Start the Node.js server:

```bash
# Port 3000 may require sudo in some Kali environments
sudo npm start
```

Your site is now live at: **http://localhost:3000**

---

## Technical Details
- **Environment:** Kali Linux
- **Runtime:** Node.js
- **Database:** MySQL
- **Driver:** `mysql2` (Promise-based)
- **Auth:** Pre-configured for `root` with **no password**.

## Troubleshooting MySQL
If you cannot connect:
1. Check MySQL status: `sudo systemctl status mysql`
2. Test manual login: `sudo mysql -u root`
3. If you have a custom password, update the `dbConfigs` in `server.js`.
