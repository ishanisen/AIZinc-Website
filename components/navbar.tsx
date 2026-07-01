"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Categories", href: "#browse" },
  { label: "Trending", href: "#featured" },
  { label: "New", href: "#browse" },
  { label: "Submit", href: "#submit" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav
        className="container-main flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="AIZinc home"
        >
          {!logoError ? (
            <Image
              src="/aizinc-logo.png"
              alt="AIZinc"
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="text-lg font-semibold tracking-tight text-text-primary">
              AIZinc
            </span>
          )}
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="#submit"
            id="submit"
            className="hidden rounded-lg bg-accent px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:inline-flex"
          >
            Submit Tool
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="container-main flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="#submit"
                className="block rounded-lg bg-accent px-3 py-2.5 text-center text-sm font-medium text-background transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
