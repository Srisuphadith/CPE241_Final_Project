const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser') //เพื่อให้อ่านไฟล์ json ที่ส่งมาได้


//middenware ใครจะทำอะไรทำฉันก่อน
app.use(morgan('dev')) //morgan dev เอาไว้ดูว่าใครทำอะไรกับ server เรา แบบ get รั่วๆ 
app.use(bodyParser.json()) //เพื่อให้อ่านไฟล์ json ที่ส่งมาได้

//Route คือเส้นทาง (URL) ที่กำหนดไว้ในเซิร์ฟเวอร์ ซึ่งทำหน้าที่รับคำขอ (Request) 
//จากฝั่งผู้ใช้ แล้วจัดการกับข้อมูล (เช่น CRUD) และส่งคำตอบกลับ (Response) ไปยังผู้ใช้
app.get('/',(req,res)=>{
    //code
    res.send('hello server get')
})

app.post('/post',(req,res)=>{
    //วิธีรับFข้อมูลเเล้วแสดง
    //console.log(req.body.name) //ท่างงไม่ค่อยสื่อ
    const {name,price} = req.body
    console.log(name)

    res.send(req.body)
})

//start server -> node server (in cmd) -> use nodemon to auto restart server -> npm start (in cmd)
app.listen(4000, ()=> console.log('server is runing on port 4000'))

