"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Printer, ArrowLeft, User, Briefcase, GraduationCap, Users, Languages, Phone, Heart, FileText, Download } from "lucide-react";
import { toast } from "@/src/components/ui/Toast";

function DetailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const id = searchParams.get("id");
    const fetchDetail = async () => {
      if (!id) {
        setError("ID pelamar tidak ditemukan.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`/api/applications`);
        const allData = await response.json();
        const detail = allData.find((item: any) => item.id === id);
        
        if (detail) {
          setData(detail);
        } else {
          setError("Data pelamar tidak ditemukan.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError("Gagal memuat data pelamar.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [searchParams]);

  if (loading) return <div className="p-10 text-center text-gray-500 font-medium animate-pulse">Memuat Data Pelamar...</div>;
  if (error) return <div className="p-10 text-center text-red-500 font-bold">{error}</div>;
  if (!data) return null;

  const SectionHeader = ({ icon: Icon, title }: { icon: any, title: string }) => (
    <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2 mb-6 mt-10">
      <Icon size={20} className="text-blue-600" />
      <h2 className="text-lg font-black uppercase tracking-tight text-slate-900">{title}</h2>
    </div>
  );

  const DataRow = ({ label, value }: { label: string, value: any }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 py-2 border-b border-slate-50 last:border-0">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="md:col-span-2 text-sm font-semibold text-slate-700">{value || "-"}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-4 md:p-12 print:p-0">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-slate-100 pb-8 mb-10 no-print">
          <div>
            <Link href="/admin/application-form" className="inline-flex items-center text-blue-600 font-bold text-xs uppercase tracking-widest mb-4 hover:gap-2 transition-all">
              <ArrowLeft size={14} className="mr-1" /> Kembali ke Manajemen
            </Link>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">Detail Pelamar</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Application ID: <span className="font-mono text-blue-500">{data.id}</span></p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button 
                onClick={() => window.print()} 
                className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-lg active:scale-95"
            >
              <Printer size={18} /> Cetak Laporan
            </button>
          </div>
        </div>

        {/* Print Only Header */}
        <div className="hidden print:flex justify-between items-end border-b-4 border-slate-900 pb-6 mb-10">
            <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter">Curriculum Vitae</h1>
                <p className="text-slate-500 font-bold text-xs italic tracking-widest">Assessment & Recruitment System</p>
            </div>
            <div className="text-right">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Position Applied</p>
                <p className="text-xl font-black text-blue-600">{data.appliedPosition}</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* PERSONAL DATA */}
          <div>
            <SectionHeader icon={User} title="Data Pribadi" />
            <div className="space-y-1">
              <DataRow label="Nama Lengkap" value={data.personalData?.fullName} />
              <DataRow label="Nama Panggilan" value={data.personalData?.nickname} />
              <DataRow label="Posisi Dilamar" value={data.appliedPosition} />
              <DataRow label="Jenis Kelamin" value={data.personalData?.gender} />
              <DataRow label="Tempat/Tgl Lahir" value={`${data.personalData?.placeOfBirth}, ${data.personalData?.dateOfBirth}`} />
              <DataRow label="Agama" value={data.personalData?.religion} />
              <DataRow label="Gol. Darah" value={data.personalData?.bloodType} />
              <DataRow label="No. KTP" value={data.personalData?.ktpNo} />
              <DataRow label="Status" value={data.personalData?.status} />
            </div>
          </div>

          {/* CONTACT INFO */}
          <div>
            <SectionHeader icon={Phone} title="Kontak & Alamat" />
            <div className="space-y-1">
              <DataRow label="Email" value={data.personalData?.email} />
              <DataRow label="No. Handphone" value={data.personalData?.mobilePhone} />
              <DataRow label="Telepon Rumah" value={data.personalData?.homePhone} />
              <DataRow label="Alamat Sekarang" value={data.personalData?.currentAddress} />
              <DataRow label="Alamat KTP" value={data.personalData?.ktpAddress} />
            </div>
          </div>
        </div>

        {/* FAMILY DATA */}
        <SectionHeader icon={Users} title="Data Keluarga" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            <div className="border-r border-slate-50 pr-5">
                <p className="text-[10px] font-black text-blue-600 uppercase mb-4 tracking-widest italic">Ayah Kandung</p>
                <DataRow label="Nama" value={data.familyData?.father?.name} />
                <DataRow label="Pekerjaan" value={data.familyData?.father?.occupation} />
            </div>
            <div className="pl-5">
                <p className="text-[10px] font-black text-blue-600 uppercase mb-4 tracking-widest italic">Ibu Kandung</p>
                <DataRow label="Nama" value={data.familyData?.mother?.name} />
                <DataRow label="Pekerjaan" value={data.familyData?.mother?.occupation} />
            </div>
        </div>

        {/* EDUCATION */}
        <SectionHeader icon={GraduationCap} title="Pendidikan Formal" />
        <div className="overflow-hidden border border-slate-100 rounded-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <tr>
                <th className="p-4 border-b">Jenjang</th>
                <th className="p-4 border-b">Institusi</th>
                <th className="p-4 border-b">Jurusan</th>
                <th className="p-4 border-b">Tahun Lulus</th>
                <th className="p-4 border-b text-center">IPK/Nilai</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-sm">
              {Object.entries(data.education || {}).map(([key, edu]: any) => (
                <tr key={key} className="hover:bg-blue-50/20 transition">
                  <td className="p-4 font-bold uppercase">{key}</td>
                  <td className="p-4 text-slate-700 font-semibold">{edu.institution}</td>
                  <td className="p-4 text-slate-500">{edu.major}</td>
                  <td className="p-4 text-slate-500">{edu.graduationYear}</td>
                  <td className="p-4 text-center font-bold text-blue-600">{edu.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EMPLOYMENT HISTORY */}
        <SectionHeader icon={Briefcase} title="Riwayat Pekerjaan" />
        <div className="space-y-6">
          {data.employmentHistory?.map((job: any, idx: number) => job.companyName && (
            <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900">{job.jobTitle}</h3>
                  <p className="text-blue-600 font-bold text-sm tracking-tight">{job.companyName}</p>
                </div>
                <div className="text-right">
                  <span className="bg-white border border-slate-200 px-3 py-1 rounded-full text-[10px] font-black text-slate-400">
                    {job.startWorking} - {job.resigned}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <DataRow label="Gaji Terakhir" value={job.salary} />
                <DataRow label="Atasan Langsung" value={job.supervisorName} />
                <div className="md:col-span-2 mt-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Tugas & Tanggung Jawab:</p>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">{job.jobDesc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* FINAL DATA */}
        <SectionHeader icon={Heart} title="Informasi Tambahan" />
        <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl shadow-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Gaji yang Diharapkan</p>
                <p className="text-2xl font-black text-blue-400">Rp {data.finalSection?.expectedSalary}</p>
            </div>
            <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ketersediaan Bergabung</p>
                <p className="text-xl font-black">{data.finalSection?.availability}</p>
            </div>
            <div className="text-center md:text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tanggal Mulai Tersedia</p>
                <p className="text-xl font-black">{data.finalSection?.expectedJoinDate}</p>
            </div>
        </div>

        <div className="mt-20 text-center no-print pb-10">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-[0.3em] mb-4">Powered by Frexor Assessment</p>
        </div>
      </div>
    </div>
  );
}

export default function DetailPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center animate-pulse text-gray-400">Loading Detail...</div>}>
      <DetailContent />
    </Suspense>
  );
}
