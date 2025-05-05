require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'CPE241_SHOP',
});

connection.connect((err) => {
    if (err) {
        console.error('เชื่อมต่อฐานข้อมูลล้มเหลว:', err);
    } else {
        console.log('เชื่อมต่อฐานข้อมูลสำเร็จ!');
    }
});

module.exports = connection;