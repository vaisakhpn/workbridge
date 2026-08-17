import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import { errorHandler } from "./middleware/error.middleware";
import workerProfileRoutes from "./routes/workerProfile.routes";
import eventTeamProfileRoutes from "./routes/eventTeamProfile.routes";
import jobRoutes from "./routes/job.routes";
import applicationRoutes from "./routes/application.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import notificationRoutes from "./routes/notification.routes";
import adminRoutes from "./routes/admin.routes";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// ==============================
// Global Middlewares
// ==============================

app.disable("x-powered-by");

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((url) => url.trim())
  : ["http://localhost:3000", "http://localhost:3001"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ==============================
// Health Check
// ==============================

app.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Jobora Backend API Service is Running",
    healthCheck: "/api/health",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: process.env.NODE_ENV || "development",
    timestamp: new Date().toISOString(),
  });
});

// ==============================
// Routes
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/worker", workerProfileRoutes);
app.use("/api/event-team", eventTeamProfileRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

// ==============================
// 404 & Error Handlers
// ==============================

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(errorHandler);

// ==============================
// Start Server
// ==============================

app.listen(PORT, () => {
  console.log("==================================");
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment : ${process.env.NODE_ENV}`);
  console.log(`📡 Health Check: /api/health`);
  console.log("==================================");
});
