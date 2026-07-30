import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import JobService from "../services/job/job.service";
import { createJobSchema, updateJobSchema } from "../validators/job.validator";
import { markAttendanceSchema } from "../validators/attendance.validator";
import { rateWorkersSchema } from "../validators/rating.validator";

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = createJobSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Validation failed",
          400,
          result.error.flatten().fieldErrors,
        ),
      );
    }

    const response = await JobService.createJob(req.user!.id, result.data);

    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
};

export const getMyJobs = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await JobService.getMyJobs(req.user!.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await JobService.getJobById(req.params.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
export const getAllJobs = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await JobService.getAllJobs(req.query);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = updateJobSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Validation failed",
          400,
          result.error.flatten().fieldErrors,
        ),
      );
    }

    const response = await JobService.updateJob(
      req.user!.id,
      req.params.id,
      result.data,
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await JobService.deleteJob(req.user!.id, req.params.id);

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceList = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const response = await JobService.getAttendanceList(
      req.params.jobId,
      req.user!.id,
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const markAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const result = markAttendanceSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Validation failed",
          400,
          result.error.flatten().fieldErrors,
        ),
      );
    }

    const response = await JobService.markAttendance(
      req.params.jobId,
      req.user!.id,
      result.data.attendance,
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
export const completeJob = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await JobService.completeJob(
      req.params.jobId,
      req.user!.id
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const rateWorkers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = rateWorkersSchema.safeParse(req.body);

    if (!result.success) {
      return next(
        new AppError(
          "Validation failed",
          400,
          result.error.flatten().fieldErrors
        )
      );
    }

    const response = await JobService.rateWorkers(
      req.params.jobId,
      req.user!.id,
      result.data.ratings
    );

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getPublicLatestJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const limit = Number(req.query.limit) || 6;
    const response = await JobService.getPublicLatestJobs(limit);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const searchPublicJobs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await JobService.searchJobs(req.query);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
