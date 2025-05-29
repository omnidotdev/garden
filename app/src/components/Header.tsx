"use client";

import { Sprout } from "lucide-react";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";

/**
 * Layout header.
 */
const Header = () => (
  <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-background/30 p-4 backdrop-blur-lg">
    <Link href="/">
      <div className="flex items-center gap-3">
        <Sprout className="h-8 w-8 text-primary" />
        <h1 className="font-bold text-3xl">Garden</h1>
      </div>
    </Link>

    <ThemeToggle />
  </header>
);

export default Header;
