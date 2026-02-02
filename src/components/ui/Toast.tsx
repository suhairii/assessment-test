"use client";
import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, X } from "lucide-react";

type ToastType = 'success' | 'error';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border transition-all animate-in slide-in-from-right
      ${type === 'success' ? 'bg-white border-green-500 text-green-700' : 'bg-white border-red-500 text-red-700'}`}>
      {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
      <span className="font-medium text-sm text-gray-800">{message}</span>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <X size={16} />
      </button>
    </div>
  );
};

// Simple Event Bus for Toast
type ToastEvent = { message: string, type: ToastType };
let listeners: ((toast: ToastEvent) => void)[] = [];

export const toast = {
  success: (msg: string) => emit({ message: msg, type: 'success' }),
  error: (msg: string) => emit({ message: msg, type: 'error' }),
};

const emit = (event: ToastEvent) => listeners.forEach(l => l(event));

export const ToastContainer = () => {
  const [toasts, setToasts] = useState<{ id: number, msg: string, type: ToastType }[]>([]);

  useEffect(() => {
    const handler = (event: ToastEvent) => {
      setToasts(prev => [...prev, { id: Date.now(), msg: event.message, type: event.type }]);
    };
    listeners.push(handler);
    return () => { listeners = listeners.filter(l => l !== handler); };
  }, []);

  const remove = (id: number) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <>
      {toasts.map(t => (
        <Toast key={t.id} message={t.msg} type={t.type} onClose={() => remove(t.id)} />
      ))}
    </>
  );
};
