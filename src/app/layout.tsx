import React from "react";

import type { Metadata } from "next";
import localFont from "next/font/local";

import { Providers } from "@/src/app/_providers/Providers";
import "@/src/shared/styles/reset.scss";
import { Footer } from "@/src/widgets/footer";
import { Header } from "@/src/widgets/header";

import "./globals.scss";

const alibabaSans = localFont({
	src: [
		{
			path: "../../public/fonts/AlibabaSans-Regular.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/AlibabaSans-Bold.otf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-alibaba-sans",
});

export const metadata: Metadata = {
	title: "Тайтл лайоут",
	description: "Дескрипшн лайоут",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="ru" className={alibabaSans.variable}>
			<body>
				<Providers>
					<Header />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
