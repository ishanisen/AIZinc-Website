"use client";

import { Search, Sparkles, ShieldCheck, RefreshCw } from "lucide-react";
import CategoryChips from "./category-chips";
import { CATEGORIES, Category } from "@/lib/types";

type HeroProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
};

const trustItems = [
  { icon: RefreshCw, label: "Updated weekly" },
  { icon: ShieldCheck, label: "Curated results" },
  { icon: Sparkles, label: "Free + paid tools" },
];

export default function Hero({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: HeroProps) {
  return (
    <section className="border-b border-border bg-background py-16 sm:py-20 lg:py-24">
      <div className="container-main mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-text-secondary">
          Discover AI tools faster
        </span>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
          Find the right AI tool in seconds.
        </h1>

        <p className="mt-4 text-base leading-relaxed text-text-secondary sm:text-lg">
          Search, filter, and compare AI tools across writing, coding, design,
          video, productivity, and more.
        </p>

        <div className="relative mx-auto mt-8 max-w-xl">
          <label htmlFor="hero-search" className="sr-only">
            Search AI tools
          </label>
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
            aria-hidden="true"
          />
          <input
            id="hero-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by tool, use case, or category"
            className="w-full rounded-xl border border-border bg-surface py-3.5 pl-11 pr-4 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
          />
        </div>

        <div className="mt-6">
          <CategoryChips
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {trustItems.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2 text-xs text-text-muted sm:text-sm"
            >
              <Icon className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
