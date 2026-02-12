"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import { Trash2, Eye, Link as LinkIcon, Database, CheckCircle, XCircle, RefreshCw, Brain, Share, Search, Calendar, Filter } from "lucide-react";
import { toast } from "@/src/components/ui/Toast";
import { Modal } from "@/src/components/ui/Modal";
import ShareModal from "@/src/components/ui/ShareModal";

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
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const { data, error, mutate, isValidating } = useSWR("/api/admin/results/iq", fetcher, {
    refreshInterval: 5000,
    revalidateOnFocus: true
  });

  const allResults: TestResult[] = data?.success ? data.data : [];

  // Filter logic
  const results = allResults.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.position.toLowerCase().includes(searchTerm.toLowerCase());
    
    const itemDate = new Date(item.createdAt).toISOString().split('T')[0];
    const matchesDate = !selectedDate || itemDate === selectedDate;
    
    const matchesCategory = !categoryFilter || item.resultData.category === categoryFilter;

    return matchesSearch && matchesDate && matchesCategory;
  });

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
        setShareUrl(link);
        setShareModalOpen(true);
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
      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} url={shareUrl} />
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
                Share Link
            </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Cari Peserta</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Nama atau posisi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm font-medium"
            />
          </div>
        </div>
        
        <div className="w-full md:w-auto">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Pilih Tanggal</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm font-medium"
            />
          </div>
        </div>

        <div className="w-full md:w-auto">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Kategori IQ</label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-sm font-medium appearance-none"
            >
              <option value="">Semua Kategori</option>
              <option value="Sangat berbakat">Sangat Berbakat</option>
              <option value="Kecerdasan superior">Superior</option>
              <option value="Kecerdasan tinggi">Kecerdasan Tinggi</option>
              <option value="Kecerdasan di atas rata-rata">Di Atas Rata-rata</option>
              <option value="Kecerdasan rata-rata">Rata-rata</option>
              <option value="Kecerdasan di bawah rata-rata">Di Bawah Rata-rata</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => {
            setSearchTerm("");
            setSelectedDate("");
            setCategoryFilter("");
          }}
          className="px-4 py-2.5 text-gray-400 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-colors"
        >
          Reset
        </button>
      </div>
      
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
                      onClick={() => {
                        setShareUrl(`${window.location.origin}/result/iq?id=${item.id}`);
                        setShareModalOpen(true);
                      }}
                      className="text-gray-400 hover:text-blue-600 p-2 hover:bg-white rounded-lg transition shadow-sm border border-transparent hover:border-gray-100"
                      title="Share Result"
                    >
                      <Share size={18} />
                    </button>
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