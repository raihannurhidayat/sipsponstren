import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EditorFormProps } from "@/lib/types";
import {
  headerTemplateSchema,
  HeaderTemplateSchema,
} from "@/lib/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

export default function HeadersForm(props: EditorFormProps) {
  const { fieldsTemplate, setFieldsTemplate } = props;
  const form = useForm<HeaderTemplateSchema>({
    resolver: zodResolver(headerTemplateSchema),
    mode: "onChange",
    defaultValues: {
      header1: props.fieldsTemplate.header1 || "",
      header2: props.fieldsTemplate.header2 || "",
      addressStreet: props.fieldsTemplate.addressStreet || "",
      addressTelp: props.fieldsTemplate.addressTelp || "",
      addressCode: props.fieldsTemplate.addressCode || "",
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
  }, [form, fieldsTemplate, setFieldsTemplate]);

  const logoInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Headers Info</h2>
      </div>

      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="logo"
            render={({ field: { value, ...fieldValues } }) => (
              <FormItem>
                <FormLabel>Template name</FormLabel>
                <FormControl>
                  <Input
                    {...fieldValues}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      fieldValues.onChange(file);
                    }}
                    ref={logoInputRef}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="header1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Instansi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>
                  Describe what this template is for.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="header2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Pesantren</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>
                  Describe what this template is for.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressStreet"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Jalan Instansi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>
                  Describe what this template is for.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressTelp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Telephone Instansi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>
                  Describe what this template is for.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="addressCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Code Instansi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                {/* <FormDescription>
                  Describe what this template is for.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
