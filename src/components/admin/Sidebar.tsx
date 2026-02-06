"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Brain, Ear, LogOut, FileText, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "DISC Assessment", href: "/admin/disc", icon: Users },
    { name: "VAK Test", href: "/admin/vak", icon: Ear },
    { name: "IQ Test", href: "/admin/iq", icon: Brain },
  ];

  return (
    <aside className={`bg-white h-full flex flex-col transition-all duration-300 ${isOpen ? 'w-64' : 'w-20 items-center'} border-r border-gray-200`}>
      <div className={`p-6 border-b border-gray-100 flex items-center ${isOpen ? 'justify-between' : 'justify-center'} gap-3 h-[89px]`}>
        {isOpen && (
            <div className="flex items-center gap-3 animate-fadeIn">
                <div className="w-9 h-9 bg-black rounded-xl flex items-center justify-center text-white shadow-lg shrink-0">
                <FileText size={20} />
                </div>
                <span className="font-bold text-lg tracking-tight whitespace-nowrap overflow-hidden">Assessment</span>
            </div>
        )}
        
        <button onClick={toggle} className="text-gray-400 hover:text-black transition p-1.5 bg-gray-50 rounded-lg hover:bg-gray-100">
             {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto w-full overflow-x-hidden">
        {menu.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-xl transition-all font-medium text-sm group relative
                ${item.disabled ? 'opacity-50 cursor-not-allowed pointer-events-none text-gray-400' : 
                  isActive 
                    ? 'bg-black text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-black'
                }`}
            >
              <Icon size={20} className="shrink-0" />
              {isOpen && <span className="whitespace-nowrap overflow-hidden">{item.name}</span>}
              
              {!isOpen && (
                  <div className="absolute left-14 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl font-bold">
                      {item.name}
                  </div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 w-full">
        <Link 
          href="/login" 
          className={`flex items-center ${isOpen ? 'gap-3 px-4' : 'justify-center px-2'} py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all font-medium text-sm group relative`}
        >
          <LogOut size={20} className="shrink-0" />
          {isOpen && <span className="whitespace-nowrap overflow-hidden">Keluar</span>}
          {!isOpen && (
                  <div className="absolute left-14 bg-red-600 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none shadow-xl font-bold">
                      Keluar
                  </div>
          )}
        </Link>
      </div>
    </aside>
  );
};