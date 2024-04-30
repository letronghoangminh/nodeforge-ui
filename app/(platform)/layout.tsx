"use client"

import { ModalProvider } from "@/components/providers/modal-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { SessionProvider } from "next-auth/react"
import {Toaster} from "sonner"
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryProvider>
      <SessionProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </SessionProvider>
    </QueryProvider>
  );
};

export default PlatformLayout;
