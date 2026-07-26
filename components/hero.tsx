"use client";

import { Search, Sparkles, ShieldCheck, RefreshCw } from "lucide-react";
import CategoryChips from "./category-chips";
import { CategoryRecord } from "@/lib/types";

type HeroProps = {
  searchInput: string;
  onSearchInputChange: (value: string) => void;
  onSearchSubmit: () => void;
  categories: CategoryRecord[];
  activeCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
};

const trustItems = [
  { icon: RefreshCw, label: "Updated weekly" },
  { icon: ShieldCheck, label: "Curated results" },
  { icon: Sparkles, label: "Free + paid tools" },
];

export default function Hero({
  searchInput,
  onSearchInputChange,
  onSearchSubmit,
  categories,
  activeCategoryId,
  onCategoryChange,
}: HeroProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearchSubmit();
  }

  return (
    <section className="border-b border-border bg-background py-16 sm:py-20 lg:py-24">
      <div className="container-main mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-border bg-white px-3.5 py-1 text-xs font-medium text-text-secondary">
          Discover AI tools faster
        </span>

        <h1 className="mt-6 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Find the right AI tool in seconds.
        </h1>

        <p className="mt-5 text-base leading-relaxed text-text-secondary sm:text-lg">
          Search, filter, and compare AI tools across writing, coding, design,
          video, productivity, and more.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative mx-auto mt-10 max-w-xl"
          role="search"
        >
          <label htmlFor="hero-search" className="sr-only">
            Search AI tools
          </label>
          <input
            id="hero-search"
            type="search"
            value={searchInput}
            onChange={(event) => onSearchInputChange(event.target.value)}
            placeholder="Search by tool, use case, or category"
            enterKeyHint="search"
            autoComplete="off"
            className="w-full rounded-2xl border border-border bg-white py-4 pl-5 pr-16 text-sm text-text-primary shadow-search placeholder:text-text-muted transition-all focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent-soft"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-xl bg-accent text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            aria-label="Search tools"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>

        <div className="mt-8">
          <CategoryChips
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryChange={onCategoryChange}
          />
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
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
