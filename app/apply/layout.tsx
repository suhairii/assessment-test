import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formulir Lamaran Kerja | Assessment System",
  description: "Silakan lengkapi formulir lamaran kerja Anda untuk memulai proses seleksi profesional.",
  openGraph: {
    title: "Formulir Lamaran Kerja - Career Opportunity",
    description: "Gabung bersama kami! Isi formulir lamaran kerja secara online melalui sistem asesmen kami.",
    type: "website",
    siteName: "Assessment System",
  },
  twitter: {
    card: "summary_large_image",
    title: "Formulir Lamaran Kerja - Career Opportunity",
    description: "Silakan lengkapi data diri Anda melalui tautan resmi formulir lamaran kerja kami.",
  },
};

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
