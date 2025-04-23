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

export const createUserFormSchema = z.object({
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
  role: z.enum(["admin", "user"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
});

export type CreateUserFormSchema = z.infer<typeof createUserFormSchema>;

export const updatePasswordUserFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" })
    .optional(),
  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(2)
    .max(50)
    .optional(),
  password: z
    .string()
    .max(50, { message: "Password cannot exceed 50 characters" })
    .optional()
    .refine((val) => !val || val.length >= 8, {
      message: "Password must be at least 8 characters",
    }),
  role: z.enum(["admin", "user"]),
});

export type UpdatePasswordUserFormSchema = z.infer<
  typeof updatePasswordUserFormSchema
>;

const optionalString = z.string().trim().optional().or(z.literal(""));

export const generalInfoTemplateSchema = z.object({
  title: z.string().min(2).max(50),
  description: optionalString,
});

export type GeneralInfoTemplateSchema = z.infer<
  typeof generalInfoTemplateSchema
>;

export const headerTemplateSchema = z.object({
  logo: z
    .custom<File | undefined>()
    .refine(
      (file) =>
        !file || (file instanceof File && file.type.startsWith("image/")),
      "Must be an image file"
    )
    .refine(
      (file) => !file || file.size < 1024 * 1024 * 4,
      "File must be less then 4MB"
    ),
  header1: optionalString,
  header2: optionalString,
  addressStreet: optionalString,
  addressTelp: optionalString,
  addressCode: optionalString,
});

export type HeaderTemplateSchema = z.infer<typeof headerTemplateSchema>;

export const contentTemplateSchema = z.object({
  content: optionalString,
});

export type ContentTemplateSchema = z.infer<typeof contentTemplateSchema>

export const templateSchema = z.object({
  ...generalInfoTemplateSchema.shape,
});

export type TemplateSchema = z.infer<typeof templateSchema>;
