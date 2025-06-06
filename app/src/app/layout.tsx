import { Assistant } from "next/font/google";

import { Footer, Header } from "components/layout";
import { NuqsProvider, ThemeProvider } from "providers";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import "./globals.css";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garden",
  description: "Visualize and edit Garden schemas.",
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
      <link rel="manifest" href="/site.webmanifest" />
    </head>
    <body className={assistant.className}>
      <ThemeProvider>
        <NuqsProvider>
          <main className="grid h-dvh w-screen grid-rows-layout">
            <div className="flex h-screen w-full flex-col">
              <Header />

              {children}

              <Footer />
            </div>
          </main>
        </NuqsProvider>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
