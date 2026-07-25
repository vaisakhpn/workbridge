"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db"); // Extensionless import for CommonJS
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to Database
(0, db_1.connectDB)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// Basic Health Check Route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV
    });
});
// API Routes
app.use('/api/auth', authRoutes_1.default);
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});
