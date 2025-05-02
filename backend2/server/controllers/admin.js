const db = require('../db/db')
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