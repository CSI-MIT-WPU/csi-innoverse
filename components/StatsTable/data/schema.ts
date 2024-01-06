import { z } from "zod";

export const taskSchema = z.object({
  csiId: z.number(),
  email: z.string(),
  points: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
