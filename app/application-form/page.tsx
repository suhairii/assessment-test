"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ApplicationForm from "@/src/components/application-form/ApplicationForm/ApplicationForm";
import { ChevronRight, Lock, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        setIsValidating(false);
        setIsValid(false);
        setErrorMsg("Token diperlukan untuk mengakses halaman ini.");
        return;
      }

      try {
        const res = await fetch(`/api/token/validate?token=${token}`);
        const data = await res.json();

        if (data.valid && data.type === "APPLICATION") {
          setIsValid(true);
        } else if (data.valid && data.type !== "APPLICATION") {
          setErrorMsg("Token ini bukan untuk formulir lamaran.");
          setIsValid(false);
        } else {
          setErrorMsg("Token tidak valid atau sudah kadaluwarsa.");
          setIsValid(false);
        }
      } catch (err) {
        setErrorMsg("Terjadi kesalahan saat validasi token.");
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token]);

  if (isValidating) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium animate-pulse">Memvalidasi akses Anda...</p>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Akses Dibatasi</h1>
          <p className="text-slate-500 mb-8">{errorMsg}</p>
          <Link 
            href="/" 
            className="inline-flex items-center justify-center w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition active:scale-95"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-24 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-2xl mb-2">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Application <span className="text-blue-600">Form</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Silakan lengkapi data diri dan riwayat profesional Anda dengan benar untuk keperluan proses seleksi.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
          <ApplicationForm token={token} />
        </div>

        <footer className="text-center text-slate-400 text-sm font-medium pb-12">
          &copy; {new Date().getFullYear()} Aptitude Assessment System. All rights reserved.
        </footer>
      </div>
    </main>
  );
}

// Helper icon component for heading
function FileText({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  );
}
