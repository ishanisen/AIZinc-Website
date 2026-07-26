import { CategoryRecord } from "@/lib/types";

type CategoryChipsProps = {
  categories: CategoryRecord[];
  activeCategoryId: string | null;
  onCategoryChange: (categoryId: string | null) => void;
};

const inactiveChip =
  "border-border bg-white text-text-secondary hover:border-accent/40 hover:text-text-primary";
const activeChip = "border-accent bg-accent-soft text-accent";

export default function CategoryChips({
  categories,
  activeCategoryId,
  onCategoryChange,
}: CategoryChipsProps) {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2.5"
      role="group"
      aria-label="Filter by category"
    >
      <button
        type="button"
        aria-pressed={activeCategoryId === null}
        onClick={() => onCategoryChange(null)}
        className={`rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          activeCategoryId === null ? activeChip : inactiveChip
        }`}
      >
        All
      </button>

      {categories.map((category) => {
        const isActive = activeCategoryId === category.id;
        return (
          <button
            key={category.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onCategoryChange(isActive ? null : category.id)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
              isActive ? activeChip : inactiveChip
            }`}
          >
            {category.displayLabel}
          </button>
        );
      })}
    </div>
  );
}
