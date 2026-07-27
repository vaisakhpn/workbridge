import { Request, Response, NextFunction } from "express";
import NotificationService from "../services/notification/notification.service";

export const getNotifications = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await NotificationService.getNotifications(req.user!.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await NotificationService.markAsRead(
      req.params.id,
      req.user!.id,
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await NotificationService.markAllAsRead(req.user!.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
