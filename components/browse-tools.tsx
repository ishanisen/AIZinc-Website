"use client";

import ToolCard from "./tool-card";
import BlueprintFrame from "./blueprint-frame";
import { CategoryRecord, PRICING_OPTIONS, PricingOption, Tool } from "@/lib/types";

type BrowseToolsProps = {
  tools: Tool[];
  categories: CategoryRecord[];
  query: string;
  onQueryChange: (value: string) => void;
  activeCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  activePricing: PricingOption | null;
  onPricingChange: (pricing: PricingOption | null) => void;
  onClear: () => void;
};

const pricingChoices: Array<PricingOption | "All"> = [
  "All",
  ...PRICING_OPTIONS,
];

export default function BrowseTools({
  tools,
  categories,
  query,
  onQueryChange,
  activeCategoryId,
  onCategoryChange,
  activePricing,
  onPricingChange,
  onClear,
}: BrowseToolsProps) {
  return (
    <section
      id="browse"
      className="container-main pb-10 pt-[clamp(48px,6vw,80px)]"
    >
      <span className="kicker mb-3 block">03 · Browse the index</span>
      <div className="draw-rule" />
      <div className="mb-6 mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 className="m-0 font-heading text-[clamp(26px,2.8vw,36px)] font-semibold uppercase leading-[1.1]">
          Browse tools
        </h2>
        <span className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-secondary [font-feature-settings:'tnum'_1]">
          {tools.length} {tools.length === 1 ? "result" : "results"}
        </span>
      </div>

      <div className="flex flex-wrap items-stretch gap-3">
        <label htmlFor="browse-search" className="sr-only">
          Search within results
        </label>
        <input
          id="browse-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search within results"
          className="ds-input max-w-[360px] flex-[1_1_220px]"
        />

        <label htmlFor="browse-category" className="sr-only">
          Category
        </label>
        <select
          id="browse-category"
          aria-label="Category"
          value={activeCategoryId ?? "all"}
          onChange={(event) =>
            onCategoryChange(
              event.target.value === "all" ? null : event.target.value,
            )
          }
          className="ds-input w-auto flex-[0_1_220px] cursor-pointer"
        >
          <option value="all">All</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.displayLabel}
            </option>
          ))}
        </select>

        <div
          className="inline-flex flex-wrap overflow-hidden rounded-[10px] border border-border"
          role="group"
          aria-label="Pricing"
        >
          {pricingChoices.map((option) => {
            const isActive =
              option === "All"
                ? activePricing === null
                : activePricing === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  onPricingChange(option === "All" ? null : option)
                }
                className={`border-0 px-3.5 py-2 text-[13px] ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "bg-transparent text-text-primary hover:bg-[color-mix(in_srgb,#1e3a6e_14%,transparent)]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {tools.length === 0 ? (
        <BlueprintFrame className="mt-9 px-6 py-12 text-center">
          <p className="mb-5 font-heading text-2xl font-semibold uppercase tracking-[0.02em]">
            No tools match
          </p>
          <button type="button" className="btn-secondary" onClick={onClear}>
            Clear filters
          </button>
        </BlueprintFrame>
      ) : (
        <div className="mt-9 grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-x-7 gap-y-9">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </section>
  );
}
