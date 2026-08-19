"use client";

import { Check, Plus } from "lucide-react";
import { useCompare } from "@/components/compare-provider";

type CompareToggleProps = {
  slug: string;
  name: string;
  logoUrl?: string;
  variant?: "icon" | "button";
};

export default function CompareToggle({
  slug,
  name,
  logoUrl,
  variant = "icon",
}: CompareToggleProps) {
  const { addTool, removeTool, isSelected } = useCompare();
  const selected = isSelected(slug);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (selected) {
      removeTool(slug);
      return;
    }

    addTool({ slug, name, logoUrl });
  }

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={selected}
        className={
          selected
            ? "btn-secondary border-accent text-accent"
            : "btn-secondary"
        }
      >
        {selected ? "Added to Compare" : "Add to Compare"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={selected}
      aria-label={
        selected ? `Remove ${name} from compare` : `Add ${name} to compare`
      }
      className={`group/compare relative inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] border transition-colors ${
        selected
          ? "border-accent bg-accent text-accent-foreground"
          : "border-border bg-background text-text-secondary hover:border-accent hover:text-accent"
      }`}
    >
      {selected ? (
        <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      ) : (
        <Plus className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
      )}
      <span
        role="tooltip"
        className="pointer-events-none absolute right-0 top-[calc(100%+6px)] z-20 whitespace-nowrap rounded-lg border border-border bg-white px-2 py-1 text-[11px] font-medium tracking-[0.02em] text-text-primary opacity-0 shadow-card transition-opacity group-hover/compare:opacity-100 group-focus-visible/compare:opacity-100"
      >
        {selected ? "Remove from compare" : "Add to compare"}
      </span>
    </button>
  );
}
