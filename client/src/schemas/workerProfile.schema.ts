import { z } from "zod";

export const personalInfoSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),

  dob: z
    .string()
    .optional(),

  gender: z
    .enum(["male", "female", "other"]),
});

export const addressSchema = z.object({
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

  currentLocation: z
    .string()
    .trim()
    .max(100, "City/Location cannot exceed 100 characters")
    .optional(),

  pincode: z
    .string()
    .refine((val) => val === "" || /^\d{6}$/.test(val), {
      message: "Pincode must be 6 digits",
    })
    .optional(),
});

export const bioSchema = z.object({
  bio: z
    .string()
    .trim()
    .max(500, "Bio cannot exceed 500 characters")
    .optional(),
});

export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type AddressFormData = z.infer<typeof addressSchema>;
export type BioFormData = z.infer<typeof bioSchema>;
