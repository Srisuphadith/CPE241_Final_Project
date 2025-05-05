const db = require('../config/db')
exports.sign_in = async(req, res) => {
    try {
        db.query('SELECT SUM(grandTotal) as total_spent FROM tbl_transactions WHERE paid = 1;', (err, results) => {
            if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
            res.json(results);
        });
    } catch (err) {
        console.log(err)
    }
}