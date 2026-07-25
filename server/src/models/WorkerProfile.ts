import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkerProfile extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  photo?: string;
  dob?: Date;
  gender?: 'male' | 'female' | 'other';
  address?: string;
  district?: string;
  pincode?: string;
  languages: string[];
  experienceLevel?: 'beginner' | 'intermediate' | 'expert';
  skills: string[];
  availability: boolean;
  bio?: string;
  jobsCompleted: number;
  rating: number;
  attendanceRate: number;
  experienceScore: number;
  badge: 'Beginner' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  createdAt: Date;
}

const WorkerProfileSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    dob: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    address: {
      type: String,
      trim: true,
    },
    district: {
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
    experienceLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      default: 'beginner',
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
      default: '',
    },
    jobsCompleted: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    attendanceRate: {
      type: Number,
      default: 100, // percentage
    },
    experienceScore: {
      type: Number,
      default: 0,
    },
    badge: {
      type: String,
      enum: ['Beginner', 'Bronze', 'Silver', 'Gold', 'Platinum'],
      default: 'Beginner',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IWorkerProfile>('WorkerProfile', WorkerProfileSchema);
