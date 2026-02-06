"use client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Menu } from "lucide-react";

export const AdminLayoutClient = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-gray-900">
       <div className={`fixed z-40 transition-all duration-300 h-full border-r border-gray-200 bg-white ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-20 translate-x-0'} hidden md:block no-print`}>
         <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />
       </div>
       
       {/* Mobile Sidebar */}
       <div className={`fixed z-50 transition-all duration-300 h-full bg-white border-r border-gray-200 md:hidden ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full'} no-print`}>
         <Sidebar isOpen={true} toggle={() => setIsSidebarOpen(false)} />
       </div>

       {/* Overlay for mobile */}
       {isSidebarOpen && (
         <div 
            className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm no-print"
            onClick={() => setIsSidebarOpen(false)}
         ></div>
       )}
       
       <div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? 'md:ml-64' : 'md:ml-20'} p-4 md:p-8 print:p-0 print:ml-0 w-full`}>
         {/* Mobile Toggle Button */}
         <button 
           onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
           className="md:hidden fixed bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition active:scale-95 no-print"
         >
           <Menu size={24} />
         </button>
         
         {children}
       </div>
    </div>
  );
};