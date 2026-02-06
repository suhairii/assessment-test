"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Trash2, Eye, Link as LinkIcon, Database, CheckCircle, XCircle, RefreshCw, Brain } from "lucide-react";
import { toast } from "@/src/components/ui/Toast";
import { Modal } from "@/src/components/ui/Modal";

interface TestResult {
  id: string;
  createdAt: string;
  name: string;
  position: string;
  date: string;
  resultData: {
    iqScore: number;
    category: string;
  };
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function IqAdminPage() {
  const [dbStatus, setDbStatus] = useState<{ status: string; message: string } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: "" });
  const [isHrd, setIsHrd] = useState(false);

  const { data, error, mutate, isValidating } = useSWR("/api/admin/results/iq", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true
  });

  const results: TestResult[] = data?.success ? data.data : [];

  useEffect(() => {
    // Check Role
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(c => c.trim().startsWith('admin_session='));
    if (sessionCookie) {
        const role = sessionCookie.split('=')[1];
        if (role === 'hrd') setIsHrd(true);
    }

    const checkDb = async () => {
        try {
            const res = await fetch("/api/health");
            const d = await res.json();
            setDbStatus(d);
        } catch {
            setDbStatus({ status: 'error', message: 'Check Failed' });
        }
    };
    checkDb();
  }, []);

  const handleGenerateLink = async () => {
    try {
      const res = await fetch("/api/admin/token", { method: "POST" });
      const d = await res.json();
      if (d.success) {
        const link = `${window.location.origin}/test/iq?token=${d.token}`;
        navigator.clipboard.writeText(link);
        toast.success("Link Undangan IQ disalin!");
      } else {
        toast.error("Gagal membuat link.");
      }
    } catch {
      toast.error("Gagal membuat link.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
        const res = await fetch(`/api/admin/results/iq?id=${id}`, { method: 'DELETE' });
        if (res.ok) {
            mutate();
            toast.success("Data berhasil dihapus.");
        } else {
            toast.error("Gagal menghapus data.");
        }
    } catch {
        toast.error("Terjadi kesalahan.");
    }
  };

  if (error) return <div className="p-10 text-center text-red-500 font-bold">Gagal memuat data IQ.</div>;
  if (!data && !error) return <div className="p-10 text-center animate-pulse text-gray-400 font-medium italic">Memproses data IQ...</div>;

  return (
    <div>
      <Modal 
        isOpen={deleteModal.isOpen}
        title="Hapus Hasil IQ?"
        message="Hapus data ini permanen? Tindakan ini tidak dapat dibatalkan."
        type="danger"
        confirmText="Hapus"
        onConfirm={() => handleDelete(deleteModal.id)}
        onCancel={() => setDeleteModal({ isOpen: false, id: "" })}
      />

      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <div className="flex items-center gap-3 mb-1 text-blue-600">
                <Brain size={28} />
                <h1 className="text-3xl font-bold text-gray-900">Manajemen IQ</h1>
                {isValidating && <RefreshCw size={16} className="text-blue-500 animate-spin" />}
            </div>
            <p className="text-gray-500 font-medium text-sm">Aptitude Assessment Results</p>
        </div>
        
        <div className="flex items-center gap-3">
            {!isHrd && (
                <Link
                    href="/admin/iq/questions"
                    className="bg-white text-gray-700 border border-gray-200 px-5 py-2.5 rounded-xl font-bold hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-sm"
                >
                    <Database size={18} />
                    Edit Soal IQ
                </Link>
            )}
            {dbStatus && (
                <div className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border ${dbStatus.status === 'ok' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    {dbStatus.status === 'ok' ? <CheckCircle size={14} /> : <XCircle size={14} />}
                    {dbStatus.status === 'ok' ? 'Database OK' : 'DB Error'}
                </div>
            )}
            <button
                onClick={handleGenerateLink}
                className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg hover:shadow-blue-200 flex items-center gap-2 active:scale-95 text-sm"
            >
                <LinkIcon size={18} />
                Share IQ Link
            </button>
        </div>
      </header>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
              <th className="p-5">Tanggal</th>
              <th className="p-5">Nama Peserta</th>
              <th className="p-5">Posisi</th>
              <th className="p-5">IQ Score</th>
              <th className="p-5">Kategori</th>
              <th className="p-5 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {results.map((item) => (
              <tr key={item.id} className="hover:bg-blue-50/30 transition group">
                <td className="p-5 text-xs text-gray-400 font-mono">
                  {new Date(item.createdAt).toLocaleDateString('id-ID')}
                </td>
                <td className="p-5 font-bold text-gray-900">{item.name}</td>
                <td className="p-5 text-gray-500 text-sm font-medium">{item.position}</td>
                <td className="p-5">
                  <span className="text-xl font-black text-blue-700">
                    {item.resultData.iqScore || "-"}
                  </span>
                </td>
                <td className="p-5">
                  <span className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-wider">
                    {item.resultData.category || "-"}
                  </span>
                </td>
                <td className="p-5 text-center">
                  <div className="flex justify-center gap-2">
                    <Link 
                      href={`/admin/result/iq?id=${item.id}`}
                      className="text-gray-400 hover:text-black p-2 hover:bg-white rounded-lg transition shadow-sm border border-transparent hover:border-gray-100"
                    >
                      <Eye size={18} />
                    </Link>
                    <button
                      onClick={() => setDeleteModal({ isOpen: true, id: item.id })}
                      className="text-gray-300 hover:text-red-600 p-2 hover:bg-white rounded-lg transition shadow-sm border border-transparent hover:border-gray-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={6} className="p-20 text-center text-gray-300">
                  <div className="flex flex-col items-center justify-center">
                    <Brain size={64} className="mb-4 opacity-10" />
                    <p className="font-bold uppercase tracking-widest text-xs">Belum ada data IQ</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}