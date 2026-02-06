"use client";

import { usePathname } from "next/navigation";
import { AlertTriangle } from "lucide-react";

interface MaintenanceGuardProps {
  maintenanceActive: boolean;
  isAdmin: boolean;
  children: React.ReactNode;
}

export default function MaintenanceGuard({
  maintenanceActive,
  isAdmin,
  children,
}: MaintenanceGuardProps) {
  const pathname = usePathname();

  // Allow access to login and admin routes (middleware already protects admin routes from non-admins)
  // But here we want to block NON-admins from accessing PUBLIC routes if maintenance is on.
  // We also always allow /api routes to function so login works.
  const isLoginPage = pathname === "/login";
  const isApiRoute = pathname.startsWith("/api");
  const isAdminRoute = pathname.startsWith("/admin");

  // If maintenance is active, user is NOT admin, and NOT on login/api
  const shouldBlock = maintenanceActive && !isAdmin && !isLoginPage && !isApiRoute && !isAdminRoute;

  if (shouldBlock) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4 text-center">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg border border-gray-100">
           <div className="mx-auto bg-yellow-100 w-20 h-20 rounded-full flex items-center justify-center mb-6">
              <AlertTriangle size={40} className="text-yellow-600" />
           </div>
           <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Sistem Sedang Maintenance</h1>
           <p className="text-gray-600 mb-8">
             Mohon maaf, sistem sedang dalam perbaikan berkala. Silakan coba beberapa saat lagi.
             Jika Anda adalah administrator, silakan login melalui halaman login.
           </p>
           {/* Optional: Link to login if they are admin but session expired */}
           <a href="/login" className="text-sm font-bold text-black hover:underline">
             Login Administrator
           </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
