"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Categories", href: "/ai-tools" },
  { label: "Trending", href: "/#featured" },
  { label: "New", href: "/#browse" },
  { label: "Submit", href: "/submit" },
];

function BrandMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" className="fill-accent" />
      <path
        d="M8 22V10h3.2l4.1 8.4L19.4 10H22.6v12h-2.6v-7.3L16.2 22h-2.1l-3.8-7.3V22H8Z"
        className="fill-accent-foreground"
        opacity="0.95"
      />
      <circle cx="24.5" cy="8.5" r="2.25" className="fill-[#E8F2F2]" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white/95 backdrop-blur-sm">
      <nav
        className="container-main flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          aria-label="AIZinc home"
        >
          <BrandMark />
          {!logoError ? (
            <Image
              src="/aizinc-logo.png"
              alt="AIZinc"
              width={120}
              height={32}
              className="h-7 w-auto object-contain"
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
                className="group relative text-sm font-medium text-text-secondary transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 h-0.5 w-0 rounded-full bg-accent transition-all duration-200 ease-out group-hover:w-full"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/submit"
            className="hidden rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:shadow-md hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:inline-flex"
          >
            Submit Tool
          </Link>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
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
        <div className="border-t border-border bg-white md:hidden">
          <ul className="container-main flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-accent-soft hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/submit"
                className="block rounded-full bg-accent px-3 py-2.5 text-center text-sm font-medium text-accent-foreground shadow-sm transition-all hover:bg-accent-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
