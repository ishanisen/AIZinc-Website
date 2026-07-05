import { Category, Tool } from "./types";

export function hasActiveFilters(
  submittedQuery: string,
  activeCategory: Category | null,
): boolean {
  return Boolean(submittedQuery.trim() || activeCategory);
}

export function filterTools(
  tools: Tool[],
  submittedQuery: string,
  activeCategory: Category | null,
): Tool[] {
  const query = submittedQuery.trim().toLowerCase();

  return tools.filter((tool) => {
    const matchesCategory =
      !activeCategory ||
      tool.categories.includes(activeCategory) ||
      tool.category === activeCategory;

    if (!query) return matchesCategory;

    const searchable = [
      tool.name,
      tool.description,
      tool.category,
      ...tool.categories,
      ...tool.tags,
    ]
      .join(" ")
      .toLowerCase();

    return matchesCategory && searchable.includes(query);
  });
}

export function getResultsHeading(
  submittedQuery: string,
  activeCategory: Category | null,
): string {
  const query = submittedQuery.trim();

  if (query && activeCategory) {
    return `Search results for "${query}" in ${activeCategory}`;
  }

  if (query) {
    return `Search results for "${query}"`;
  }

  if (activeCategory) {
    return `${activeCategory} tools`;
  }

  return "Results";
}
