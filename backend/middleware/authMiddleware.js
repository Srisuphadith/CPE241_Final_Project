const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Access Denied, No Token Provided' });
    }

    // แยก 'Bearer' ออก
    const token = authHeader.split(' ')[1]; // ตัด prefix 'Bearer '

    if (!token) {
        return res.status(401).json({ error: 'Token format is invalid' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized, Invalid Token' });
    }
};

module.exports = authMiddleware;
