import * as z from "zod";

export const DsaFormSchema = z.object({
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("mitwpu.edu.in"), {
      message: "Please enter a valid email address",
    }),
  csiId: z.number().refine((value) => value > 0, {
    message: "CSI ID must be greater than 0",
  }),
  questionNumber: z.number().refine((value) => value > 0, {
    message: "Question number must be greater than 0",
  }),
  time: z.number().refine((value) => value > 0, {
    message: "Time must be greater than 0",
  }),
  memory: z.number().refine((value) => value > 0, {
    message: "Memory must be greater than 0",
  }),
  code: z.string(),
  image: z.any(),
});

export type TDsaFormSchema = z.infer<typeof DsaFormSchema>;
