import { Assistant } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PropsWithChildren } from "react";

import ThemeProvider from "@/components/ThemeProvider";

import type { Metadata } from "next";

import "./globals.css";
import Link from "next/link";
import Header from "@/components/Header";

const assistant = Assistant({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Garden",
  description: "Visualize and edit Garden schemas.",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en" suppressHydrationWarning>
    <body className={assistant.className}>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <NuqsAdapter>
          <Header />

          {children}

          <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-muted/10">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Omni
            </p>

            <nav className="sm:ml-auto flex gap-4 sm:gap-6">
              <Link
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                href="https://omni.dev/terms-of-service"
              >
                Terms of Service
              </Link>

              <Link
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                href="https://omni.dev/privacy-policy"
              >
                Privacy
              </Link>
            </nav>
          </footer>
        </NuqsAdapter>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
