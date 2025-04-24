import { FieldsTemplateSchema } from "./validation/fields-template-validation";

export interface EditorFormProps {
  fieldsTemplate: FieldsTemplateSchema;
  setFieldsTemplate: (fieldsTemplate: FieldsTemplateSchema) => void;
}
