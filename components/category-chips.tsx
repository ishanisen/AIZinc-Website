"use client";

import { useMemo, useState } from "react";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { getCategoryIcon } from "@/lib/category-icons";
import { CategoryRecord } from "@/lib/types";

type CategoryChipsProps = {
  categories: CategoryRecord[];
  activeCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
};

/** Prefer these first so the default chip row feels curated, not alphabetical. */
const PRIORITY_SLUGS = [
  "writing",
  "image-generation",
  "code-development",
  "agents-automation",
  "video-generation",
  "productivity-note-taking",
  "marketing-seo",
  "design-ux",
  "research-search",
] as const;

const VISIBLE_COUNT = 9;

const inactiveChip =
  "border-border bg-white text-text-secondary hover:border-accent/40 hover:text-accent";
const activeChip = "border-accent bg-accent-soft text-accent";

const chipBase =
  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm";

function sortCategories(categories: CategoryRecord[]): CategoryRecord[] {
  const priorityIndex = new Map(
    PRIORITY_SLUGS.map((slug, index) => [slug, index]),
  );

  return [...categories].sort((a, b) => {
    const aPriority = priorityIndex.get(a.slug as (typeof PRIORITY_SLUGS)[number]);
    const bPriority = priorityIndex.get(b.slug as (typeof PRIORITY_SLUGS)[number]);

    if (aPriority != null && bPriority != null) return aPriority - bPriority;
    if (aPriority != null) return -1;
    if (bPriority != null) return 1;
    return a.displayLabel.localeCompare(b.displayLabel);
  });
}

export default function CategoryChips({
  categories,
  activeCategoryId,
  onCategoryChange,
}: CategoryChipsProps) {
  const [expanded, setExpanded] = useState(false);

  const ordered = useMemo(() => sortCategories(categories), [categories]);
  const visible = ordered.slice(0, VISIBLE_COUNT);
  const hidden = ordered.slice(VISIBLE_COUNT);
  const hiddenCount = hidden.length;

  const activeIsHidden =
    activeCategoryId != null &&
    hidden.some((category) => category.id === activeCategoryId);

  const showExpanded = expanded || activeIsHidden;

  function renderChip(category: CategoryRecord) {
    const isActive = activeCategoryId === category.id;
    const Icon = getCategoryIcon(category.slug);

    return (
      <button
        key={category.id}
        type="button"
        aria-pressed={isActive}
        onClick={() => onCategoryChange(isActive ? null : category.id)}
        className={`${chipBase} ${isActive ? activeChip : inactiveChip}`}
      >
        <Icon className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden="true" />
        {category.displayLabel}
      </button>
    );
  }

  return (
    <div
      className="flex flex-col items-center"
      role="group"
      aria-label="Filter by category"
    >
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          aria-pressed={activeCategoryId === null}
          onClick={() => onCategoryChange(null)}
          className={`${chipBase} ${
            activeCategoryId === null ? activeChip : inactiveChip
          }`}
        >
          <LayoutGrid
            className="h-3.5 w-3.5 shrink-0 opacity-80"
            aria-hidden="true"
          />
          All
        </button>

        {visible.map(renderChip)}

        {hiddenCount > 0 && !showExpanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className={`${chipBase} border-dashed border-accent/40 bg-accent-soft/60 text-accent hover:border-accent hover:bg-accent-soft`}
            aria-expanded={false}
          >
            +{hiddenCount} more
            <ChevronDown className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          </button>
        )}
      </div>

      {hiddenCount > 0 && (
        <div
          className={`grid w-full transition-[grid-template-rows] duration-300 ease-out ${
            showExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {hidden.map(renderChip)}

              {showExpanded && (
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className={`${chipBase} border-dashed border-border bg-white text-text-secondary hover:border-accent/40 hover:text-accent`}
                  aria-expanded={true}
                >
                  Show less
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
