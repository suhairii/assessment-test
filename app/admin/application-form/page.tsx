"use client";

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { 
  FileText, Search, Calendar, RefreshCw, CheckCircle, XCircle, 
  Link as LinkIcon, Database, Eye, Share, Trash2, Download
} from "lucide-react";
import { toast } from "@/src/components/ui/Toast";
import { Modal } from "@/src/components/ui/Modal";
import ShareModal from "@/src/components/ui/ShareModal";
import CandidatesTable from "@/src/components/application-form/CandidatesTable";
import { exportToPDF } from "@/src/lib/application-form-utils/pdfGenerator";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ApplicationFormAdminPage() {
  const [dbStatus, setDbStatus] = useState<{ status: string; message: string } | null>(null);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string }>({ isOpen: false, id: "" });
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const { data, error, mutate, isValidating } = useSWR("/api/applications", fetcher, {
    refreshInterval: 10000,
  });

  useEffect(() => {
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
      const res = await fetch("/api/admin/token", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "APPLICATION" })
      });
      const d = await res.json();
      if (d.success) {
        const link = `${window.location.origin}/application-form?token=${d.token}`;
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
      const res = await fetch(`/api/applications?id=${id}`, { method: 'DELETE' });
      const d = await res.json();
      if (d.success) {
        mutate();
        toast.success("Data pelamar berhasil dihapus.");
        setDeleteModal({ isOpen: false, id: "" });
      } else {
        toast.error(d.error || "Gagal menghapus data.");
      }
    } catch {
      toast.error("Terjadi kesalahan sistem.");
    }
  };

  const applications = Array.isArray(data) ? data : [];

  const filteredApplications = applications.filter((app: any) => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      app.appliedPosition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const itemDate = new Date(app.createdAt).toISOString().split('T')[0];
    const matchesDate = !selectedDate || itemDate === selectedDate;
    
    return matchesSearch && matchesDate;
  });

  if (error) return <div className="p-10 text-center text-red-500 font-bold">Gagal memuat data.</div>;
  if (!data && !error) return <div className="p-10 text-center animate-pulse text-gray-400 font-medium italic">Memproses data lamaran...</div>;

  return (
    <div className="p-1">
      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} url={shareUrl} />
      <Modal 
        isOpen={deleteModal.isOpen}
        title="Hapus Data Pelamar?"
        message="Apakah Anda yakin ingin menghapus data pelamar ini secara permanen? Tindakan ini tidak dapat dibatalkan."
        type="danger"
        confirmText="Hapus Sekarang"
        onConfirm={() => handleDelete(deleteModal.id)}
        onCancel={() => setDeleteModal({ isOpen: false, id: "" })}
      />
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1 text-blue-600">
            <FileText size={28} />
            <h1 className="text-3xl font-bold text-gray-900">Application Forms</h1>
            {isValidating && <RefreshCw size={16} className="text-blue-500 animate-spin" />}
          </div>
          <p className="text-gray-500 font-medium text-sm">Manajemen Data Pelamar Kerja</p>
        </div>
        
        <div className="flex items-center gap-3">
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
            Share Form Link
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-6 flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Cari Pelamar</label>
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
          <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Tanggal Submit</label>
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

        <button 
          onClick={() => {
            setSearchTerm("");
            setSelectedDate("");
          }}
          className="px-4 py-2.5 text-gray-400 hover:text-blue-600 font-bold text-[10px] uppercase tracking-widest transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <CandidatesTable 
          candidates={filteredApplications} 
          onDelete={(id) => setDeleteModal({ isOpen: true, id })}
        />
        {filteredApplications.length === 0 && (
          <div className="p-20 text-center text-gray-300">
            <div className="flex flex-col items-center justify-center">
              <Database size={64} className="mb-4 opacity-10" />
              <p className="font-bold uppercase tracking-widest text-xs">Belum ada data pelamar.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
