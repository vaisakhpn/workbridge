import mongoose, { Schema, HydratedDocument, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  role: "worker" | "eventTeam" | "admin";
  isProfileSetup: boolean;
  isVerified: boolean;
  isActive: boolean;
  refreshToken: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

export type UserDocument = HydratedDocument<IUser, IUserMethods>;

const UserSchema = new Schema<
  IUser,
  Model<IUser, {}, IUserMethods>,
  IUserMethods
>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["worker", "eventTeam", "admin"],
      required: [true, "Role is required"],
    },

    isProfileSetup: {
      type: Boolean,
      default: false,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password
UserSchema.methods.comparePassword = async function (
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

const User =
  mongoose.models.User ||
  mongoose.model<IUser, Model<IUser, {}, IUserMethods>>("User", UserSchema);

export default User;
