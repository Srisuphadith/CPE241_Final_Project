const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',        // ถ้าใช้ XAMPP ปกติจะไม่มีรหัสผ่าน
  database: 'cpe241_shop',  // เปลี่ยนให้ตรงกับที่สร้างไว้ใน phpMyAdmin
});

connection.connect((err) => {
  if (err) {
    console.error('เชื่อมต่อฐานข้อมูลล้มเหลว:', err);
  } else {
    console.log('เชื่อมต่อฐานข้อมูลสำเร็จ!');
  }
});

module.exports = connection;
