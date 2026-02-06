"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { personalityDescriptions } from "@/src/data/disc-data";
import Link from "next/link";
import { Printer } from "lucide-react";

interface ProfileDescription {
  strength: string[];
  improve: string[];
  tendencies: {
    goal: string;
    judge: string;
    influence: string;
    valueorg: string;
    overuses: string;
    understress: string;
    fears: string;
  };
}

interface ResultData {
  resultData: {
    graphMost: { D: number; I: number; S: number; C: number };
    graphLeast: { D: number; I: number; S: number; C: number };
    profileTypeMost: string;
    profileTypeLeast: string;
    profileCodeMost: string;
    highestMost: { trait: string; value: number; label: string };
    highestLeast: { trait: string; value: number; label: string };
  };
  name: string;
  position: string;
  date: string;
}

function LineChart({ data, color }: { data: { D: number; I: number; S: number; C: number }, color: string }) {
  const points = [
    { label: 'D', value: data.D, x: 50 },
    { label: 'I', value: data.I, x: 150 },
    { label: 'S', value: data.S, x: 250 },
    { label: 'C', value: data.C, x: 350 },
  ];

  const getY = (val: number) => 220 - (val * 2);
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${getY(p.value)}`).join(' ');

  return (
    <div className="w-full flex justify-center py-2 print:py-2">
      <div className="w-full max-w-[400px] print:max-w-[280px]">
        <svg viewBox="0 0 400 250" className="w-full h-auto overflow-visible">
          {[0, 25, 50, 75, 100].map(v => (
            <line key={v} x1="20" y1={getY(v)} x2="380" y2={getY(v)} stroke="#f3f4f6" strokeWidth="1.5" />
          ))}
          {[0, 25, 50, 75, 100].map(v => (
            <text key={v} x="10" y={getY(v) + 4} fontSize="11" fill="#9ca3af" textAnchor="end" fontWeight="500">{v}</text>
          ))}
          <path d={pathData} fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p) => (
            <g key={p.label}>
              <circle cx={p.x} cy={getY(p.value)} r="6" fill="white" stroke={color} strokeWidth="3" />
              <text x={p.x} y="248" textAnchor="middle" fontWeight="bold" fill="#374151" fontSize="14">{p.label}</text>
              <text x={p.x} y={getY(p.value) - 12} textAnchor="middle" fontSize="13" fill={color} fontWeight="bold">{p.value}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function ResultContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      const id = searchParams.get("id");
      if (!id) { setError("ID hasil tidak ditemukan."); setLoading(false); return; }
      try {
        const response = await fetch(`/api/result?id=${id}`);
        const result = await response.json();
        if (result.success) setData(result.data);
        else setError("Data hasil tidak ditemukan.");
      } catch (err) {
        console.error("Error:", err);
        setError("Gagal memuat hasil.");
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, [searchParams]);

  if (loading) return <div className="p-10 text-center text-gray-500 font-medium animate-pulse">Memproses Hasil...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;
  if (!data) return null;

  const { resultData, name, position, date } = data;
  const { graphMost, graphLeast, profileTypeMost, profileTypeLeast, highestMost, highestLeast } = resultData;
  const profileMost = personalityDescriptions[profileTypeMost];
  const profileLeast = personalityDescriptions[profileTypeLeast];

  const DetailedReport = ({ type, profileName, traitLabel, profileData, graphIndex }: any) => {
    if (!profileData) return null;

    return (
      <div className="flex flex-col print:text-[10pt]">
        <h2 className="text-lg md:text-xl font-bold uppercase mb-2 tracking-tight print:text-base">Grafik {graphIndex}: {profileName}</h2>
        <h3 className="text-sm md:text-base text-gray-500 mb-3 font-medium border-b border-gray-100 pb-2 print:text-[9pt] print:mb-3">Perilaku {type}: {traitLabel}</h3>
        <div className="space-y-4 print:space-y-3">
            <div>
                <h4 className="font-bold text-black uppercase mb-2 text-[10px] tracking-widest border-l-2 border-black pl-2">KEKUATAN UTAMA</h4>
                <ul className="space-y-1">
                    {profileData.strength?.map((item: string, i: number) => (
                        <li key={i} className="text-gray-700 text-xs md:text-sm flex items-start gap-2">
                            <span className="text-black mt-1.5 w-1 h-1 rounded-full bg-black shrink-0"></span>
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-black uppercase mb-2 text-[10px] tracking-widest border-l-2 border-black pl-2">KECENDERUNGAN</h4>
                <div className="grid gap-y-1.5 text-[10px] md:text-xs text-gray-700">
                    {[
                        { label: "TUJUAN", value: profileData.tendencies?.goal },
                        { label: "MENILAI", value: profileData.tendencies?.judge },
                        { label: "PENGARUH", value: profileData.tendencies?.influence },
                        { label: "KETAKUTAN", value: profileData.tendencies?.fears },
                    ].map((row, idx) => (
                        <div key={idx} className="flex gap-2">
                            <span className="font-bold text-gray-400 shrink-0 uppercase w-20">{row.label}:</span> 
                            <span className="font-medium text-gray-900">{row.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans p-4 md:p-12 print:p-0">
      <style>
        {`
          @media print {
            @page { size: A4; margin: 10mm; }
            body { background: white !important; font-size: 10pt; }
            .no-print { display: none !important; }
            .print-text-small { font-size: 9pt !important; }
            h1 { font-size: 20pt !important; }
            h2 { font-size: 14pt !important; }
            h3 { font-size: 11pt !important; }
            h4 { font-size: 9pt !important; margin-bottom: 4pt !important; }
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-black pb-4 mb-6 flex flex-col md:flex-row justify-between md:items-end gap-4 print:flex-row print:mb-6">
            <div>
                <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-1">Laporan Analisa DISC</h1>
                <p className="text-gray-500 text-xs font-medium">Psychology Assessment System</p>
            </div>
            <div className="text-left md:text-right text-xs space-y-0.5 print:bg-transparent">
                <div className="flex md:justify-end gap-2"><span className="text-gray-500">Nama:</span> <span className="font-bold">{name}</span></div>
                <div className="flex md:justify-end gap-2"><span className="text-gray-500">Posisi:</span> <span className="font-bold">{position}</span></div>
                <div className="flex md:justify-end gap-2"><span className="text-gray-500">Tanggal:</span> <span className="font-bold">{date}</span></div>
            </div>
        </div>

        <div className="bg-gray-50 p-4 md:p-6 rounded-xl border border-gray-100 mb-6 shadow-sm print:bg-white print:border-gray-200 print:mb-6 print:p-4">
            <div className="grid md:grid-cols-2 gap-4 relative print:grid-cols-2">
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2 print:block"></div>
                <div className="text-center">
                    <p className="text-xs font-medium text-gray-500 mb-1 italic">Perilaku Adaptasi (Grafik 1)</p>
                    <div className="bg-black text-white px-4 py-2 rounded-lg inline-block print:bg-white print:text-black print:border print:border-black">
                        <span className="text-base font-bold">{profileTypeMost}</span>
                    </div>
                </div>
                <div className="text-center print:border-t-0">
                    <p className="text-xs font-medium text-gray-500 mb-1 italic">Perilaku Alami (Grafik 2)</p>
                    <div className="bg-black text-white px-4 py-2 rounded-lg inline-block print:bg-white print:text-black print:border print:border-black">
                        <span className="text-base font-bold">{profileTypeLeast}</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8 print:grid-cols-2 print:mb-6 print:gap-8">
            <div className="text-center">
                <h3 className="font-bold text-sm mb-2">Grafik 1: Adaptasi</h3>
                <LineChart data={graphMost} color="#000000" />
            </div>
            <div className="text-center">
                <h3 className="font-bold text-sm mb-2">Grafik 2: Alami</h3>
                <LineChart data={graphLeast} color="#000000" />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 border-t border-black pt-6 mt-6 print:grid-cols-2 print:pt-6 print:mt-6 print:gap-10">
            <DetailedReport graphIndex={1} type="Adaptasi" profileName={profileTypeMost} traitLabel={highestMost.label} profileData={profileMost} />
            <DetailedReport graphIndex={2} type="Alami" profileName={profileTypeLeast} traitLabel={highestLeast.label} profileData={profileLeast} />
        </div>

        <div className="mt-10 text-center no-print pb-10">
            <Link href="/admin/disc" className="inline-block px-6 py-3 rounded-full font-bold text-sm text-gray-500 hover:text-black hover:bg-gray-100 transition mb-4 md:mb-0 md:mr-4">
                ← Kembali ke Manajemen DISC
            </Link>
            <button onClick={() => window.print()} className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition shadow-lg font-bold text-sm">
              <Printer size={18} className="inline mr-2" /> Cetak Laporan (PDF)
            </button>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultContent />
    </Suspense>
  );
}