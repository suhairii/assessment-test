"use client";

import React from "react";
import { ApplicationFormData } from "@/src/lib/application-form-schema";
import { Button } from "@/src/components/application-form/ui/button";
import { Card } from "@/src/components/application-form/ui/card";
import { Download, Eye, FileText } from "lucide-react";

interface CandidatesTableProps {
  candidates: ApplicationFormData[];
  onView: (candidate: ApplicationFormData) => void;
  onExport: (candidate: ApplicationFormData) => void;
}

export default function CandidatesTable({ candidates, onView, onExport }: CandidatesTableProps) {
  return (
    <Card className="overflow-x-auto p-0">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-zinc-100 border-b-4 border-black">
            <th className="px-6 py-4 text-left font-black uppercase tracking-tighter italic">Name</th>
            <th className="px-6 py-4 text-left font-black uppercase tracking-tighter italic">Email</th>
            <th className="px-6 py-4 text-left font-black uppercase tracking-tighter italic">Position</th>
            <th className="px-6 py-4 text-right font-black uppercase tracking-tighter italic">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y-2 divide-black">
          {candidates.map((candidate, idx) => (
            <tr key={idx} className="hover:bg-yellow-50 transition-colors group">
              <td className="px-6 py-4 font-bold">{candidate.personalData.fullName}</td>
              <td className="px-6 py-4 text-sm font-medium">{candidate.personalData.email}</td>
              <td className="px-6 py-4 text-sm font-medium">Software Engineer</td>
              <td className="px-6 py-4 text-right flex justify-end gap-2">
                <Button variant="outline" className="p-2 min-w-0" onClick={() => onView(candidate)}>
                  <Eye className="w-5 h-5" />
                </Button>
                <Button variant="secondary" className="p-2 min-w-0" onClick={() => onExport(candidate)}>
                  <Download className="w-5 h-5" />
                </Button>
              </td>
            </tr>
          ))}
          {candidates.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-12 text-center text-zinc-500 italic">
                No candidates found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Card>
  );
}
