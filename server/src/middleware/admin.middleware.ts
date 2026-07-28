import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { AppError } from "../utils/AppError";

interface AdminTokenPayload extends jwt.JwtPayload {
  role: "ADMIN";
}

export const protectAdmin = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError("Not authorized", 401);
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ADMIN_SECRET!,
    ) as AdminTokenPayload;

    if (decoded.role !== "ADMIN") {
      throw new AppError("Access denied", 403);
    }

    next();
  } catch {
    next(new AppError("Invalid or expired admin token", 401));
  }
};