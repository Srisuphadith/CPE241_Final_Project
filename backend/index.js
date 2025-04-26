const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const session = require('express-session');
const secret = process.env.SECRET_KEY;

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
}));

const db = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'CPE241_SHOP'
});

app.post('/api/login', async(req, res) => {
    const { username, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT user_ID, firstName, role, password_hash FROM tbl_users WHERE userName = ?', [username]);
        const user = rows[0];

        if (user && await bcrypt.compare(password, user.password_hash)) {
            req.session.userID = user.user_ID;
            req.session.role = user.role;
            req.session.firstName = user.firstName;
            res.json({ success: true, message: 'Login successful!' });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/api/market', (req, res) => {
    if (req.session.userID) {
        res.json({ message: `Welcome ${req.session.firstName}` });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});