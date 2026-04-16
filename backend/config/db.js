const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool (better for performance than a single connection)
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test the connection
pool.getConnection((err, conn) => {
    if(err) console.error("❌ Database Connection Failed:", err.message);
    else {
        console.log("✅ Connected to MySQL Database Successfully!");
        conn.release();
    }
});

module.exports = pool.promise();