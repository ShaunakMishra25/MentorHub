"use client";

import { SWRConfig } from "swr";
import { ReactNode } from "react";

interface SWRProviderProps {
  children: ReactNode;
}

export function SWRProvider({ children }: SWRProviderProps) {
  return (
    <SWRConfig
      value={{
        // Global SWR configuration
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 60000,
        errorRetryCount: 2,
        errorRetryInterval: 5000,
        shouldRetryOnError: (error) => {
          if (error?.status === 404) return false;
          if (error?.status === 401 || error?.status === 403) return false;
          return true;
        },
        
        fetcher: async (url: string) => {
          const res = await fetch(url);
          if (!res.ok) {
            let errorMsg = "An error occurred while fetching the data.";
            try {
              const data = await res.json();
              if (data?.msg) errorMsg = data.msg;
            } catch {
            }
            const error = new Error(errorMsg) as Error & { status: number };
            error.status = res.status;
            throw error;
          }
          return res.json();
        },
        
        onError: (error, key) => {
          if (error?.message === "User not found") return;
          if (error?.status === 404) return;
          
          if (process.env.NODE_ENV === "development") {
            console.error(`SWR Error for ${key}:`, error);
          }
        },
      }}
    >
      {children}
    </SWRConfig>
  );
}
