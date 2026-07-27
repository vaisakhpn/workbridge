import express from "express";
import cors from "cors";
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

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ==============================
// Health Check
// ==============================

app.get("/api/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    environment: process.env.NODE_ENV,
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

// ==============================
// 404 Handler
// ==============================

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

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
