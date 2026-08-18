import mongoose, { Schema, Document } from "mongoose";

export interface IWorkerProfile extends Document {
  user: mongoose.Types.ObjectId;

  name: string;
  phone: string;
  photo?: string;

  dob?: Date;
  gender?: "male" | "female" | "other";

  address?: string;
  district?: string;
  currentLocation?: string;
  pincode?: string;

  languages: string[];
  skills: string[];

  availability: boolean;
  bio?: string;

  experienceLevel: "beginner" | "intermediate" | "expert";

  jobsCompleted: number;
  cancelledJobs: number;

  rating: number;
  attendanceRate: number;

  experienceScore: number;

  badge: "Beginner" | "Bronze" | "Silver" | "Gold" | "Platinum";

  isIdentityVerified: boolean;

  lastSeen?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const WorkerProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },

    photo: {
      type: String,
      default: "",
    },

    dob: {
      type: Date,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    address: {
      type: String,
      trim: true,
    },

    district: {
      type: String,
      trim: true,
    },

    currentLocation: {
      type: String,
      trim: true,
    },

    pincode: {
      type: String,
      trim: true,
    },

    languages: {
      type: [String],
      default: [],
    },

    skills: {
      type: [String],
      default: [],
    },

    availability: {
      type: Boolean,
      default: true,
    },

    bio: {
      type: String,
      default: "",
    },

    experienceLevel: {
      type: String,
      enum: ["beginner", "intermediate", "expert"],
      default: "beginner",
    },

    jobsCompleted: {
      type: Number,
      default: 0,
      min: 0,
    },

    cancelledJobs: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    attendanceRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    experienceScore: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    badge: {
      type: String,
      enum: ["Beginner", "Bronze", "Silver", "Gold", "Platinum"],
      default: "Beginner",
    },

    isIdentityVerified: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


WorkerProfileSchema.index({ district: 1, skills: 1 });
WorkerProfileSchema.index({ experienceScore: -1 });
WorkerProfileSchema.index({ availability: 1, district: 1 });

const WorkerProfile =
  mongoose.models.WorkerProfile ||
  mongoose.model<IWorkerProfile>("WorkerProfile", WorkerProfileSchema);

export default WorkerProfile;