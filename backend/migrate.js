const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
    const dbConfig = {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || process.env.DB_PASS || '',
        database: process.env.DB_NAME || 'student_platform',
        port: process.env.DB_PORT || 3306,
    };
    if (dbConfig.host && dbConfig.host.includes('aivencloud.com') || process.env.DB_SSL === 'true') {
        dbConfig.ssl = { rejectUnauthorized: false };
    }

    const connection = await mysql.createConnection(dbConfig);
    try {
        console.log('Adding is_approved column...');
        await connection.query('ALTER TABLE users ADD COLUMN is_approved BOOLEAN DEFAULT FALSE;');
        console.log('Setting is_approved = true for existing users...');
        await connection.query('UPDATE users SET is_approved = TRUE;');
        console.log('Migration successful.');
    } catch (error) {
        if (error.code === 'ER_DUP_FIELDNAME') {
            console.log('Column is_approved already exists.');
        } else {
            console.error('Migration failed:', error);
        }
    } finally {
        await connection.end();
    }
}
migrate();
