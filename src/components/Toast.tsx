import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 bg-[#1e222d] border border-[#2a2e39] text-white p-3.5 rounded-xl shadow-2xl min-w-72 max-w-sm animate-in slide-in-from-bottom-5 duration-200"
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-[#089981] flex-shrink-0 mt-0.5" />
          ) : toast.type === 'error' ? (
            <AlertCircle className="w-5 h-5 text-[#f23645] flex-shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-[#2962ff] flex-shrink-0 mt-0.5" />
          )}

          <div className="flex-1 text-xs">
            <div className="font-bold text-white mb-0.5">{toast.title}</div>
            <div className="text-[#787b86] font-mono">{toast.message}</div>
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#787b86] hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
