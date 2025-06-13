import { Assistant } from "next/font/google";

import { Footer, Header } from "@/components/layout";
import { NuqsProvider, ThemeProvider } from "@/providers";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "@workspace/ui/globals.css";

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
          <main className="grid h-dvh w-full grid-rows-layout">
            <div className="flex h-screen w-full flex-col overflow-x-hidden">
              <Header />

              <div className="flex-1">{children}</div>

              <Footer />
            </div>
          </main>
        </NuqsProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
