"use client";
import { useMemo, useState, ReactNode } from "react";
import "../../styles/ToastMessage.css";

// context
import { ToastContext } from "./ToastContext";

// actual Toast message component
import ToastMessage from "./ToastMessage";

interface Toast {
  id: number;
  message: string;
}

interface ToastContextValue {
  open: (message: string) => void;
  close: (id: number) => void;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  // state to store toast
  const [toasts, setToasts] = useState<Toast[]>([]);

  //   functionality to open Toast
  function openToast(message: string): void {
    const newToast: Toast = {
      id: Date.now(),
      message: message,
    };
    setToasts((previousToasts) => [...previousToasts, newToast]);
  }

  //   functionality to close Toast
  function closeToast(id: number): void {
    setToasts((previousToasts) =>
      previousToasts.filter((toast) => toast.id !== id)
    );
  }

  // to cache the function
  const contextValue: ToastContextValue = useMemo(
    () => ({
      open: openToast,
      close: closeToast,
    }),
    []
  );

  return (
    <>
      <ToastContext.Provider value={contextValue}>
        {children}
        <div className='toasts-message'>
          {toasts &&
            toasts.map((toast) => {
              return (
                <ToastMessage
                  key={toast.id}
                  message={toast.message}
                  close={() => closeToast(toast.id)}
                />
              );
            })}
        </div>
      </ToastContext.Provider>
    </>
  );
}
