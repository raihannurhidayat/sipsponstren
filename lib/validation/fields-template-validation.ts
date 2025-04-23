import { z } from "zod";
import {
  contentTemplateSchema,
  generalInfoTemplateSchema,
  headerTemplateSchema,
} from "./validation";

export const fieldsTemplateSchema = z.object({
  ...generalInfoTemplateSchema.shape,
  ...headerTemplateSchema.shape,
  ...contentTemplateSchema.shape,
});

export type FieldsTemplateSchema = z.infer<typeof fieldsTemplateSchema>;
