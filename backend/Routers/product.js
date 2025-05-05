const express = require('express')
const router = express.Router()

const { create,list,read, update , remove}  = require('../controllers/product')

//express.Router() = ตัวช่วย "จัดการกลุ่มเส้นทาง (route)" อย่างเป็นระบบ
// เพื่อให้โค้ด สะอาด อ่านง่าย และดูแลง่าย เมื่อแอปเริ่มใหญ่ขึ้น

/*
before

router.get('/product',(req,res)=>{ //show หลายโปรดัก
    //code
    console.log('product get')// แสดงข้อความใน console ฝั่ง server (สำหรับ developer ใช้ดูว่ามี request เข้ามา)
    res.send('product get all') // ส่งข้อความกลับไปยังฝั่ง client (frontend เห็นผลลัพธ์นี้)
})*/

// after
router.get('/product',list)



// before
// router.get('/product/:productID',(req,res)=>{
//     const {productID} = req.params
//     res.send('product get ID')
//     console.log(productID)
// })

//after
router.get('/product/:productID',read)

// before
// router.post('/product',(req,res)=>{ 
//     //code
//     const {name} = req.body
//     console.log('product post')
//     res.send('product post ' + name)
// })
// after
router.post('/product',create)

// before
// router.put('/product/:productID',(req,res)=>{ //update product
//     const {productID} = req.params
//     res.send('product put(update) '+ productID )
// })
//after
router.put('/product/:productID',update)


// before
// router.delete('/product/:productID',(req,res)=>{ //delete product
//     const {productID} = req.params
//     res.send('product delete(delete) '+ productID )
// })
// after
router.delete('/product/:productID',remove)

module.exports = router
