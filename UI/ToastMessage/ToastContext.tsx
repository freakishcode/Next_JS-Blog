"use client";
import { createContext, useContext } from "react";

interface ToastContextType {
  open: (message: string) => void;
  close: (id: number) => void;
}

// created a context with proper type
export const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = (): ToastContextType | null => useContext(ToastContext);
