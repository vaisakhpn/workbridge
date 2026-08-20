import User from "../../models/User";
import WorkerProfile from "../../models/WorkerProfile";
import Job from "../../models/job.model";
import Application from "../../models/application.model";
import { Notification } from "../../models/notification.model";
import { AppError } from "../../utils/AppError";

function formatTimeAgo(date: Date): string {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

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

    const notifications = await Notification.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentNotifications = notifications.map((n) => ({
      id: n._id.toString(),
      title: n.title,
      time: formatTimeAgo(n.createdAt),
      isUnread: !n.isRead,
    }));

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
        recentNotifications,
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
      "_id"
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

    const recentJobsList = await Job.find({ createdBy: user._id })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentJobs = recentJobsList.map((job) => ({
      id: job._id.toString(),
      title: job.title,
      location: job.location,
      district: job.district,
      workersNeeded: job.workersNeeded,
      applicantsCount: job.applicationsCount || 0,
      status: job.status,
    }));

    const recentAppsList = await Application.find({ job: { $in: jobIds } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("job", "title")
      .populate("worker", "name email");

    const workerUserIds = recentAppsList.map(
      (app) => (app.worker as any)?._id || app.worker
    );
    const workerProfiles = await WorkerProfile.find({
      user: { $in: workerUserIds },
    });
    const profileMap = new Map(
      workerProfiles.map((p) => [p.user.toString(), p.name])
    );

    const recentApplications = recentAppsList.map((app) => {
      const workerObj = app.worker as any;
      const jobObj = app.job as any;
      const workerUserId = workerObj?._id
        ? workerObj._id.toString()
        : workerObj?.toString();
      const workerName =
        profileMap.get(workerUserId) ||
        workerObj?.name ||
        workerObj?.email ||
        "Applicant";
      const jobTitle = jobObj?.title || "Job Application";

      return {
        id: app._id.toString(),
        workerName,
        jobTitle,
        appliedTime: formatTimeAgo(app.createdAt),
      };
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
        recentJobs,
        recentApplications,
      },
    };
  }
}

export default new DashboardService();

