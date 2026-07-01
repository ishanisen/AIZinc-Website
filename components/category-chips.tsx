import { Category } from "@/lib/types";

type CategoryChipsProps = {
  categories: Category[];
  activeCategory: Category | null;
  onCategoryChange: (category: Category | null) => void;
};

export default function CategoryChips({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryChipsProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2"
      role="group"
      aria-label="Filter by category"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category;
        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() =>
              onCategoryChange(isActive ? null : category)
            }
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
