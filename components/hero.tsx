"use client";

import Link from "next/link";
import { categoryPalette, HERO_CATEGORY_SLUGS } from "@/lib/category-colors";
import { scrollToId } from "@/lib/scroll-to";
import { CategoryRecord } from "@/lib/types";

type HeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  categories: CategoryRecord[];
  onCategoryChange: (categoryId: string | null) => void;
};

function orderedHeroCategories(categories: CategoryRecord[]): CategoryRecord[] {
  const bySlug = new Map(categories.map((c) => [c.slug, c]));
  const ordered: CategoryRecord[] = [];

  for (const slug of HERO_CATEGORY_SLUGS) {
    const match = bySlug.get(slug);
    if (match) ordered.push(match);
  }

  for (const category of categories) {
    if (!ordered.some((item) => item.id === category.id)) {
      ordered.push(category);
    }
  }

  return ordered;
}

export default function Hero({
  query,
  onQueryChange,
  categories,
  onCategoryChange,
}: HeroProps) {
  const ordered = orderedHeroCategories(categories);
  const visible = ordered.slice(0, 9);
  const extraCount = Math.max(0, ordered.length - visible.length);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    scrollToId("browse");
  }

  return (
    <header className="relative overflow-hidden border-b border-border bg-[repeating-linear-gradient(to_right,color-mix(in_srgb,#1e3a6e_9%,transparent)_0_1px,transparent_1px_72px),repeating-linear-gradient(to_bottom,color-mix(in_srgb,#1e3a6e_9%,transparent)_0_1px,transparent_1px_72px)]">
      <div className="hero-scanline" aria-hidden="true" />
      <div className="container-main pb-[clamp(48px,6vw,88px)] pt-[clamp(64px,9vw,120px)]">
        <h1 className="-ml-[0.05em] font-heading text-[clamp(38px,5.6vw,78px)] font-semibold uppercase leading-[1.06] tracking-[-0.01em]">
          <span className="animate-rise block">Find the right</span>
          <span className="animate-rise-d1 block">
            AI tool in seconds.
            <span
              aria-hidden="true"
              className="animate-blink ml-[0.16em] inline-block h-[0.13em] w-[0.13em] bg-accent"
            />
          </span>
        </h1>

        <p className="animate-rise-d2 mt-7 max-w-[58ch] text-base leading-[1.5] text-[color-mix(in_srgb,#1d1f20_78%,transparent)]">
          Search, filter, and compare AI tools across writing, coding, design,
          video, productivity, and more.
        </p>

        <form
          onSubmit={handleSubmit}
          className="animate-rise-d3 mt-8 flex flex-wrap gap-2.5"
          role="search"
        >
          <label htmlFor="hero-search" className="sr-only">
            Search AI tools
          </label>
          <input
            id="hero-search"
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search AI tools"
            autoComplete="off"
            className="ds-input max-w-[440px] flex-1"
          />
          <button type="submit" className="btn-primary">
            Search
          </button>
        </form>

        <div className="animate-rise-d4 mt-5 flex flex-wrap gap-2">
          {visible.map((category) => {
            const palette = categoryPalette(category.slug);
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => {
                  onCategoryChange(category.id);
                  scrollToId("browse");
                }}
                className="inline-flex cursor-pointer items-center gap-[7px] rounded-lg border border-accent bg-background px-3.5 py-1.5 text-xs text-accent transition-colors hover:border-accent hover:text-accent-700"
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-[7px] w-[7px] rounded-full"
                  style={{ background: palette.dot }}
                />
                {category.displayLabel}
              </button>
            );
          })}
          {extraCount > 0 && (
            <Link
              href="/ai-tools"
              className="inline-flex cursor-pointer items-center rounded-lg bg-accent-100 px-3.5 py-1.5 text-xs text-[#0d1f3d] no-underline transition-colors hover:bg-[color-mix(in_srgb,#1e3a6e_24%,transparent)]"
            >
              +{extraCount} more
            </Link>
          )}
        </div>

        <div className="animate-rise-d5 mt-10 flex flex-wrap gap-x-7 gap-y-2.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-[color-mix(in_srgb,#1d1f20_70%,transparent)]">
          <span>Updated weekly</span>
          <span aria-hidden="true" className="text-accent">
            +
          </span>
          <span>Curated results</span>
          <span aria-hidden="true" className="text-accent">
            +
          </span>
          <span>Free + paid tools</span>
        </div>
      </div>
    </header>
  );
}
