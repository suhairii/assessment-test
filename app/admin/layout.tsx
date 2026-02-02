import { Sidebar } from "@/src/components/admin/Sidebar";
import { ToastContainer } from "@/src/components/ui/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
      <div className="no-print">
        <Sidebar />
      </div>
      <main className="flex-1 ml-0 md:ml-64 p-8 print:p-0 print:ml-0">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}
