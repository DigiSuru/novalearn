const isAdmin = (req, res, next) => {
    // req.user is set by your existing authMiddleware (verifyToken)
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized. Please log in." });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: "Access Denied. Only Admins can perform this action." });
    }

    // User is an admin, proceed!
    next();
};

module.exports = isAdmin;