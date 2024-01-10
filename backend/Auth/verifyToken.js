const jwt = require("jsonwebtoken");
require('dotenv').config();
const authenticate = async (req, res, next) => {
    try {
        // Check if the request has a cookie named 'authToken'
        const token = req.cookies.authtoken;

        // Check if a token is present
        if (!token) {
            return res.status(401).json({ success: false, message: "No token, authorization failed" });
        }

        // Verify JWT using the provided secret key
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach user ID to request object
        req.userId = decoded.id;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        // Handle different JWT verification errors

        // If the token has expired
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token is expired" });
        }

        // If the token is invalid for other reasons
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = { authenticate };
