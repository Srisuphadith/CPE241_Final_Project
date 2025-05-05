// นำเข้าโมดูลการเชื่อมต่อฐานข้อมูลจากไฟล์ config/db
const pool = require('../config/db');

// ฟังก์ชันสำหรับดึงข้อมูลคำสั่งซื้อของร้านค้า
exports.getOrders = async (req, res) => {
    try {
        // ดึง user_ID จาก req.user ซึ่งเป็นข้อมูลผู้ใช้ที่ล็อกอิน
        const { user_ID } = req.user;
        // รันคำสั่ง SQL เพื่อดึงข้อมูลธุรกรรมที่เกี่ยวข้องกับร้านค้าของผู้ใช้
        const [rows] = await pool.query(
            `
      SELECT t.*, ti.product_ID, ti.quantity, ti.price, p.productName, u.firstName, u.lastName
      FROM tbl_transactions t
      JOIN tbl_transaction_items ti ON t.trans_ID = ti.trans_ID
      JOIN tbl_products p ON ti.product_ID = p.product_ID
      JOIN tbl_shops s ON p.shop_ID = s.shop_ID
      JOIN tbl_users u ON t.user_ID = u.user_ID
      WHERE s.user_ID = ?
      `,
            [user_ID]
        );
        // ส่งข้อมูลคำสั่งซื้อทั้งหมดกลับในรูปแบบ JSON
        res.json(rows);
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับเพิ่มสินค้าใหม่
exports.addProduct = async (req, res) => {
    try {
        // ดึงข้อมูลสินค้าจาก body และ user_ID จาก req.user
        const { productName, cate_ID, imgPath, description, price, quantity } = req.body;
        const { user_ID } = req.user;
        // ตรวจสอบว่าร้านค้าของผู้ใช้มีอยู่ในระบบหรือไม่
        const [shop] = await pool.query('SELECT shop_ID FROM tbl_shops WHERE user_ID = ?', [
            user_ID,
        ]);
        // ถ้าไม่พบร้านค้า ส่งสถานะ 403 พร้อมข้อความข้อผิดพลาด
        if (shop.length === 0) {
            return res.status(403).json({ error: 'ไม่พบร้านค้า' });
        }
        // เพิ่มข้อมูลสินค้าลงในตาราง tbl_products
        const [result] = await pool.query(
            `
      INSERT INTO tbl_products (shop_ID, cate_ID, productName, imgPath, description, price, quantity)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
            [shop[0].shop_ID, cate_ID, productName, imgPath, description, price, quantity]
        );
        // เพิ่มข้อมูลเริ่มต้นสำหรับสถิติของสินค้าในตาราง tbl_product_stats
        await pool.query(
            `
      INSERT INTO tbl_product_stats (product_ID, addToCart, visit, numSold, last_updated)
      VALUES (?, 0, 0, 0, NOW())
      `,
            [result.insertId]
        );
        // ส่งการตอบกลับว่าสำเร็จพร้อม product_ID และข้อความ
        res.status(201).json({ product_ID: result.insertId, message: 'เพิ่มสินค้าเรียบร้อย' });
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับอัปเดตข้อมูลสินค้า
exports.updateProduct = async (req, res) => {
    try {
        // ดึง product_ID จากพารามิเตอร์ และข้อมูลสินค้าจาก body รวมถึง user_ID จาก req.user
        const { product_ID } = req.params;
        const { productName, cate_ID, imgPath, description, price, quantity } = req.body;
        const { user_ID } = req.user;
        // ตรวจสอบว่าร้านค้าของผู้ใช้มีอยู่ในระบบหรือไม่
        const [shop] = await pool.query('SELECT shop_ID FROM tbl_shops WHERE user_ID = ?', [
            user_ID,
        ]);
        // ถ้าไม่พบร้านค้า ส่งสถานะ 403 พร้อมข้อความข้อผิดพลาด
        if (shop.length === 0) {
            return res.status(403).json({ error: 'ไม่พบร้านค้า' });
        }
        // อัปเดตข้อมูลสินค้าในตาราง tbl_products
        await pool.query(
            `
      UPDATE tbl_products
      SET productName = ?, cate_ID = ?, imgPath = ?, description = ?, price = ?, quantity = ?
      WHERE product_ID = ? AND shop_ID = ?
      `,
            [
                productName,
                cate_ID,
                imgPath,
                description,
                price,
                quantity,
                product_ID,
                shop[0].shop_ID,
            ]
        );
        // ส่งการตอบกลับว่าอัปเดตสำเร็จ
        res.json({ message: 'อัปเดตสินค้าเรียบร้อย' });
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับลบสินค้า
exports.deleteProduct = async (req, res) => {
    try {
        // ดึง product_ID จากพารามิเตอร์ และ user_ID จาก req.user
        const { product_ID } = req.params;
        const { user_ID } = req.user;
        // ตรวจสอบว่าร้านค้าของผู้ใช้มีอยู่ในระบบหรือไม่
        const [shop] = await pool.query('SELECT shop_ID FROM tbl_shops WHERE user_ID = ?', [
            user_ID,
        ]);
        // ถ้าไม่พบร้านค้า ส่งสถานะ 403 พร้อมข้อความข้อผิดพลาด
        if (shop.length === 0) {
            return res.status(403).json({ error: 'ไม่พบร้านค้า' });
        }
        // ลบสินค้าจากตาราง tbl_products
        await pool.query('DELETE FROM tbl_products WHERE product_ID = ? AND shop_ID = ?', [
            product_ID,
            shop[0].shop_ID,
        ]);
        // ลบข้อมูลสถิติของสินค้าจากตาราง tbl_product_stats
        await pool.query('DELETE FROM tbl_product_stats WHERE product_ID = ?', [product_ID]);
        // ส่งการตอบกลับว่าลบสำเร็จ
        res.json({ message: 'ลบสินค้าเรียบร้อย' });
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับดึงรายงานการขาย
exports.getReports = async (req, res) => {
    try {
        // ดึง user_ID จาก req.user
        const { user_ID } = req.user;
        // ตรวจสอบว่าร้านค้าของผู้ใช้มีอยู่ในระบบหรือไม่
        const [shop] = await pool.query('SELECT shop_ID FROM tbl_shops WHERE user_ID = ?', [
            user_ID,
        ]);
        // ถ้าไม่พบร้านค้า ส่งสถานะ 403 พร้อมข้อความข้อผิดพลาด
        if (shop.length === 0) {
            return res.status(403).json({ error: 'ไม่พบร้านค้า' });
        }
        const shop_ID = shop[0].shop_ID;

        // ดึงข้อมูลยอดขายรายปี
        const [yearlySales] = await pool.query(
            `
      SELECT YEAR(t.date) as year, SUM(ti.quantity * ti.price) as total
      FROM tbl_transactions t
      JOIN tbl_transaction_items ti ON t.trans_ID = ti.trans_ID
      JOIN tbl_products p ON ti.product_ID = p.product_ID
      WHERE p.shop_ID = ?
      GROUP BY YEAR(t.date)
      `,
            [shop_ID]
        );

        // ดึงข้อมูลยอดขายตามหมวดหมู่
        const [categorySales] = await pool.query(
            `
      SELECT c.cateName, SUM(ti.quantity * ti.price) as total
      FROM tbl_transactions t
      JOIN tbl_transaction_items ti ON t.trans_ID = ti.trans_ID
      JOIN tbl_products p ON ti.product_ID = p.product_ID
      JOIN tbl_categories c ON p.cate_ID = c.cate_ID
      WHERE p.shop_ID = ?
      GROUP BY c.cate_ID
      `,
            [shop_ID]
        );

        // ดึงข้อมูลยอดขายรายเดือน
        const [monthlySales] = await pool.query(
            `
      SELECT YEAR(t.date) as year, MONTH(t.date) as month, SUM(ti.quantity * ti.price) as total
      FROM tbl_transactions t
      JOIN tbl_transaction_items ti ON t.trans_ID = ti.trans_ID
      JOIN tbl_products p ON ti.product_ID = p.product_ID
      WHERE p.shop_ID = ?
      GROUP BY YEAR(t.date), MONTH(t.date)
      `,
            [shop_ID]
        );

        // ดึงข้อมูลลูกค้าที่มียอดซื้อสูงสุด 5 อันดับในเดือนปัจจุบัน
        const [topSpenders] = await pool.query(
            `
      SELECT u.user_ID, u.firstName, u.lastName, SUM(t.grandTotal) as totalSpent
      FROM tbl_transactions t
      JOIN tbl_transaction_items ti ON t.trans_ID = ti.trans_ID
      JOIN tbl_products p ON ti.product_ID = p.product_ID
      JOIN tbl_users u ON t.user_ID = u.user_ID
      WHERE p.shop_ID = ? AND YEAR(t.date) = YEAR(CURDATE()) AND MONTH(t.date) = MONTH(CURDATE())
      GROUP BY u.user_ID
      ORDER BY totalSpent DESC
      LIMIT 5
      `,
            [shop_ID]
        );

        // ส่งข้อมูลรายงานทั้งหมดกลับในรูปแบบ JSON
        res.json({ yearlySales, categorySales, monthlySales, topSpenders });
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};