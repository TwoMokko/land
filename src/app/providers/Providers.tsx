'use client'

import { ModelsProvider } from "@/src/app/providers/ModelsContext";
import { ModalProvider } from "@/src/app/providers/ModalProvider";
import { FancyboxProvider } from "@/src/app/providers/FancyboxProvider";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ModelsProvider>
            <ModalProvider>
                <FancyboxProvider>
                    {children}
                </FancyboxProvider>
            </ModalProvider>
        </ModelsProvider>
    )
}