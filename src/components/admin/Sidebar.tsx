"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Brain, Ear, LogOut, FileText } from "lucide-react";

export const Sidebar = () => {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "DISC Assessment", href: "/admin/disc", icon: Users },
    { name: "VAK Test", href: "/admin/vak", icon: Ear },
    { name: "IQ Test", href: "/admin/iq", icon: Brain },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-40">
      <div className="p-6 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white shadow-lg">
          <FileText size={20} />
        </div>
        <span className="font-bold text-lg tracking-tight">DISC Admin</span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm
                ${item.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none text-gray-400' : 
                  isActive 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
            >
              <Icon size={20} />
              {item.name}
              {item.disabled && <span className="ml-auto text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">Soon</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <Link 
          href="/login" 
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium text-sm"
        >
          <LogOut size={20} />
          Keluar
        </Link>
      </div>
    </aside>
  );
};
