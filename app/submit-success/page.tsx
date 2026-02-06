"use client";

import { CheckCircle2 } from "lucide-react";

export default function SubmitSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4 text-center font-sans">
      <div className="bg-green-50 p-6 rounded-full mb-6">
        <CheckCircle2 size={64} className="text-green-600" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        Tes Berhasil Disubmit!
      </h1>
      <p className="text-gray-600 max-w-md mb-8">
        Terima kasih telah menyelesaikan tes. Jawaban Anda telah kami terima dan akan segera diproses.
      </p>
    </div>
  );
}