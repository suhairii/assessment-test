"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Brain, Ear, Users, CheckCircle2, Lock, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BundlePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setError("Token diperlukan.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/token/validate?token=${token}`);
        const d = await res.json();
        if (d.valid && d.type === "BUNDLE") {
          setData(d);
        } else {
          setError("Link tidak valid atau sudah kadaluwarsa.");
        }
      } catch (e) {
        setError("Gagal memvalidasi token.");
      } finally {
        setLoading(false);
      }
    };
    validate();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Memuat daftar tes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={40} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Akses Dibatasi</h1>
          <p className="text-slate-500 mb-8">{error}</p>
          <Link href="/" className="inline-flex items-center justify-center w-full bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const tests = [
    { id: "DISC", name: "DISC Personality Assessment", description: "Analisis profil kepribadian dan perilaku kerja.", icon: Users, href: `/test?token=${token}`, color: "blue" },
    { id: "IQ", name: "IQ & Aptitude Test", description: "Evaluasi kemampuan kognitif dan logika.", icon: Brain, href: `/test/iq?token=${token}`, color: "purple" },
    { id: "VAK", name: "VAK Learning Styles", description: "Identifikasi preferensi gaya belajar Anda.", icon: Ear, href: `/test/vak?token=${token}`, color: "orange" },
  ];

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-12 lg:p-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight uppercase">Unified <span className="text-blue-600">Assessment</span></h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto italic">
            Silakan selesaikan semua rangkaian tes di bawah ini. Tes yang sudah dikerjakan tidak dapat diakses kembali.
          </p>
        </div>

        <div className="grid gap-6">
          {tests.map((test) => {
            const isCompleted = data?.completedTests?.includes(test.id);
            const Icon = test.icon;
            
            return (
              <div 
                key={test.id} 
                className={`relative bg-white rounded-3xl p-6 md:p-8 border-2 transition-all overflow-hidden ${
                  isCompleted 
                    ? 'border-green-100 opacity-75 grayscale-[0.5]' 
                    : 'border-slate-100 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-2xl shrink-0 ${
                      isCompleted ? 'bg-green-50 text-green-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      <Icon size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{test.name}</h3>
                      <p className="text-slate-500 text-sm">{test.description}</p>
                    </div>
                  </div>
                  
                  {isCompleted ? (
                    <div className="flex items-center gap-2 text-green-600 font-bold px-6 py-3 bg-green-50 rounded-2xl whitespace-nowrap">
                      <CheckCircle2 size={20} />
                      Selesai
                    </div>
                  ) : (
                    <Link 
                      href={test.href}
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition active:scale-95 shadow-lg shadow-blue-600/20 whitespace-nowrap"
                    >
                      Mulai Tes <ArrowRight size={18} />
                    </Link>
                  )}
                </div>

                {isCompleted && (
                  <div className="absolute inset-0 bg-white/10 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>

        <footer className="mt-16 text-center text-slate-400 text-sm font-medium">
          &copy; {new Date().getFullYear()} Aptitude Assessment System.
        </footer>
      </div>
    </main>
  );
}
