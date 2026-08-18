import mongoose from "mongoose";
import { z } from "zod";

import Application from "../../models/application.model";
import Job from "../../models/job.model";
import User from "../../models/User";
import { Notification } from "../../models/notification.model";

import { AppError } from "../../utils/AppError";

import { updateApplicationStatusSchema } from "../../validators/application.validator";
import notificationService from "../notification/notification.service";

class ApplicationService {
  async applyForJob(workerId: string, jobId: string) {
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      throw new AppError("Invalid job ID", 400);
    }

    const worker = await User.findById(workerId);

    if (!worker) {
      throw new AppError("Worker not found", 404);
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.status !== "OPEN") {
      throw new AppError("This job is no longer accepting applications", 400);
    }

    const existingApplication = await Application.findOne({
      job: job._id,
      worker: worker._id,
    });

    if (existingApplication) {
      throw new AppError("You have already applied for this job", 409);
    }

    const application = await Application.create({
      job: job._id,
      worker: worker._id,
    });

    await Job.findByIdAndUpdate(job._id, { $inc: { applicationsCount: 1 } });

    await notificationService.createNotification(
      job.createdBy.toString(),
      "New Job Application",
      `A new worker has applied for your job "${job.title}".`,
      "APPLICATION",
    );

    return {
      success: true,
      message: "Application submitted successfully",
      data: application,
    };
  }

  async getMyApplications(workerId: string) {
    const worker = await User.findById(workerId);

    if (!worker) {
      throw new AppError("Worker not found", 404);
    }

    const applications = await Application.find({
      worker: worker._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    return {
      success: true,
      message: "Applications fetched successfully",
      results: applications.length,
      data: applications,
    };
  }

  async getApplicantsByJob(eventTeamId: string, jobId: string) {
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      throw new AppError("Invalid job ID", 400);
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.createdBy.toString() !== eventTeamId) {
      throw new AppError(
        "You are not authorized to view these applicants",
        403,
      );
    }

    const applications = await Application.find({
      job: job._id,
    })
      .populate("worker", "email role")
      .sort({ createdAt: -1 });

    return {
      success: true,
      message: "Applicants fetched successfully",
      results: applications.length,
      data: applications,
    };
  }

  async updateApplicationStatus(
    eventTeamId: string,
    applicationId: string,
    data: z.infer<typeof updateApplicationStatusSchema>,
  ) {
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      throw new AppError("Invalid application ID", 400);
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      throw new AppError("Application not found", 404);
    }

    const job = await Job.findById(application.job);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.createdBy.toString() !== eventTeamId) {
      throw new AppError(
        "You are not authorized to update this application",
        403,
      );
    }

    if (job.status === "FILLED") {
      throw new AppError("Job already filled", 400);
    }

    application.status = data.status;

    await application.save();
    await notificationService.createNotification(
      application.worker.toString(),
      data.status === "ACCEPTED"
        ? "Application Accepted"
        : "Application Rejected",
      data.status === "ACCEPTED"
        ? `Congratulations! Your application for "${job.title}" has been accepted.`
        : `Unfortunately, your application for "${job.title}" has been rejected.`,
      "APPLICATION",
    );

    if (data.status === "ACCEPTED") {
      const acceptedCount = await Application.countDocuments({
        job: job._id,
        status: "ACCEPTED",
      });

      if (acceptedCount >= job.workersNeeded) {
        job.status = "FILLED";
        await job.save();

        await notificationService.createNotification(
          eventTeamId,
          "Job Filled",
          `"${job.title}" has reached the required number of workers.`,
          "JOB",
        );

        const pendingApplications = await Application.find({
          job: job._id,
          status: "PENDING",
        }).select("_id worker");

        if (pendingApplications.length > 0) {
          await Application.updateMany(
            { job: job._id, status: "PENDING" },
            { $set: { status: "REJECTED" } }
          );

          const rejectionNotifications = pendingApplications.map((pending) => ({
            user: pending.worker,
            title: "Application Rejected",
            message: `Your application for "${job.title}" has been rejected because all positions have been filled.`,
            type: "APPLICATION" as const,
            isRead: false,
          }));

          await Notification.insertMany(rejectionNotifications);
        }
      }
    }

    return {
      success: true,
      message: `Application ${data.status.toLowerCase()} successfully`,
      data: application,
    };
  }
}

export default new ApplicationService();
