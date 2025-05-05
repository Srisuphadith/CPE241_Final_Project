----------Server--------------
npm init -y 
-> package.json เพื่อสร้างโปรเจค Nodejs อย่างรวดเร็ว


npm install express morgan body-parser cors nodemon
->  จะทำการ ติดตั้ง 5 packages ที่นิยมใช้ในโปรเจกต์ Node.js/Express และเพิ่มไว้ใน dependencies ของ package.json โดยอัตโนมัติ

ได้อะไรจากคำสั่งนี้:
Package	ใช้ทำอะไร?
express	สร้างเซิร์ฟเวอร์และ API (framework ยอดนิยมใน Node.js)
morgan	แสดง log ของ request ที่เข้า server (ช่วย debug)
body-parser	แปลงข้อมูลจาก req.body ให้ใช้งานง่าย เช่น JSON, form data
cors	เปิดให้ frontend ที่อยู่ต่างโดเมนสามารถเรียก API ได้ (Cross-Origin Resource Sharing)
nodemon	รันเซิร์ฟเวอร์แบบ auto-restart เมื่อแก้ไฟล์ (ใช้ตอนพัฒนาเท่านั้น)


npm install prisma
npx prisma init
npm install @prisma/client
// Doc ใช้ในการสร้างและอัพเดตฐานข้อมูล
npx prisma migrate dev --name workshop1_init

//
อัพเดต Prisma schema
npx prisma migrate dev

-----------Client-------------
npm create vite@latest .
client
javascript

npm install
npm run dev
npm install axios
