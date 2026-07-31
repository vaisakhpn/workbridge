import mongoose, { Schema, HydratedDocument, Model } from "mongoose";

export interface IApplication {
  job: mongoose.Types.ObjectId;
  worker: mongoose.Types.ObjectId;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  attendance: boolean;
  attendanceMarkedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  rating: number;
  ratedAt: Date;
}

export type ApplicationDocument = HydratedDocument<IApplication>;

type ApplicationModel = Model<IApplication>;

const applicationSchema = new Schema<IApplication>(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    worker: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING",
    },
    attendance: {
      type: Boolean,
      default: false,
    },

    attendanceMarkedAt: {
      type: Date,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    ratedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

applicationSchema.index({ job: 1, worker: 1 }, { unique: true });
applicationSchema.index({ worker: 1, createdAt: -1 });
applicationSchema.index({ job: 1, status: 1 });

const Application = mongoose.model<IApplication, ApplicationModel>(
  "Application",
  applicationSchema,
);

export default Application;
