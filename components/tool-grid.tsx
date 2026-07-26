import ToolCard from "./tool-card";
import FilterSidebar, { MobileFiltersButton } from "./filter-sidebar";
import { CategoryRecord, PricingOption, Tool } from "@/lib/types";
import { ChevronDown } from "lucide-react";

type ToolGridProps = {
  tools: Tool[];
  categories: CategoryRecord[];
  activeCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
  activePricing: PricingOption | null;
  onPricingChange: (pricing: PricingOption | null) => void;
};

export default function ToolGrid({
  tools,
  categories,
  activeCategoryId,
  onCategoryChange,
  activePricing,
  onPricingChange,
}: ToolGridProps) {
  return (
    <section id="browse" className="bg-background py-12 sm:py-16">
      <div className="container-main">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
            Browse tools
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-text-muted">
              {tools.length} {tools.length === 1 ? "result" : "results"}
            </span>
            <div className="relative hidden sm:block">
              <label htmlFor="sort-select" className="sr-only">
                Sort tools
              </label>
              <select
                id="sort-select"
                aria-label="Sort tools"
                className="appearance-none rounded-lg border border-border bg-white py-2 pl-3 pr-9 text-sm text-text-primary transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft"
                defaultValue="Most relevant"
              >
                <option value="Most relevant">Most relevant</option>
                <option value="Newest">Newest</option>
                <option value="Name A–Z">Name A–Z</option>
                <option value="Popular">Popular</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-8">
          <FilterSidebar
            categories={categories}
            activeCategoryId={activeCategoryId}
            onCategoryChange={onCategoryChange}
            activePricing={activePricing}
            onPricingChange={onPricingChange}
          />

          <div className="min-w-0 flex-1">
            <div className="mb-4">
              <MobileFiltersButton />
            </div>

            {tools.length === 0 ? (
              <div className="rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
                <p className="text-sm text-text-secondary">
                  No tools match your search. Try a different keyword or
                  category.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {tools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
