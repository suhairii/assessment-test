"use client";
import Link from "next/link";
import { Users, FileText, Brain, ArrowRight, Settings, Link as LinkIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/src/components/ui/Toast";
import ShareModal from "@/src/components/ui/ShareModal";

export default function Dashboard() {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    fetch("/api/admin/maintenance")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setMaintenance(data.maintenance);
        setLoading(false);
      });
  }, []);

  const toggleMaintenance = async () => {
    const newState = !maintenance;
    setMaintenance(newState);
    try {
      await fetch("/api/admin/maintenance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenance: newState }),
      });
    } catch (error) {
      console.error("Failed to update maintenance mode");
      setMaintenance(!newState); // Revert on error
    }
  };

  const handleGenerateBundleLink = async () => {
    try {
      const res = await fetch("/api/admin/token", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: 'BUNDLE' })
      });
      const d = await res.json();
      if (d.success) {
        const link = `${window.location.origin}/invite/${d.token}`;
        setShareUrl(link);
        setShareModalOpen(true);
      } else {
        toast.error("Gagal membuat link.");
      }
    } catch {
      toast.error("Gagal membuat link.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} url={shareUrl} />
      
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 uppercase tracking-tighter">Management <span className="text-blue-600">Asesmen</span></h1>
          <p className="text-gray-500 text-lg font-medium">Pilih modul untuk mengelola hasil atau buat link asesmen gabungan.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <button 
            onClick={handleGenerateBundleLink}
            className="w-full md:w-auto bg-black text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-gray-800 transition shadow-xl shadow-gray-200 active:scale-95 border-2 border-black"
          >
            <LinkIcon size={16} />
            Create Assessment Link
          </button>

          {!loading && (
            <div className="flex items-center bg-white p-3 rounded-2xl border border-gray-200 shadow-sm w-full md:w-auto">
              <div className="mr-4 pl-1">
                <p className="font-black text-[10px] uppercase tracking-widest text-gray-400">Maintenance</p>
                <p className="text-xs font-bold">{maintenance ? "AKTIF" : "OFF"}</p>
              </div>
              <button 
                onClick={toggleMaintenance}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${maintenance ? 'bg-black' : 'bg-gray-200'}`}
              >
                <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${maintenance ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
          )}
        </div>
      </header>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* DISC Card */}
        <Link href="/admin/disc" className="group">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border-2 border-slate-50 hover:shadow-2xl hover:border-blue-600 transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                <ArrowRight size={24} className="text-blue-600" />
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
              <Users size={48} />
            </div>
            <h2 className="text-2xl font-black mb-1">DISC</h2>
            <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase opacity-60">Personality Profiling</p>
          </div>
        </Link>

        {/* IQ Card */}
        <Link href="/admin/iq" className="group">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border-2 border-slate-50 hover:shadow-2xl hover:border-purple-600 transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                <ArrowRight size={24} className="text-purple-600" />
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
              <Brain size={48} />
            </div>
            <h2 className="text-2xl font-black mb-1">IQ Test</h2>
            <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase opacity-60">Cognitive Ability</p>
          </div>
        </Link>

        {/* VAK Card */}
        <Link href="/admin/vak" className="group">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border-2 border-slate-50 hover:shadow-2xl hover:border-orange-600 transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
                <ArrowRight size={24} className="text-orange-600" />
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
              <FileText size={48} />
            </div>
            <h2 className="text-2xl font-black mb-1">VAK</h2>
            <p className="text-[10px] text-gray-400 font-black tracking-[0.2em] uppercase opacity-60">Learning Styles</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
