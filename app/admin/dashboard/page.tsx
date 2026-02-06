"use client";
import Link from "next/link";
import { Users, FileText, Brain, ArrowRight, Settings } from "lucide-react";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [maintenance, setMaintenance] = useState(false);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3">Sistem Management Asesmen</h1>
          <p className="text-gray-500 text-lg">Pilih modul untuk mengelola hasil dan undangan peserta.</p>
        </div>
        
        {!loading && (
          <div className="flex items-center bg-gray-50 p-4 rounded-xl border border-gray-200">
             <div className="mr-4">
               <p className="font-bold text-sm">Mode Maintenance</p>
               <p className="text-xs text-gray-500">{maintenance ? "Aktif" : "Non-aktif"}</p>
             </div>
             <button 
               onClick={toggleMaintenance}
               className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${maintenance ? 'bg-black' : 'bg-gray-300'}`}
             >
               <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${maintenance ? 'translate-x-7' : 'translate-x-1'}`} />
             </button>
          </div>
        )}
      </header>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* DISC Card */}
        <Link href="/admin/disc" className="group">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-black transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={20} />
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl mb-6 group-hover:bg-black group-hover:text-white transition-colors">
              <Users size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">DISC</h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Personality Profiling</p>
          </div>
        </Link>

        {/* IQ Card */}
        <Link href="/admin/iq" className="group">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-black transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={20} />
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Brain size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">IQ Test</h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Cognitive Ability</p>
          </div>
        </Link>

        {/* VAK Card */}
        <Link href="/admin/vak" className="group">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-2xl hover:border-black transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight size={20} />
            </div>
            <div className="p-5 bg-gray-50 rounded-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <FileText size={40} />
            </div>
            <h2 className="text-2xl font-bold mb-2">VAK</h2>
            <p className="text-sm text-gray-400 font-medium tracking-wide uppercase">Learning Styles</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
