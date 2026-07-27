import { z } from "zod";

export const updateApplicationStatusSchema = z.object({
  status: z.enum(["ACCEPTED", "REJECTED"], {
    invalid_type_error: "Please provide a valid status",
    required_error: "Status is required",
  }),
});