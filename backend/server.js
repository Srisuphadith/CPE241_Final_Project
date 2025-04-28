require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./config/db.js'); // Import the db pool

const app = express();

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// Body parsing middleware
app.use(express.json());

// Session middleware with secret
const secret = process.env.SECRET_KEY;
console.log(process.env.SECRET_KEY);
app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
}));

// Basic endpoint to check server
app.get('/', (req, res) => {
    res.send('Backend Server is running!');
});

// Login route
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

// Market route (protected by session)
app.get('/api/market', (req, res) => {
    if (req.session.userID) {
        res.json({ message: `Welcome ${req.session.firstName}` });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

// Start server on port 5000
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});