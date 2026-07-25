"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restrictTo = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const protect = async (req, res, next) => {
    let token;
    // 1. Obtain token from authorization header
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, token missing' });
    }
    try {
        // 2. Verify token
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'supersecretjwtkeychangeinproduction');
        // 3. Find user in database
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User belonging to this token no longer exists' });
        }
        // 4. Attach user to request
        req.user = user;
        next();
    }
    catch (error) {
        console.error('JWT auth middleware error:', error);
        return res.status(401).json({ message: 'Not authorized, token invalid or expired' });
    }
};
exports.protect = protect;
const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'You do not have permission to perform this action',
            });
        }
        next();
    };
};
exports.restrictTo = restrictTo;
