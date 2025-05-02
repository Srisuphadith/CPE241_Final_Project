const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser') //เพื่อให้อ่านไฟล์ json ที่ส่งมาได้
//const product = require('./Routers/product') //เพื่อใช้route product (route traditional2)
//const auth = require('./Routers/auth') //(route traditional2)
const { readdirSync } = require('fs') //เพื่ออ่านรายชื่อไฟล์ในโฟลเดอร์Routerแบบ synchronous
const cors = require('cors') //เกี่ยวหน้าบ้าน

//middenware ใครจะทำอะไรทำฉันก่อน
app.use(morgan('dev')) //morgan dev เอาไว้ดูว่าใครทำอะไรกับ server เรา แบบ get รั่วๆ 
app.use(bodyParser.json()) //เพื่อให้อ่านไฟล์ json ที่ส่งมาได้
app.use(cors())
//route
//app.use('/api',product) //(route traditional2)
//app.use('/api',auth) //(route traditional2)

//route
//readdirSync('./Routers').map((item,index)=>console.log(item, index)) //ในโฟเดอร์นี้มีกี่ไฟล์เข้าถึงทั้งหมด
//console log
//auth.js 0
//product.js 1
readdirSync('./Routers')
    .map((item)=>app.use('/api',require('./Routers/'+item))) //auto import route


// app.get('/', (req, res) => {
//     db.query('SELECT * FROM tbl_users', (err, results) => {
//         if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
//         res.json(results);
//     });
// });
// app.get('/admin/dashboard',(req,res)=>{
//     db.query('SELECT SUM(sumPrice) FROM tbl_transactions WHERE paid = 1;', (err, results) => {
//         if (err) return res.status(500).send('ผิดพลาดในการดึงข้อมูล');
//         res.json(results);
//     });
// })

//start server -> node server (in cmd) -> use nodemon to auto restart server -> npm start (in cmd)
app.listen(4000, ()=> console.log('server is runing on port 4000'))

