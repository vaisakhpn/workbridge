import { Schema, model, Document, Types } from "mongoose";

export interface IJob extends Document {
  createdBy: Types.ObjectId;

  title: string;
  description: string;
  category: string;

  date: Date;
  startTime: string;
  endTime: string;

  district: string;
  location: string;

  workersNeeded: number;
  salary: number;

  status: "OPEN" | "FILLED" | "COMPLETED" | "CANCELLED";

  applicationsCount: number;

  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1000,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    date: {
      type: Date,
      required: true,
    },

    startTime: {
      type: String,
      required: true,
    },

    endTime: {
      type: String,
      required: true,
    },

    district: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    workersNeeded: {
      type: Number,
      required: true,
      min: 1,
    },

    salary: {
      type: Number,
      required: true,
      min: 1,
    },

    status: {
      type: String,
      enum: ["OPEN", "FILLED", "COMPLETED", "CANCELLED"],
      default: "OPEN",
    },

    applicationsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

jobSchema.index({ status: 1, createdAt: -1 });
jobSchema.index({ createdBy: 1, createdAt: -1 });
jobSchema.index({ district: 1, category: 1 });

const Job = model<IJob>("Job", jobSchema);

export default Job;