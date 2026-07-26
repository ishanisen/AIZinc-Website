import { CategoryRecord, PricingOption, Tool } from "./types";

export function hasActiveFilters(
  submittedQuery: string,
  activeCategoryId: string | null,
  activePricing: PricingOption | null,
): boolean {
  return Boolean(submittedQuery.trim() || activeCategoryId || activePricing);
}

export function filterTools(
  tools: Tool[],
  submittedQuery: string,
  activeCategoryId: string | null,
  activePricing: PricingOption | null,
): Tool[] {
  const query = submittedQuery.trim().toLowerCase();

  return tools.filter((tool) => {
    const matchesCategory =
      !activeCategoryId || tool.primaryCategoryId === activeCategoryId;

    const matchesPricing = !activePricing || tool.pricing === activePricing;

    if (!matchesCategory || !matchesPricing) return false;

    if (!query) return true;

    const searchable = [
      tool.name,
      tool.description,
      tool.category,
      ...tool.tags,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(query);
  });
}

export function getResultsHeading(
  submittedQuery: string,
  activeCategoryId: string | null,
  activePricing: PricingOption | null,
  categories: CategoryRecord[],
): string {
  const query = submittedQuery.trim();
  const category = categories.find((item) => item.id === activeCategoryId);
  const categoryLabel = category?.displayLabel ?? "";

  if (query && categoryLabel && activePricing) {
    return `Search results for "${query}" in ${categoryLabel} (${activePricing})`;
  }

  if (query && categoryLabel) {
    return `Search results for "${query}" in ${categoryLabel}`;
  }

  if (query && activePricing) {
    return `Search results for "${query}" (${activePricing})`;
  }

  if (query) {
    return `Search results for "${query}"`;
  }

  if (categoryLabel && activePricing) {
    return `${categoryLabel} tools (${activePricing})`;
  }

  if (categoryLabel) {
    return `${categoryLabel} tools`;
  }

  if (activePricing) {
    return `${activePricing} tools`;
  }

  return "Results";
}
