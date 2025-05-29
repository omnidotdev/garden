"use client";

import Link from "next/link";

import { Icons } from "components/core";
import { ThemeToggle } from "components/layout";

/**
 * Layout header.
 */
const Header = () => (
  <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b bg-background/30 p-4 backdrop-blur-lg">
    <Link href="/" className="flex items-center gap-3">
      <Icons.Sprout className="h-8 w-8 text-primary" />
      <h1 className="font-bold text-3xl">Garden</h1>
    </Link>

    <ThemeToggle />
  </header>
);

export default Header;
