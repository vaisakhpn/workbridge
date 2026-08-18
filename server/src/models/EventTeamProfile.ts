import mongoose, { Schema, Document } from "mongoose";

export interface IEventTeamProfile extends Document {
  user: mongoose.Types.ObjectId;

  companyName: string;
  ownerName: string;
  phone: string;

  gst?: string;

  address?: string;
  district?: string;
  currentLocation?: string;

  description?: string;
  logo?: string;

  jobsPosted: number;

  rating: number;
  totalReviews: number;

  isVerified: boolean;
  isActive: boolean;

  lastSeen: Date;

  createdAt: Date;
  updatedAt: Date;
}

const EventTeamProfileSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },

    ownerName: {
      type: String,
      required: [true, "Owner name is required"],
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
    },

    gst: {
      type: String,
      trim: true,
      default: "",
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

    description: {
      type: String,
      default: "",
    },

    logo: {
      type: String,
      default: "",
    },

    jobsPosted: {
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

    totalReviews: {
      type: Number,
      default: 0,
      min: 0,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
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

EventTeamProfileSchema.index({ district: 1, isVerified: 1 });

const EventTeamProfile =
  mongoose.models.EventTeamProfile ||
  mongoose.model<IEventTeamProfile>(
    "EventTeamProfile",
    EventTeamProfileSchema
  );

export default EventTeamProfile;