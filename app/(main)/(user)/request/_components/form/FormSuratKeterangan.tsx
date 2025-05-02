"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { prisma } from "@/lib/prisma";
import { RequestLetterProps } from "@/lib/types";
import { SuratKeteranganSchema } from "@/lib/validation/validation-request-letter";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createLetter, updateNomenclatureLetterRequest } from "./action";
import { nomenclatureLetterRequest } from "@/app/(main)/(admin)/admin/letter-requests/_components/actions";
import { incrementNomenclature } from "@/constants/helpers";

export default function FormSuratKeterangan(props: RequestLetterProps) {
  const { session } = useGetUserClient();

  const router = useRouter();

  const form = useForm<SuratKeteranganSchema>({
    mode: "onChange",
    defaultValues: {
      address: "",
      born: "",
      name: "",
      year: "",
    },
  });

  const nomenclature = useQuery({
    queryKey: ["nomenclature"],
    queryFn: async () => {
      const res = await nomenclatureLetterRequest(
        props.requestLetterData.template
      );

      return res?.nomenclature;
    },
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

      const newNomenclature = incrementNomenclature(nomenclature?.data!);

      await updateNomenclatureLetterRequest(
        props.requestLetterData.template,
        newNomenclature
      );

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

  function onSubmit(values: SuratKeteranganSchema) {
    const value = {
      ...values,
      nomenclature: nomenclature?.data,
    };

    props.setRequestLetterData({
      ...props.requestLetterData,
      data: JSON.stringify(value),
    });

    mutation.mutate();
  }

  return (
    <div className="w-full py-8 px-4 flex justify-center items-center">
      <Card className="w-full max-w-md mask-x-to-background">
        <CardHeader className="space-y-1">
          <CardTitle>Form Surat Keterangan Santri</CardTitle>
          <CardDescription>
            Silahkan isi form dibawah ini dengan benar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex. muhamad raihan nurhidayat"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="born"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tempat Tanggal Lahir</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex. Purwakarta, 21 April 2009"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex. Kp. Cilegong Utara 003/001, Desa Jatiluhur Kec. Jatiluhur, Kab. Purwakarta"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tahun Masuk</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ex. 2020" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
