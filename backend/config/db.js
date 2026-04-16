const mysql = require('mysql2');
require('dotenv').config();

// Dynamically build the database connection configuration
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    // Safely check for either DB_PASSWORD or DB_PASS based on your .env file
    password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// CRITICAL FIX: Only apply SSL if required by a cloud database (like Aiven)
// Localhost databases (like XAMPP) will crash if forced to use SSL unnecessarily.
if (process.env.DB_HOST && process.env.DB_HOST.includes('aivencloud.com')) {
    dbConfig.ssl = { rejectUnauthorized: false };
} else if (process.env.DB_SSL === 'true') {
    dbConfig.ssl = { rejectUnauthorized: false };
}

const pool = mysql.createPool(dbConfig);

// Test the connection logic to ensure auth routes will work
pool.getConnection((err, conn) => {
    if (err) {
        console.error("❌ Database Connection Failed. Auth routes will not work:", err.message);
    } else {
        console.log("✅ Connected to MySQL Database Successfully!");
        conn.release();
    }
});

module.exports = pool.promise();
