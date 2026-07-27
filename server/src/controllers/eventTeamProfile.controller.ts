import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import EventTeamProfileService from "../services/eventTeam/eventTeamProfile.service";
import { updateEventTeamProfileSchema } from "../validators/eventTeamProfile.validator";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await EventTeamProfileService.getProfile(req.user!.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = updateEventTeamProfileSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Validation failed",
          400,
          result.error.flatten().fieldErrors
        )
      );
    }

    const response = await EventTeamProfileService.updateProfile(
      req.user!.id,
      result.data
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};