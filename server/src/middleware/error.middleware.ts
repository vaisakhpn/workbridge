import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      statusCode: err.statusCode,
      ...(err.errors && { errors: err.errors }),
    });
  }

  console.error(err);

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
    statusCode: 500,
  });
};