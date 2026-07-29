import { z } from "zod";

export const companyInfoSchema = z.object({
  companyName: z
    .string()
    .trim()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name cannot exceed 100 characters"),

  ownerName: z
    .string()
    .trim()
    .min(2, "Owner name must be at least 2 characters")
    .max(100, "Owner name cannot exceed 100 characters"),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),

  gst: z
    .string()
    .trim()
    .max(20, "GST number cannot exceed 20 characters")
    .optional(),
});

export const companyAddressSchema = z.object({
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
});

export const companyDescriptionSchema = z.object({
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
});

export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;
export type CompanyAddressFormData = z.infer<typeof companyAddressSchema>;
export type CompanyDescriptionFormData = z.infer<typeof companyDescriptionSchema>;
