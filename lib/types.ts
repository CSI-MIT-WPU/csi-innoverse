import * as z from "zod";
import DOMPurify from "isomorphic-dompurify";

export const DsaFormSchema = z.object({
  name: z
    .string()
    .min(1)
    .refine((value) => /^[A-Za-z\s]+$/.test(value), {
      message: "Please enter a valid name containing only letters and spaces",
    }),
  email: z
    .string()
    .email()
    .refine((email) => email.endsWith("mitwpu.edu.in"), {
      message: "Please enter a valid email address",
    }),
  // csiId: z.number().refine((value) => value > 0, {
  //   message: "CSI ID must be greater than 0",
  // }),
  questionNumber: z.number().refine((value) => value > 0, {
    message: "Question number must be greater than 0",
  }),
  time: z.number().refine((value) => value > 0, {
    message: "Time must be greater than 0",
  }),
  memory: z.number().refine((value) => value > 0, {
    message: "Memory must be greater than 0",
  }),
  code: z
    .string()
    .min(1)
    .refine(
      (value) => {
        // Use DOMPurify to sanitize the code and check if it's safe
        const sanitizedCode = DOMPurify.sanitize(value);
        return sanitizedCode === value; // If they are equal, it means the code is safe
      },
      {
        message: "Invalid code entered",
      }
    ),
  image: z.any(),
  points: z.number().default(0),
});

export type TDsaFormSchema = z.infer<typeof DsaFormSchema>;
