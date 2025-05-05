require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'db',
    user: process.env.DB_USER || 'sysadmin',
    password: process.env.DB_PASSWORD || '123',
    database: process.env.DB_NAME || 'CPE241_SHOP'
        // port: process.env.DB_PORT || '3306'
});

module.exports = pool;

//testการเชื่อมต่อ
pool.getConnection()
    .then((connection) => {
        console.log('Connected to MySQL database successfully!');
        connection.release();
    })
    .catch((error) => {
        console.error('Failed to connect to MySQL:', error);
    });

module.exports = pool;