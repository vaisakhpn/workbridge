import mongoose, { Schema, Document } from 'mongoose';

export interface IEventTeamProfile extends Document {
  user: mongoose.Types.ObjectId;
  companyName: string;
  ownerName: string;
  phone: string;
  gst?: string;
  address?: string;
  district?: string;
  description?: string;
  logo?: string;
  createdAt: Date;
}

const EventTeamProfileSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true,
    },
    ownerName: {
      type: String,
      required: [true, 'Owner name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    gst: {
      type: String,
      trim: true,
      default: '',
    },
    address: {
      type: String,
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    logo: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IEventTeamProfile>('EventTeamProfile', EventTeamProfileSchema);
