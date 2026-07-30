import { z } from "zod";

export const createJobSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  description: z
    .string()
    .trim()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional()
    .default(""),

  category: z
    .string()
    .trim()
    .min(2, "Category is required")
    .max(50, "Category cannot exceed 50 characters"),

  date: z.coerce.date({
    invalid_type_error: "Please provide a valid date",
    required_error: "Date is required",
  }),

  startTime: z.string().trim().min(1, "Start time is required"),

  endTime: z.string().trim().min(1, "End time is required"),

  district: z
    .string()
    .trim()
    .min(2, "District is required")
    .max(100, "District cannot exceed 100 characters"),

  location: z
    .string()
    .trim()
    .min(2, "Location is required")
    .max(300, "Location cannot exceed 300 characters"),

  workersNeeded: z.number().int().min(1, "At least one worker is required"),

  salary: z.number().positive("Salary must be greater than zero"),
});

export const updateJobSchema = createJobSchema.partial();
