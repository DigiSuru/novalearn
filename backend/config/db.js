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
} else if (process.env.DB_SSL === 'true' || process.env.DB_SSL === '1') {
    dbConfig.ssl = { rejectUnauthorized: false };
}

const pool = mysql.createPool(dbConfig);

// Advanced Diagnostics: Test the connection logic to ensure auth routes will work
pool.getConnection((err, conn) => {
    if (err) {
        console.error("❌ Database Connection Failed. Auth routes will not work.");
        console.error("-> Error Code:", err.code);
        console.error("-> Error Message:", err.message);
        
        // Intelligent troubleshooting advice based on the exact error
        if (err.code === 'ER_BAD_DB_ERROR') {
            console.error(`💡 FIX: The database named '${process.env.DB_NAME}' does not exist on your server.`);
            console.error(`If you are using Aiven.io, you MUST change your DB_NAME environment variable in Render back to 'defaultdb', OR run 'CREATE DATABASE ${process.env.DB_NAME};' inside Aiven.`);
        } else if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error("💡 FIX: Incorrect password or username. Double-check your DB_PASSWORD variable in Render (make sure there are no accidental spaces at the end).");
        }
    } else {
        console.log(`✅ Connected to MySQL Database Successfully! (Target DB: ${process.env.DB_NAME})`);
        conn.release();
    }
});

module.exports = pool.promise();
