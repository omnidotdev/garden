"use client";

import { Sprout } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

/**
 * Layout header.
 */
const Header = () => (
  <header className="mb-8">
    <div className="flex justify-between items-center">
      <Link href="/">
        <div className="flex items-center gap-3">
          <Sprout className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Garden</h1>
        </div>
      </Link>

      <ThemeToggle />
    </div>

    <p className="text-muted-foreground mt-2">
      Create, visualize, and manage Garden schemas for ecosystems
    </p>
  </header>
);

export default Header;
