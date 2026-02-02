"use client";
import { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dices, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { discQuestions } from "../../src/data/disc-data";
import { calculateDiscScore } from "../../src/lib/disc-logic";

function TestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const [isValidating, setIsValidating] = useState(true);
  const [name, setName] = useState(searchParams.get("name") || "");
  const [position, setPosition] = useState(searchParams.get("position") || "");
  const [date, setDate] = useState(searchParams.get("date") || new Date().toISOString().split("T")[0]);
  
  const [answers, setAnswers] = useState<{ [key: number]: { most: string; least: string } }>({});
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' } | null>(null);
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  // Timer State (15 minutes = 900 seconds)
  const [timeLeft, setTimeLeft] = useState(900);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimeUp(true);
      showToast("Waktu habis! Menyerahkan jawaban otomatis...", "error");
      handleSubmit(); // Trigger auto-submit
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        router.push("/");
        return;
      }
      try {
        const res = await fetch(`/api/token/validate?token=${token}`);
        const data = await res.json();
        if (!data.valid) {
          router.push("/");
        } else {
          setIsValidating(false);
        }
      } catch (e) {
        router.push("/");
      }
    };
    validateToken();
  }, [token, router]);

  const showToast = (message: string, type: 'error' | 'success' = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  if (isValidating) return <div className="min-h-screen flex items-center justify-center bg-white font-medium text-gray-400">Memvalidasi Akses...</div>;

  const handleSelect = (questionId: number, type: "most" | "least", value: string) => {
    setAnswers((prev) => {
      const currentAnswer = prev[questionId] || { most: "", least: "" };
      const otherType = type === "most" ? "least" : "most";
      
      return {
        ...prev,
        [questionId]: {
          ...currentAnswer,
          [type]: value,
          [otherType]: currentAnswer[otherType] === value ? "" : currentAnswer[otherType],
        },
      };
    });
  };

  const handleRandomFill = () => {
    const newAnswers: { [key: number]: { most: string; least: string } } = {};
    const options = ["A", "B", "C", "D"];

    for (let i = 1; i <= 24; i++) {
      const shuffled = [...options].sort(() => Math.random() - 0.5);
      newAnswers[i] = {
        most: shuffled[0],
        least: shuffled[1],
      };
    }
    setAnswers(newAnswers);
    showToast("Jawaban telah diisi secara acak!", "success");
  };

  const handleSubmit = async () => {
    // Validate Biodata
    if (!name.trim()) {
      showToast("Mohon isi Nama Lengkap terlebih dahulu.", "error");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (!position.trim()) {
      showToast("Mohon isi Posisi / Jabatan terlebih dahulu.", "error");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validate all 24 questions
    for (let i = 1; i <= 24; i++) {
      const ans = answers[i];
      if (!ans || !ans.most || !ans.least) {
        showToast(`Pertanyaan nomor ${i} belum lengkap (Wajib pilih Most & Least).`, "error");
        // Scroll to the specific question
        questionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
        // Highlight the question temporarily
        questionRefs.current[i]?.classList.add("bg-red-50");
        setTimeout(() => questionRefs.current[i]?.classList.remove("bg-red-50"), 2000);
        return;
      }
    }

    const result = calculateDiscScore(answers);

    try {
      const response = await fetch('/api/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, position, date, resultData: result, token }),
      });

      const data = await response.json();

      if (data.success) {
        showToast("Hasil tersimpan! Mengalihkan...", "success");
        router.push(`/result?id=${data.id}`);
      } else {
        showToast(data.error || "Gagal menyimpan hasil tes.", "error");
      }
    } catch (error) {
      console.error("Error submitting test:", error);
      showToast("Terjadi kesalahan koneksi.", "error");
    }
  };

  // Calculate progress
  const completedCount = Object.values(answers).filter(a => a.most && a.least).length;
  const progress = Math.round((completedCount / 24) * 100);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-32">
      {/* Custom Toast Notification */}
      {toast && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-full shadow-xl z-50 transition-all duration-300 ${toast.type === 'error' ? 'bg-black text-white border border-gray-800' : 'bg-white text-black border border-gray-200'}`}>
          <div className="flex items-center gap-2">
            {toast.type === 'error' ? <AlertCircle size={18} className="text-red-500" /> : <CheckCircle2 size={18} className="text-green-500" />}
            <span className="font-medium text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Sticky Header - Mobile Compact */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold tracking-tight">DISC Test</h1>
            <div className={`px-3 py-1 rounded-lg font-mono font-bold text-sm border flex items-center gap-2 transition-colors ${
              timeLeft < 120 ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : "bg-gray-50 text-gray-600 border-gray-200"
            }`}>
              <Clock size={14} />
              {formatTime(timeLeft)}
            </div>
          </div>
          <button
            onClick={handleRandomFill}
            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-900 px-3 py-1.5 rounded-full transition font-medium flex items-center gap-1.5"
          >
            <Dices size={14} />
            Random
          </button>
        </div>
        {/* Progress Bar */}
        <div className="h-1 w-full bg-gray-100">
          <div className="h-full bg-black transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6">
        
        {/* Biodata Section */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mb-8 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4 border-b border-gray-100 pb-2">Identitas Peserta</h2>
            <div className="grid md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Nama Lengkap</label>
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Budi Santoso"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none transition text-sm font-medium"
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Posisi / Jabatan</label>
                    <input 
                        type="text" 
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Contoh: Staff Marketing"
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none transition text-sm font-medium"
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Tanggal Tes</label>
                    <input 
                        type="date" 
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:border-black focus:ring-0 outline-none transition text-sm font-medium"
                    />
                </div>
            </div>
        </div>

        <div className="space-y-4">
          {/* Table Header - Only visible on desktop, hidden on mobile for cleaner look */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-xs font-bold uppercase text-gray-400 border-b border-gray-100">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-7">Gambaran Karakter</div>
            <div className="col-span-2 text-center">Most</div>
            <div className="col-span-2 text-center">Least</div>
          </div>

          {/* Questions List */}
          {discQuestions.map((q) => (
            <div 
              key={q.id} 
              ref={(el) => { questionRefs.current[q.id] = el }}
              className="bg-white md:bg-transparent rounded-xl border border-gray-100 md:border-none md:border-b md:rounded-none shadow-sm md:shadow-none p-5 md:px-4 md:py-6 transition-colors duration-300"
            >
              <div className="md:grid md:grid-cols-12 md:gap-4 md:items-center">
                
                {/* Mobile Question Header */}
                <div className="flex justify-between items-center mb-4 md:hidden border-b border-gray-50 pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Nomor {q.id}</span>
                  <div className="flex gap-2 text-[10px] font-bold text-gray-400">
                    <span className={answers[q.id]?.most ? "text-black" : ""}>MOST</span>
                    <span>/</span>
                    <span className={answers[q.id]?.least ? "text-gray-600" : ""}>LEAST</span>
                  </div>
                </div>

                {/* Question Number (Desktop) */}
                <div className="hidden md:block col-span-1 font-mono text-gray-300 text-center font-bold text-lg">{q.id}</div>
                
                {/* Options List */}
                <div className="col-span-7 space-y-3 md:space-y-2 mb-4 md:mb-0">
                  {q.options.map((opt) => (
                    <div key={opt.value} className="flex justify-between items-center md:block">
                      <div className="text-sm text-gray-700 flex-1 pr-4 md:pr-0">
                        <span className="font-bold text-gray-300 mr-2 md:hidden">{opt.value}</span>
                        {opt.label}
                      </div>
                      
                      {/* Mobile Radio Buttons (Inline) */}
                      <div className="flex gap-3 md:hidden shrink-0">
                        <label className={`cursor-pointer w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold border transition-all ${
                          answers[q.id]?.most === opt.value ? "bg-black text-white border-black" : "bg-white text-gray-300 border-gray-200"
                        }`}>
                          <input type="radio" className="hidden" 
                            checked={answers[q.id]?.most === opt.value}
                            onChange={() => handleSelect(q.id, "most", opt.value)}
                          />
                          M
                        </label>
                        <label className={`cursor-pointer w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold border transition-all ${
                          answers[q.id]?.least === opt.value ? "bg-gray-600 text-white border-gray-600 shadow-md" : "bg-white text-gray-300 border-gray-200"
                        }`}>
                          <input type="radio" className="hidden" 
                            checked={answers[q.id]?.least === opt.value}
                            onChange={() => handleSelect(q.id, "least", opt.value)}
                          />
                          L
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Selection Area */}
                <div className="hidden md:flex col-span-2 flex-col gap-2 items-center justify-center border-l border-gray-100 pl-2">
                  {q.options.map((opt) => (
                    <label key={opt.value + "m"} className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                        answers[q.id]?.most === opt.value ? "bg-black text-white shadow-md scale-110" : "bg-gray-50 text-gray-300 hover:bg-gray-100"
                      }`}>
                      <input type="radio" className="hidden" checked={answers[q.id]?.most === opt.value} onChange={() => handleSelect(q.id, "most", opt.value)} />
                      {opt.value}
                    </label>
                  ))}
                </div>
                <div className="hidden md:flex col-span-2 flex-col gap-2 items-center justify-center border-l border-gray-100 pl-2">
                  {q.options.map((opt) => (
                    <label key={opt.value + "l"} className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition-all ${
                        answers[q.id]?.least === opt.value ? "bg-gray-600 text-white shadow-md scale-110" : "bg-gray-50 text-gray-300 hover:bg-gray-100"
                      }`}>
                      <input type="radio" className="hidden" checked={answers[q.id]?.least === opt.value} onChange={() => handleSelect(q.id, "least", opt.value)} />
                      {opt.value}
                    </label>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-gray-200 z-30">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
           <div className="text-xs text-gray-500 font-medium">
             {completedCount < 24 ? (
               <span>Tersisa <span className="text-black font-bold">{24 - completedCount}</span> pertanyaan lagi</span>
             ) : (
               <span className="text-black font-bold">Siap dikirim!</span>
             )}
           </div>
          <button
            onClick={handleSubmit}
            disabled={completedCount < 24}
            className="w-full sm:w-auto bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 active:scale-95 transition font-bold text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            LIHAT HASIL ANALISA
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TestContent />
    </Suspense>
  );
}
