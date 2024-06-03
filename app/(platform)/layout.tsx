"use client"

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { SessionProvider } from "next-auth/react"
import {Toaster} from "sonner"
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <SessionProvider>
        <Toaster />
        <ModalProvider />
        <ToastProvider />

        {children}
      </SessionProvider>
    </QueryProvider>
  );
};

export default PlatformLayout;
