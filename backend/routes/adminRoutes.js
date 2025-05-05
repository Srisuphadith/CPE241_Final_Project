const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')
    // before
    // router.get('/dashboard/total_sales',(req,res)=>{
    //     db.query('SELECT SUM(sumPrice) as total_spent FROM tbl_transactions WHERE paid = 1;', adminController.(err, results) => {
    //         if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
    //         res.json(results);
    //     });
    // })

// after
router.get('/dashboard/total_sales', adminController.total_sales)
router.get('/dashboard/total_user', adminController.total_user)
router.get('/dashboard/total_seller', adminController.total_seller)
router.get('/dashboard/total_admin', adminController.total_admin)
router.get('/dashboard/total_spent_by_category', adminController.total_spent_by_category)
router.get('/dashboard/top_5_spender', adminController.top_5_spender)
router.get('/dashboard/monthly_sales', adminController.monthly_sales)
router.get('/user_management/user_list/show', adminController.show_users)
router.put('/user_management/user_list/edit', adminController.edit_user)
router.delete('/user_management/user_list/delete', adminController.delete_user)
router.get('/user_management/seller_list/show', adminController.show_sellers)
router.put('/user_management/seller_list/edit', adminController.edit_seller)
router.delete('/user_management/seller_list/delete', adminController.delete_seller)
router.get('/coupon_management/show', adminController.show_coupons)
router.put('/coupon_management/edit', adminController.edit_coupon)
router.delete('/coupon_management/delete', adminController.delete_coupon)
router.post('/coupon_management/create', adminController.create_coupon)
router.get('/payment', adminController.show_payment)

module.exports = router