export interface EventTeamProfile {
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
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateEventTeamProfileInput {
  companyName?: string;
  ownerName?: string;
  phone?: string;
  gst?: string;
  address?: string;
  district?: string;
  currentLocation?: string;
  description?: string;
  logo?: string;
}

export interface GetEventTeamProfileApiResponse {
  success: boolean;
  message: string;
  data: {
    email: string;
    profile: EventTeamProfile;
  };
}

export interface UpdateEventTeamProfileApiResponse {
  success: boolean;
  message: string;
  data: EventTeamProfile;
}
