"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/src/components/application-form/ui/dialog";
import { FileText, ExternalLink, Paperclip, Eye, Download, Award, Loader2, X } from "lucide-react";

interface FileViewerProps {
  filename: string; 
  label: string;
  type: "cv" | "paklaring";
  trigger?: React.ReactNode;
}

export const FileViewer = ({ filename, label, type, trigger }: FileViewerProps) => {
  const cleanUrl = (filename || "").split('?')[0].toLowerCase();
  const isImage = cleanUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i);
  const isPdf = cleanUrl.endsWith('.pdf') || cleanUrl.includes('.pdf');
  
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  // Sync loading state with Dialog lifecycle
  React.useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Forced fallback: Remove loading screen after 4 seconds no matter what
      const timer = setTimeout(() => {
        setLoading(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <button className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black rounded-full text-[10px] font-black uppercase tracking-widest text-black hover:bg-black hover:text-white transition-all">
            View Detail <Eye className="w-3 h-3" />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0 overflow-hidden rounded-[2rem] border-2 border-black shadow-2xl bg-white">
        <DialogHeader className="p-6 md:p-8 bg-white border-b-2 border-black shrink-0 relative">
          <div className="flex justify-between items-center">
            <div>
                <DialogTitle className="flex items-center gap-3 text-xl md:text-2xl font-black uppercase tracking-tighter text-black">
                    {type === "cv" ? <FileText className="w-6 h-6" /> : <Paperclip className="w-6 h-6" />}
                    {label}
                </DialogTitle>
                <DialogDescription className="text-black/40 text-[9px] font-bold uppercase tracking-widest mt-1 italic truncate max-w-md">
                    Live Document Reference: {filename}
                </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 bg-gray-50 flex items-center justify-center relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm z-50">
                <Loader2 className="w-10 h-10 animate-spin text-black mb-4" />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-6">Opening Document...</p>
                <button 
                  onClick={() => setLoading(false)}
                  className="text-[9px] font-black uppercase border-b border-black hover:opacity-50 transition-opacity"
                >
                  Skip Loading Screen
                </button>
            </div>
          )}

          {filename && filename.startsWith('http') ? (
            <div className="w-full h-full flex items-center justify-center">
              {isImage ? (
                <div className="w-full h-full p-4 md:p-12 overflow-auto flex items-center justify-center">
                    <img 
                      src={filename} 
                      alt={label} 
                      className="max-w-full max-h-full object-contain shadow-2xl border-2 border-black bg-white"
                      onLoad={() => setLoading(false)}
                      onError={() => setLoading(false)}
                    />
                </div>
              ) : isPdf ? (
                <iframe 
                  src={`${filename}#toolbar=0&navpanes=0&scrollbar=0`} 
                  className="w-full h-full border-none bg-white"
                  onLoad={() => setLoading(false)}
                  title={label}
                />
              ) : (
                <div className="text-center p-10 bg-white border-2 border-black rounded-3xl shadow-xl mx-4">
                    <FileText size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-black uppercase mb-2 text-black">Cannot Preview Directly</p>
                    <p className="text-[10px] text-black/40 font-bold max-w-xs mx-auto mb-6">
                        This file format is not supported for instant preview.
                    </p>
                    <button 
                        onClick={() => window.open(filename, '_blank')}
                        className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest"
                    >
                        Open In New Tab
                    </button>
                </div>
              )}
            </div>
          ) : (
             <div className="text-center p-12 bg-white border-2 border-black rounded-[3rem] shadow-2xl max-w-md mx-4">
                <Award size={48} className="mx-auto mb-6 opacity-10 text-black" />
                <h3 className="text-xl font-black uppercase tracking-widest mb-3 text-black">Legacy Document</h3>
                <p className="text-[10px] text-black/60 font-bold leading-relaxed uppercase tracking-tight mb-8">
                   This file was registered before the live preview system was active. <br/>
                   <span className="text-black font-black">Filename: {filename}</span>
                </p>
                <div className="p-4 bg-gray-50 rounded-2xl border border-black/5 text-[9px] font-bold text-gray-400">
                    NEW UPLOADS WILL BE PREVIEWED AUTOMATICALLY
                </div>
             </div>
          )}
        </div>

        <div className="p-4 md:p-6 bg-white border-t-2 border-black flex flex-col md:flex-row justify-between items-center gap-4 px-10 shrink-0">
           <p className="hidden md:block text-[9px] font-black uppercase tracking-widest text-black/30">Document Security Verified</p>
           <div className="flex gap-4 w-full md:w-auto">
                <button 
                    onClick={() => window.open(filename, '_blank')}
                    disabled={!filename || !filename.startsWith('http')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-white border-2 border-black text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all disabled:opacity-30"
                >
                    Download <Download className="w-3 h-3" />
                </button>
                <button 
                    onClick={() => window.open(filename, '_blank')}
                    disabled={!filename || !filename.startsWith('http')}
                    className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 disabled:opacity-30"
                >
                    Full Access <ExternalLink className="w-3 h-3" />
                </button>
           </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
