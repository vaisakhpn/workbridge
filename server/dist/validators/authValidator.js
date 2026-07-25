"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerEventTeamSchema = exports.registerWorkerSchema = void 0;
const zod_1 = require("zod");
exports.registerWorkerSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    name: zod_1.z.string().min(2, 'Name must be at least 2 characters long'),
    phone: zod_1.z.string().regex(/^[0-9]{10}$/, 'Phone number must be a valid 10-digit number'),
});
exports.registerEventTeamSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(6, 'Password must be at least 6 characters long'),
    companyName: zod_1.z.string().min(2, 'Company name must be at least 2 characters long'),
    ownerName: zod_1.z.string().min(2, 'Owner name must be at least 2 characters long'),
    phone: zod_1.z.string().regex(/^[0-9]{10}$/, 'Contact phone must be a valid 10-digit number'),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
