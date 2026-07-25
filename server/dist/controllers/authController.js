"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.refresh = exports.login = exports.registerEventTeam = exports.registerWorker = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const WorkerProfile_1 = __importDefault(require("../models/WorkerProfile"));
const EventTeamProfile_1 = __importDefault(require("../models/EventTeamProfile"));
const authValidator_1 = require("../validators/authValidator");
const generateTokens = (id, role) => {
    const accessToken = jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_SECRET || 'supersecretjwtkeychangeinproduction', { expiresIn: (process.env.JWT_EXPIRE || '1d') });
    const refreshToken = jsonwebtoken_1.default.sign({ id, role }, process.env.JWT_REFRESH_SECRET || 'supersecretjwtrefreshkeychangeinproduction', { expiresIn: (process.env.JWT_REFRESH_EXPIRE || '7d') });
    return { accessToken, refreshToken };
};
const registerWorker = async (req, res) => {
    try {
        // 1. Validate payload
        const result = authValidator_1.registerWorkerSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { email, password, name, phone } = result.data;
        // 2. Check if email already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // 3. Create user doc
        const user = new User_1.default({
            email,
            password,
            role: 'worker',
            isProfileSetup: false,
        });
        await user.save();
        // 4. Create worker profile doc
        const profile = new WorkerProfile_1.default({
            user: user._id,
            name,
            phone,
        });
        await profile.save();
        // 5. Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.role);
        return res.status(201).json({
            message: 'Worker registered successfully',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isProfileSetup: user.isProfileSetup,
                name: profile.name,
            },
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error('registerWorker error:', error);
        return res.status(500).json({ message: 'Server error during worker registration' });
    }
};
exports.registerWorker = registerWorker;
const registerEventTeam = async (req, res) => {
    try {
        // 1. Validate payload
        const result = authValidator_1.registerEventTeamSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { email, password, companyName, ownerName, phone } = result.data;
        // 2. Check if email already exists
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        // 3. Create user doc
        const user = new User_1.default({
            email,
            password,
            role: 'event_team',
            isProfileSetup: false,
        });
        await user.save();
        // 4. Create event team profile doc
        const profile = new EventTeamProfile_1.default({
            user: user._id,
            companyName,
            ownerName,
            phone,
        });
        await profile.save();
        // 5. Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.role);
        return res.status(201).json({
            message: 'Event Team registered successfully',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isProfileSetup: user.isProfileSetup,
                companyName: profile.companyName,
            },
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error('registerEventTeam error:', error);
        return res.status(500).json({ message: 'Server error during event team registration' });
    }
};
exports.registerEventTeam = registerEventTeam;
const login = async (req, res) => {
    try {
        // 1. Validate payload
        const result = authValidator_1.loginSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: result.error.flatten().fieldErrors,
            });
        }
        const { email, password } = result.data;
        // 2. Check user exists
        const user = await User_1.default.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // 3. Match password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        // 4. Fetch profile name depending on role
        let name = '';
        if (user.role === 'worker') {
            const profile = await WorkerProfile_1.default.findOne({ user: user._id });
            name = profile ? profile.name : 'Worker';
        }
        else if (user.role === 'event_team') {
            const profile = await EventTeamProfile_1.default.findOne({ user: user._id });
            name = profile ? profile.companyName : 'Event Team';
        }
        else {
            name = 'Admin';
        }
        // 5. Generate tokens
        const { accessToken, refreshToken } = generateTokens(user._id.toString(), user.role);
        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isProfileSetup: user.isProfileSetup,
                name,
            },
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.error('login error:', error);
        return res.status(500).json({ message: 'Server error during login' });
    }
};
exports.login = login;
const refresh = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET || 'supersecretjwtrefreshkeychangeinproduction');
        const user = await User_1.default.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'User session no longer valid' });
        }
        // Fetch profile name
        let name = '';
        if (user.role === 'worker') {
            const profile = await WorkerProfile_1.default.findOne({ user: user._id });
            name = profile ? profile.name : 'Worker';
        }
        else if (user.role === 'event_team') {
            const profile = await EventTeamProfile_1.default.findOne({ user: user._id });
            name = profile ? profile.companyName : 'Event Team';
        }
        else {
            name = 'Admin';
        }
        const tokens = generateTokens(user._id.toString(), user.role);
        return res.status(200).json({
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                isProfileSetup: user.isProfileSetup,
                name,
            },
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
        });
    }
    catch (error) {
        console.error('token refresh error:', error);
        return res.status(401).json({ message: 'Refresh token invalid or expired' });
    }
};
exports.refresh = refresh;
const logout = async (req, res) => {
    // Stateless logout, client just needs to clear local tokens.
    return res.status(200).json({ message: 'Logout successful' });
};
exports.logout = logout;
