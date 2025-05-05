const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้ใหม่
exports.register = async (req, res) => {
    try {
        const { firstName, midName, lastName, userName, password, role, phone_number, is_primary, address } = req.body;

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบถ้วน
        if (!firstName || !lastName || !userName || !password || !phone_number || !address) {
            return res.status(400).json({ error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน' });
        }

        // ตรวจสอบว่า userName นี้ถูกใช้แล้วหรือไม่
        const [existingUser] = await pool.query('SELECT * FROM tbl_users WHERE userName = ?', [userName]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'ชื่อผู้ใช้นี้ถูกใช้แล้ว' });
        }

        // เข้ารหัสพาสเวิร์ด
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // กำหนดบทบาท (ค่าเริ่มต้นเป็น 'buyer' ถ้าไม่ระบุ)
        const userRole = role && ['buyer', 'seller', 'admin'].includes(role) ? role : 'buyer';

        // เริ่ม transaction เพื่อบันทึกข้อมูลผู้ใช้, เบอร์โทร, และที่อยู่
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            // บันทึกผู้ใช้ลงในตาราง tbl_users
            const [userResult] = await connection.query(
                `INSERT INTO tbl_users (firstName, midName, lastName, userName, password_hash, role) 
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [firstName, midName || null, lastName, userName, password_hash, userRole]
            );
            const user_ID = userResult.insertId;

            // บันทึกเบอร์โทรลงในตาราง tbl_user_phones
            await connection.query(
                `INSERT INTO tbl_user_phones (user_ID, phone_number, is_primary) 
                 VALUES (?, ?, ?)`,
                [user_ID, phone_number, is_primary !== undefined ? is_primary : true]
            );

            // บันทึกที่อยู่ลงในตาราง tbl_address
            await connection.query(
                `INSERT INTO tbl_address (user_ID, buildingNumber, sub_province, province, city, country, zip_code, txt) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    user_ID,
                    address.buildingNumber,
                    address.sub_province || null,
                    address.province,
                    address.city,
                    address.country,
                    address.zip_code,
                    address.txt || null
                ]
            );

            await connection.commit();

            // สร้าง JWT token
            const token = jwt.sign(
                { user_ID, userName, role: userRole },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            // ส่งการตอบกลับว่าสำเร็จ
            res.status(201).json({
                message: 'ลงทะเบียนเรียบร้อย',
                token,
                user: { user_ID, firstName, midName, lastName, userName, role: userRole }
            });
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการลงทะเบียน:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์', details: error.message });
    }
};

// ฟังก์ชันสำหรับล็อกอิน
exports.login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบถ้วน
        if (!userName || !password) {
            return res.status(400).json({ error: 'กรุณากรอกชื่อผู้ใช้และรหัสผ่าน' });
        }

        // ค้นหาผู้ใช้จาก userName
        const [users] = await pool.query('SELECT * FROM tbl_users WHERE userName = ?', [userName]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        const user = users[0];

        // ตรวจสอบรหัสผ่าน
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
        }

        // สร้าง JWT token
        const token = jwt.sign(
            { user_ID: user.user_ID, userName: user.userName, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // ส่งการตอบกลับว่าสำเร็จ
        res.status(200).json({
            message: 'ล็อกอินเรียบร้อย',
            token,
            user: {
                user_ID: user.user_ID,
                firstName: user.firstName,
                midName: user.midName,
                lastName: user.lastName,
                userName: user.userName,
                role: user.role
            }
        });
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการล็อกอิน:', error);
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์', details: error.message });
    }
};