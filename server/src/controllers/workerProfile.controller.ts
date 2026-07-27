import { Request, Response, NextFunction } from "express";
import WorkerProfileService from "../services/worker/workerProfile.service";
import { updateWorkerProfileSchema } from "../validators/workerProfile.validator";
import { AppError } from "../utils/AppError";

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await WorkerProfileService.getProfile(req.user!.id);

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
    const result = updateWorkerProfileSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Validation failed",
          400,
          result.error.flatten().fieldErrors
        )
      );
    }

    const response = await WorkerProfileService.updateProfile(
      req.user!.id,
      result.data
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};