# ABC Real Estate - Node.js Conversion

This project is a standalone Node.js (Express) conversion of a corporate real estate landing page. It features a premium UI, a resilient MariaDB/MySQL backend connection logic, and dynamic property listings.

## Features
- **Modern UI:** Gold and Black corporate theme with responsive grids.
- **Resilient Backend:** Sequential database connection attempts with silent failover to preserve UI uptime.
- **Dynamic Data:** Property listings fetched directly from MariaDB/MySQL.

---

## Linux Setup & Execution

Follow these steps to set up and run the project on a Linux environment (Ubuntu/Debian/Kali/CentOS).

### 1. Install Prerequisites
Ensure you have Node.js and MariaDB (or MySQL) installed:

```bash
# Update package list
sudo apt update

# Install Node.js and npm
sudo apt install -y nodejs npm

# Install MariaDB Server
sudo apt install -y mariadb-server
```

### 2. Database Configuration
Start the MariaDB service and secure it:

```bash
# Start service
sudo systemctl start mariadb
sudo systemctl enable mariadb

# Optional: Run security script
# sudo mysql_secure_installation
```

### 3. Import SQL Schema
Import the provided `database.sql` to create the database and sample listings. 

**Option A: Using the CLI (Recommended)**
```bash
# Log in as root and import
sudo mysql -u root < database.sql
```

**Option B: Manual Login**
```bash
sudo mysql -u root
# Inside the MariaDB shell:
source database.sql;
exit;
```

*Note: The application is configured to try connecting as `root` with no password, as well as the user `kali` with password `kali`.*

### 4. Application Installation
Navigate to the project directory and install dependencies:

```bash
# Install Express and MySQL2
npm install
```

### 5. Start the Server
Run the application using the start script:

```bash
npm start
```

The server will be available at: **http://localhost:3000**

---

## Project Structure
- `server.js`: Core Express server and database connection logic.
- `views/homepage.js`: Frontend HTML/CSS source markup.
- `database.sql`: SQL schema and sample property data.
- `package.json`: Project dependencies and metadata.

## Database Failover Logic
If the database is unreachable or credentials fail, the server will:
1. Attempt `127.0.0.1` (root).
2. Attempt `localhost` (root).
3. Attempt `kali:kali` credentials.
4. Attempt UNIX socket pipe (`/var/run/mysqld/mysqld.sock`).
5. **Seamless Failover:** Serve the UI with a "No properties found" message instead of crashing.
