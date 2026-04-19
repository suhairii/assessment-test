export const dynamic = 'force-dynamic';
"use client";

import React, { useState } from "react";
import CandidatesTable from "@/src/components/application-form/CandidatesTable";
import { ApplicationFormData } from "@/src/lib/application-form-schema";
import { exportToPDF } from "@/src/lib/application-form-utils/pdfGenerator";
import { Card } from "@/src/components/application-form/ui/card";

export default function CandidatesPage() {
  // Mock data for demonstration
  const [candidates] = useState<ApplicationFormData[]>([
    {
      personalData: {
        fullName: "John Doe",
        nickname: "Johnny",
        placeOfBirth: "New York",
        dateOfBirth: "1990-01-01",
        ktpNo: "1234567890",
        addressKTP: "NYC St 1",
        addressCurrent: "NYC St 1",
        status: "Single",
        gender: "Male",
        email: "john@example.com",
        phone: "555-0199",
      },
      education: [
        { level: "Bachelor", institution: "MIT", major: "CS", yearStart: "2008", yearEnd: "2012", gpa: "3.9" }
      ],
      familyBackground: { parents: [{ relation: "Father", name: "Bob" }, { relation: "Mother", name: "Alice" }] },
      references: [],
      emergencyContacts: [],
      finalDetails: { expectedSalary: "100k", availability: "Immediate" }
    } as any
  ]);

  const handleView = (candidate: ApplicationFormData) => {
    alert(`Viewing details for: ${candidate.personalData.fullName}`);
  };

  const handleExport = (candidate: ApplicationFormData) => {
    exportToPDF(candidate);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-end border-b-8 border-black pb-4">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic">Candidates</h1>
            <p className="font-bold text-zinc-500 uppercase">Review and manage job applicants</p>
          </div>
          <div className="text-right">
            <span className="text-4xl font-black italic">{candidates.length}</span>
            <p className="text-xs font-bold uppercase">Total Applicants</p>
          </div>
        </header>

        <CandidatesTable 
          candidates={candidates} 
          onView={handleView} 
          onExport={handleExport} 
        />
      </div>
    </div>
  );
}
