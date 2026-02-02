"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function HomeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  // Initialize to null (loading) or false if no token immediately
  const [isValid, setIsValid] = useState<boolean | null>(token ? null : false);

  useEffect(() => {
    if (!token) return; // Already false by init

    let isMounted = true;
    fetch(`/api/token/validate?token=${token}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) setIsValid(data.valid);
      })
      .catch(() => {
        if (isMounted) setIsValid(false);
      });
      
    return () => { isMounted = false; };
  }, [token]);

  if (isValid === null) return <div className="min-h-screen flex items-center justify-center bg-white">Memeriksa Undangan...</div>;

  if (!isValid) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans text-gray-900">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2">Akses Ditolak</h1>
          <p className="text-gray-500 mb-6">Anda memerlukan Link Undangan yang valid dan belum terpakai untuk mengikuti tes ini.</p>
          <div className="text-sm bg-gray-100 p-4 rounded-lg">
            Hubungi Admin untuk mendapatkan link baru.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 font-sans text-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">DISC Assessment</h1>
          <p className="text-gray-500">Professional Profiling System</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 text-center">
          <p className="text-gray-600 mb-6">Silakan klik tombol di bawah untuk memulai asesmen kepribadian Anda.</p>
          <form action="/test">
            <input type="hidden" name="token" value={token || ""} />
            <button 
              type="submit" 
              className="w-full bg-black text-white p-4 rounded-xl font-bold text-lg hover:bg-gray-800 hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
            >
              Mulai Tes DISC
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          © {new Date().getFullYear()} DISC Assessment System. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
