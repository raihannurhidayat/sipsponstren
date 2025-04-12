import { z } from "zod";

export const signUpFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(2)
    .max(50),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(50, { message: "Password cannot exceed 50 characters" }),
});

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;

export const signInFormSchema = signUpFormSchema.pick({
  email: true,
  password: true,
});

export type SignInFormSchema = z.infer<typeof signInFormSchema>;
