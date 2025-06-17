"use client";

import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "@/components/layout";

/**
 * Layout header.
 */
const Header = () => (
  <header className="sticky top-0 z-50 flex w-full items-center justify-between border-border border-b bg-background/30 p-4 backdrop-blur-lg">
    <Link href="/" className="flex items-center gap-2">
      <Image src="/logo.png" width={30} height={30} alt="Logo" priority />

      <h1 className="font-bold text-xl">Garden</h1>
    </Link>

    <ThemeToggle />
  </header>
);

export default Header;
