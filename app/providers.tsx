"use client";

// TanStack Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Devtools for debugging
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { ToastProvider } from "../UI/ToastMessage/ToastProvider";

// Create a QueryClient instance
const queryClient = new QueryClient(); // for storing already fetch data into catches

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>{children}</ToastProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
