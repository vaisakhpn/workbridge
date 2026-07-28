import User from "../../models/User";
import WorkerProfile from "../../models/WorkerProfile";
import EventTeamProfile from "../../models/EventTeamProfile";
import JWTService from "./jwt.service";
import mongoose, { ClientSession } from "mongoose";
import { UserDocument } from "../../models/User";
import { AppError } from "../../utils/AppError";

interface RegisterWorkerDTO {
  email: string;
  password: string;
  name: string;
  phone: string;
}

interface RegisterEventTeamDTO {
  email: string;
  password: string;
  companyName: string;
  ownerName: string;
  phone: string;
}

interface LoginDTO {
  email: string;
  password: string;
}

class AuthService {
  private async ensureEmailAvailable(
    email: string,
    session: ClientSession,
  ): Promise<void> {
    const existingUser = await User.findOne({ email }).session(session);

    if (existingUser) {
      throw new AppError("User with this email already exists", 409);
    }
  }
  private async getUserByEmail(email: string): Promise<UserDocument> {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    return user;
  }
  public async getCurrentUser(userId: string) {
  const user = await User.findById(userId).select(
    "_id email role isProfileSetup"
  );

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return {
    id: user._id,
    email: user.email,
    role: user.role,
    isProfileSetup: user.isProfileSetup,
  };
}
  private async getUserProfile(user: UserDocument) {
    switch (user.role) {
      case "worker":
        return await WorkerProfile.findOne({ user: user._id });

      case "eventTeam":
        return await EventTeamProfile.findOne({ user: user._id });

      default:
        throw new AppError("Invalid user role", 400);
    }
  }
  private generateTokens(user: UserDocument) {
    return JWTService.generateTokens({
      id: user._id.toString(),
      role: user.role,
    });
  }

  private async saveRefreshToken(
    user: UserDocument,
    refreshToken: string,
    session?: ClientSession,
  ): Promise<void> {
    user.refreshToken = refreshToken;
    await user.save({ session });
  }
  async registerWorker(data: RegisterWorkerDTO) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const { email, password, name, phone } = data;

      // Check email
      await this.ensureEmailAvailable(email, session);
      // Check phone
      const existingPhone = await WorkerProfile.findOne({ phone }).session(
        session,
      );

      if (existingPhone) {
        throw new AppError("Phone number already registered", 409);
      }
      // Create User
      const user = new User({
        email,
        password,
        role: "worker",
      });

      await user.save({ session });

      const profile = new WorkerProfile({
        user: user._id,
        name,
        phone,
      });

      await profile.save({ session });

      // Generate Tokens
      const { accessToken, refreshToken } = this.generateTokens(user);

      // Save Refresh Token
      await this.saveRefreshToken(user, refreshToken, session);

      // Commit transaction
      await session.commitTransaction();

      return {
        message: "Worker registered successfully",

        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          isProfileSetup: user.isProfileSetup,
          name: profile.name,
        },

        accessToken,
        refreshToken,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  async registerEventTeam(data: RegisterEventTeamDTO) {
    const session = await mongoose.startSession();

    try {
      let response;

      await session.withTransaction(async () => {
        const { email, password, companyName, ownerName, phone } = data;

        // Check email
        await this.ensureEmailAvailable(email, session);

        // Check phone
        const existingPhone = await EventTeamProfile.findOne({
          phone,
        }).session(session);

        if (existingPhone) {
          throw new AppError("Phone number already registered", 409);
        }

        // Create User
        const user = new User({
          email,
          password,
          role: "eventTeam",
        });

        await user.save({ session });

        // Create Event Team Profile
        const profile = new EventTeamProfile({
          user: user._id,
          companyName,
          ownerName,
          phone,
        });

        await profile.save({ session });

        // Generate Tokens
        const { accessToken, refreshToken } = this.generateTokens(user);

        // Save Refresh Token
        await this.saveRefreshToken(user, refreshToken, session);

        response = {
          message: "Event Team registered successfully",

          user: {
            id: user._id,
            email: user.email,
            role: user.role,
            isProfileSetup: user.isProfileSetup,
            companyName: profile.companyName,
            ownerName: profile.ownerName,
          },

          accessToken,
          refreshToken,
        };
      });

      return response;
    } finally {
      await session.endSession();
    }
  }

  async login(data: LoginDTO) {
    const { email, password } = data;

    // Find User
    const user = await User.findOne({
      email: data.email,
    }).select("+password");

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }
    // Check Password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    // Check User Status
    if (!user.isActive) {
      throw new AppError("Your account has been disabled", 403);
    }

    // Load Profile
    const profile = await this.getUserProfile(user);

    // Generate Tokens
    const { accessToken, refreshToken } = this.generateTokens(user);

    // Save Refresh Token
    await this.saveRefreshToken(user, refreshToken);

    return {
      message: "Login successful",

      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isProfileSetup: user.isProfileSetup,
        isVerified: user.isVerified,
        profile,
      },

      accessToken,
      refreshToken,
    };
  }
  async refresh(refreshToken: string) {
    // Verify Refresh Token
    const payload = JWTService.verifyRefreshToken(refreshToken);

    // Find User
    const user = await User.findById(payload.id).select("+refreshToken");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Check if refresh token matches
    if (user.refreshToken !== refreshToken) {
      throw new AppError("Invalid refresh token", 401);
    }

    // Check account status
    if (!user.isActive) {
      throw new AppError("Your account has been disabled", 403);
    }

    // Load Profile
    const profile = await this.getUserProfile(user);

    // Generate New Tokens
    const { accessToken, refreshToken: newRefreshToken } =
      this.generateTokens(user);

    // Save New Refresh Token
    await this.saveRefreshToken(user, newRefreshToken);

    return {
      message: "Token refreshed successfully",

      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        isProfileSetup: user.isProfileSetup,
        isVerified: user.isVerified,
        profile,
      },

      accessToken,
      refreshToken: newRefreshToken,
    };
  }
  async logout(userId: string) {
    // Find User
    const user = await User.findById(userId).select("+refreshToken");

    if (!user) {
      throw new AppError("User not found", 404);
    }

    // Remove Refresh Token
    user.refreshToken = "";

    await user.save();

    return {
      success: true,
      message: "Logged out successfully",
    };
  }
}

export default new AuthService();
