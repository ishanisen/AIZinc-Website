"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { CategoryRecord, PRICING_OPTIONS, PricingOption } from "@/lib/types";

const sortOptions = ["Most relevant", "Newest", "Name A–Z", "Popular"];

type FilterSidebarProps = {
  categories: CategoryRecord[];
  activeCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  activePricing: PricingOption | null;
  onPricingChange: (pricing: PricingOption | null) => void;
};

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-semibold text-text-primary">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function FilterSidebar({
  categories,
  activeCategoryId,
  onCategoryChange,
  activePricing,
  onPricingChange,
}: FilterSidebarProps) {
  return (
    <aside
      className="hidden w-60 shrink-0 lg:block"
      aria-label="Filter tools"
    >
      <div className="sticky top-24 rounded-2xl border border-border bg-white p-5 shadow-card">
        <div className="space-y-7">
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
                className="w-full rounded-lg border border-border bg-surface-2 py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft"
              />
            </div>
          </FilterGroup>

          <FilterGroup title="Category">
            <ul className="space-y-0.5">
              <li>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary">
                  <input
                    type="radio"
                    name="category"
                    checked={activeCategoryId === null}
                    onChange={() => onCategoryChange(null)}
                    className="h-3.5 w-3.5 accent-accent"
                  />
                  All categories
                </label>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary">
                    <input
                      type="radio"
                      name="category"
                      checked={activeCategoryId === category.id}
                      onChange={() => onCategoryChange(category.id)}
                      className="h-3.5 w-3.5 accent-accent"
                    />
                    {category.displayLabel}
                  </label>
                </li>
              ))}
            </ul>
          </FilterGroup>

          <FilterGroup title="Pricing">
            <ul className="space-y-0.5">
              <li>
                <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary">
                  <input
                    type="radio"
                    name="pricing"
                    checked={activePricing === null}
                    onChange={() => onPricingChange(null)}
                    className="h-3.5 w-3.5 accent-accent"
                  />
                  All
                </label>
              </li>
              {PRICING_OPTIONS.map((option) => (
                <li key={option}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary">
                    <input
                      type="radio"
                      name="pricing"
                      checked={activePricing === option}
                      onChange={() => onPricingChange(option)}
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
              className="w-full rounded-lg border border-border bg-surface-2 px-3 py-2 text-sm text-text-primary transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft"
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
      </div>
    </aside>
  );
}

export function MobileFiltersButton() {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
      aria-label="Open filters"
    >
      <SlidersHorizontal className="h-4 w-4" aria-hidden="true" />
      Filters
    </button>
  );
}
