import User from "../../models/User";
import WorkerProfile from "../../models/WorkerProfile";
import Job from "../../models/job.model";
import Application from "../../models/application.model";

import { AppError } from "../../utils/AppError";

class DashboardService {
  async getWorkerDashboard(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("Worker not found", 404);
    }

    const profile = await WorkerProfile.findOne({
      user: user._id,
    });

    if (!profile) {
      throw new AppError("Worker profile not found", 404);
    }

    const jobsApplied = await Application.countDocuments({
      worker: user._id,
    });

    const pending = await Application.countDocuments({
      worker: user._id,
      status: "PENDING",
    });

    const accepted = await Application.countDocuments({
      worker: user._id,
      status: "ACCEPTED",
    });

    const rejected = await Application.countDocuments({
      worker: user._id,
      status: "REJECTED",
    });

    return {
      success: true,
      message: "Worker dashboard fetched successfully",
      data: {
        profile: {
          name: profile.name,
          badge: profile.badge,
          rating: profile.rating,
          experienceScore: profile.experienceScore,
          jobsCompleted: profile.jobsCompleted,
        },
        stats: {
          jobsApplied,
          pending,
          accepted,
          rejected,
        },
      },
    };
  }

  async getEventTeamDashboard(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("Event team not found", 404);
    }

    const jobsPosted = await Job.countDocuments({
      createdBy: user._id,
    });

    const openJobs = await Job.countDocuments({
      createdBy: user._id,
      status: "OPEN",
    });

    const filledJobs = await Job.countDocuments({
      createdBy: user._id,
      status: "FILLED",
    });

    const completedJobs = await Job.countDocuments({
      createdBy: user._id,
      status: "COMPLETED",
    });

    const jobs = await Job.find(
      {
        createdBy: user._id,
      },
      "_id",
    );

    const jobIds = jobs.map((job) => job._id);

    const totalApplicants = await Application.countDocuments({
      job: { $in: jobIds },
    });

    const acceptedWorkers = await Application.countDocuments({
      job: { $in: jobIds },
      status: "ACCEPTED",
    });

    const rejectedWorkers = await Application.countDocuments({
      job: { $in: jobIds },
      status: "REJECTED",
    });

    const pendingApplications = await Application.countDocuments({
      job: { $in: jobIds },
      status: "PENDING",
    });

    return {
      success: true,
      message: "Event team dashboard fetched successfully",
      data: {
        stats: {
          jobsPosted,
          openJobs,
          filledJobs,
          completedJobs,
          totalApplicants,
          acceptedWorkers,
          rejectedWorkers,
          pendingApplications,
        },
      },
    };
  }
}

export default new DashboardService();
