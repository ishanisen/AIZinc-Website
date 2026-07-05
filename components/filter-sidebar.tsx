"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "@/lib/types";

const pricingOptions = ["All", "Free", "Freemium", "Paid"];
const platformOptions = ["All", "Web", "Desktop", "Extension", "Mobile"];
const sortOptions = ["Most relevant", "Newest", "Name A–Z", "Popular"];

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-text-primary">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function FilterSidebar() {
  return (
    <aside
      className="hidden w-56 shrink-0 lg:block"
      aria-label="Filter tools"
    >
      <div className="sticky top-24 space-y-8">
        <FilterGroup title="Search within results">
          <div className="relative">
            <label htmlFor="sidebar-search" className="sr-only">
              Search within results
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-text-muted"
              aria-hidden="true"
            />
            <input
              id="sidebar-search"
              type="search"
              placeholder="Refine search…"
              className="w-full rounded-lg border border-border bg-surface-2 py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>
        </FilterGroup>

        <FilterGroup title="Category">
          <ul className="space-y-1">
            <li>
              <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary">
                <input
                  type="radio"
                  name="category"
                  defaultChecked
                  className="h-3.5 w-3.5 accent-accent"
                />
                All categories
              </label>
            </li>
            {CATEGORIES.map((category) => (
              <li key={category}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary">
                  <input
                    type="radio"
                    name="category"
                    className="h-3.5 w-3.5 accent-accent"
                  />
                  {category}
                </label>
              </li>
            ))}
          </ul>
        </FilterGroup>

        <FilterGroup title="Pricing">
          <ul className="space-y-1">
            {pricingOptions.map((option, i) => (
              <li key={option}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary">
                  <input
                    type="radio"
                    name="pricing"
                    defaultChecked={i === 0}
                    className="h-3.5 w-3.5 accent-accent"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </FilterGroup>

        <FilterGroup title="Platform">
          <ul className="space-y-1">
            {platformOptions.map((option, i) => (
              <li key={option}>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary">
                  <input
                    type="radio"
                    name="platform"
                    defaultChecked={i === 0}
                    className="h-3.5 w-3.5 accent-accent"
                  />
                  {option}
                </label>
              </li>
            ))}
          </ul>
        </FilterGroup>

        <FilterGroup title="Sort by">
          <select
            aria-label="Sort tools"
            className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20"
            defaultValue="Most relevant"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </FilterGroup>
      </div>
    </aside>
  );
}

export function MobileFiltersButton() {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-text-muted hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
      aria-label="Open filters"
    >
      <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
      Filters
    </button>
  );
}
