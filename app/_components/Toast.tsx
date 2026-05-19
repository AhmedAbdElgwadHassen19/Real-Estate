"use client";
import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, XCircle, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
  error: <XCircle className="w-5 h-5 text-red-500 shrink-0" />,
  info: <AlertCircle className="w-5 h-5 text-blue-500 shrink-0" />,
};

const barColors = {
  success: "bg-emerald-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const dismiss = (id: string) =>
    setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 bg-white border border-gray-100 rounded-2xl shadow-xl px-4 py-3 min-w-[280px] max-w-sm animate-in slide-in-from-bottom-4 fade-in duration-300"
          >
            {icons[toast.type]}
            <p className="text-sm text-gray-700 font-medium flex-1 leading-snug">
              {toast.message}
            </p>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-gray-300 hover:text-gray-500 transition-colors mt-0.5"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl overflow-hidden">
              <div
                className={`h-full ${barColors[toast.type]} animate-[shrink_3.5s_linear_forwards]`}
              />
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
