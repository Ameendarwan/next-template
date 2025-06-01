import * as yup from "yup";

export interface Step {
  id: number;
  title: string;
  Component: React.FC<any>;
  schema: yup.ObjectSchema<any>;
  defaultValues?: any;
}

export interface MultiStepFormProps {
  stepComponents: Step[];
}
