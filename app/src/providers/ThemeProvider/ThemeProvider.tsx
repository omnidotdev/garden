"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

import type { PropsWithChildren } from "react";

const ThemeProvider = ({ children }: PropsWithChildren) => (
  <NextThemesProvider
    enableSystem
    attribute="class"
    defaultTheme="system"
    disableTransitionOnChange
  >
    {children}
  </NextThemesProvider>
);

export default ThemeProvider;
