import React from "react";
import GeneralInforForm from "./form/general-info-form";
import { EditorFormProps } from "@/lib/types";
import HeadersForm from "./form/headers-form";

export const steps: {
  key: string;
  title: string;
  component: React.ComponentType<EditorFormProps>;
}[] = [
  {
    title: "General Info",
    key: "general-info",
    component: GeneralInforForm,
  },
  {
    title: "Header",
    key: "header",
    component: HeadersForm,
  },
  {
    title: "Content",
    key: "content",
    component: GeneralInforForm,
  },
  {
    title: "Footer",
    key: "footer",
    component: GeneralInforForm,
  },
];
