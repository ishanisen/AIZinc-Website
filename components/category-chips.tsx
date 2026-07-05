import { CATEGORIES, Category } from "@/lib/types";

type CategoryChipsProps = {
  activeCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
};

export default function CategoryChips({
  activeCategory,
  onCategoryChange,
}: CategoryChipsProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2"
      role="group"
      aria-label="Filter by category"
    >
      <button
        type="button"
        aria-pressed={activeCategory === null}
        onClick={() => onCategoryChange(null)}
        className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          activeCategory === null
            ? "border-accent bg-accent/10 text-accent"
            : "border-border bg-surface text-text-secondary hover:border-text-muted hover:text-text-primary"
        }`}
      >
        All
      </button>

      {CATEGORIES.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(isActive ? null : category)}
            className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isActive
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-surface text-text-secondary hover:border-text-muted hover:text-text-primary"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
