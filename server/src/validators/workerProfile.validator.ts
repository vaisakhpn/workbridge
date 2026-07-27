import { z } from "zod";

export const updateWorkerProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .optional(),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid phone number")
    .optional(),

  dob: z
    .string()
    .datetime()
    .optional(),

  gender: z
    .enum(["male", "female", "other"])
    .optional(),

  address: z
    .string()
    .trim()
    .max(300)
    .optional(),

  district: z
    .string()
    .trim()
    .max(100)
    .optional(),

  currentLocation: z
    .string()
    .trim()
    .max(100)
    .optional(),

  pincode: z
    .string()
    .regex(/^\d{6}$/, "Invalid pincode")
    .optional(),

  languages: z
    .array(z.string().trim())
    .optional(),

  skills: z
    .array(z.string().trim())
    .optional(),

  availability: z
    .boolean()
    .optional(),

  bio: z
    .string()
    .trim()
    .max(500)
    .optional(),
});