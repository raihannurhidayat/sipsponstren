import { EditorFormProps } from "@/lib/types";
import React from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useForm } from "react-hook-form";
import {
  contentTemplateSchema,
  ContentTemplateSchema,
} from "@/lib/validation/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function ContentForm(props: EditorFormProps) {
  const form = useForm<ContentTemplateSchema>({
    resolver: zodResolver(contentTemplateSchema),
    defaultValues: {
      content: "",
    },
  });

  const editor = useEditor({
    editorProps: {
      attributes: {
        // style:
        class:
          "focus:outline-none print:border-0 bg-white border border-[#c7c7c7] flex flex-col min-h-[1054px]  p-4 pb-10 cursor-text",
      },
    },
    extensions: [StarterKit],
    content: props.fieldsTemplate.content,
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      form.setValue("content", html);
      console.log(html)
      props.setFieldsTemplate({ ...props.fieldsTemplate, content: html });
    },
  });

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Content</h2>
      </div>

      <div className="bg-[#f9fbfd] size-full overflow-x-auto print:p-0 print:bg-white print:overflow-visible">
        <div>
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
