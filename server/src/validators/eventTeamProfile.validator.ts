import { z } from "zod";

export const updateEventTeamProfileSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters")
    .optional(),

  ownerName: z
    .string()
    .trim()
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name cannot exceed 100 characters")
    .optional(),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid phone number")
    .optional(),

  gst: z
    .string()
    .trim()
    .max(20, "GST number cannot exceed 20 characters")
    .optional(),

  address: z
    .string()
    .trim()
    .max(300, "Address cannot exceed 300 characters")
    .optional(),

  district: z
    .string()
    .trim()
    .max(100, "District cannot exceed 100 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),

  logo: z
    .string()
    .trim()
    .url("Please provide a valid logo URL")
    .optional(),
});