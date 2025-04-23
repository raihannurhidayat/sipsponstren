import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import {
  generalInfoTemplateSchema,
  GeneralInfoTemplateSchema,
} from "@/lib/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function GeneralInforForm(props: EditorFormProps) {
  const form = useForm<GeneralInfoTemplateSchema>({
    resolver: zodResolver(generalInfoTemplateSchema),
    mode: "onChange",
    defaultValues: {
      title: props.fieldsTemplate.title || "",
      description: props.fieldsTemplate.description || "",
    },
  });

  React.useEffect(() => {
    const subscription = form.watch((values) => {
      const isValid = form.formState.isValid;
      if (isValid) {
        props.setFieldsTemplate({ ...props.fieldsTemplate, ...values }); // update state dengan nilai form yang valid
      }
    });

    return () => subscription.unsubscribe();
  }, [form, props.fieldsTemplate, props.setFieldsTemplate]);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">General Info</h2>
        {/* <p className="text-sm text-muted-foreground">
          This will not appear on your resume
        </p> */}
      </div>

      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Template name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex. template letter for education"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Template surat untuk izin tidak masuk"
                  />
                </FormControl>
                <FormDescription>
                  Describe what this template is for.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
