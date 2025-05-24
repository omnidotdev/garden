import { Inter } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PropsWithChildren } from "react";

import { ThemeProvider } from "@/components/theme-provider";

import type { Metadata } from "next";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garden",
  description: "Visualize and edit Garden schemas.",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" suppressHydrationWarning>
    <body className={inter.className}>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <NuqsAdapter>{children}</NuqsAdapter>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
