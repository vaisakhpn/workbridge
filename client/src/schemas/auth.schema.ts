import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .trim(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const workerSignupSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .trim(),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone number must be a valid 10-digit number")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .trim(),
});

export type WorkerSignupFormData = z.infer<typeof workerSignupSchema>;

export const companySignupSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .trim(),
  ownerName: z
    .string()
    .min(2, "Owner/Representative name must be at least 2 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid company email address")
    .trim(),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Contact number must be a valid 10-digit number")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .trim(),
});

export type CompanySignupFormData = z.infer<typeof companySignupSchema>;