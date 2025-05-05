const db = require('../config/db')
exports.total_sales = async (req,res)=>{
    try{ 
        db.query('SELECT SUM(grandTotal) as total_spent FROM tbl_transactions WHERE paid = 1;', (err, results) => {
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
}

exports.total_user = async (req,res)=>{
    try{
        db.query("SELECT COUNT(role) as total_user FROM tbl_users WHERE role = 'user';", (err, results) => {
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
}

exports.total_seller = async (req,res)=>{
    try{
        db.query("SELECT COUNT(role) as total_seller FROM tbl_users WHERE role = 'seller';", (err, results) => {
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
}

exports.total_admin = async (req,res)=>{
    try{
        db.query("SELECT COUNT(role) as total_admin FROM tbl_users WHERE role = 'admin';", (err, results) => {
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
}

exports.total_spent_by_category = async (req,res)=>{
    try{
        db.query("SELECT c.cateName, SUM(ti.quantity * ti.price) AS total_sales FROM tbl_transaction_items ti JOIN tbl_products p ON ti.product_ID = p.product_ID JOIN tbl_categories c ON p.cate_ID = c.cate_ID GROUP BY c.cateName ORDER BY total_sales DESC;", (err, results) => {
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
}

exports.top_5_spender = async (req,res)=>{
    try{
        db.query("SELECT u.user_ID, CONCAT_WS(' ', u.firstName, u.midName, u.lastName) AS full_name, SUM(t.grandTotal) AS total_spent, COUNT(t.trans_ID) AS orders_made FROM tbl_users u JOIN tbl_transactions t ON t.user_ID = u.user_ID WHERE t.paid = 1 GROUP BY u.user_ID, full_name ORDER BY total_spent DESC LIMIT 5;", (err, results) => {
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
}

exports.monthly_sales = async (req,res)=>{
    try{
        db.query("SELECT YEAR(t.date) AS sales_year, MONTH(t.date) AS sales_month, SUM(t.grandTotal) AS total_sales FROM tbl_transactions t GROUP BY YEAR(t.date), MONTH(t.date) ORDER BY sales_year, sales_month;", (err, results) => {
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
}

exports.show_users = async (req,res)=>{
    try{
        db.query("SELECT * FROM tbl_users WHERE role = 'user';", (err, results) => { //way to imporve create view 
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
} 

exports.edit_user = async (req,res)=>{
    try{
        const {user_ID,firstName,midName,lastName,userName,role} = req.body
        const sql = 
        ` UPDATE tbl_users 
          SET firstName = ?, midName = ?, lastName = ?, userName = ?, role = ?
          WHERE user_ID = ?`;
        db.query(sql,[firstName,midName,lastName,userName,role,user_ID], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('เกิดข้อผิดพลาดในการอัปเดตผู้ใช้');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('ไม่พบผู้ใช้ที่ต้องการแก้ไข');
            }

            res.json({ message: 'อัปเดตข้อมูลผู้ใช้เรียบร้อยแล้ว' });
        });   
    }
    catch(err){
        console.log(err)
    }
} 

exports.delete_user = async (req,res)=>{
    try{
        const {user_ID} = req.body
        const sql = ` DELETE FROM tbl_users WHERE user_ID = ?`;
        db.query(sql,[user_ID], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('เกิดข้อผิดพลาดในการลบผู้ใช้');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('ไม่พบผู้ใช้ที่ต้องการลบ');
            }

            res.json({ message: 'ลบข้อมูลผู้ใช้เรียบร้อยแล้ว' });
        });   
    }
    catch(err){
        console.log(err)
    }
}

exports.show_sellers = async (req,res)=>{
    try{
        db.query("SELECT * FROM tbl_users WHERE role = 'seller';", (err, results) => { //way to imporve create view 
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
} 

exports.edit_seller = async (req,res)=>{
    try{
        const {user_ID,firstName,midName,lastName,userName,role} = req.body
        const sql = 
        ` UPDATE tbl_users 
          SET firstName = ?, midName = ?, lastName = ?, userName = ?, role = ?
          WHERE user_ID = ?`;
        db.query(sql,[firstName,midName,lastName,userName,role,user_ID], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('เกิดข้อผิดพลาดในการอัปเดตผู้ขาย');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('ไม่พบผู้ขายที่ต้องการแก้ไข');
            }

            res.json({ message: 'อัปเดตข้อมูลผู้ขายเรียบร้อยแล้ว' });
        });   
    }
    catch(err){
        console.log(err)
    }
} 

exports.delete_seller = async (req,res)=>{
    try{
        const {user_ID} = req.body
        const sql = ` DELETE FROM tbl_users WHERE user_ID = ?`;
        db.query(sql,[user_ID], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('เกิดข้อผิดพลาดในการลบผู้ขาย');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('ไม่พบผู้ขายที่ต้องการลบ');
            }

            res.json({ message: 'ลบข้อมูลผู้ขายเรียบร้อยแล้ว' });
        });   
    }
    catch(err){
        console.log(err)
    }
}

exports.show_coupons = async (req,res)=>{
    try{
        const sql = `SELECT * FROM tbl_coupons `;
        db.query(sql, (err, results) => { //way to imporve create view 
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    }
    catch(err){
        console.log(err)
    }
} 

exports.edit_coupon = async (req,res)=>{
    try{
        const {coupon_ID,couponCode,discount,minOrderValue,expDate,remain} = req.body
        const sql = 
        ` UPDATE tbl_coupons 
          SET couponCode = ?, discount = ?, minOrderValue = ?, expDate = ?, remain = ?
          WHERE coupon_ID = ?`;
        db.query(sql,[coupon_ID,couponCode,discount,minOrderValue,expDate,remain], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('เกิดข้อผิดพลาดในการอัปเดตคูปอง');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('ไม่พบคูปองที่ต้องการแก้ไข');
            }

            res.json({ message: 'อัปเดตข้อมูลคูปองเรียบร้อยแล้ว' });
        });   
    }
    catch(err){
        console.log(err)
    }
} 

exports.delete_coupon = async (req,res)=>{
    try{
        const {coupon_ID} = req.body
        const sql = ` DELETE FROM tbl_coupons WHERE coupon_ID = ?`;
        db.query(sql,[coupon_ID], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('เกิดข้อผิดพลาดในการลบคูปอง');
            }

            if (results.affectedRows === 0) {
                return res.status(404).send('ไม่พบคูปองที่ต้องการลบ');
            }

            res.json({ message: 'ลบข้อมูลคูปองเรียบร้อยแล้ว' });
        });   
    }
    catch(err){
        console.log(err)
    }
}

exports.create_coupon = async (req,res)=>{
    try{
        const {couponCode,discount,minOrderValue,expDate,remain} = req.body
        const sql = 
        ` INSERT INTO tbl_coupons(couponCode,discount,minOrderValue,expDate,remain)
        VALUES(?,?,?,?,?)`; 
        db.query(sql,[couponCode,discount,minOrderValue,expDate,remain], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('เกิดข้อผิดพลาดในสร้างคูปอง');
            }
            res.json({ message: 'สร้างข้อมูลคูปองเรียบร้อยแล้ว' });
        });   
    }
    catch(err){
        console.log(err)
    }
} 

exports.show_payment = async (req,res)=>{
    try{
        const sql = 
        `SELECT U.user_ID, CONCAT(COALESCE(U.firstName, ''), ' ', COALESCE(U.midName, ''), ' ', COALESCE(U.lastName, '')) AS fullname, T.transport_state, T.grandTotal, T.paid, T.date
        FROM tbl_users AS U 
        JOIN tbl_transactions AS T 
        ON U.user_ID = T.user_ID;
        `; 
        db.query(sql, (err,results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('เกิดข้อผิดพลาดในแสดง payment');
            }
            res.json(results);
        });   
    }
    catch(err){
        console.log(err)
    }
} 
