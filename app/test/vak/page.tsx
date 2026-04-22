"use client";
import { useState, Suspense, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { vakQuestions } from "../../../src/data/vak-data";
import { calculateVakScore } from "../../../src/lib/vak-logic";
import { toast } from "../../../src/components/ui/Toast";

function VakTestContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  
  const [isValidating, setIsValidating] = useState(true);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  
  const [timeLeft, setTimeLeft] = useState(900); // 15 mins

  useEffect(() => {
    const validateToken = async () => {
      if (!token) { router.push("/"); return; }
      try {
        const res = await fetch(`/api/token/validate?token=${token}`);
        const data = await res.json();
        if (!data.valid) router.push("/");
        else setIsValidating(false);
      } catch { router.push("/"); }
    };
    validateToken();
  }, [token, router]);

  useEffect(() => {
    if (isValidating || timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isValidating]);

  const handleSubmit = async () => {
    if (isSubmitting) return;

    if (!name.trim() || !position.trim()) {
      toast.error("Mohon isi identitas lengkap.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    for (let i = 1; i <= 30; i++) {
      if (!answers[i]) {
        toast.error(`Pertanyaan nomor ${i} belum dijawab.`);
        questionRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
        const el = questionRefs.current[i];
        if (el) {
          el.classList.add("ring-2", "ring-red-500", "bg-red-50");
          setTimeout(() => el.classList.remove("ring-2", "ring-red-500", "bg-red-50"), 3000);
        }
        return;
      }
    }

    setIsSubmitting(true);
    const result = calculateVakScore(answers);

    try {
      const response = await fetch('/api/result/vak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, position, date, resultData: result, token }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Hasil VAK Test tersimpan!");

        // Redirect to bundle if applicable
        const tokenRes = await fetch(`/api/token/validate?token=${token}`);
        const tokenData = await tokenRes.json();
        
        if (tokenData.valid && tokenData.type === 'BUNDLE') {
            router.push(`/test/bundle?token=${token}`);
        } else {
            router.push('/submit-success');
        }
      } else {
        toast.error(data.error || "Gagal menyimpan hasil.");
        setIsSubmitting(false);
      }
    } catch {
      toast.error("Terjadi kesalahan koneksi.");
      setIsSubmitting(false);
    }
  };

  const formatTime = (s: number) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2,'0')}`;
  const completedCount = Object.keys(answers).length;
  const progress = Math.round((completedCount / 30) * 100);

  if (isValidating) return <div className="min-h-screen flex items-center justify-center bg-white text-gray-400 font-medium">Validasi Akses VAK...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans pb-32">
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-bold tracking-tight text-purple-600">VAK Test</h1>
            <div className={`px-3 py-1 rounded-lg font-mono font-bold text-sm border flex items-center gap-2 ${timeLeft < 120 ? "bg-red-50 text-red-600 border-red-200 animate-pulse" : "bg-gray-50 text-gray-600 border-gray-200"}`}>
              <Clock size={14} /> {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <div className="h-1 w-full bg-gray-100"><div className="h-full bg-purple-600 transition-all duration-500" style={{ width: `${progress}%` }}></div></div>
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
          {vakQuestions.map((q) => (
            <div key={q.id} ref={(el) => { questionRefs.current[q.id] = el }} className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 transition-all">
              <p className="font-bold text-gray-900 mb-4 flex gap-3">
                <span className="text-purple-600">{q.id}.</span>
                {q.question}
              </p>
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <label key={opt.value} className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${answers[q.id] === opt.value ? 'bg-purple-50 border-purple-600 shadow-sm' : 'bg-gray-50 border-gray-100 hover:border-gray-200'}`}>
                    <input type="radio" name={`q${q.id}`} className="hidden" checked={answers[q.id] === opt.value} onChange={() => setAnswers(prev => ({ ...prev, [q.id]: opt.value }))} />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${answers[q.id] === opt.value ? 'border-purple-600 bg-purple-600' : 'border-gray-300 bg-white'}`}>
                      {answers[q.id] === opt.value && <div className="w-2 h-2 rounded-full bg-white"></div>}
                    </div>
                    <span className={`text-sm ${answers[q.id] === opt.value ? 'text-purple-900 font-bold' : 'text-gray-600 font-medium'}`}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 pb-[env(safe-area-inset-bottom,16px)] bg-white/80 backdrop-blur-xl border-t border-gray-200 z-40">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
           <div className="text-xs text-gray-500 font-medium">
             {completedCount < 30 ? <span>Tersisa <span className="text-black font-bold">{30 - completedCount}</span> soal</span> : <span className="text-purple-600 font-bold font-bold">Siap kirim!</span>}
           </div>
          <button
            type="button"
            onClick={handleSubmit}
            className={`w-full sm:w-auto bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 active:scale-95 transition font-bold text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                MENGIRIM...
              </>
            ) : (
              "SUBMIT VAK TEST"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VakTestPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white">Memuat...</div>}>
      <VakTestContent />
    </Suspense>
  );
}
