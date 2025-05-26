import { Assistant } from "next/font/google";
import Link from "next/link";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import Header from "@/components/Header";
import ThemeProvider from "@/components/ThemeProvider";

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
    <body className={assistant.className}>
      <ThemeProvider
        enableSystem
        attribute="class"
        defaultTheme="system"
        disableTransitionOnChange
      >
        <NuqsAdapter>
          <Header />

          <div className="relative flex h-[100dvh] w-full flex-col">
            <main className="mt-[72px] w-full flex-1">{children}</main>

            <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-muted/10 px-4 py-6 sm:flex-row md:px-6">
              <p className="text-muted-foreground text-xs">
                © {new Date().getFullYear()} Omni
              </p>

              <nav className="flex gap-4 sm:ml-auto sm:gap-6">
                <Link
                  className="text-muted-foreground text-xs transition-colors hover:text-primary"
                  href="https://omni.dev/terms-of-service"
                >
                  Terms of Service
                </Link>

                <Link
                  className="text-muted-foreground text-xs transition-colors hover:text-primary"
                  href="https://omni.dev/privacy-policy"
                >
                  Privacy
                </Link>
              </nav>
            </footer>
          </div>
        </NuqsAdapter>
      </ThemeProvider>
    </body>
  </html>
);

export default RootLayout;
