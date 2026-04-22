"use client";

import React from "react";
import ApplicationForm from "@/src/components/application-form/ApplicationForm/ApplicationForm";
import { FileText } from "lucide-react";

export default function ApplyPage() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-24 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-700 rounded-2xl mb-2">
            <FileText size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Application <span className="text-blue-600">Form</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
            Silakan lengkapi data diri dan riwayat profesional Anda dengan benar untuk keperluan proses seleksi.
          </p>
        </div>

        <div className="bg-white rounded-[2rem] shadow-2xl shadow-blue-100/50 border border-slate-100 overflow-hidden">
          <ApplicationForm token="PUBLIC" />
        </div>

        <footer className="text-center text-slate-400 text-sm font-medium pb-12">
          &copy; {new Date().getFullYear()} Aptitude Assessment System. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
