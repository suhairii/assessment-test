export const dynamic = 'force-dynamic';
import ApplicationForm from "@/src/components/application-form/ApplicationForm/ApplicationForm";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-8 md:p-24 bg-slate-50">
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl uppercase italic">
            Job Application Form
          </h1>
          <p className="text-slate-500 text-lg">
            Join our team by completing the comprehensive application below.
          </p>
        </div>
        
        <ApplicationForm />
        
        <div className="text-center mt-12 pb-20">
          <Link 
            href="/dashboard" 
            className="text-slate-400 font-semibold hover:text-blue-600 transition-all flex items-center justify-center gap-2 group text-sm uppercase tracking-widest"
          >
            Access Applicant Dashboard 
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </main>
  );
}
