import { CategoryRecord } from "@/lib/types";

type CategoryTickerProps = {
  categories: CategoryRecord[];
};

export default function CategoryTicker({ categories }: CategoryTickerProps) {
  if (categories.length === 0) return null;

  const text = categories
    .map((category) => category.displayLabel.toUpperCase())
    .join("   +   ");

  return (
    <div
      aria-hidden="true"
      className="overflow-hidden whitespace-nowrap border-b border-border py-3"
    >
      <div className="ticker-track">
        <span className="pr-14 font-heading text-[15px] font-semibold uppercase tracking-[0.06em] text-[color-mix(in_srgb,#1d1f20_55%,transparent)]">
          {text}
        </span>
        <span className="pr-14 font-heading text-[15px] font-semibold uppercase tracking-[0.06em] text-[color-mix(in_srgb,#1d1f20_55%,transparent)]">
          {text}
        </span>
      </div>
    </div>
  );
}
