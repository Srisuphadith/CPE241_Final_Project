const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'db', // Docker service name for MySQL
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root_password',
    database: process.env.DB_NAME || 'shm_db'
});


db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...')
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello From Express!' });
});

app.listen(5000, () => console.log('Server running on Port 5000'))