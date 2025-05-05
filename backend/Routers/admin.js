const express = require('express')
const router = express.Router()
const {
    total_sales,
    total_user,
    total_seller,
    total_admin,
    total_spent_by_category,
    top_5_spender,
    monthly_sales,
    show_users,
    edit_user,
    delete_user,
    show_sellers,
    edit_seller,
    delete_seller,
    show_coupons,
    edit_coupon,
    delete_coupon,
    create_coupon,
    show_payment
} = require('../controllers/admin')
    // before
    // router.get('/admin/dashboard/total_sales',(req,res)=>{
    //     db.query('SELECT SUM(sumPrice) as total_spent FROM tbl_transactions WHERE paid = 1;', (err, results) => {
    //         if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    //         res.json(results);
    //     });
    // })

// after
router.get('/admin/dashboard/total_sales', total_sales)

router.get('/admin/dashboard/total_user', total_user)

router.get('/admin/dashboard/total_seller', total_seller)

router.get('/admin/dashboard/total_admin', total_admin)

router.get('/admin/dashboard/total_spent_by_category', total_spent_by_category)

router.get('/admin/dashboard/top_5_spender', top_5_spender)

router.get('/admin/dashboard/monthly_sales', monthly_sales)

router.get('/admin/user_management/user_list/show', show_users)

router.put('/admin/user_management/user_list/edit', edit_user)

router.delete('/admin/user_management/user_list/delete', delete_user)

router.get('/admin/user_management/seller_list/show', show_sellers)

router.put('/admin/user_management/seller_list/edit', edit_seller)

router.delete('/admin/user_management/seller_list/delete', delete_seller)

router.get('/admin/coupon_management/show', show_coupons)

router.put('/admin/coupon_management/edit', edit_coupon)

router.delete('/admin/coupon_management/delete', delete_coupon)

router.post('/admin/coupon_management/create', create_coupon)

router.get('/admin/payment', show_payment)

module.exports = router