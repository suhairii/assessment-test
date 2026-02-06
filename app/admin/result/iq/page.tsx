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

  useEffect(() => {
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white"><Brain className="animate-spin text-gray-400" size={48} /></div>;
  if (error || !data) return <div className="p-10 text-center text-red-500 font-bold">{error || "Data Error"}</div>;

  const { resultData, name, position, date } = data;

  return (
    <div className="min-h-screen bg-white text-black font-sans p-4 md:p-12 print:p-0">
      <div className="max-w-4xl mx-auto">
        {/* Header - Strictly Black & White */}
        <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 print:flex-row print-break-inside-avoid">
            <div>
                <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-2 text-black">Laporan Skor IQ</h1>
                <p className="text-gray-500 text-sm font-medium">Aptitude Assessment System</p>
            </div>
            <div className="text-left md:text-right text-sm space-y-1 bg-gray-50 p-4 rounded-lg md:bg-transparent md:p-0 print:bg-transparent">
                <div className="flex md:justify-end gap-2"><span className="text-gray-500 w-16">Nama:</span> <span className="font-bold">{name}</span></div>
                <div className="flex md:justify-end gap-2"><span className="text-gray-500 w-16">Posisi:</span> <span className="font-bold">{position}</span></div>
                <div className="flex md:justify-end gap-2"><span className="text-gray-500 w-16">Tanggal:</span> <span className="font-bold">{date}</span></div>
            </div>
        </div>

        {/* Summary Block - Monochrome */}
        <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 mb-12 shadow-sm print:bg-white print:border-gray-200 print:shadow-none print-break-inside-avoid">
            <h2 className="text-sm font-bold uppercase mb-8 text-center tracking-widest text-gray-400">Hasil Analisa</h2>
            
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative">
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2 print:block"></div>
                
                <div className="text-center">
                    <p className="text-xs md:text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">IQ Score (Standardized)</p>
                    <div className="mt-2 text-7xl font-black text-black tracking-tighter">
                        {resultData.iqScore}
                    </div>
                </div>
                
                <div className="text-center pt-8 md:pt-0 border-t border-gray-200 md:border-t-0 print:pt-0 print:border-t-0 flex flex-col justify-center items-center">
                    <p className="text-xs md:text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">Kategori</p>
                    <div className="inline-block px-8 py-3 bg-black text-white rounded-xl font-bold text-lg uppercase tracking-widest print:border print:border-black print:text-black print:bg-white">
                        {resultData.category}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-12 pt-8 border-t border-gray-200">
                 <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Jawaban Benar</p>
                    <p className="text-2xl font-black text-black">{resultData.correctCount} <span className="text-gray-300 text-sm font-medium">/ 60</span></p>
                </div>
                <div className="text-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Akurasi</p>
                    <p className="text-2xl font-black text-black">{Math.round((resultData.correctCount/60)*100)}%</p>
                </div>
            </div>
        </div>

        {/* Interpretation - Black and White Bullet Style */}
        <div className="space-y-12 print-break-inside-avoid">
            <div>
                <h4 className="font-bold text-black uppercase mb-4 text-xs md:text-sm tracking-widest border-l-4 border-black pl-3">INTERPRETASI HASIL</h4>
                <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">
                    Berdasarkan hasil tes yang telah dilakukan, Anda memiliki tingkat kecerdasan yang dikategorikan sebagai <span className="font-bold text-black">{resultData.category}</span>. 
                    Skor ini mencerminkan kapasitas kognitif umum Anda dalam memecahkan masalah logika, pengenalan pola spasial, serta kemampuan penalaran verbal.
                </p>
            </div>
            
            <div>
                <h4 className="font-bold text-black uppercase mb-4 text-xs md:text-sm tracking-widest border-l-4 border-black pl-3">CATATAN EVALUASI</h4>
                <ul className="space-y-4">
                    <li className="text-gray-700 text-sm md:text-base flex items-start gap-4">
                        <span className="text-black mt-1.5 w-2 h-2 rounded-full bg-black shrink-0"></span>
                        <span className="leading-relaxed">Skor IQ bukanlah angka statis dan dapat dipengaruhi oleh kondisi fisik serta mental pada saat pengerjaan tes.</span>
                    </li>
                    <li className="text-gray-700 text-sm md:text-base flex items-start gap-4">
                        <span className="text-black mt-1.5 w-2 h-2 rounded-full bg-black shrink-0"></span>
                        <span className="leading-relaxed">Penggunaan skor IQ sebagai indikator potensi manajerial disarankan minimal pada kategori rata-rata tinggi (IQ {'>'} 110).</span>
                    </li>
                    <li className="text-gray-700 text-sm md:text-base flex items-start gap-4">
                        <span className="text-black mt-1.5 w-2 h-2 rounded-full bg-black shrink-0"></span>
                        <span className="leading-relaxed">Hasil laporan ini disarankan untuk diverifikasi bersama dengan hasil tes kepribadian (DISC) dan modalitas belajar (VAK).</span>
                    </li>
                </ul>
            </div>
        </div>

        {/* Actions */}
        <div className="mt-20 pt-10 border-t border-gray-100 text-center no-print flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/admin/iq" className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-gray-500 hover:text-black hover:bg-gray-100 transition mb-4 md:mb-0 md:mr-4">
                ← Kembali ke Manajemen IQ
            </Link>
            <button onClick={() => window.print()} className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-10 py-4 rounded-full hover:bg-gray-800 transition shadow-lg font-bold text-sm">
                <Printer size={18}/> Cetak Laporan (PDF)
            </button>
        </div>
      </div>
    </div>
  );
}

export default function IqResultPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">Memuat Laporan...</div>}>
      <IqResultContent />
    </Suspense>
  );
}