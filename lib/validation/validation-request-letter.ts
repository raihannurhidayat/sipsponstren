import { string, z } from "zod";

export const requestLetterSchema = z.object({
  template: z.string(),
  user_id: z.string(),
  data: z.string(),
});

export type RequestLetterSchema = z.infer<typeof requestLetterSchema>;

export const suratKeteranganSchema = z.object({
  name: z.string(),
  born: z.string(),
  address: z.string(),
  year: z.string(),
});

export type SuratKeteranganSchema = z.infer<typeof suratKeteranganSchema>;

export const suratIzinRombonganSchema = z.object({
  nama: z.string(),
  kelas: z.string(),
  kepentingan: z.string(),
  anggota: z.array(
    z.object({
      nama: z.string(),
      kelas: z.string(),
      asrama: string(),
    })
  ),
});

export type SuratIzinRombonganSchema = z.infer<typeof suratIzinRombonganSchema>;
