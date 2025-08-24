"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ModalProvider } from "@/Context";
import { ModalRenderer } from "@/components/ui";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each request
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1 minute
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        {children}
        <ModalRenderer />
      </ModalProvider>
    </QueryClientProvider>
  );
}
