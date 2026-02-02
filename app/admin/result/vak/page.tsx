"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { vakDescriptions } from "../../../../src/data/vak-data";
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const adminCookie = cookies.find(c => c.trim().startsWith('admin_session='));
    setIsAdmin(!!adminCookie);

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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-gray-400 font-medium">Memproses Hasil VAK...</div>;
  if (error || !data) return <div className="p-10 text-center text-red-500 font-bold">{error || "Data Error"}</div>;

  const { resultData, name, position, date } = data;
  const { percentage, preference } = resultData;

  const renderSection = (title: string, items: string[], color: string) => {
    if (!items || items.length === 0) return null;
    return (
      <div className="mb-8 print-break-inside-avoid">
        <h4 className={`font-bold uppercase text-sm tracking-widest mb-4 border-l-4 pl-3 ${color}`}>
          {title}
        </h4>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="text-gray-700 text-sm md:text-base flex items-start gap-3">
              <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${color.replace('text-','bg-').replace('border-','bg-')}`}></span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans p-4 md:p-12 print:p-0">
      <style>{`@media print { .no-print { display: none !important; } .print-break-inside-avoid { break-inside: avoid; } }`}</style>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-purple-600 pb-6 mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 print:flex-row">
            <div>
                <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-2 text-purple-700">Laporan Gaya Belajar (VAK)</h1>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Working Style Assessment</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl space-y-1 text-sm md:text-right print:bg-white print:p-0">
                <div className="flex md:justify-end gap-2 text-purple-900 font-bold"><User size={16} /> {name}</div>
                <div className="flex md:justify-end gap-2 text-purple-700"><Briefcase size={16} /> {position}</div>
                <div className="flex md:justify-end gap-2 text-gray-500 font-mono"><Calendar size={16} /> {date}</div>
            </div>
        </div>

        {/* Big Result */}
        <div className="text-center mb-12 py-8 bg-purple-600 text-white rounded-3xl shadow-xl shadow-purple-100">
            <p className="text-xs uppercase font-bold tracking-[0.3em] opacity-80 mb-2">Preferensi Dominan Anda Adalah</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-2">{preference}</h2>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
                { label: 'VISUAL', val: percentage.V, color: 'bg-blue-500', desc: 'Melihat' },
                { label: 'AUDITORY', val: percentage.A, color: 'bg-purple-500', desc: 'Mendengar' },
                { label: 'KINESTETIK', val: percentage.K, color: 'bg-orange-500', desc: 'Melakukan' }
            ].map((s) => (
                <div key={s.label} className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-4">
                        <svg className="w-full h-full -rotate-90">
                            <circle cx="48" cy="48" r="40" fill="transparent" stroke="#e5e7eb" strokeWidth="8" />
                            <circle cx="48" cy="48" r="40" fill="transparent" stroke="currentColor" strokeWidth="8" 
                                className={s.color.replace('bg-','text-')} 
                                strokeDasharray={251.2} 
                                strokeDashoffset={251.2 - (251.2 * s.val / 100)} 
                                strokeLinecap="round" 
                            />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xl font-black">{s.val}%</div>
                    </div>
                    <h3 className="font-bold text-sm tracking-widest">{s.label}</h3>
                    <p className="text-xs text-gray-400 font-medium uppercase mt-1">{s.desc}</p>
                </div>
            ))}
        </div>

        {/* Explanation Block */}
        <div className="space-y-12">
            {/* Logic: If multimodal, show multiple explanations or combined */}
            {['Visual', 'Auditory', 'Kinestetik'].map(type => {
                if (preference.includes(type)) {
                    const desc = vakDescriptions[type];
                    return (
                        <div key={type} className="border-t-2 border-gray-100 pt-10 first:border-t-0 first:pt-0">
                            <h3 className="text-2xl font-bold mb-6 text-purple-900">Penjelasan Gaya {type}</h3>
                            <div className="space-y-4 mb-10">
                                {desc.explanation.map((p: string, i: number) => <p key={i} className="text-gray-600 leading-relaxed italic">{p}</p>)}
                            </div>
                            
                            <div className="grid md:grid-cols-3 gap-8">
                                {renderSection("Strategi Belajar (Intake)", desc.intake, "text-blue-600 border-blue-600")}
                                {renderSection("Efektivitas (Swot)", desc.swot, "text-purple-600 border-purple-600")}
                                {renderSection("Penyampaian Ide (Output)", desc.output, "text-orange-600 border-orange-600")}
                            </div>
                        </div>
                    );
                }
                return null;
            })}
        </div>

        {/* Footer Actions */}
        <div className="mt-20 pt-10 border-t border-gray-100 text-center no-print flex flex-col md:flex-row items-center justify-center gap-4 pb-10">
            <Link href="/admin/vak" className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-gray-500 hover:text-black hover:bg-gray-100 transition"><Home size={18}/> Kembali ke Dashboard VAK</Link>
            <button onClick={() => window.print()} className="w-full md:w-auto flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition shadow-lg font-bold text-sm"><Printer size={18}/> Cetak Laporan (PDF)</button>
        </div>
      </div>
    </div>
  );
}

export default function VakResultPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Memuat...</div>}>
      <VakResultContent />
    </Suspense>
  );
}
