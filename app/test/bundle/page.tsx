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
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Menyiapkan Asesmen...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl max-w-md w-full text-center border border-slate-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Lock size={40} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Akses Dibatasi</h1>
          <p className="text-slate-500 mb-8 font-medium">{error}</p>
          <Link href="/" className="inline-flex items-center justify-center w-full bg-black text-white px-6 py-4 rounded-2xl font-bold hover:bg-gray-800 transition active:scale-95">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  const tests = [
    { 
        id: "DISC", 
        name: "DISC Personality", 
        fullName: "Dominance, Influence, Steadiness, Compliance",
        description: "Analisis profil kepribadian dan perilaku kerja untuk menentukan kecocokan peran.", 
        icon: Users, 
        href: `/test?token=${token}`, 
        color: "bg-zinc-900",
        textColor: "text-zinc-900",
        borderColor: "border-zinc-900",
        lightBg: "bg-zinc-50",
        duration: "15 Menit",
        questions: "24 Soal",
        feature: "Behavioral"
    },
    { 
        id: "IQ", 
        name: "IQ & Aptitude", 
        fullName: "Cognitive Ability & Logical Reasoning",
        description: "Evaluasi kemampuan kognitif, logika, dan pemecahan masalah secara terstruktur.", 
        icon: Brain, 
        href: `/test/iq?token=${token}`, 
        color: "bg-blue-600",
        textColor: "text-blue-600",
        borderColor: "border-blue-600",
        lightBg: "bg-blue-50",
        duration: "30 Menit",
        questions: "60 Soal",
        feature: "Cognitive"
    },
    { 
        id: "VAK", 
        name: "VAK Styles", 
        fullName: "Visual, Auditory, Kinesthetic Learning",
        description: "Identifikasi preferensi gaya belajar untuk optimasi komunikasi dan pengembangan.", 
        icon: Ear, 
        href: `/test/vak?token=${token}`, 
        color: "bg-purple-600",
        textColor: "text-purple-600",
        borderColor: "border-purple-600",
        lightBg: "bg-purple-50",
        duration: "15 Menit",
        questions: "30 Soal",
        feature: "Learning"
    },
  ];

  const completedCount = data?.completedTests?.length || 0;
  const isFullyCompleted = completedCount === tests.length;

  return (
    <main className="min-h-screen bg-slate-50 p-4 md:p-12 lg:p-24 selection:bg-blue-100">
      <div className="max-w-5xl mx-auto">
        <header className="mb-16 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm mb-4">
             <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Recruitment Assessment Bundle</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
            Unified <span className="text-blue-600">Assessment</span>
          </h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            Selamat datang di rangkaian asesmen profesional kami. Silakan selesaikan ketiga modul di bawah ini untuk melengkapi profil Anda.
          </p>

          <div className="flex items-center justify-center gap-8 pt-4">
             <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Waktu</p>
                <p className="text-xl font-bold text-slate-900">60 Menit</p>
             </div>
             <div className="w-px h-10 bg-slate-200" />
             <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total Soal</p>
                <p className="text-xl font-bold text-slate-900">114 Item</p>
             </div>
             <div className="w-px h-10 bg-slate-200" />
             <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Progress</p>
                <p className="text-xl font-bold text-blue-600">{completedCount}/3 Selesai</p>
             </div>
          </div>
        </header>

        {isFullyCompleted ? (
            <div className="bg-white rounded-[3rem] p-12 text-center border-2 border-green-500 shadow-2xl shadow-green-500/10 mb-12 animate-fadeIn">
                <div className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={64} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-4">Semua Tes Selesai!</h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto mb-10">
                    Terima kasih telah menyelesaikan seluruh rangkaian asesmen. Data Anda telah kami simpan dan akan segera diproses oleh tim rekrutmen.
                </p>
                <Link href="/" className="inline-flex items-center justify-center bg-black text-white px-12 py-5 rounded-2xl font-bold hover:bg-gray-800 transition active:scale-95 shadow-xl">
                    Selesai & Keluar
                </Link>
            </div>
        ) : (
            <div className="grid gap-8">
            {tests.map((test) => {
                const isCompleted = data?.completedTests?.includes(test.id);
                const Icon = test.icon;
                
                return (
                <div 
                    key={test.id} 
                    className={`group relative bg-white rounded-[2.5rem] p-8 md:p-12 border-2 transition-all duration-500 ${
                    isCompleted 
                        ? 'border-green-100 bg-slate-50/50' 
                        : `border-slate-100 hover:shadow-2xl hover:shadow-${test.id === 'DISC' ? 'zinc' : test.id === 'IQ' ? 'blue' : 'purple'}-500/10 hover:${test.borderColor}`
                    }`}
                >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className={`p-6 rounded-3xl shrink-0 transition-all duration-500 ${
                        isCompleted ? 'bg-green-100 text-green-600' : `${test.lightBg} ${test.textColor} group-hover:${test.color} group-hover:text-white`
                        }`}>
                        <Icon size={48} />
                        </div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tighter ${isCompleted ? 'text-slate-400' : 'text-slate-900'}`}>
                                    {test.name}
                                </h3>
                                {isCompleted && (
                                    <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                                        <CheckCircle2 size={12} /> COMPLETED
                                    </span>
                                )}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 italic">{test.fullName}</p>
                            <p className="text-slate-500 font-medium leading-relaxed max-w-lg">
                                {test.description}
                            </p>
                            
                            <div className="flex flex-wrap items-center gap-6 pt-4">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Clock size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">{test.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <LayoutGrid size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">{test.questions}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-400">
                                    <FileText size={16} />
                                    <span className="text-xs font-bold uppercase tracking-widest">{test.feature}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="shrink-0">
                        {isCompleted ? (
                            <div className="w-full lg:w-48 py-5 rounded-2xl bg-green-50 border-2 border-green-100 text-green-600 font-black uppercase tracking-widest text-center flex items-center justify-center gap-2">
                                <CheckCircle2 size={20} />
                                Done
                            </div>
                        ) : (
                            <Link 
                                href={test.href}
                                className={`inline-flex items-center justify-center gap-3 ${test.color} text-white w-full lg:w-48 py-5 rounded-2xl font-black uppercase tracking-widest hover:opacity-90 transition active:scale-95 shadow-2xl shadow-${test.id === 'DISC' ? 'zinc' : test.id === 'IQ' ? 'blue' : 'purple'}-600/20`}
                            >
                                Start <ArrowRight size={20} />
                            </Link>
                        )}
                    </div>
                    </div>
                </div>
                );
            })}
            </div>
        )}

        <footer className="mt-24 text-center border-t border-slate-200 pt-12 space-y-4">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">Aptitude Assessment System</p>
          <p className="text-slate-400 text-xs font-medium">
            Pastikan koneksi internet stabil selama pengerjaan tes. <br className="hidden md:block" />
            Jangan memuat ulang halaman saat tes sedang berlangsung.
          </p>
        </footer>
      </div>
    </main>
  );
}

export default function BundlePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><Loader2 className="animate-spin text-blue-600" size={48}/></div>}>
      <BundleContent />
    </Suspense>
  );
}
