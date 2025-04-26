const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'CPE241_SHOP'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...')
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello From Express!' });
});

app.listen(5000, () => console.log('Server running on Port 5000'))