import { Request, Response, NextFunction } from "express";
import DashboardService from "../services/dashboard/dashboard.service";

export const getWorkerDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await DashboardService.getWorkerDashboard(req.user!.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getEventTeamDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await DashboardService.getEventTeamDashboard(req.user!.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
