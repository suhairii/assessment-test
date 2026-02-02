"use client";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { personalityDescriptions } from "../../src/data/disc-data";
import Link from "next/link";

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
    <div className="w-full flex justify-center py-4">
      <div className="w-full max-w-[400px]">
        <svg viewBox="0 0 400 250" className="w-full h-auto overflow-visible">
          <style>
            {`
              .chart-line {
                stroke-dasharray: 1000;
                stroke-dashoffset: 1000;
                animation: drawLine 2s ease-out forwards;
              }
              .chart-point {
                opacity: 0;
                animation: fadeIn 0.5s ease-out forwards 1.5s;
              }
              @keyframes drawLine { to { stroke-dashoffset: 0; } }
              @keyframes fadeIn { to { opacity: 1; } }
            `}
          </style>
          {[0, 25, 50, 75, 100].map(v => (
            <line key={v} x1="20" y1={getY(v)} x2="380" y2={getY(v)} stroke="#f3f4f6" strokeWidth="1.5" />
          ))}
          {[0, 25, 50, 75, 100].map(v => (
            <text key={v} x="10" y={getY(v) + 4} fontSize="11" fill="#9ca3af" textAnchor="end" fontWeight="500">{v}</text>
          ))}
          <path d={pathData} fill="none" stroke={color} strokeWidth="4" className="chart-line" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p) => (
            <g key={p.label} className="chart-point">
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const adminCookie = cookies.find(c => c.trim().startsWith('admin_session='));
    setIsAdmin(!!adminCookie);

    const fetchResult = async () => {
      const id = searchParams.get("id");
      if (!id) {
        setError("ID hasil tidak ditemukan.");
        setLoading(false);
        return;
      }
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
    if (!profileData) return (
        <div className="mt-8 p-6 bg-gray-50 border border-gray-200 text-gray-500 rounded-xl text-center text-sm">
            Deskripsi detail untuk profil {profileName} belum tersedia.
        </div>
    );

    return (
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold uppercase mb-1 tracking-tight">Grafik {graphIndex}: {profileName}</h2>
        <h3 className="text-base md:text-lg text-gray-500 mb-6 font-medium border-b border-gray-100 pb-3">Perilaku {type}: {traitLabel}</h3>
        <div className="space-y-8">
            <div>
                <h4 className="font-bold text-black uppercase mb-3 text-xs md:text-sm tracking-widest border-l-4 border-black pl-3">KEKUATAN UTAMA</h4>
                <ul className="space-y-3">
                    {profileData.strength?.map((item: string, i: number) => (
                        <li key={i} className="text-gray-700 text-sm md:text-base flex items-start gap-3">
                            <span className="text-black mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-bold text-black uppercase mb-3 text-xs md:text-sm tracking-widest border-l-4 border-black pl-3">MEMPERBAIKI EFEKTIVITAS</h4>
                <ul className="space-y-3">
                    {profileData.improve?.map((item: string, i: number) => (
                        <li key={i} className="text-gray-700 text-sm md:text-base flex items-start gap-3">
                            <span className="text-black mt-2 w-1.5 h-1.5 rounded-full bg-black shrink-0"></span>
                            <span className="leading-relaxed">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pt-6 border-t border-gray-100">
                <h4 className="font-bold text-black uppercase mb-4 text-xs md:text-sm tracking-widest">KECENDERUNGAN</h4>
                <div className="grid gap-y-4 gap-x-2 text-sm md:text-base text-gray-700">
                    {[
                        { label: "TUJUAN", value: profileData.tendencies?.goal },
                        { label: "MENILAI ORANG", value: profileData.tendencies?.judge },
                        { label: "MEMPENGARUHI", value: profileData.tendencies?.influence },
                        { label: "NILAI BAGI ORG.", value: profileData.tendencies?.valueorg },
                        { label: "BERLEBIHAN", value: profileData.tendencies?.overuses },
                        { label: "DIBAWAH TEKANAN", value: profileData.tendencies?.understress },
                        { label: "KETAKUTAN", value: profileData.tendencies?.fears },
                    ].map((row, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row md:gap-4">
                            <span className="font-bold text-gray-400 shrink-0 uppercase text-xs w-32 pt-1">{row.label}</span> 
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
            @page { size: A4; margin: 15mm; }
            body { background: white !important; -webkit-print-color-adjust: exact; }
            .no-print { display: none !important; }
            .print-break-inside-avoid { break-inside: avoid; page-break-inside: avoid; }
            .print-new-page { break-before: page; page-break-before: always; }
            .print-grid { display: block !important; }
            .print-col { margin-bottom: 40px; border-bottom: 1px solid #eee; padding-bottom: 40px; }
          }
        `}
      </style>
      <div className="max-w-6xl mx-auto">
        <div className="border-b-2 border-black pb-6 mb-8 flex flex-col md:flex-row justify-between md:items-end gap-6 print:flex-row print:items-end">
            <div>
                <h1 className="text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-2">Laporan Analisa DISC</h1>
                <p className="text-gray-500 text-sm font-medium">Psychology Assessment System</p>
            </div>
            <div className="text-left md:text-right text-sm space-y-1 bg-gray-50 p-4 rounded-lg md:bg-transparent md:p-0 print:bg-transparent">
                <div className="flex md:justify-end gap-2"><span className="text-gray-500 w-16">Nama:</span> <span className="font-bold">{name}</span></div>
                <div className="flex md:justify-end gap-2"><span className="text-gray-500 w-16">Posisi:</span> <span className="font-bold">{position}</span></div>
                <div className="flex md:justify-end gap-2"><span className="text-gray-500 w-16">Tanggal:</span> <span className="font-bold">{date}</span></div>
            </div>
        </div>

        <div className="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 mb-12 shadow-sm print:bg-white print:border-none print:shadow-none print:mb-8">
            <h2 className="text-sm font-bold uppercase mb-6 text-center tracking-widest text-gray-400">Ringkasan Grafik</h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 relative print:grid-cols-2">
                <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2 print:block"></div>
                <div className="text-center">
                    <p className="text-xs md:text-sm font-medium text-gray-500 mb-2">Titik Paling Tinggi pada Grafik 1 <br/>(Perilaku &quot;Adaptasi&quot; Anda adalah):</p>
                    <div className="mt-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm inline-block min-w-[200px] print:border-gray-200 print:shadow-none">
                        <div className="text-lg md:text-xl font-bold text-blue-700 mb-1">{profileTypeMost || "Tidak Diketahui"}</div>
                        <div className="text-base md:text-lg font-bold text-gray-900">{highestMost.label}</div>
                    </div>
                </div>
                <div className="text-center pt-8 md:pt-0 border-t border-gray-200 md:border-t-0 print:pt-0 print:border-t-0">
                    <p className="text-xs md:text-sm font-medium text-gray-500 mb-2">Titik Paling Tinggi pada Grafik 2 <br/>(Perilaku &quot;Alami&quot; Anda adalah):</p>
                    <div className="mt-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm inline-block min-w-[200px] print:border-gray-200 print:shadow-none">
                        <div className="text-lg md:text-xl font-bold text-green-700 mb-1">{profileTypeLeast || "Tidak Diketahui"}</div>
                        <div className="text-base md:text-lg font-bold text-gray-900">{highestLeast.label}</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 mb-16 print:grid-cols-2 print:mb-8">
            <div className="print-break-inside-avoid">
                <h3 className="text-center font-bold text-base md:text-lg mb-2">Grafik 1: Adaptasi</h3>
                <p className="text-center text-xs text-gray-400 mb-6 uppercase tracking-wider">Pekerjaan / Kantor</p>
                <LineChart data={graphMost} color="#1d4ed8" />
            </div>
            <div className="print-break-inside-avoid">
                <h3 className="text-center font-bold text-base md:text-lg mb-2">Grafik 2: Alami</h3>
                <p className="text-center text-xs text-gray-400 mb-6 uppercase tracking-wider">Sehari-hari / Rumah</p>
                <LineChart data={graphLeast} color="#15803d" />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 border-t border-black pt-12 mt-12 relative print:block print:pt-8 print:mt-8">
            <div className="hidden md:block absolute top-12 bottom-0 left-1/2 w-px bg-gray-200 -translate-x-1/2 print:hidden"></div>
            <div className="print-col print-break-inside-avoid">
                <DetailedReport graphIndex={1} type="Adaptasi" profileName={profileTypeMost} traitLabel={highestMost.label} profileData={profileMost} />
            </div>
            <div className="print-col print-break-inside-avoid print-new-page">
                <DetailedReport graphIndex={2} type="Alami" profileName={profileTypeLeast} traitLabel={highestLeast.label} profileData={profileLeast} />
            </div>
        </div>

        <div className="mt-20 text-center no-print pb-10">
            {isAdmin && (
                <Link href="/admin/dashboard" className="inline-block px-6 py-3 rounded-full font-bold text-sm text-gray-500 hover:text-black hover:bg-gray-100 transition mb-4 md:mb-0 md:mr-4">
                    ← Kembali ke Dashboard
                </Link>
            )}
            <button onClick={() => window.print()} className="w-full md:w-auto bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition shadow-lg font-bold text-sm">
              Cetak Laporan (PDF)
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