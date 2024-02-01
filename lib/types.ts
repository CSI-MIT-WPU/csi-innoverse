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
    .refine(
      (email) => {
        const allowedDomains = [
          "mitwpu.edu.in",
          "coep.ac.in",
          "pict.edu",
          "dypiemr.ac.in",
          "viit.ac.in",
          "cumminscollege.in",
          "mmcoe.edu.in",
        ];
        const domain = email.split("@")[1];
        return allowedDomains.includes(domain);
      },
      {
        message: "Please enter a valid email address",
      }
    ),
  phoneNumber: z.string().refine((value) => /^\d{10}$/.test(value), {
    message: "Please enter a valid 10-digit phone number",
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
  language: z
    .string()
    .min(1, { message: "Please Enter a valid programming language" }),
  code: z.string().min(1),
  image: z.any(),
  points: z.number().default(0),
});

export type TDsaFormSchema = z.infer<typeof DsaFormSchema>;
