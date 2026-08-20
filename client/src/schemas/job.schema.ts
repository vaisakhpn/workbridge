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
  "Hotel & Bakery Helper",
  "Shop & Retail",
  "Delivery & Logistics",
  "Construction & Labour",
  "Electrical & Plumbing",
  "Driving & Transport",
  "Cleaning & Housekeeping",
  "Events & Decoration",
  "Factory & Warehouse",
  "Office & Customer Service",
  "Others",
];

export function isScheduleRequiredCategory(
  category?: string,
  customCategory?: string
): boolean {
  const catToTest = category === "Others" && customCategory ? customCategory : category;
  if (!catToTest) return false;
  const cat = catToTest.toLowerCase();
  return (
    cat.includes("catering") ||
    cat.includes("event") ||
    cat.includes("decoration") ||
    cat.includes("promotion")
  );
}

export const createJobSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

    category: z
      .string()
      .trim()
      .min(2, "Please select a category"),

    customCategory: z
      .string()
      .trim()
      .max(50, "Custom category cannot exceed 50 characters")
      .optional()
      .or(z.literal("")),

    description: z
      .string()
      .trim()
      .max(1000, "Description cannot exceed 1000 characters")
      .optional()
      .or(z.literal("")),

    date: z
      .string()
      .optional()
      .or(z.literal("")),

    startTime: z
      .string()
      .optional()
      .or(z.literal("")),

    endTime: z
      .string()
      .optional()
      .or(z.literal("")),

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
  })
  .superRefine((data, ctx) => {
    if (data.category === "Others") {
      if (!data.customCategory || data.customCategory.trim().length < 2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please specify your custom job category",
          path: ["customCategory"],
        });
      }
    }
    if (isScheduleRequiredCategory(data.category, data.customCategory)) {
      if (!data.date || data.date.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Date is required for catering or event jobs",
          path: ["date"],
        });
      }
      if (!data.startTime || data.startTime.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start time is required for catering or event jobs",
          path: ["startTime"],
        });
      }
      if (!data.endTime || data.endTime.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End time is required for catering or event jobs",
          path: ["endTime"],
        });
      }
    }
  });

export type CreateJobFormData = z.infer<typeof createJobSchema>;

