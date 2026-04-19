"use client";

import React from "react";
import { Button, Card } from "@/src/components/application-form/ui";
import { Download, Eye, FileText } from "lucide-react";
import Link from "next/link";

interface CandidatesTableProps {
  candidates: any[];
}

const CandidatesTable = ({ candidates }: CandidatesTableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-100 text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">
            <th className="p-5">Tanggal Submit</th>
            <th className="p-5">Nama Lengkap</th>
            <th className="p-5">Posisi Dilamar</th>
            <th className="p-5">Email / No. HP</th>
            <th className="p-5 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-blue-50/30 transition group">
              <td className="p-5 text-xs text-gray-400 font-mono">
                {new Date(candidate.createdAt).toLocaleDateString('id-ID', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </td>
              <td className="p-5">
                <div className="font-bold text-gray-900">{candidate.fullName}</div>
                <div className="text-[10px] text-gray-400 uppercase tracking-tight">{candidate.personalData?.nickname || "-"}</div>
              </td>
              <td className="p-5 text-gray-600 text-sm font-medium">
                {candidate.appliedPosition}
              </td>
              <td className="p-5">
                <div className="text-sm text-gray-600">{candidate.personalData?.email}</div>
                <div className="text-xs text-gray-400">{candidate.personalData?.mobilePhone}</div>
              </td>
              <td className="p-5 text-center">
                <div className="flex justify-center gap-2">
                  <Link 
                    href={`/admin/application-form/detail?id=${candidate.id}`}
                    className="text-gray-400 hover:text-blue-600 p-2 hover:bg-white rounded-lg transition shadow-sm border border-transparent hover:border-gray-100"
                    title="Lihat Detail"
                  >
                    <Eye size={18} />
                  </Link>
                  <button
                    className="text-gray-300 hover:text-gray-600 p-2 hover:bg-white rounded-lg transition shadow-sm border border-transparent hover:border-gray-100"
                    title="Export PDF"
                    onClick={() => {/* Logika PDF di sini */}}
                  >
                    <Download size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesTable;
