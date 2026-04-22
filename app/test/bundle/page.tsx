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
        <p className="text-gray-400 font-black uppercase tracking-widest text-[10px]">Validating Access...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <div className="max-w-md w-full text-center border border-gray-100 p-10 rounded-3xl shadow-xl bg-white">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Akses Dibatasi</h1>
          <p className="text-gray-500 mb-8 text-sm font-medium">{error}</p>
          <Link href="/" className="inline-flex items-center justify-center w-full bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition active:scale-95">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const tests = [
    { 
        id: "DISC", 
        name: "DISC Test", 
        description: "Analisis profil kepribadian dan perilaku kerja.", 
        icon: Users, 
        href: `/test?token=${token}`, 
        duration: "15 Menit",
        questions: "24 Soal",
    },
    { 
        id: "IQ", 
        name: "IQ Test", 
        description: "Evaluasi kemampuan kognitif dan logika.", 
        icon: Brain, 
        href: `/test/iq?token=${token}`, 
        duration: "30 Menit",
        questions: "60 Soal",
    },
    { 
        id: "VAK", 
        name: "VAK Test", 
        description: "Identifikasi preferensi gaya belajar.", 
        icon: Ear, 
        href: `/test/vak?token=${token}`, 
        duration: "15 Menit",
        questions: "30 Soal",
    },
  ];

  const completedCount = data?.completedTests?.length || 0;
  const progress = Math.round((completedCount / tests.length) * 100);
  const isFullyCompleted = completedCount === tests.length;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-32">
      {/* Sticky Header - Matching Test Pages */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold tracking-tight">Asesmen</h1>
            <div className="bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1 rounded-lg font-mono font-bold text-sm flex items-center gap-2">
              <Clock size={14} /> 60:00
            </div>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-100">
          <div className="h-full bg-black transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        
        {/* Intro Section - Biodata Card Style */}
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-gray-200 shadow-sm mb-12 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2 border-b border-gray-100 pb-2">Instruksi Asesmen</h2>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Anda diwajibkan menyelesaikan seluruh rangkaian tes di bawah ini. Pastikan Anda berada di lingkungan yang tenang dan memiliki koneksi internet yang stabil.
            </p>
            <div className="flex gap-6 pt-2">
                <div className="flex items-center gap-2 text-gray-500">
                    <Clock size={16} />
                    <span className="text-xs font-bold">Total 60 Menit</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                    <FileText size={16} />
                    <span className="text-xs font-bold">3 Modul Terpadu</span>
                </div>
            </div>
        </div>

        {isFullyCompleted ? (
            <div className="bg-white p-12 text-center rounded-2xl border-2 border-black shadow-xl animate-fadeIn">
                <div className="w-20 h-20 bg-gray-50 text-black rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-200">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Asesmen Selesai</h2>
                <p className="text-gray-500 text-sm font-medium mb-8">
                    Terima kasih telah menyelesaikan seluruh rangkaian tes. Data Anda telah kami simpan.
                </p>
                <Link href="/" className="inline-flex items-center justify-center bg-black text-white px-10 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition active:scale-95 shadow-lg">
                    Kembali ke Beranda
                </Link>
            </div>
        ) : (
            <div className="space-y-6">
                {tests.map((test) => {
                    const isCompleted = data?.completedTests?.includes(test.id);
                    const Icon = test.icon;
                    
                    return (
                    <div 
                        key={test.id} 
                        className={`bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 transition-all ${
                        isCompleted ? 'opacity-50 grayscale' : 'hover:border-black'
                        }`}
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                            <div className="flex items-start gap-6">
                                <div className={`p-4 rounded-xl shrink-0 ${isCompleted ? 'bg-gray-100 text-gray-400' : 'bg-gray-50 text-black'}`}>
                                    <Icon size={32} />
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-bold text-gray-900">{test.name}</h3>
                                        {isCompleted && <CheckCircle2 size={16} className="text-green-600" />}
                                    </div>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-sm">
                                        {test.description}
                                    </p>
                                    <div className="flex items-center gap-4 pt-2">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                            <Clock size={12} /> {test.duration}
                                        </span>
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                            <LayoutGrid size={12} /> {test.questions}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="shrink-0">
                                {isCompleted ? (
                                    <div className="flex items-center gap-2 text-gray-400 font-bold text-xs uppercase tracking-widest px-6 py-2">
                                        Selesai
                                    </div>
                                ) : (
                                    <Link 
                                        href={test.href}
                                        className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition active:scale-95 shadow-md"
                                    >
                                        Mulai <ArrowRight size={18} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    );
                })}
            </div>
        )}
      </main>

      {/* Floating Footer - Action Style */}
      <div className="fixed bottom-0 left-0 right-0 p-4 pb-[env(safe-area-inset-bottom,16px)] bg-white/80 backdrop-blur-xl border-t border-gray-200 z-40">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
           <div className="text-xs text-gray-500 font-bold uppercase tracking-widest">
             Progress: <span className="text-black">{completedCount} / 3</span>
           </div>
           <div className="text-[10px] font-black text-gray-200 uppercase tracking-[0.5em]">
             Aptitude System
           </div>
        </div>
      </div>
    </div>
  );
}

export default function BundlePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-black" size={32}/></div>}>
      <BundleContent />
    </Suspense>
  );
}
