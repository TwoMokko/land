import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Providers } from "@/src/app/providers/Providers";
import { Header } from "../widgets/header";
import { Footer } from "../widgets/footer";
import './globals.scss';
import React from "react";

const alibabaSans = localFont({
    src: [
        {
            path: '../../public/fonts/AlibabaSans-Regular.otf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../public/fonts/AlibabaSans-Bold.otf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-alibaba-sans',
})

export const metadata: Metadata = {
  title: "Тайтл лайоут",
  description: "Дескрипшн лайоут",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <html lang="ru" className={alibabaSans.variable}>
          <body>
              <Providers>
                  <Header/>
                  <main>
                      {children}
                  </main>
                  <Footer/>
              </Providers>
          </body>
      </html>
  );
}
