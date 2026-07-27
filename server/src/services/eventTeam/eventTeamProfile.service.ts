import { z } from "zod";
import EventTeamProfile from "../../models/EventTeamProfile";
import User from "../../models/User";
import { AppError } from "../../utils/AppError";
import { updateEventTeamProfileSchema } from "../../validators/eventTeamProfile.validator";

class EventTeamProfileService {
  async getProfile(userId: string) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const profile = await EventTeamProfile.findOne({
      user: user._id,
    });

    if (!profile) {
      throw new AppError("Event team profile not found", 404);
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
    data: z.infer<typeof updateEventTeamProfileSchema>,
  ) {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const profile = await EventTeamProfile.findOne({
      user: user._id,
    });

    if (!profile) {
      throw new AppError("Event team profile not found", 404);
    }

    // Check if the phone number is already used by another event team
    if (data.phone && data.phone !== profile.phone) {
      const existingPhone = await EventTeamProfile.findOne({
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

export default new EventTeamProfileService();
