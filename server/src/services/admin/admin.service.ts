import { z } from "zod";

import { AppError } from "../../utils/AppError";

import { adminLoginSchema } from "../../validators/admin.validator";
import adminJwtService from "./admin.jwt.service";
import Job from "../../models/job.model";
import User from "../../models/User";
import WorkerProfile from "../../models/WorkerProfile";
import EventTeamProfile from "../../models/EventTeamProfile";

class AdminService {
  async login(data: z.infer<typeof adminLoginSchema>) {
    if (
      data.email !== process.env.ADMIN_EMAIL ||
      data.password !== process.env.ADMIN_PASSWORD
    ) {
      throw new AppError("Invalid email or password", 401);
    }

    const token = adminJwtService.generateToken();

    return {
      success: true,
      message: "Admin login successful",
      token,
    };
  }
  async getDashboard() {
    const workers = await User.countDocuments({
      role: "worker",
    });

    const eventTeams = await User.countDocuments({
      role: "eventTeam",
    });

    const jobs = await Job.countDocuments();

    const workerDistricts = await WorkerProfile.aggregate([
      {
        $match: {
          district: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$district",
          workers: { $sum: 1 },
        },
      },
    ]);

    const eventDistricts = await EventTeamProfile.aggregate([
      {
        $match: {
          district: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$district",
          eventTeams: { $sum: 1 },
        },
      },
    ]);

    const jobDistricts = await Job.aggregate([
      {
        $match: {
          district: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$district",
          jobs: { $sum: 1 },
        },
      },
    ]);

    const districtMap = new Map<
      string,
      {
        district: string;
        workers: number;
        eventTeams: number;
        jobs: number;
      }
    >();
    const openJobs = await Job.countDocuments({
      status: "OPEN",
    });

    const filledJobs = await Job.countDocuments({
      status: "FILLED",
    });

    const completedJobs = await Job.countDocuments({
      status: "COMPLETED",
    });

    workerDistricts.forEach((item) => {
      districtMap.set(item._id, {
        district: item._id,
        workers: item.workers,
        eventTeams: 0,
        jobs: 0,
      });
    });

    eventDistricts.forEach((item) => {
      if (!districtMap.has(item._id)) {
        districtMap.set(item._id, {
          district: item._id,
          workers: 0,
          eventTeams: 0,
          jobs: 0,
        });
      }

      districtMap.get(item._id)!.eventTeams = item.eventTeams;
    });

    jobDistricts.forEach((item) => {
      if (!districtMap.has(item._id)) {
        districtMap.set(item._id, {
          district: item._id,
          workers: 0,
          eventTeams: 0,
          jobs: 0,
        });
      }

      districtMap.get(item._id)!.jobs = item.jobs;
    });

    return {
      success: true,
      data: {
        workers,
        eventTeams,
        jobs,
        openJobs,
        filledJobs,
        completedJobs,
        districts: Array.from(districtMap.values()).sort((a, b) =>
          (a.district || "").localeCompare(b.district || ""),
        ),
      },
    };
  }
}

export default new AdminService();
