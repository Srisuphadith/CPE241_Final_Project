const db = require('../config/db');

exports.total_sales = async(req, res) => {
    try {
        const [results] = await db.query('SELECT SUM(grandTotal) AS total_spent FROM tbl_transactions WHERE paid = 1;');
        res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
};
exports.total_user = async(req, res) => {
    try {
        const [results] = await db.query("SELECT COUNT(role) as total_user FROM tbl_users WHERE role = 'user';");
        res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
}

exports.total_seller = async(req, res) => {
    try {
        const [results] = await db.query("SELECT COUNT(role) as total_seller FROM tbl_users WHERE role = 'seller';");
        res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
}

exports.total_admin = async(req, res) => {
    try {
        const [results] = await db.query("SELECT COUNT(role) as total_admin FROM tbl_users WHERE role = 'admin';");
        res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
}

exports.total_spent_by_category = async(req, res) => {
    try {
        const [results] = await db.query("SELECT c.cateName, SUM(ti.quantity * ti.price) AS total_sales FROM tbl_transaction_items ti JOIN tbl_products p ON ti.product_ID = p.product_ID JOIN tbl_categories c ON p.cate_ID = c.cate_ID GROUP BY c.cateName ORDER BY total_sales DESC;");
        res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
}

exports.top_5_spender = async(req, res) => {
    try {
        const [results] = await db.query("SELECT u.user_ID, CONCAT_WS(' ', u.firstName, u.midName, u.lastName) AS full_name, SUM(t.grandTotal) AS total_spent, COUNT(t.trans_ID) AS orders_made FROM tbl_users u JOIN tbl_transactions t ON t.user_ID = u.user_ID WHERE t.paid = 1 GROUP BY u.user_ID, full_name ORDER BY total_spent DESC LIMIT 5;");
        res.json(results);
    } catch (err) {
        console.log(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
}

exports.monthly_sales = async(req, res) => {
    try {
        const [results] = await db.query(`
        SELECT YEAR(t.date) AS sales_year, MONTH(t.date) AS sales_month, SUM(t.grandTotal) AS total_sales
        FROM tbl_transactions t
        GROUP BY YEAR(t.date), MONTH(t.date)
        ORDER BY sales_year, sales_month;
      `);
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
};

exports.show_users = async(req, res) => {
    try {
        const [results] = await db.query(`SELECT * FROM tbl_users WHERE role = 'user';`);
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
};

exports.edit_user = async(req, res) => {
    try {
        const { user_ID, firstName, midName, lastName, userName, role } = req.body;
        const [results] = await db.query(
            `UPDATE tbl_users SET firstName = ?, midName = ?, lastName = ?, userName = ?, role = ? WHERE user_ID = ?`, [firstName, midName, lastName, userName, role, user_ID]
        );
        if (results.affectedRows === 0) return res.status(404).send('ไม่พบผู้ใช้ที่ต้องการแก้ไข');
        return res.json({ message: 'อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('เกิดข้อผิดพลาดในการอัปเดตผู้ใช้');
    }
};

exports.delete_user = async(req, res) => {
    try {
        const { user_ID } = req.body;
        const [results] = await db.query(`DELETE FROM tbl_users WHERE user_ID = ?`, [user_ID]);
        if (results.affectedRows === 0) return res.status(404).send('ไม่พบผู้ใช้ที่ต้องการลบ');
        return res.json({ message: 'ลบข้อมูลผู้ใช้เรียบร้อยแล้ว' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('เกิดข้อผิดพลาดในการลบผู้ใช้');
    }
};

exports.show_sellers = async(req, res) => {
    try {
        const [results] = await db.query(`SELECT * FROM tbl_users WHERE role = 'seller';`);
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
};

// Edit seller
exports.edit_seller = async(req, res) => {
    try {
        const { user_ID, firstName, midName, lastName, userName, role } = req.body;
        const [results] = await db.query(
            `UPDATE tbl_users SET firstName = ?, midName = ?, lastName = ?, userName = ?, role = ? WHERE user_ID = ?`, [firstName, midName, lastName, userName, role, user_ID]
        );
        if (results.affectedRows === 0) return res.status(404).send('ไม่พบผู้ขายที่ต้องการแก้ไข');
        return res.json({ message: 'อัปเดตข้อมูลผู้ขายเรียบร้อยแล้ว' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('เกิดข้อผิดพลาดในการอัปเดตผู้ขาย');
    }
};

// Delete seller
exports.delete_seller = async(req, res) => {
    try {
        const { user_ID } = req.body;
        const [results] = await db.query(`DELETE FROM tbl_users WHERE user_ID = ?`, [user_ID]);
        if (results.affectedRows === 0) return res.status(404).send('ไม่พบผู้ขายที่ต้องการลบ');
        return res.json({ message: 'ลบข้อมูลผู้ขายเรียบร้อยแล้ว' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('เกิดข้อผิดพลาดในการลบผู้ขาย');
    }
};

// Show coupons
exports.show_coupons = async(req, res) => {
    try {
        const [results] = await db.query(`SELECT * FROM tbl_coupons`);
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    }
};

// Edit coupon
exports.edit_coupon = async(req, res) => {
    try {
        const { coupon_ID, couponCode, discount, minOrderValue, expDate, remain } = req.body;
        const [results] = await db.query(
            `UPDATE tbl_coupons SET couponCode = ?, discount = ?, minOrderValue = ?, expDate = ?, remain = ? WHERE coupon_ID = ?`, [couponCode, discount, minOrderValue, expDate, remain, coupon_ID]
        );
        if (results.affectedRows === 0) return res.status(404).send('ไม่พบคูปองที่ต้องการแก้ไข');
        return res.json({ message: 'อัปเดตข้อมูลคูปองเรียบร้อยแล้ว' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('เกิดข้อผิดพลาดในการอัปเดตคูปอง');
    }
};

// Delete coupon
exports.delete_coupon = async(req, res) => {
    try {
        const { coupon_ID } = req.body;
        const [results] = await db.query(`DELETE FROM tbl_coupons WHERE coupon_ID = ?`, [coupon_ID]);
        if (results.affectedRows === 0) return res.status(404).send('ไม่พบคูปองที่ต้องการลบ');
        return res.json({ message: 'ลบข้อมูลคูปองเรียบร้อยแล้ว' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('เกิดข้อผิดพลาดในการลบคูปอง');
    }
};

// Create coupon
exports.create_coupon = async(req, res) => {
    try {
        const { couponCode, discount, minOrderValue, expDate, remain } = req.body;
        await db.query(
            `INSERT INTO tbl_coupons(couponCode, discount, minOrderValue, expDate, remain) VALUES (?, ?, ?, ?, ?)`, [couponCode, discount, minOrderValue, expDate, remain]
        );
        return res.json({ message: 'สร้างข้อมูลคูปองเรียบร้อยแล้ว' });
    } catch (err) {
        console.error(err);
        return res.status(500).send('เกิดข้อผิดพลาดในการสร้างคูปอง');
    }
};

// Show payment info
exports.show_payment = async(req, res) => {
    try {
        const [results] = await db.query(`
        SELECT U.user_ID, CONCAT(COALESCE(U.firstName, ''), ' ', COALESCE(U.midName, ''), ' ', COALESCE(U.lastName, '')) AS fullname,
               T.transport_state, T.grandTotal, T.paid, T.date
        FROM tbl_users AS U
        JOIN tbl_transactions AS T ON U.user_ID = T.user_ID;
      `);
        return res.json(results);
    } catch (err) {
        console.error(err);
        return res.status(500).send('เกิดข้อผิดพลาดในการแสดงข้อมูล payment');
    }
};