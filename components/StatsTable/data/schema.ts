import { z } from "zod";

export const taskSchema = z.object({
  name: z.string(),
  email: z.string(),
  points: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
