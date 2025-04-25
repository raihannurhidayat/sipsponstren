import { FieldsTemplateSchema } from "./validation/fields-template-validation";
import { RequestLetterSchema } from "./validation/validation-request-letter";

export interface EditorFormProps {
  fieldsTemplate: FieldsTemplateSchema;
  setFieldsTemplate: (fieldsTemplate: FieldsTemplateSchema) => void;
}

export interface RequestLetterProps {
  requestLetterData: RequestLetterSchema;
  setRequestLetterData: (values: RequestLetterSchema) => void;
  currentStep: string;
  setCurrentStep: (value: string) => void;
}
