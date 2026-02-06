import { AdminLayoutClient } from "@/src/components/admin/AdminLayoutClient";
import { ToastContainer } from "@/src/components/ui/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayoutClient>
      {children}
      <ToastContainer />
    </AdminLayoutClient>
  );
}