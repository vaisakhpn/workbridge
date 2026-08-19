import { z } from "zod";
import Job from "../../models/job.model";
import User from "../../models/User";
import { AppError } from "../../utils/AppError";
import {
  createJobSchema,
  updateJobSchema,
} from "../../validators/job.validator";
import mongoose from "mongoose";
import Application from "../../models/application.model";
import WorkerProfile from "../../models/WorkerProfile";
import EventTeamProfile from "../../models/EventTeamProfile";
import notificationService from "../notification/notification.service";

interface GetAllJobsQuery {
  page?: string;
  limit?: string;
  search?: string;
  district?: string;
  category?: string;
  salaryMin?: string;
  salaryMax?: string;
  date?: string;
  sort?: "latest" | "salary_asc" | "salary_desc";
}

class JobService {
  private getBadge(experienceScore: number) {
    if (experienceScore >= 1000) return "Platinum";

    if (experienceScore >= 600) return "Gold";

    if (experienceScore >= 300) return "Silver";

    if (experienceScore >= 100) return "Bronze";

    return "Beginner";
  }

  private async enrichJobsWithActiveCounts(jobs: any[]) {
    if (!jobs || jobs.length === 0) return jobs;

    const jobIds = jobs.map((j) => j._id || j.id).filter(Boolean);

    const activeCounts = await Application.aggregate([
      {
        $match: {
          job: { $in: jobIds },
          status: { $in: ["PENDING", "ACCEPTED"] },
        },
      },
      {
        $group: {
          _id: "$job",
          count: { $sum: 1 },
        },
      },
    ]);

    const countMap = new Map<string, number>();
    activeCounts.forEach((item: any) => {
      countMap.set(item._id.toString(), item.count);
    });

    return jobs.map((job) => {
      const jobObj = job.toObject ? job.toObject() : { ...job };
      const activeCount = countMap.get(jobObj._id.toString()) || 0;
      return {
        ...jobObj,
        applicationsCount: activeCount,
        activeApplicationsCount: activeCount,
      };
    });
  }

  async createJob(userId: string, data: z.infer<typeof createJobSchema>) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const job = await Job.create({
      ...data,
      createdBy: user._id,
    });

    return {
      success: true,
      message: "Job created successfully",
      data: job,
    };
  }

  async getMyJobs(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const jobs = await Job.find({
      createdBy: user._id,
    }).sort({
      createdAt: -1,
    });

    const enrichedJobs = await this.enrichJobsWithActiveCounts(jobs);

    return {
      success: true,
      message: "Jobs fetched successfully",
      results: enrichedJobs.length,
      data: enrichedJobs,
    };
  }

  async getJobById(jobId: string) {
    const job = await Job.findById(jobId).populate("createdBy", "email role");

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    const [enrichedJob] = await this.enrichJobsWithActiveCounts([job]);

    return {
      success: true,
      message: "Job fetched successfully",
      data: enrichedJob,
    };
  }

  async updateJob(
    userId: string,
    jobId: string,
    data: z.infer<typeof updateJobSchema>,
  ) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.createdBy.toString() !== user._id.toString()) {
      throw new AppError("You are not authorized to update this job", 403);
    }

    Object.assign(job, data);

    await job.save();

    return {
      success: true,
      message: "Job updated successfully",
      data: job,
    };
  }

  async deleteJob(userId: string, jobId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.createdBy.toString() !== user._id.toString()) {
      throw new AppError("You are not authorized to delete this job", 403);
    }

    await job.deleteOne();

    return {
      success: true,
      message: "Job deleted successfully",
    };
  }

  async getAllJobs(query: GetAllJobsQuery) {
    const {
      page = 1,
      limit = 10,
      search,
      district,
      category,
      salaryMin,
      salaryMax,
      date,
      sort = "latest",
    } = query;
    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 10, 1);

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const skip = (pageNumber - 1) * limitNumber;
    const filter: any = {
      status: "OPEN",
      $or: [
        { date: { $exists: false } },
        { date: null },
        { date: { $gte: startOfToday } },
      ],
    };
    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }
    if (district) {
      filter.district = district;
    }
    if (category) {
      filter.category = category;
    }
    if (salaryMin || salaryMax) {
      filter.salary = {};
      if (salaryMin) filter.salary.$gte = Number(salaryMin);
      if (salaryMax) filter.salary.$lte = Number(salaryMax);
    }
    if (date) {
      filter.date = new Date(date);
    }

    let sortOption = {};

    switch (sort) {
      case "salary_asc":
        sortOption = {
          salary: 1,
        };
        break;

      case "salary_desc":
        sortOption = {
          salary: -1,
        };
        break;

      default:
        sortOption = {
          createdAt: -1,
        };
    }

    const totalJobs = await Job.countDocuments(filter);

    const jobs = await Job.find(filter)
      .populate("createdBy", "email")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber)
      .lean();

    const enrichedJobs = await this.enrichJobsWithActiveCounts(jobs);

    return {
      success: true,
      message: "Jobs fetched successfully",

      page: pageNumber,

      limit: limitNumber,

      totalJobs,

      totalPages: Math.ceil(totalJobs / limitNumber),

      results: enrichedJobs.length,

      data: enrichedJobs,
    };
  }
  async getAttendanceList(jobId: string, userId: string) {
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      throw new AppError("Invalid job ID", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("Event team not found", 404);
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.createdBy.toString() !== user._id.toString()) {
      throw new AppError("You are not authorized to access this job", 403);
    }

    const applications = await Application.find({
      job: job._id,
      status: "ACCEPTED",
    }).populate("worker", "email");

    return {
      success: true,
      message: "Attendance list fetched successfully",
      data: applications,
    };
  }
  async markAttendance(
    jobId: string,
    userId: string,
    attendance: {
      applicationId: string;
      present: boolean;
    }[],
  ) {
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      throw new AppError("Invalid job ID", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("Event team not found", 404);
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.createdBy.toString() !== user._id.toString()) {
      throw new AppError("You are not authorized to update this job", 403);
    }

    for (const item of attendance) {
      const application = await Application.findOne({
        _id: item.applicationId,
        job: job._id,
        status: "ACCEPTED",
      });

      if (!application) {
        throw new AppError(`Application ${item.applicationId} not found`, 404);
      }

      application.attendance = item.present;
      application.attendanceMarkedAt = new Date();

      await application.save();
    }

    return {
      success: true,
      message: "Attendance updated successfully",
    };
  }
  async completeJob(jobId: string, userId: string) {
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      throw new AppError("Invalid job ID", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("Event team not found", 404);
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.createdBy.toString() !== user._id.toString()) {
      throw new AppError("You are not authorized to complete this job", 403);
    }

    if (job.status !== "FILLED") {
      throw new AppError("Only filled jobs can be completed", 400);
    }

    const acceptedApplications = await Application.find({
      job: job._id,
      status: "ACCEPTED",
    });

    if (acceptedApplications.length === 0) {
      throw new AppError("No accepted workers found for this job", 400);
    }

    const attendanceMarked = acceptedApplications.every(
      (application) => application.attendanceMarkedAt,
    );

    if (!attendanceMarked) {
      throw new AppError(
        "Please mark attendance for all accepted workers before completing the job",
        400,
      );
    }

    job.status = "COMPLETED";

    await job.save();
    const attendedApplications = await Application.find({
      job: job._id,
      status: "ACCEPTED",
      attendance: true,
    });

    for (const application of attendedApplications) {
      await this.updateWorkerProfile(application.worker.toString());
      await notificationService.createNotification(
        application.worker.toString(),
        "Job Completed",
        `The job "${job.title}" has been marked as completed.`,
        "JOB",
      );
    }

    return {
      success: true,
      message: "Job completed successfully",
      data: job,
    };
  }
  async rateWorkers(
    jobId: string,
    userId: string,
    ratings: {
      applicationId: string;
      rating: number;
    }[],
  ) {
    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      throw new AppError("Invalid job ID", 400);
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("Event team not found", 404);
    }

    const job = await Job.findById(jobId);

    if (!job) {
      throw new AppError("Job not found", 404);
    }

    if (job.createdBy.toString() !== user._id.toString()) {
      throw new AppError(
        "You are not authorized to rate workers for this job",
        403,
      );
    }

    if (job.status !== "COMPLETED") {
      throw new AppError(
        "Workers can only be rated after the job is completed",
        400,
      );
    }

    for (const item of ratings) {
      const application = await Application.findOne({
        _id: item.applicationId,
        job: job._id,
        status: "ACCEPTED",
      });

      if (!application) {
        throw new AppError(`Application ${item.applicationId} not found`, 404);
      }

      if (!application.attendance) {
        throw new AppError(
          "Only workers who attended the job can be rated",
          400,
        );
      }

      if (application.ratedAt) {
        throw new AppError(
          "This worker has already been rated for this job",
          400,
        );
      }

      application.rating = item.rating;
      application.ratedAt = new Date();

      await application.save();
      await this.updateWorkerProfile(application.worker.toString());
    }

    return {
      success: true,
      message: "Workers rated successfully",
    };
  }
  private async updateWorkerProfile(workerId: string) {
    const profile = await WorkerProfile.findOne({
      user: workerId,
    });

    if (!profile) {
      throw new AppError("Worker profile not found", 404);
    }

    // All accepted applications
    const acceptedApplications = await Application.find({
      worker: workerId,
      status: "ACCEPTED",
    }).populate("job");

    // Present in completed jobs
    const completedApplications = acceptedApplications.filter((app: any) => {
      return app.attendance && app.job?.status === "COMPLETED";
    });

    // Rated applications
    const ratedApplications = completedApplications.filter(
      (app) => app.ratedAt,
    );

    const jobsCompleted = completedApplications.length;

    const experienceScore = jobsCompleted * 5;

    const attendanceRate =
      acceptedApplications.length === 0
        ? 0
        : (completedApplications.length / acceptedApplications.length) * 100;

    const averageRating =
      ratedApplications.length === 0
        ? 0
        : ratedApplications.reduce((sum, app) => sum + (app.rating || 0), 0) /
          ratedApplications.length;

    profile.jobsCompleted = jobsCompleted;
    profile.experienceScore = experienceScore;
    profile.rating = Number(averageRating.toFixed(2));
    profile.attendanceRate = Number(attendanceRate.toFixed(2));
    profile.badge = this.getBadge(experienceScore);

    await profile.save();
  }

  async getPublicLatestJobs(limit: number = 6) {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const jobs = await Job.find({
      status: "OPEN",
      $or: [
        { date: { $exists: false } },
        { date: null },
        { date: { $gte: startOfToday } },
      ],
    })
      .populate("createdBy", "companyName logo district currentLocation ownerName")
      .sort({ createdAt: -1 })
      .limit(limit);

    const enrichedJobs = await this.enrichJobsWithActiveCounts(jobs);

    return {
      success: true,
      message: "Latest public jobs fetched successfully",
      results: enrichedJobs.length,
      data: enrichedJobs,
    };
  }

  async searchJobs(query: GetAllJobsQuery) {
    const {
      page = "1",
      limit = "12",
      search,
      district,
      category,
      salaryMin,
      salaryMax,
      sort = "latest",
    } = query;

    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 12, 1);
    const skip = (pageNumber - 1) * limitNumber;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const filter: any = {
      status: "OPEN",
      $or: [
        { date: { $exists: false } },
        { date: null },
        { date: { $gte: startOfToday } },
      ],
    };

    if (district && district.trim()) {
      filter.district = { $regex: new RegExp(district.trim(), "i") };
    }

    if (category && category.trim()) {
      filter.category = { $regex: new RegExp(category.trim(), "i") };
    }

    if (salaryMin || salaryMax) {
      filter.salary = {};
      if (salaryMin) filter.salary.$gte = Number(salaryMin);
      if (salaryMax) filter.salary.$lte = Number(salaryMax);
    }

    if (search && search.trim()) {
      const terms = search
        .trim()
        .split(/\s+/)
        .filter((t) => t.length > 0);

      const matchingProfiles = await EventTeamProfile.find({
        $or: terms.flatMap((term) => [
          { companyName: { $regex: term, $options: "i" } },
          { ownerName: { $regex: term, $options: "i" } },
        ]),
      }).select("user");

      const matchingUserIds = matchingProfiles.map((p) => p.user);

      const termConditions = terms.map((term) => ({
        $or: [
          { title: { $regex: term, $options: "i" } },
          { category: { $regex: term, $options: "i" } },
          { district: { $regex: term, $options: "i" } },
          { location: { $regex: term, $options: "i" } },
          { description: { $regex: term, $options: "i" } },
          { createdBy: { $in: matchingUserIds } },
        ],
      }));

      filter.$and = termConditions;
    }

    let sortOption = {};
    switch (sort) {
      case "salary_asc":
        sortOption = { salary: 1 };
        break;
      case "salary_desc":
        sortOption = { salary: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const totalJobs = await Job.countDocuments(filter);

    const jobs = await Job.find(filter)
      .populate("createdBy", "email")
      .sort(sortOption)
      .skip(skip)
      .limit(limitNumber)
      .lean();

    const userIds = jobs
      .map((j: any) => j.createdBy?._id || j.createdBy)
      .filter(Boolean);

    const profiles = await EventTeamProfile.find({
      user: { $in: userIds },
    }).lean();

    const profileMap = new Map(
      profiles.map((p: any) => [p.user.toString(), p])
    );

    const enrichedJobs = jobs.map((job: any) => {
      const uid = (job.createdBy?._id || job.createdBy)?.toString();
      const profile: any = profileMap.get(uid);
      return {
        ...job,
        eventTeam: profile
          ? {
              companyName: profile.companyName,
              ownerName: profile.ownerName,
              logo: profile.logo,
              district: profile.district,
              rating: profile.rating,
            }
          : null,
      };
    });

    const finalEnrichedJobs = await this.enrichJobsWithActiveCounts(enrichedJobs);

    return {
      success: true,
      message: "Search completed successfully",
      page: pageNumber,
      limit: limitNumber,
      totalJobs,
      totalPages: Math.ceil(totalJobs / limitNumber),
      results: finalEnrichedJobs.length,
      data: finalEnrichedJobs,
    };
  }
}

export default new JobService();
