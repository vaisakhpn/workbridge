import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import JWTService from "../services/auth/jwt.service";
import { AppError } from "../utils/AppError";

export type UserRole = "worker" | "eventTeam" | "admin";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    let token = req.cookies?.accessToken;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new AppError("Authentication required", 401);
    }

    const payload = JWTService.verifyAccessToken(token);

    const user = await User.findById(payload.id);

    if (!user) {
      throw new AppError("User belonging to this token no longer exists", 401);
    }

    if (!user.isActive) {
      throw new AppError("Your account has been disabled", 403);
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError("Authentication required", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }

    next();
  };
};
