"use client";
import { X, AlertTriangle } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'info';
}

export const Modal = ({ 
  isOpen, 
  title, 
  message, 
  onConfirm, 
  onCancel, 
  confirmText = "Konfirmasi", 
  cancelText = "Batal",
  type = 'info'
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className={`p-3 rounded-full ${type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
              {type === 'danger' ? <AlertTriangle size={24} /> : <X size={24} />}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            {message}
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 px-6 flex justify-end gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-200 transition"
          >
            {cancelText}
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            className={`px-6 py-2 rounded-xl text-sm font-bold text-white transition shadow-md hover:shadow-lg
              ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-gray-800'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};
