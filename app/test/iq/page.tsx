"use client";
import { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dices, Clock, CheckCircle2, AlertCircle, Brain } from "lucide-react";
import { calculateIqScore } from "../../../src/lib/iq-logic";

function IqTestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const [isValidating, setIsValidating] = useState(true);
  const [questions, setQuestions] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes

  useEffect(() => {
    const initTest = async () => {
      if (!token) { router.push("/"); return; }
      try {
        // Validate Token & Fetch Questions
        const [tokenRes, questionsRes] = await Promise.all([
            fetch(`/api/token/validate?token=${token}`),
            fetch(`/api/admin/questions/iq`)
        ]);
        
        const tokenData = await tokenRes.json();
        const questionsData = await questionsRes.json();

        if (!tokenData.valid) {
            router.push("/");
            return;
        }

        if (questionsData.success) {
            setQuestions(questionsData.data);
        }
        
        setIsValidating(false);
      } catch { router.push("/"); }
    };
    initTest();
  }, [token, router]);

  useEffect(() => {
    if (isValidating || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isValidating]);

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleRandomFill = () => {
    const newAnswers: { [key: number]: string } = {};
    const options = ["A", "B", "C", "D", "E"];
    for (let i = 1; i <= 60; i++) {
      newAnswers[i] = options[Math.floor(Math.random() * options.length)];
    }
    setAnswers(newAnswers);
    showToast("Jawaban IQ diisi acak!", "success");
  };

  const handleSubmit = async () => {
    if (!name.trim() || !position.trim()) {
      showToast("Mohon isi identitas lengkap.", "error");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const result = calculateIqScore(answers);

    try {
      const response = await fetch('/api/result/iq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, position, date, resultData: result, token }),
      });
      const data = await response.json();
      if (data.success) router.push(`/result/iq?id=${data.id}`);
      else showToast(data.error || "Gagal menyimpan hasil.", "error");
    } catch {
      showToast("Terjadi kesalahan koneksi.", "error");
    }
  };

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const completedCount = Object.keys(answers).length;
  const progress = Math.round((completedCount / 60) * 100);

  if (isValidating) return <div className="min-h-screen flex items-center justify-center bg-white text-gray-400 font-medium italic animate-pulse">Validasi Akses IQ Test...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-32">
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-xl z-50 transition-all ${toast.type === 'error' ? 'bg-black text-white' : 'bg-white text-black border border-gray-200'}`}>
          <div className="flex items-center gap-2">
            {toast.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold tracking-tight text-blue-600">IQ Test</h1>
            <div className={`px-3 py-1 rounded-lg font-mono font-bold text-sm border flex items-center gap-2 ${timeLeft < 300 ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : "bg-gray-50 text-gray-600 border-gray-200"}`}>
              <Clock size={14} /> {formatTime(timeLeft)}
            </div>
          </div>
          <button onClick={handleRandomFill} className="text-xs bg-gray-100 px-3 py-1.5 rounded-full transition font-medium flex items-center gap-1.5"><Dices size={14} /> Random</button>
        </div>
        <div className="h-1 w-full bg-gray-100"><div className="h-full bg-blue-600 transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Identitas Peserta</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nama Lengkap</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium" placeholder="Nama Anda" /></div>
                <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Posisi</label><input type="text" value={position} onChange={(e) => setPosition(e.target.value)} className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm font-medium" placeholder="Jabatan" /></div>
            </div>
        </div>

        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} ref={(el) => { questionRefs.current[q.id] = el }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <p className="font-bold text-gray-900 mb-4 flex gap-3">
                <span className="text-blue-600">{q.id}.</span>
                {q.question}
              </p>
              
              {/* Image Support */}
              {q.image && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100 flex justify-center">
                  <img src={q.image} alt={`Soal ${q.id}`} className="max-w-full h-auto rounded-lg shadow-sm" />
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {q.options.map((opt, idx) => {
                  const val = String.fromCharCode(65 + idx); // A, B, C, D, E
                  const label = typeof opt === 'string' ? opt : opt.text;
                  const imageUrl = typeof opt === 'object' ? opt.image : undefined;

                  return (
                    <label key={val} className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${answers[q.id] === val ? 'bg-blue-50 border-blue-600 shadow-sm' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}>
                      <input type="radio" name={`iq${q.id}`} className="hidden" checked={answers[q.id] === val} onChange={() => setAnswers(prev => ({ ...prev, [q.id]: val }))} />
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${answers[q.id] === val ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'}`}>
                        {answers[q.id] === val && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <div className="flex flex-col gap-2 w-full">
                        <span className={`text-sm ${answers[q.id] === val ? 'text-blue-900 font-bold' : 'text-gray-600 font-medium'}`}>{val}. {label}</span>
                        {imageUrl && (
                          <img src={imageUrl} alt={`Option ${val}`} className="w-full h-auto rounded-lg border border-gray-200 mt-1" />
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-30">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
           <div className="text-xs text-gray-500 font-medium text-center md:text-left">
             {completedCount < 60 ? <span>Dijawab <span className="text-black font-bold">{completedCount}</span> dari <span className="font-bold text-black">60</span> soal</span> : <span className="text-blue-600 font-bold uppercase tracking-wider">Selesai! Silakan Kirim</span>}
           </div>
          <button onClick={handleSubmit} className="w-full sm:w-auto bg-black text-white px-10 py-3 rounded-full hover:bg-gray-800 transition font-bold text-sm shadow-lg">LIHAT HASIL IQ</button>
        </div>
      </div>
    </div>
  );
}

export default function IqTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white"><Brain className="animate-bounce text-blue-500" size={48}/></div>}>
      <IqTestContent />
    </Suspense>
  );
}
