import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Undangan Asesmen | Aptitude System",
  description: "Anda diundang untuk mengikuti rangkaian asesmen profesional. Silakan klik untuk memulai tes Anda.",
  openGraph: {
    title: "Official Assessment Invitation",
    description: "Rangkaian tes DISC, IQ, dan VAK untuk keperluan seleksi profesional.",
    type: "website",
    siteName: "Aptitude System",
  },
  twitter: {
    card: "summary_large_image",
    title: "Official Assessment Invitation",
    description: "Silakan akses link ini untuk menyelesaikan rangkaian asesmen Anda.",
  },
};

export default function InviteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
