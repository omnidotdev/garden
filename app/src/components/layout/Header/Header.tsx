"use client";

import { SproutIcon } from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/layout";

/**
 * Layout header.
 */
const Header = () => (
  <header className="sticky top-0 z-50 flex w-full items-center justify-between border-b bg-background/30 p-4 backdrop-blur-lg">
    <Link href="/" className="flex items-center gap-2">
      <SproutIcon className="h-6 w-6 text-primary" />
      <h1 className="font-bold text-xl">Garden</h1>
    </Link>

    <ThemeToggle />
  </header>
);

export default Header;
