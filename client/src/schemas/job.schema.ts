import { z } from "zod";

export const KERALA_DISTRICTS = [
  "Thiruvananthapuram",
  "Kollam",
  "Pathanamthitta",
  "Alappuzha",
  "Kottayam",
  "Idukki",
  "Ernakulam",
  "Thrissur",
  "Palakkad",
  "Malappuram",
  "Kozhikode",
  "Wayanad",
  "Kannur",
  "Kasaragod",
];

export const JOB_CATEGORIES = [
  "Catering",
  "Event Management",
  "Decoration & Setup",
  "Stage & Lighting",
  "Sound & Audio",
  "Security & Ushering",
  "Photography & Video Assistant",
  "Logistics & Transport",
  "Cleaning & Housekeeping",
  "General Assistance",
];

export const createJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  category: z
    .string()
    .trim()
    .min(2, "Please select a category"),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),

  date: z
    .string()
    .min(1, "Date is required"),

  startTime: z
    .string()
    .trim()
    .min(1, "Start time is required"),

  endTime: z
    .string()
    .trim()
    .min(1, "End time is required"),

  district: z
    .string()
    .trim()
    .min(2, "Please select a district"),

  location: z
    .string()
    .trim()
    .min(2, "Location is required")
    .max(300, "Location cannot exceed 300 characters"),

  workersNeeded: z
    .number()
    .int("Must be a whole number")
    .min(1, "At least 1 worker is required"),

  salary: z
    .number()
    .positive("Salary must be greater than zero"),
});

export type CreateJobFormData = z.infer<typeof createJobSchema>;
