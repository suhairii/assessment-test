"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Brain, Ear, Users, CheckCircle2, Lock, Loader2, ArrowRight, Clock, FileText, LayoutGrid } from "lucide-react";
import Link from "next/link";

function BundleContent() {
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
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-black animate-spin mb-4" />
        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Loading Asesmen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="max-w-md w-full text-center border-2 border-black p-10 rounded-none bg-white">
          <div className="w-16 h-16 bg-gray-100 text-black rounded-none flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-black text-black mb-2 uppercase tracking-tighter">Akses Dibatasi</h1>
          <p className="text-gray-500 mb-8 text-sm font-medium uppercase tracking-widest">{error}</p>
          <Link href="/" className="inline-flex items-center justify-center w-full bg-black text-white px-6 py-4 rounded-none font-black uppercase tracking-widest text-xs hover:bg-gray-800 transition">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const tests = [
    { 
        id: "DISC", 
        name: "DISC Assessment", 
        description: "Analisis profil kepribadian dan perilaku kerja.", 
        icon: Users, 
        href: `/test?token=${token}`, 
        duration: "15 Menit",
        questions: "24 Soal",
    },
    { 
        id: "IQ", 
        name: "IQ & Aptitude", 
        description: "Evaluasi kemampuan kognitif dan logika.", 
        icon: Brain, 
        href: `/test/iq?token=${token}`, 
        duration: "30 Menit",
        questions: "60 Soal",
    },
    { 
        id: "VAK", 
        name: "VAK Styles", 
        description: "Identifikasi preferensi gaya belajar.", 
        icon: Ear, 
        href: `/test/vak?token=${token}`, 
        duration: "15 Menit",
        questions: "30 Soal",
    },
  ];

  const completedCount = data?.completedTests?.length || 0;
  const isFullyCompleted = completedCount === tests.length;

  return (
    <main className="min-h-screen bg-white p-6 md:p-16 lg:p-24 selection:bg-gray-200">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-black pb-8">
            <div>
              <h1 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase leading-none">
                Asesmen
              </h1>
              <p className="text-xs text-gray-400 mt-4 font-black uppercase tracking-[0.4em]">
                {completedCount} of 3 Modules Completed
              </p>
            </div>
            <div className="flex gap-8 text-right">
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Total Time</p>
                  <p className="text-sm font-black text-black">60m</p>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1">Total Items</p>
                  <p className="text-sm font-black text-black">114</p>
               </div>
            </div>
          </div>
        </header>

        {isFullyCompleted ? (
            <div className="p-12 text-center border-2 border-black bg-white animate-fadeIn">
                <div className="w-20 h-20 bg-gray-50 text-black rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-black">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-black text-black uppercase tracking-tighter mb-4">Selesai</h2>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] max-w-xs mx-auto mb-10 leading-loose">
                    Seluruh rangkaian asesmen telah diselesaikan dengan sukses.
                </p>
                <Link href="/" className="inline-flex items-center justify-center bg-black text-white px-12 py-5 rounded-none font-black uppercase tracking-[0.2em] text-xs hover:bg-gray-900 transition shadow-2xl">
                    Back to Home
                </Link>
            </div>
        ) : (
            <div className="divide-y-2 divide-gray-100">
            {tests.map((test) => {
                const isCompleted = data?.completedTests?.includes(test.id);
                const Icon = test.icon;
                
                return (
                <div 
                    key={test.id} 
                    className={`py-12 flex flex-col md:flex-row md:items-center justify-between gap-8 transition-opacity ${
                      isCompleted ? 'opacity-30' : 'opacity-100'
                    }`}
                >
                    <div className="flex gap-8 items-start">
                        <div className="w-16 h-16 bg-gray-50 border-2 border-black flex items-center justify-center shrink-0">
                            <Icon size={28} className="text-black" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-4">
                                <h3 className="text-2xl font-black uppercase tracking-tighter text-black">
                                    {test.name}
                                </h3>
                                {isCompleted && (
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                        <CheckCircle2 size={12} />
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-500 font-medium text-sm leading-relaxed max-w-md">
                                {test.description}
                            </p>
                            
                            <div className="flex items-center gap-6 pt-2">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Clock size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{test.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <LayoutGrid size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">{test.questions}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="shrink-0">
                        {isCompleted ? (
                            <div className="w-full md:w-32 py-4 border-2 border-gray-100 text-gray-300 font-black uppercase tracking-widest text-[10px] text-center">
                                Done
                            </div>
                        ) : (
                            <Link 
                                href={test.href}
                                className="inline-flex items-center justify-center gap-3 bg-black text-white w-full md:w-32 py-4 rounded-none font-black uppercase tracking-widest text-[10px] hover:bg-gray-800 transition active:scale-95"
                            >
                                Start <ArrowRight size={16} />
                            </Link>
                        )}
                    </div>
                </div>
                );
            })}
            </div>
        )}

        <footer className="mt-32 text-center pt-12">
          <p className="text-[10px] font-black text-gray-200 uppercase tracking-[0.8em]">Aptitude System</p>
        </footer>
      </div>
    </main>
  );
}

export default function BundlePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-black" size={32}/></div>}>
      <BundleContent />
    </Suspense>
  );
}
