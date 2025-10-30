'use client'

import { FancyboxProvider } from "@/src/app/providers/FancyboxProvider";
import { ModalProvider } from "@/src/app/providers/ModalProvider";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModalProvider>
            <FancyboxProvider>
                {children}
            </FancyboxProvider>
        </ModalProvider>
    )
}