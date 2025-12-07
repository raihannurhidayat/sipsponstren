import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Lock,
  LockKeyholeOpenIcon,
  LogIn,
  FilePlus2,
  Users2,
  Clock4,
  LayoutDashboard,
  XCircle,
  ClipboardList,
  UserCheck,
  Download,
  LayoutDashboardIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import getUserFromServer from "@/hooks/getUserFromServer";

export default async function LandingPage() {
  const { session } = await getUserFromServer();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ">
        <div className="flex px-12 h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Sipsrontren</span>
          </div>

          <div className="flex items-center gap-4">
            {session?.user ? (
              <Button asChild variant={"outline"}>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium flex items-center"
                >
                  Dashboard
                  <LayoutDashboardIcon className="size-4 ml-0.5" />
                </Link>
              </Button>
            ) : (
              <Button asChild variant={"outline"}>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium flex items-center"
                >
                  Sign In
                  <LockKeyholeOpenIcon className="size-4 ml-0.5 animate-bounce" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full min-h-[85vh] md:min-h-[600px] md:aspect-video flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/background.png"
              alt="Digital workspace with organized documents"
              fill
              className="object-cover brightness-[0.7]"
              priority
            />
          </div>
          <div className="container relative px-6 md:px-12 z-10 py-24 md:py-32 lg:py-40">
            <div className="max-w-3xl space-y-5 text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Sistem Manajemen Surat Pesantren
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Digitalisasi pengajuan, pantau proses persetujuan, dan kelola
                pengajuan resmi dengan mudah dalam satu platform terpadu
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href={"/sign-in"}>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto"
                    variant={"secondary"}
                  >
                    Masuk <LogIn />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section id="features" className="py-16 md:py-24 px-12">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Fitur Unggulan Pengelolaan Surat Resmi
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Kelola, lacak, dan proses surat dengan efisien dalam satu sistem
                terpusat.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Lock className="h-10 w-10 text-primary" />}
                title="Keamanan Data"
                description="Surat dan data sensitif dilindungi dengan enkripsi dan otorisasi akses yang ketat."
              />
              <FeatureCard
                icon={<FilePlus2 className="h-10 w-10 text-primary" />}
                title="Pengajuan Surat Digital"
                description="Permudah pengajuan surat secara online dengan pelacakan status yang transparan."
              />
              <FeatureCard
                icon={<Users2 className="h-10 w-10 text-primary" />}
                title="Persetujuan Multi-Level"
                description="Atur alur persetujuan surat berdasarkan akun yang telah disetujui sebelumnya."
              />
              <FeatureCard
                icon={<Clock4 className="h-10 w-10 text-primary" />}
                title="Histori & Riwayat"
                description="Lihat semua riwayat surat yang diajukan, disetujui, atau ditolak untuk keperluan audit."
              />
              <FeatureCard
                icon={<LayoutDashboard className="h-10 w-10 text-primary" />}
                title="Dashboard Statistik"
                description="Pantau statistik pengajuan surat seperti jumlah permintaan, status, dan waktu proses."
              />
              <FeatureCard
                icon={<XCircle className="h-10 w-10 text-primary" />}
                title="Kontrol Ketersediaan"
                description="Aktifkan atau nonaktifkan jenis surat tertentu agar tidak bisa diajukan sementara."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 px-12 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Cara Kerja Sistem Surat
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Alur sederhana untuk pengajuan dan pengelolaan surat yang
                efisien
              </p>
            </div>
            <div className="relative">
              {/* Desktop Timeline */}
              <div className="hidden md:block">
                <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
                <div className="grid grid-cols-2 gap-8">
                  <WorkflowStep
                    number={1}
                    align="right"
                    icon={<FilePlus2 className="h-6 w-6" />}
                    title="Ajukan Surat"
                    description="Pengguna mengisi formulir pengajuan surat dengan data yang diperlukan secara online."
                  />
                  <div className="col-span-1"></div>
                  <div className="col-span-1"></div>
                  <WorkflowStep
                    number={2}
                    align="left"
                    icon={<ClipboardList className="h-6 w-6" />}
                    title="Verifikasi"
                    description="Admin memeriksa dan memverifikasi data pengajuan sebelum diteruskan ke tahap selanjutnya."
                  />
                  <WorkflowStep
                    number={3}
                    align="right"
                    icon={<UserCheck className="h-6 w-6" />}
                    title="Persetujuan"
                    description="Surat diproses melalui alur persetujuan oleh pihak yang berwenang."
                  />
                  <div className="col-span-1"></div>
                  <div className="col-span-1"></div>
                  <WorkflowStep
                    number={4}
                    align="left"
                    icon={<Download className="h-6 w-6" />}
                    title="Unduh & Cetak"
                    description="Pengguna dapat mengunduh surat yang sudah disetujui dalam format PDF dan mencetaknya."
                  />
                </div>
              </div>

              {/* Mobile Timeline */}
              <div className="md:hidden space-y-8">
                <WorkflowStepMobile
                  number={1}
                  icon={<FilePlus2 className="h-6 w-6" />}
                  title="Ajukan Surat"
                  description="Pengguna mengisi formulir pengajuan surat dengan data yang diperlukan secara online."
                />
                <WorkflowStepMobile
                  number={2}
                  icon={<ClipboardList className="h-6 w-6" />}
                  title="Verifikasi"
                  description="Admin memeriksa dan memverifikasi data pengajuan sebelum diteruskan ke tahap selanjutnya."
                />
                <WorkflowStepMobile
                  number={3}
                  icon={<UserCheck className="h-6 w-6" />}
                  title="Persetujuan"
                  description="Surat diproses melalui alur persetujuan oleh pihak yang berwenang."
                />
                <WorkflowStepMobile
                  number={4}
                  icon={<Download className="h-6 w-6" />}
                  title="Unduh & Cetak"
                  description="Pengguna dapat mengunduh surat yang sudah disetujui dalam format PDF dan mencetaknya."
                />
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="py-16 md:py-24 bg-muted/30 px-12">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
                Semua yang perlu Anda ketahui tentang sistem manajemen surat
                kami
              </p>
            </div>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    Apakah sistem ini aman untuk menyimpan surat penting?
                  </AccordionTrigger>
                  <AccordionContent>
                    Ya, sistem ini dilengkapi dengan enkripsi data (AES-256)
                    untuk penyimpanan dan SSL/TLS untuk transmisi data. Kami
                    juga menyediakan kontrol akses berbasis peran dan
                    autentikasi dua faktor.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>
                    Bagaimana sistem menangani surat masuk dan keluar?
                  </AccordionTrigger>
                  <AccordionContent>
                    Surat masuk dapat dicatat dan diarsipkan secara otomatis,
                    sementara surat keluar bisa dibuat dengan templat digital,
                    disetujui, lalu dikirimkan dengan jejak audit lengkap.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                  <AccordionTrigger>
                    Apakah ada batasan jumlah surat atau dokumen yang disimpan?
                  </AccordionTrigger>
                  <AccordionContent>
                    Tergantung paket layanan yang dipilih. Untuk instansi besar,
                    kami menyediakan opsi penyimpanan tanpa batas.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 px-12">
          <div className="container">
            <div className="rounded-xl bg-primary/10 p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-primary">
                  Gunakan platform ini untuk pengajuan surat yang lebih
                  sederhana
                </h2>
                <p className="mt-4 text-sm md:text-lg">
                  Ajukan pengajuan surat anda menggunakan akun yang telah
                  diberikan dan terverifikasi oleh admin pesantren.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <Link href={"/sign-in"}>
                    <Button
                      size="lg"
                      className="w-full sm:w-auto"
                      variant={"secondary"}
                    >
                      Masuk <LogIn />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-primary/20 to-transparent opacity-70 hidden lg:block"></div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40 px-12">
        <div className="container py-12 md:py-16">
          <div className="flex items-start justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Sipspontren</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Sistem Manajemen Surat Pesantren
              </p>
              <div className="flex space-x-4">
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">LinkedIn</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="space-y-4 max-w-lg">
              <h3 className="text-sm font-medium">Pengajuan Akun</h3>
              <p className="text-sm text-muted-foreground">
                Ajukan permintaan pembuatan akun untuk mendapatkan akses ke
                sistem manajemen surat pesantren kami.
              </p>
              <form className="space-y-2">
                <Input
                  type="email"
                  placeholder="Alamat Email"
                  className="w-full"
                />
                <Button type="submit" className="w-full">
                  Kirim
                </Button>
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-border/40">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Sipspontren, Inc. All rights
                reserved.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Created by @kelompok_komputasi_awan
                </Link>
                {/* <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </Link>
                <Link
                  href="#"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Cookie Policy
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component for feature cards
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border bg-background p-6 hover:shadow-md transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

// Component for workflow steps (desktop)
function WorkflowStep({
  number,
  align,
  icon,
  title,
  description,
}: {
  number: number;
  align: string;
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div
      className={`relative pb-12 ${
        align === "left" ? "text-left" : "text-right"
      }`}
    >
      <div
        className={`absolute left-1/2 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border bg-background shadow-sm`}
      >
        <span className="text-sm font-medium">{number}</span>
      </div>
      <div className={`mt-8 ${align === "left" ? "pl-8" : "pr-8"}`}>
        <div
          className={`inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary ${
            align === "left" ? "" : "flex-row-reverse"
          }`}
        >
          {icon}
          <span>{title}</span>
        </div>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// Component for workflow steps (mobile)
function WorkflowStepMobile({
  number,
  icon,
  title,
  description,
}: {
  number: number;
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="relative pl-10 pb-8 border-l border-border last:border-l-0 last:pb-0">
      <div className="absolute left-0 top-0 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border bg-background shadow-sm">
        <span className="text-sm font-medium">{number}</span>
      </div>
      <div className="mt-0">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
          {icon}
          <span>{title}</span>
        </div>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

// Component for testimonial cards
function TestimonialCard({
  quote,
  author,
  role,
  company,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) {
  return (
    <div className="rounded-lg border bg-background p-6 shadow-sm">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="flex gap-0.5 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-yellow-500"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p className="italic text-muted-foreground">&ldquo;{quote}&rdquo;</p>
        </div>
        <div className="mt-6">
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">
            {role}, {company}
          </p>
        </div>
      </div>
    </div>
  );
}
