import { NextFunction, Request, Response } from "express";

import adminService from "../services/admin/admin.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await adminService.login(req.body);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await adminService.getDashboard();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};