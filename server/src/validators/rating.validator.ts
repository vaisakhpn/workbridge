import { z } from "zod";

export const rateWorkersSchema = z.object({
  ratings: z.array(
    z.object({
      applicationId: z.string().min(1),
      rating: z.number().min(1).max(5),
    }),
  ).min(1, "Please provide at least one rating"),
});
