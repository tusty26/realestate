# ABC Real Estate - MySQL Node.js Application

A clean, standalone Node.js (Express) application for corporate real estate, specifically optimized for **MySQL** backend integration.

## Key Features
- **Premium UI:** Fully customized Gold (#f8a715) and Black theme.
- **Dynamic Property Grid:** Fetches listings from MySQL.
- **Connection Resilience:** Sequential failover logic across multiple MySQL host/credential sets.

---

## MySQL Setup & Execution

### 1. Install MySQL Server
Ensure MySQL is installed on your system:

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

**Windows/Mac:**
Download and install [MySQL Community Server](https://dev.mysql.com/downloads/mysql/).

### 2. Database Initialization
Import the schema and sample data into your MySQL instance:

```bash
# Log in and import the SQL file
mysql -u root -p < database.sql
```

*Note: If you are using MySQL 8.0+ and encounter "Access Denied" or "Auth Plugin" errors, run this in your MySQL shell:*
```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
FLUSH PRIVILEGES;
```

### 3. Application Setup
Navigate to the directory and install Node dependencies:

```bash
npm install
```

### 4. Configuration
Open `server.js` and update the `dbConfigs` array if your MySQL password is not empty:
```javascript
{ host: '127.0.0.1', user: 'root', password: 'YOUR_PASSWORD', database: 'realestate_db' }
```

### 5. Start Application
```bash
npm start
```
Access the site at: **http://localhost:3000**

---

## Technical Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL (using `mysql2` high-performance driver)
- **Frontend:** Responsive HTML5, Custom CSS3 (internal)

## Folder Structure
- `server.js`: MySQL routing and failover logic.
- `views/homepage.js`: Separated UI source markup.
- `database.sql`: MySQL table structure and 4 sample premium listings.
- `package.json`: Dependencies (`express`, `mysql2`).
