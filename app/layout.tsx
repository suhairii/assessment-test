import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import { settingsDb } from "@/src/lib/settings";
import MaintenanceGuard from "@/src/components/MaintenanceGuard";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Assessment System",
  description: "Professional Personality Profiling Tool",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get("admin_session");
  const isAdmin = !!adminSession;
  
  const settings = settingsDb.getSettings();
  const maintenanceActive = settings.maintenance;

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MaintenanceGuard maintenanceActive={maintenanceActive} isAdmin={isAdmin}>
          {children}
        </MaintenanceGuard>
      </body>
    </html>
  );
}
