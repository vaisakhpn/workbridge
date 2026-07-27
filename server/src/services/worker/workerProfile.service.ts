import User from "../../models/User";
import WorkerProfile from "../../models/WorkerProfile";
import { AppError } from "../../utils/AppError";
import { z } from "zod";
import { updateWorkerProfileSchema } from "../../validators/workerProfile.validator";

class WorkerProfileService {
  async getProfile(userId: string) {
    // Find user
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Find worker profile
    const profile = await WorkerProfile.findOne({
      user: user._id,
    });

    if (!profile) {
      throw new AppError("Worker profile not found", 404);
    }

    return {
      success: true,
      message: "Profile fetched successfully",

      data: {
        id: user._id,
        email: user.email,
        role: user.role,
        isProfileSetup: user.isProfileSetup,
        isVerified: user.isVerified,

        profile,
      },
    };
  }
  async updateProfile(
  userId: string,
  data: z.infer<typeof updateWorkerProfileSchema>
) {
  const user = await User.findById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const profile = await WorkerProfile.findOne({
    user: user._id,
  });

  if (!profile) {
    throw new AppError("Worker profile not found", 404);
  }

  // Check if phone number is already used by another worker
  if (data.phone && data.phone !== profile.phone) {
    const existingPhone = await WorkerProfile.findOne({
      phone: data.phone,
      _id: { $ne: profile._id },
    });

    if (existingPhone) {
      throw new AppError("Phone number already registered", 409);
    }
  }

  Object.assign(profile, data);

  await profile.save();

  return {
    success: true,
    message: "Profile updated successfully",
    data: profile,
  };
}
}

export default new WorkerProfileService();