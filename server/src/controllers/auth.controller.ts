import { NextFunction, Request, Response } from "express";
import {
  registerWorkerSchema,
  registerEventTeamSchema,
  loginSchema,
} from "../validators/authValidator";
import AuthService from "../services/auth/auth.service";
import { AppError } from "../utils/AppError";
import { setAuthCookies, clearAuthCookies } from "../utils/cookie.utils";

export const registerWorker = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = registerWorkerSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError("Validation failed", 400, result.error.flatten().fieldErrors)
      );
    }

    const response = await AuthService.registerWorker(result.data);

    setAuthCookies(res, response.accessToken, response.refreshToken);

    res.status(201).json({
      success: true,
      message: response.message,
      user: response.user,
    });
  } catch (error) {
    next(error);
  }
};

export const registerEventTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = registerEventTeamSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError("Validation failed", 400, result.error.flatten().fieldErrors)
      );
    }

    const response = await AuthService.registerEventTeam(result.data);

    setAuthCookies(res, response.accessToken, response.refreshToken);

    res.status(201).json({
      success: true,
      message: response.message,
      user: response.user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError("Validation failed", 400, result.error.flatten().fieldErrors)
      );
    }

    const response = await AuthService.login(result.data);

    setAuthCookies(res, response.accessToken, response.refreshToken);

    res.status(200).json({
      success: true,
      message: response.message,
      user: response.user,
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await AuthService.getCurrentUser(req.user!.id);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return next(new AppError("Refresh token is required", 401));
    }

    const response = await AuthService.refresh(refreshToken);

    setAuthCookies(res, response.accessToken, response.refreshToken);

    res.status(200).json({
      success: true,
      message: response.message,
      user: response.user,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    clearAuthCookies(res);

    if (req.user?.id) {
      await AuthService.logout(req.user.id);
    }

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};