"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Printer, Home, User, Briefcase, Calendar, Brain } from "lucide-react";

interface IqResultData {
  resultData: {
    correctCount: number;
    totalQuestions: number;
    iqScore: number;
    category: string;
  };
  name: string;
  position: string;
  date: string;
}

function IqResultContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<IqResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const adminCookie = cookies.find(c => c.trim().startsWith('admin_session='));
    setIsAdmin(!!adminCookie);

    const fetchResult = async () => {
      const id = searchParams.get("id");
      if (!id) { setError("ID tidak ditemukan."); setLoading(false); return; }
      try {
        const response = await fetch(`/api/result/iq?id=${id}`);
        const result = await response.json();
        if (result.success) setData(result.data);
        else setError("Hasil tidak ditemukan.");
      } catch { setError("Gagal memuat hasil."); }
      finally { setLoading(false); }
    };
    fetchResult();
  }, [searchParams]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Brain className="animate-spin text-blue-500" size={48} /></div>;
  if (error || !data) return <div className="p-10 text-center text-red-500 font-bold">{error || "Data Error"}</div>;

  const { resultData, name, position, date } = data;

  return (
    <div className="min-h-screen bg-gray-50 text-black font-sans p-4 md:p-12 print:p-0 print:bg-white">
      <style>{`@media print { .no-print { display: none !important; } .print-break-inside-avoid { break-inside: avoid; } }`}</style>
      
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 print:shadow-none print:border-none print:p-0">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-6 mb-10 flex flex-col md:flex-row justify-between md:items-end gap-6 print:flex-row">
            <div>
                <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tight mb-2 text-blue-700">Laporan Skor IQ</h1>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-[0.2em]">Aptitude Assessment</p>
            </div>
            <div className="space-y-1 text-sm md:text-right">
                <div className="flex md:justify-end gap-2 font-bold text-gray-900"><User size={16} /> {name}</div>
                <div className="flex md:justify-end gap-2 text-gray-500 font-medium"><Briefcase size={16} /> {position}</div>
                <div className="flex md:justify-end gap-2 text-gray-400 font-mono"><Calendar size={16} /> {date}</div>
            </div>
        </div>

        {/* Score Display */}
        <div className="text-center mb-12 py-12 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-[40px] shadow-2xl shadow-blue-100 relative overflow-hidden">
            <Brain className="absolute -right-10 -top-10 opacity-10 rotate-12" size={200} />
            <p className="text-xs uppercase font-black tracking-[0.4em] opacity-70 mb-4">IQ Score (Standardized)</p>
            <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-4">{resultData.iqScore}</h2>
            <div className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full font-bold text-lg uppercase tracking-wide">
                {resultData.category}
            </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Jawaban Benar</p>
                <p className="text-2xl font-black text-blue-600">{resultData.correctCount} <span className="text-gray-300 text-sm font-medium">/ 60</span></p>
            </div>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">Akurasi</p>
                <p className="text-2xl font-black text-blue-600">{Math.round((resultData.correctCount/60)*100)}%</p>
            </div>
        </div>

        {/* Interpretation */}
        <div className="space-y-8 border-t border-gray-100 pt-10">
            <h3 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-4 uppercase tracking-wider">Interpretasi Hasil</h3>
            <p className="text-gray-600 leading-relaxed italic">
                Berdasarkan hasil tes, Anda memiliki tingkat kecerdasan yang dikategorikan sebagai <span className="font-bold text-blue-700">{resultData.category}</span>. 
                Skor ini mencerminkan kemampuan kognitif Anda dalam memecahkan masalah logika, pola spasial, dan penalaran verbal pada saat tes dilakukan.
            </p>
            <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-blue-800 text-sm uppercase mb-3">Catatan Penting:</h4>
                <ul className="text-sm text-blue-700 space-y-2 list-disc pl-5">
                    <li>Skor IQ bukanlah angka statis dan dapat dipengaruhi oleh kondisi fisik serta mental saat pengerjaan.</li>
                    <li>Kami menyarankan penggunaan kecerdasan superior sebagai syarat minimum untuk posisi manajerial (IQ {'>'} 110).</li>
                    <li>Hasil ini sebaiknya digabungkan dengan hasil tes DISC dan VAK untuk gambaran kompetensi yang lebih utuh.</li>
                </ul>
            </div>
        </div>

        {/* Actions */}
        <div className="mt-16 pt-10 border-t border-gray-100 text-center no-print flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/admin/iq" className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-gray-500 hover:text-black hover:bg-gray-100 transition"><Home size={18}/> Kembali ke Manajemen IQ</Link>
            <button onClick={() => window.print()} className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition shadow-lg font-bold text-sm"><Printer size={18}/> Cetak Laporan (PDF)</button>
        </div>
      </div>
    </div>
  );
}

export default function IqResultPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center animate-pulse">Memuat...</div>}>
      <IqResultContent />
    </Suspense>
  );
}
