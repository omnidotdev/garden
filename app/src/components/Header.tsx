"use client";

import { Sprout } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

/**
 * Layout header.
 */
const Header = () => (
  <header className="mb-8 p-4 flex justify-between items-center">
    <Link href="/">
      <div className="flex items-center gap-3">
        <Sprout className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Garden</h1>
      </div>
    </Link>

    <ThemeToggle />
  </header>
);

export default Header;
