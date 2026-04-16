const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(403).json({ success: false, message: "A token is required for authentication" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request
    } catch (err) {
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
    return next(); // Token is good, proceed to the route
};

module.exports = verifyToken;