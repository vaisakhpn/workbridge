import { Request, Response, NextFunction } from "express";
import {AppError} from "../utils/AppError";
import ApplicationService from "../services/application/application.service";
import { updateApplicationStatusSchema } from "../validators/application.validator";

export const applyForJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await ApplicationService.applyForJob(
      req.user!.id,
      req.params.jobId
    );

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getMyApplications = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await ApplicationService.getMyApplications(
      req.user!.id
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getApplicantsByJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await ApplicationService.getApplicantsByJob(
      req.user!.id,
      req.params.jobId
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateApplicationStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = updateApplicationStatusSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Validation failed",
          400,
          result.error.flatten().fieldErrors
        )
      );
    }

    const response = await ApplicationService.updateApplicationStatus(
      req.user!.id,
      req.params.applicationId,
      result.data
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
