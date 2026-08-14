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
    <section className="relative overflow-hidden border-b border-border bg-background">
      {/* Soft depth: teal/olive blobs + faint dot grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-accent/15 blur-3xl sm:h-96 sm:w-96" />
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#8B7355]/12 blur-3xl sm:h-80 sm:w-80" />
        <div className="absolute bottom-0 left-1/2 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, rgb(44 36 25 / 0.09) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />
      </div>

      <div className="container-main relative mx-auto max-w-3xl px-4 py-12 text-center sm:py-16 lg:py-20">
        <span className="inline-flex items-center rounded-full border border-border/80 bg-white/80 px-3.5 py-1 text-xs font-medium text-text-secondary shadow-sm backdrop-blur-sm">
          Discover AI tools faster
        </span>

        <h1 className="mt-5 text-3xl font-bold tracking-tight text-text-primary sm:mt-6 sm:text-4xl lg:text-[2.75rem] lg:leading-tight">
          Find the right AI tool in seconds.
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-text-secondary sm:mt-5 sm:text-lg">
          Search, filter, and compare AI tools across writing, coding, design,
          video, productivity, and more.
        </p>

        <form
          onSubmit={handleSubmit}
          className="relative mx-auto mt-8 max-w-xl sm:mt-9"
          role="search"
        >
          <label htmlFor="hero-search" className="sr-only">
            Search AI tools
          </label>
          <div className="flex items-stretch overflow-hidden rounded-2xl border border-border bg-white shadow-search ring-1 ring-black/[0.03] transition-shadow focus-within:border-accent focus-within:shadow-card-hover focus-within:ring-4 focus-within:ring-accent-soft">
            <input
              id="hero-search"
              type="search"
              value={searchInput}
              onChange={(event) => onSearchInputChange(event.target.value)}
              placeholder="Search by tool, use case, or category"
              enterKeyHint="search"
              autoComplete="off"
              className="min-w-0 flex-1 border-0 bg-transparent py-3.5 pl-5 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-0 sm:py-4"
            />
            <button
              type="submit"
              className="m-1.5 inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-accent px-3.5 text-sm font-medium text-accent-foreground transition-all hover:bg-accent-hover hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:px-5"
              aria-label="Search tools"
            >
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>

        <div className="mt-7 sm:mt-8">
          <CategoryChips
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryChange={onCategoryChange}
          />
        </div>

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2.5 sm:mt-12 sm:gap-3">
          {trustItems.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-white/70 px-3.5 py-2 text-sm text-text-secondary shadow-sm backdrop-blur-sm"
            >
              <Icon
                className="h-4 w-4 shrink-0 text-accent"
                aria-hidden="true"
              />
              {label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
