// นำเข้าโมดูลการเชื่อมต่อฐานข้อมูลจากไฟล์ config/db
const pool = require('../config/db');

// ฟังก์ชันสำหรับดึงข้อมูลหมวดหมู่ทั้งหมด
exports.getCategories = async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง tbl_categories
        const [rows] = await pool.query('SELECT * FROM tbl_categories');
        // ส่งข้อมูลหมวดหมู่กลับในรูปแบบ JSON
        res.json(rows);
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลสินค้าทั้งหมด
exports.getProducts = async (req, res) => {
    try {
        // รับค่า cate_ID จาก query string
        const { cate_ID } = req.query;
        // สร้างคำสั่ง SQL สำหรับดึงข้อมูลสินค้า
        let query = `
      SELECT p.*, s.shopName, c.cateName, ps.addToCart, ps.visit, ps.numSold
      FROM tbl_products p
      JOIN tbl_shops s ON p.shop_ID = s.shop_ID
      JOIN tbl_categories c ON p.cate_ID = c.cate_ID
      LEFT JOIN tbl_product_stats ps ON p.product_ID = ps.product_ID
    `;
        // อาร์เรย์สำหรับเก็บพารามิเตอร์ของคำสั่ง SQL
        const params = [];
        // ถ้ามี cate_ID เพิ่มเงื่อนไข WHERE ในคำสั่ง SQL
        if (cate_ID) {
            query += ' WHERE p.cate_ID = ?';
            params.push(cate_ID);
        }
        // รันคำสั่ง SQL และรับผลลัพธ์
        const [rows] = await pool.query(query, params);
        // ส่งข้อมูลสินค้ากลับในรูปแบบ JSON
        res.json(rows);
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับดึงรายละเอียดสินค้า
exports.getProductDetails = async (req, res) => {
    try {
        // รับค่า product_ID จากพารามิเตอร์
        const { product_ID } = req.params;
        // อัปเดตจำนวนการเข้าชมในตาราง tbl_product_stats
        await pool.query(
            'UPDATE tbl_product_stats SET visit = visit + 1 WHERE product_ID = ?',
            [product_ID]
        );
        // ดึงข้อมูลสินค้าพร้อมข้อมูลร้านค้าและหมวดหมู่
        const [rows] = await pool.query(
            `
      SELECT p.*, s.shopName, c.cateName, ps.addToCart, ps.visit, ps.numSold
      FROM tbl_products p
      JOIN tbl_shops s ON p.shop_ID = s.shop_ID
      JOIN tbl_categories c ON p.cate_ID = c.cate_ID
      LEFT JOIN tbl_product_stats ps ON p.product_ID = ps.product_ID
      WHERE p.product_ID = ?
      `,
            [product_ID]
        );
        // ตรวจสอบว่าพบสินค้าหรือไม่
        if (rows.length === 0) {
            return res.status(404).json({ error: 'ไม่พบสินค้า' });
        }
        // ส่งข้อมูลสินค้ากลับ (รายการแรก)
        res.json(rows[0]);
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับเพิ่มสินค้าลงตะกร้า
exports.addToCart = async (req, res) => {
    try {
        // รับค่า product_ID และ quantity จาก body และ user_ID จาก req.user
        const { product_ID, quantity } = req.body;
        const { user_ID } = req.user;
        // ตรวจสอบจำนวนสินค้าในสต็อก
        const [product] = await pool.query(
            'SELECT quantity FROM tbl_products WHERE product_ID = ?',
            [product_ID]
        );
        // ถ้าไม่พบสินค้าหรือสต็อกไม่เพียงพอ ส่งข้อผิดพลาด
        if (product.length === 0 || product[0].quantity < quantity) {
            return res.status(400).json({ error: 'สต็อกไม่เพียงพอ' });
        }
        // เพิ่มสินค้าลงตะกร้า หรืออัปเดตจำนวนถ้ามีอยู่แล้ว
        await pool.query(
            `
      INSERT INTO tbl_carts (user_ID, product_ID, quantity, date_added)
      VALUES (?, ?, ?, NOW())
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
      `,
            [user_ID, product_ID, quantity]
        );
        // อัปเดตจำนวนครั้งที่เพิ่มลงตะกร้าใน tbl_product_stats
        await pool.query(
            'UPDATE tbl_product_stats SET addToCart = addToCart + 1 WHERE product_ID = ?',
            [product_ID]
        );
        // ส่งการตอบกลับว่าสำเร็จ
        res.status(201).json({ message: 'เพิ่มลงตะกร้าเรียบร้อย' });
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลตะกร้าสินค้า
exports.getCart = async (req, res) => {
    try {
        // รับค่า user_ID จาก req.user
        const { user_ID } = req.user;
        // ดึงข้อมูลสินค้าในตะกร้าพร้อมชื่อและราคาสินค้า
        const [rows] = await pool.query(
            `
      SELECT c.*, p.productName, p.price, p.imgPath
      FROM tbl_carts c
      JOIN tbl_products p ON c.product_ID = p.product_ID
      WHERE c.user_ID = ?
      `,
            [user_ID]
        );
        // คำนวณราคารวมของสินค้าทั้งหมดในตะกร้า
        const sumPrice = rows.reduce((sum, item) => sum + item.price * item.quantity, 0);
        // ส่งข้อมูลตะกร้าและราคารวมกลับ
        res.json({ items: rows, sumPrice });
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับดำเนินการชำระเงิน
exports.checkout = async (req, res) => {
    try {
        // รับข้อมูลจาก body และ user_ID จาก req.user
        const { couponCode, shippingAddress, billingAddress, paymentMethod } = req.body;
        const { user_ID } = req.user;
        // ดึงข้อมูลสินค้าในตะกร้า
        const [cartItems] = await pool.query(
            `
      SELECT c.*, p.price
      FROM tbl_carts c
      JOIN tbl_products p ON c.product_ID = p.product_ID
      WHERE c.user_ID = ?
      `,
            [user_ID]
        );
        // ตรวจสอบว่าตะกร้ามีสินค้าหรไม่
        if (cartItems.length === 0) {
            return res.status(400).json({ error: 'ตะกร้าว่างเปล่า' });
        }
        // คำนวณราคารวมของสินค้า
        let sumPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        let coupon_ID = null;
        let discount = 0;
        // ตรวจสอบคูปองถ้ามี
        if (couponCode) {
            const [coupon] = await pool.query(
                `
        SELECT * FROM tbl_coupons
        WHERE couponCode = ? AND expDate > NOW() AND remain > 0 AND minOrderValue <= ?
        `,
                [couponCode, sumPrice]
            );
            if (coupon.length > 0) {
                coupon_ID = coupon[0].coupon_ID;
                discount = coupon[0].discount;
                // ลดจำนวนคูปองที่เหลือ
                await pool.query('UPDATE tbl_coupons SET remain = remain - 1 WHERE coupon_ID = ?', [
                    coupon_ID,
                ]);
            }
        }
        // คำนวณยอดรวมหลังหักส่วนลด
        const grandTotal = sumPrice - discount;
        // สร้างธุรกรรมใหม่
        const [transResult] = await pool.query(
            `
      INSERT INTO tbl_transactions (user_ID, sumPrice, coupon_ID, grandTotal, paid, date, transport_state)
      VALUES (?, ?, ?, ?, ?, NOW(), ?)
      `,
            [user_ID, sumPrice, coupon_ID, grandTotal, paymentMethod !== 'cod', 'pending']
        );
        const trans_ID = transResult.insertId;
        // บันทึกรายการสินค้าในธุรกรรม
        for (const item of cartItems) {
            await pool.query(
                `
        INSERT INTO tbl_transaction_items (trans_ID, product_ID, quantity, price)
        VALUES (?, ?, ?, ?)
        `,
                [trans_ID, item.product_ID, item.quantity, item.price]
            );
            // ลดจำนวนสินค้าในสต็อก
            await pool.query(
                'UPDATE tbl_products SET quantity = quantity - ? WHERE product_ID = ?',
                [item.quantity, item.product_ID]
            );
            // อัปเดตจำนวนสินค้าที่ขายใน tbl_product_stats
            await pool.query(
                'UPDATE tbl_product_stats SET numSold = numSold + ? WHERE product_ID = ?',
                [item.quantity, item.product_ID]
            );
        }
        // ลบสินค้าทั้งหมดในตะกร้าของผู้ใช้
        await pool.query('DELETE FROM tbl_carts WHERE user_ID = ?', [user_ID]);
        // บันทึกหรืออัปเดตที่อยู่จัดส่ง
        await pool.query(
            `
      INSERT INTO tbl_address (user_ID, buildingNumber, sub_province, province, city, country, zip_code, txt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        sub_province = VALUES(sub_province),
        province = VALUES(province),
        city = VALUES(city),
        country = VALUES(country),
        zip_code = VALUES(zip_code),
        txt = VALUES(txt)
      `,
            [
                user_ID,
                shippingAddress.buildingNumber,
                shippingAddress.sub_province,
                shippingAddress.province,
                shippingAddress.city,
                shippingAddress.country,
                shippingAddress.zip_code,
                shippingAddress.txt,
            ]
        );
        // ส่งการตอบกลับว่าสั่งซื้อสำเร็จ
        res.status(201).json({ trans_ID, message: 'สั่งซื้อเรียบร้อย' });
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลคำสั่งซื้อ
exports.getOrders = async (req, res) => {
    try {
        // รับค่า user_ID จาก req.user
        const { user_ID } = req.user;
        // ดึงข้อมูลธุรกรรมและรายการสินค้า
        const [rows] = await pool.query(
            `
      SELECT t.*, ti.product_ID, ti.quantity, ti.price, p.productName
      FROM tbl_transactions t
      LEFT JOIN tbl_transaction_items ti ON t.trans_ID = ti.trans_ID
      LEFT JOIN tbl_products p ON ti.product_ID = p.product_ID
      WHERE t.user_ID = ?
      `,
            [user_ID]
        );
        // ส่งข้อมูลคำสั่งซื้อกลับ
        res.json(rows);
    } catch (error) {
        // หากเกิดข้อผิดพลาด ส่งสถานะ 500 พร้อมข้อความข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์' });
    }
};

// ฟังก์ชันสำหรับดึงข้อมูลหมวดหมู่ (ซ้ำกับด้านบน)
exports.getCategories = async (req, res) => {
    try {
        // ดึงข้อมูลทั้งหมดจากตาราง tbl_categories
        const [rows] = await pool.query('SELECT * FROM tbl_categories');
        // ส่งข้อมูลหมวดหมู่กลับในรูปแบบ JSON
        res.json(rows);
    } catch (error) {
        // บันทึกข้อผิดพลาดใน log
        console.error('เกิดข้อผิดพลาดใน getCategories:', error);
        // ส่งสถานะ 500 พร้อมข้อความและรายละเอียดข้อผิดพลาด
        res.status(500).json({ error: 'เกิดข้อผิดพลาดที่เซิร์ฟเวอร์', details: error.message });
    }
};