"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import BrandMark from "@/components/brand-mark";

const navLinks = [
  { label: "Categories", href: "/ai-tools" },
  { label: "Trending", href: "/#trending" },
  { label: "New", href: "/#browse" },
  { label: "Submit", href: "/submit" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-[color-mix(in_srgb,#f6f8fd_90%,transparent)] backdrop-blur-[8px]">
      <nav
        className="container-main flex h-16 items-center gap-4"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="mr-auto inline-flex shrink-0 items-center gap-2.5 font-heading text-lg font-semibold uppercase tracking-[0.04em] text-text-primary"
          aria-label="AIZinc home"
        >
          <BrandMark size={18} />
          AIZinc
        </Link>

        <ul className="hidden items-center gap-5 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-text-primary no-underline transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/submit" className="btn-primary hidden !min-h-9 px-4 sm:inline-flex">
          Submit Tool
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-[10px] p-2 text-text-secondary md:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border md:hidden">
          <ul className="container-main flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block px-1 py-2.5 text-sm text-text-primary hover:text-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/submit"
                className="btn-primary w-full"
                onClick={() => setMobileOpen(false)}
              >
                Submit Tool
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
