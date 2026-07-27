import { z } from "zod";

export const markAttendanceSchema = z.object({
  attendance: z
    .array(
      z.object({
        applicationId: z.string().min(1, "Application ID is required"),
        present: z.boolean(),
      })
    )
    .min(1, "Attendance list cannot be empty"),
});