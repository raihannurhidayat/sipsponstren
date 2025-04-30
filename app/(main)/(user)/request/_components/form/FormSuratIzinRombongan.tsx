"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useGetUserClient from "@/hooks/useGetUserClient";
import { RequestLetterProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SuratIzinRombonganSchema } from "@/lib/validation/validation-request-letter";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { createLetter } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function FormSuratIzinRombongan(props: RequestLetterProps) {
  const { session } = useGetUserClient();
  const router = useRouter();

  const form = useForm<SuratIzinRombonganSchema>({
    mode: "onChange",
    defaultValues: {
      nama: session?.user.name!,
      kelas: "",
      kepentingan: "",
      anggota: [
        {
          nama: "",
          kelas: "",
          asrama: "",
        },
      ],
    },
  });

  const { fields, remove, append } = useFieldArray<SuratIzinRombonganSchema>({
    name: "anggota",
    control: form.control,
  });

  const mutation = useMutation({
    mutationKey: ["request-letter"],
    mutationFn: async () => {
      const res = await createLetter({
        userId: session?.user.id!,
        data: props.requestLetterData.data,
        template: props.requestLetterData.template,
      });

      if (!res.success) {
        throw new Error(res.error || "Something went wrong");
      }

      return res.data;
    },
    onMutate: () => {
      toast.loading("Proses Sedang Berlangsung", { id: "request-letter" });
    },
    onSuccess: () => {
      form.reset();
      toast.success("Proses Berhasil Dilakukan", { id: "request-letter" });
      router.push("/dashboard");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Proses gagal dilakukan", { id: "request-letter" });
    },
  });

  const onSubmit = async (data: SuratIzinRombonganSchema) => {
    props.setRequestLetterData({
      ...props.requestLetterData,
      data: JSON.stringify(data),
    });

    mutation.mutate();
  };

  return (
    <div className="w-full py-8 px-0 md:px-4 flex justify-center items-center">
      {/* left */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex md:flex-row flex-col gap-4"
        >
          <div className="md:w-1/2">
            <Card className="w-full md:max-w-md mask-x-to-background">
              <CardHeader className="space-y-1">
                <CardTitle>Form Surat Izin Rombongan</CardTitle>
                <CardDescription>
                  Silahkan isi form dibawah ini dengan benar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="kelas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelas</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex. XII RPL 1" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="kepentingan"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kepentingan</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Ex. Lomba" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  disabled={mutation.isPending}
                  type="submit"
                  className="w-full cursor-pointer"
                >
                  {mutation.isPending ? (
                    <Loader2 className="size-4" />
                  ) : (
                    "Kirim"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="md:w-1/2">
            <div className="space-y-4">
              {fields.map((item, index) => (
                <SuratIzinRombonganFormItem
                  key={item.id}
                  id={item.id}
                  form={form}
                  index={index}
                  remove={remove}
                />
              ))}
            </div>

            <div className="flex mt-4 w-full">
              <Button
                disabled={mutation.isPending}
                className="w-full"
                type="button"
                variant={"outline"}
                onClick={() =>
                  append({
                    nama: "",
                    kelas: "",
                    asrama: "",
                  })
                }
              >
                Tambah Anggota
              </Button>
            </div>
          </div>
        </form>
      </Form>
      {/* right */}
    </div>
  );
}

interface SuratIzinRombonganFormItemProps {
  id: string;
  form: UseFormReturn<SuratIzinRombonganSchema>;
  index: number;
  remove: (index: number) => void;
}

function SuratIzinRombonganFormItem(props: SuratIzinRombonganFormItemProps) {
  return (
    <div className={cn("space-y-3 border bg-background rounded-md p-3")}>
      <div className="flex justify-between gap-2">
        <span>Anggota {props.index + 1}</span>
      </div>

      <FormField
        control={props.form.control}
        name={`anggota.${props.index}.nama`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nama</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={props.form.control}
        name={`anggota.${props.index}.kelas`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Kelas</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={props.form.control}
        name={`anggota.${props.index}.asrama`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Asrama</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        variant={"destructive"}
        type="button"
        onClick={() => props.remove(props.index)}
      >
        Remove
      </Button>
    </div>
  );
}
