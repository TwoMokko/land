"use client";

import React from "react";

import { FancyboxProvider } from "@/src/app/_providers/FancyboxProvider";
import { ModalProvider } from "@/src/app/_providers/ModalProvider";
import { ModelsProvider } from "@/src/app/_providers/ModelsContext";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ModelsProvider>
			<ModalProvider>
				<FancyboxProvider>{children}</FancyboxProvider>
			</ModalProvider>
		</ModelsProvider>
	);
}
