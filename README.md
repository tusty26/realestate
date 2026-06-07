# ABC Real Estate - Kali Linux Setup Guide

This project is a standalone Node.js (Express) application for corporate real estate, optimized for deployment on **Kali Linux** with a **no-password MariaDB/MySQL** configuration.

## 1. Install System Dependencies
Kali Linux requires Node.js and MariaDB to be installed manually. Run the following commands in your terminal:

```bash
# Update the package repository
sudo apt update

# Install Node.js, npm, and MariaDB (MySQL)
sudo apt install -y nodejs npm mariadb-server
```

## 2. Setup the Database
Start the database service and import the project schema.

```bash
# Start the MariaDB service
sudo systemctl start mariadb

# Ensure it starts on every boot
sudo systemctl enable mariadb

# Import the project database (No password required on default Kali)
sudo mysql < database.sql
```

## 3. Install Project Dependencies
Navigate to the project folder and install the required Node.js modules:

```bash
# Install express and mysql2
npm install
```

## 4. Run the Application
Start the server:

```bash
# Use sudo if you encounter permission issues on port 3000
npm start
```

Access the website at: **http://localhost:3000**

---

## Configuration Details
- **Environment:** Kali Linux
- **Node.js:** Server-side runtime (Required)
- **Database:** MariaDB (MySQL Protocol)
- **Authentication:** Configured for `root` user with **no password** (Default Kali setup).

## Project Structure
- `server.js`: Express server with optimized Kali connection logic.
- `views/homepage.js`: Separated frontend UI markup.
- `database.sql`: SQL schema and premium sample listings.
- `package.json`: Project metadata and dependencies.

## Troubleshooting
If you cannot connect to the database:
1. Ensure the service is running: `sudo systemctl status mariadb`
2. Try logging in manually: `sudo mysql -u root`
3. If you have set a custom password, update the `dbConfigs` array in `server.js`.
