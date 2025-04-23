import { z } from "zod";
import { generalInfoTemplateSchema, headerTemplateSchema } from "./validation";

export const fieldsTemplateSchema = z.object({
  ...generalInfoTemplateSchema.shape,
  ...headerTemplateSchema.shape,
});

export type FieldsTemplateSchema = z.infer<typeof fieldsTemplateSchema>;
