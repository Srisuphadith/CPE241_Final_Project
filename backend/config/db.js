require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'sysadmin',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_NAME || 'CPE241_SHOP',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = db;