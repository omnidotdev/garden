import "@omnidotdev/garden/styles.css";

import { Assistant } from "next/font/google";

import { Footer, Header } from "@/components/layout";
import { NuqsProvider, ThemeProvider } from "@/providers";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "./globals.css";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garden",
  description: "Visualize your product, service, and other ecosystems.",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" suppressHydrationWarning>
    <head>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
    </head>
    <body className={assistant.className}>
      <ThemeProvider>
        <NuqsProvider>
          <div className="grid h-dvh w-full grid-rows-[auto_1fr_auto]">
            <Header />

            <main>{children}</main>

            <Footer />
          </div>
        </NuqsProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
