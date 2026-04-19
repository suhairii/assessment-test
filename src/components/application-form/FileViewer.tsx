"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/application-form/ui/dialog";
import { FileText, ExternalLink, Paperclip, Eye } from "lucide-react";

interface FileViewerProps {
  filename: string;
  label: string;
  type: "cv" | "paklaring";
  trigger?: React.ReactNode;
}

export const FileViewer = ({ filename, label, type, trigger }: FileViewerProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
            View Detail <Eye className="w-3 h-3" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[90vw] h-[80vh] flex flex-col p-0 overflow-hidden rounded-[2rem] border-none shadow-2xl">
        <DialogHeader className="p-6 bg-slate-900 text-white">
          <DialogTitle className="flex items-center gap-3 text-lg font-black uppercase italic tracking-tight">
            {type === "cv" ? <FileText className="w-5 h-5 text-blue-400" /> : <Paperclip className="w-5 h-5 text-blue-400" />}
            {label}
          </DialogTitle>
          <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-1">File Name: {filename}</p>
        </DialogHeader>
        
        <div className="flex-1 bg-slate-100 p-8 flex items-center justify-center relative">
          {/* Simulasi Tampilan File */}
          <div className="w-full max-w-2xl aspect-[1/1.414] bg-white shadow-2xl rounded-sm border border-slate-200 flex flex-col p-12 space-y-6 overflow-hidden">
             <div className="h-4 w-1/3 bg-slate-100 rounded"></div>
             <div className="h-8 w-2/3 bg-slate-200 rounded"></div>
             <div className="space-y-3 pt-8">
                <div className="h-3 w-full bg-slate-50 rounded"></div>
                <div className="h-3 w-full bg-slate-50 rounded"></div>
                <div className="h-3 w-5/6 bg-slate-50 rounded"></div>
             </div>
             <div className="grid grid-cols-2 gap-8 pt-10">
                <div className="aspect-square bg-slate-50 rounded-xl"></div>
                <div className="space-y-3">
                   <div className="h-3 w-full bg-slate-50 rounded"></div>
                   <div className="h-3 w-full bg-slate-50 rounded"></div>
                </div>
             </div>
             
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-white/80 flex items-center justify-center">
                <div className="bg-white/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white shadow-xl text-center">
                   <p className="text-xs font-black text-slate-900 uppercase tracking-widest mb-1">Preview Mode</p>
                   <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                      Actual file content for <span className="font-bold text-blue-600">{filename}</span> <br/>
                      will be displayed here when uploaded to server.
                   </p>
                </div>
             </div>
          </div>
        </div>

        <div className="p-4 bg-white border-t border-slate-100 flex justify-end gap-3">
           <button 
             onClick={() => window.open('#', '_blank')}
             className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
           >
              Download Original <ExternalLink className="w-4 h-4" />
           </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
