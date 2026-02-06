"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { vakDescriptions } from "@/src/data/vak-data";
import Link from "next/link";
import { Printer, Home, User, Briefcase, Calendar } from "lucide-react";

interface VakResultData {
  resultData: {
    scores: { V: number; A: number; K: number };
    percentage: { V: number; A: number; K: number };
    dominantType: string;
    preference: string;
  };
  name: string;
  position: string;
  date: string;
}

function VakResultContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<VakResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      const id = searchParams.get("id");
      if (!id) { setError("ID tidak ditemukan."); setLoading(false); return; }
      try {
        const response = await fetch(`/api/result/vak?id=${id}`);
        const result = await response.json();
        if (result.success) setData(result.data);
        else setError("Hasil tidak ditemukan.");
      } catch { setError("Gagal memuat hasil."); }
      finally { setLoading(false); }
    };
    fetchResult();
  }, [searchParams]);

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-gray-400 font-medium">Memproses Laporan VAK...</div>;
  if (error || !data) return <div className="p-10 text-center text-red-500 font-bold">{error || "Data Error"}</div>;

  const { resultData, name, position, date } = data;
  const { percentage, preference } = resultData;

  const renderSection = (title: string, items: string[]) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-3 print:mb-2 print-break-inside-avoid">
        <h4 className="font-bold text-black uppercase mb-1.5 text-xs md:text-sm tracking-widest border-l-2 border-black pl-2">
          {title}
        </h4>
        <ul className="space-y-1">
          {items.map((item, i) => (
            <li key={i} className="text-gray-700 text-xs md:text-sm flex items-start gap-2">
              <span className="text-black mt-1.5 w-1 h-1 rounded-full bg-black shrink-0"></span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans p-4 md:p-12 print:p-0 print:bg-white print:min-h-0 print:h-auto print:overflow-visible">
      <style>{`
        @media print { 
            @page { size: A4; margin: 10mm; }
            body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; font-size: 10pt; }
            .no-print { display: none !important; } 
            .print-break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
            h1 { font-size: 20pt !important; margin-bottom: 4pt !important; }
            h2 { font-size: 14pt !important; }
            h3 { font-size: 12pt !important; }
            .print-grid-3 { display: grid !important; grid-template-cols: repeat(3, 1fr) !important; gap: 15px !important; }
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto print:max-w-none print:w-full">
        {/* Header */}
        <div className="border-b-2 border-black pb-2 mb-6 flex flex-col md:flex-row justify-between md:items-end gap-2 print:flex-row print:break-inside-avoid">
            <div>
                <h1 className="text-xl md:text-3xl font-extrabold uppercase tracking-tight text-black">Laporan Gaya Belajar</h1>
                <p className="text-gray-500 text-xs font-medium uppercase">Working Style Assessment System</p>
            </div>
            <div className="text-left md:text-right text-xs space-y-0.5 print:bg-transparent">
                <div className="flex md:justify-end gap-2"><span className="text-gray-500">Nama:</span> <span className="font-bold">{name}</span></div>
                <div className="flex md:justify-end gap-2"><span className="text-gray-500">Posisi:</span> <span className="font-bold">{position}</span></div>
                <div className="flex md:justify-end gap-2"><span className="text-gray-500">Tanggal:</span> <span className="font-bold">{date}</span></div>
            </div>
        </div>

        {/* Summary Block */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6 shadow-sm print:bg-white print:border-gray-200 print:shadow-none print:mb-6 print:p-4">
            <div className="text-center mb-4 print:mb-4">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Preferensi Dominan</p>
                <div className="mt-1 bg-black text-white px-5 py-2 rounded-lg inline-block print:bg-white print:text-black print:border print:border-black">
                     <div className="text-xl md:text-2xl font-black uppercase tracking-widest">{preference}</div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 print:grid-cols-3 print:pt-4">
                {[
                    { label: 'VISUAL', val: percentage.V, desc: 'Melihat' },
                    { label: 'AUDITORY', val: percentage.A, desc: 'Mendengar' },
                    { label: 'KINESTETIK', val: percentage.K, desc: 'Melakukan' }
                ].map((s) => (
                    <div key={s.label} className="text-center flex flex-col items-center">
                        <div className="relative w-16 h-16 mb-2 print:w-16 print:h-16">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="32" cy="32" r="28" fill="transparent" stroke="#e5e7eb" strokeWidth="4" className="print:cx-[32] print:cy-[32] print:r-[28]" />
                                <circle cx="32" cy="32" r="28" fill="transparent" stroke="#000" strokeWidth="4" 
                                    strokeDasharray={175.8} 
                                    strokeDashoffset={175.8 - (175.8 * s.val / 100)} 
                                    strokeLinecap="round" 
                                    className="print:cx-[32] print:cy-[32] print:r-[28]"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-xs font-black">{s.val}%</div>
                        </div>
                        <h3 className="font-bold text-[10px] tracking-tight">{s.label}</h3>
                    </div>
                ))}
            </div>
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-8 print:space-y-6">
            {['Visual', 'Auditory', 'Kinestetik'].map(type => {
                if (preference.includes(type)) {
                    const desc = vakDescriptions[type];
                    return (
                        <div key={type} className="pt-6 border-t border-gray-200 first:pt-0 first:border-none print-break-inside-avoid">
                            <h3 className="text-xl font-bold uppercase mb-3 tracking-tight print:text-base">Gaya {type}</h3>
                            
                            <div className="mb-6 print:mb-4">
                                 <p className="text-gray-700 text-xs md:text-sm leading-relaxed text-justify italic">{desc.explanation[0]}</p>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
                                {renderSection("Strategi Belajar", desc.intake)}
                                {renderSection("Efektivitas", desc.swot)}
                                {renderSection("Output Kerja", desc.output)}
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>

        {/* Actions */}
        <div className="mt-10 pt-6 border-t border-gray-100 text-center no-print flex flex-col md:flex-row items-center justify-center gap-4 pb-10">
            <Link href="/admin/vak" className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-gray-500 hover:text-black hover:bg-gray-100 transition mb-4 md:mb-0 md:mr-4">
                ← Kembali ke Manajemen VAK
            </Link>
            <button onClick={() => window.print()} className="w-full md:w-auto bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800 transition shadow-lg font-bold text-sm">
                <Printer size={18} className="inline mr-2"/> Cetak PDF
            </button>
        </div>
      </div>
    </div>
  );
}

export default function VakResultPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-400">Memuat Laporan VAK...</div>}>
      <VakResultContent />
    </Suspense>
  );
}