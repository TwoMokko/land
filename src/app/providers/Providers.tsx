"use client";

import React from "react";

import { FancyboxProvider } from "@/src/app/providers/FancyboxProvider";
import { ModalProvider } from "@/src/app/providers/ModalProvider";
import { ModelsProvider } from "@/src/app/providers/ModelsContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ModelsProvider>
			<ModalProvider>
				<FancyboxProvider>{children}</FancyboxProvider>
			</ModalProvider>
		</ModelsProvider>
	);
}
