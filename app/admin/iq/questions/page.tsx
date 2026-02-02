"use client";
import { useState, useEffect } from "react";
import { Save, Image as ImageIcon, ArrowLeft, Loader2, Trash2 } from "lucide-react";
import { toast } from "@/src/components/ui/Toast";
import Link from "next/link";

interface Option {
  text: string;
  image?: string;
}

interface Question {
  id: number;
  question: string;
  options: (string | Option)[];
  image?: string;
}

export default function IqQuestionsAdmin() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<number | null>(null);
  const [uploadingId, setUploadingId] = useState<{ qId: number, type: 'question' | 'option', optIdx?: number } | null>(null);

  useEffect(() => {
    fetch("/api/admin/questions/iq")
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          // Normalize options to objects for easier handling in UI
          const normalizedQuestions = data.data.map((q: Question) => ({
            ...q,
            options: q.options.map(opt => typeof opt === 'string' ? { text: opt } : opt)
          }));
          setQuestions(normalizedQuestions);
        }
        setLoading(false);
      });
  }, []);

  const handleFileUpload = async (file: File, qId: number, type: 'question' | 'option', optIdx?: number) => {
    setUploadingId({ qId, type, optIdx });
    try {
      const response = await fetch(`/api/admin/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const newBlob = await response.json();
      
      if (newBlob.url) {
        if (type === 'question') {
          updateQuestionField(qId, 'image', newBlob.url);
        } else if (type === 'option' && optIdx !== undefined) {
          updateOptionField(qId, optIdx, 'image', newBlob.url);
        }
        toast.success("Gambar berhasil diupload!");
      } else {
        toast.error("Gagal upload gambar.");
      }
    } catch {
      toast.error("Error upload.");
    } finally {
      setUploadingId(null);
    }
  };

  const handleUpdate = async (q: Question) => {
    setSavingId(q.id);
    try {
      const res = await fetch("/api/admin/questions/iq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(q),
      });
      if (res.ok) {
        toast.success(`Soal #${q.id} berhasil diupdate!`);
      } else {
        toast.error("Gagal menyimpan.");
      }
    } catch {
      toast.error("Error koneksi.");
    } finally {
      setSavingId(null);
    }
  };

  const updateQuestionField = (id: number, field: keyof Question, value: any) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, [field]: value } : q));
  };

  const updateOptionField = (qId: number, optIdx: number, field: keyof Option, value: string) => {
    setQuestions(prev => prev.map(q => {
      if (q.id === qId) {
        const newOpts = [...q.options];
        const currentOpt = newOpts[optIdx] as Option;
        newOpts[optIdx] = { ...currentOpt, [field]: value };
        return { ...q, options: newOpts };
      }
      return q;
    }));
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Memuat Database Soal...</div>;

  return (
    <div className="max-w-5xl mx-auto pb-20">
      <header className="flex justify-between items-center mb-8">
        <div>
          <Link href="/admin/iq" className="text-gray-400 hover:text-black flex items-center gap-1 text-sm font-bold mb-2 transition">
            <ArrowLeft size={16} /> Kembali ke Manajemen IQ
          </Link>
          <h1 className="text-3xl font-black tracking-tight">Edit Soal IQ</h1>
          <p className="text-gray-500">Sesuaikan teks, pilihan, dan gambar untuk setiap soal.</p>
        </div>
      </header>

      <div className="space-y-8">
        {questions.map((q) => (
          <div key={q.id} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-6">
                <span className="bg-blue-50 text-blue-600 w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg">
                    {q.id}
                </span>
                <button 
                    onClick={() => handleUpdate(q)}
                    disabled={savingId === q.id}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition shadow-sm
                        ${savingId === q.id ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-gray-800'}`}
                >
                    {savingId === q.id ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                    Simpan Perubahan
                </button>
            </div>

            <div className="space-y-6">
                {/* Teks Soal */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pertanyaan</label>
                    <textarea 
                        value={q.question}
                        onChange={(e) => updateQuestionField(q.id, 'question', e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-100 rounded-xl focus:border-blue-500 focus:bg-white outline-none transition font-medium"
                        rows={2}
                    />
                </div>

                {/* Gambar Soal */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                        <ImageIcon size={12} /> Gambar Soal
                    </label>
                    
                    <div className="flex items-center gap-4">
                        <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed transition-all
                            ${uploadingId?.qId === q.id && uploadingId.type === 'question' ? 'bg-gray-50 border-gray-200' : 'bg-white border-gray-200 hover:border-black'}`}>
                            {uploadingId?.qId === q.id && uploadingId.type === 'question' ? (
                                <Loader2 size={16} className="animate-spin text-gray-400" />
                            ) : (
                                <ImageIcon size={16} className="text-gray-400" />
                            )}
                            <span className="text-xs font-bold text-gray-600">
                                {uploadingId?.qId === q.id && uploadingId.type === 'question' ? 'Mengunggah...' : 'Upload Gambar'}
                            </span>
                            <input 
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) handleFileUpload(file, q.id, 'question');
                                }}
                                disabled={uploadingId?.qId === q.id}
                            />
                        </label>

                        {q.image && (
                            <button 
                                onClick={() => updateQuestionField(q.id, 'image', '')}
                                className="text-xs font-bold text-red-500 hover:underline"
                            >
                                Hapus Gambar
                            </button>
                        )}
                    </div>

                    {q.image && (
                        <div className="mt-2 p-2 bg-gray-50 rounded-2xl inline-block border border-gray-100">
                            <img src={q.image} alt="Preview" className="h-32 w-auto rounded-xl bg-white shadow-sm" />
                        </div>
                    )}
                </div>

                {/* Pilihan Jawaban */}
                <div className="grid md:grid-cols-2 gap-4">
                    {q.options.map((opt, idx) => {
                        const optObj = opt as Option;
                        return (
                            <div key={idx} className="space-y-1 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black text-gray-400 uppercase">Opsi {String.fromCharCode(65 + idx)}</label>
                                    
                                    {/* Option Image Upload */}
                                    <div className="flex items-center gap-2">
                                        <label className={`cursor-pointer p-1.5 rounded-lg border hover:border-blue-400 transition ${uploadingId?.qId === q.id && uploadingId.type === 'option' && uploadingId.optIdx === idx ? 'bg-gray-200' : 'bg-white'}`}>
                                            {uploadingId?.qId === q.id && uploadingId.type === 'option' && uploadingId.optIdx === idx ? (
                                                <Loader2 size={12} className="animate-spin text-gray-500" />
                                            ) : (
                                                <ImageIcon size={12} className="text-gray-400 hover:text-blue-500" />
                                            )}
                                            <input 
                                                type="file" 
                                                className="hidden" 
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) handleFileUpload(file, q.id, 'option', idx);
                                                }}
                                                disabled={uploadingId !== null}
                                            />
                                        </label>
                                        
                                        {optObj.image && (
                                            <button 
                                                onClick={() => updateOptionField(q.id, idx, 'image', '')}
                                                className="p-1.5 rounded-lg border bg-white hover:border-red-400 text-red-400 transition"
                                                title="Hapus Gambar Opsi"
                                            >
                                                <Trash2 size={12} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <input 
                                    type="text"
                                    value={optObj.text}
                                    onChange={(e) => updateOptionField(q.id, idx, 'text', e.target.value)}
                                    className="w-full p-2 bg-white border border-gray-200 rounded-lg focus:border-blue-500 outline-none transition text-sm font-medium"
                                />

                                {optObj.image && (
                                    <div className="mt-2">
                                        <img src={optObj.image} alt={`Option ${idx}`} className="h-20 w-auto rounded-lg border border-gray-200 bg-white" />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}