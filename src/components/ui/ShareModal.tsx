"use client";
import { X, Copy, Check } from "lucide-react";
import { useState } from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export default function ShareModal({ isOpen, onClose, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
        >
          <X size={24} />
        </button>

        <h3 className="text-xl font-bold mb-2">Share Test Result</h3>
        <p className="text-sm text-gray-500 mb-6">Copy the following link to share this test result.</p>

        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg border border-gray-200">
          <input 
            type="text" 
            readOnly 
            value={url} 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-gray-700 w-full outline-none"
          />
          <button 
            onClick={handleCopy}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-bold transition-all ${
              copied 
                ? "bg-green-500 text-white" 
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}
