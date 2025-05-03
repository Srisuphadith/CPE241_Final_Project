const express = require('express')
const router = express.Router()
const {total_sales,total_user,total_seller,total_admin,total_spent_by_category,top_5_spender,monthly_sales} = require('../controllers/admin')
// before
// router.get('/admin/dashboard/total_sales',(req,res)=>{
//     db.query('SELECT SUM(sumPrice) as total_spent FROM tbl_transactions WHERE paid = 1;', (err, results) => {
//         if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
//         res.json(results);
//     });
// })
// after
router.get('/admin/dashboard/total_sales',total_sales)

router.get('/admin/dashboard/total_user',total_user)

router.get('/admin/dashboard/total_seller',total_seller)

router.get('/admin/dashboard/total_admin',total_admin)

router.get('/admin/dashboard/total_spent_by_category',total_spent_by_category)

router.get('/admin/dashboard/top_5_spender',top_5_spender)

router.get('/admin/dashboard/monthly_sales',monthly_sales)

module.exports = router