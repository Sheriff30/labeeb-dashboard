"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ModalProvider } from "@/Context";
import { ModalRenderer } from "@/components/ui";
import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSchoolPath = pathname?.includes("school");
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
      {isSchoolPath ? (
        children
      ) : (
        <ModalProvider>
          {children}
          <ModalRenderer />
        </ModalProvider>
      )}
    </QueryClientProvider>
  );
}
