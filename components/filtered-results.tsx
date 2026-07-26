import ToolCard from "./tool-card";
import { Tool } from "@/lib/types";
import { X } from "lucide-react";

type FilteredResultsProps = {
  tools: Tool[];
  heading: string;
  onClear: () => void;
};

export default function FilteredResults({
  tools,
  heading,
  onClear,
}: FilteredResultsProps) {
  return (
    <section id="results" className="border-b border-border bg-background py-12 sm:py-16">
      <div className="container-main">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-text-primary sm:text-2xl">
              {heading}
            </h2>
            <p className="mt-1.5 text-sm text-text-muted">
              {tools.length} {tools.length === 1 ? "result" : "results"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClear}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border bg-white px-3.5 py-2 text-sm font-medium text-text-secondary transition-colors hover:border-accent/40 hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Clear filters
          </button>
        </div>

        {tools.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-border bg-white px-6 py-16 text-center shadow-card">
            <p className="text-base font-semibold text-text-primary">
              No tools found
            </p>
            <p className="mt-2 text-sm text-text-secondary">
              Try a different search term or category, or clear your filters to
              browse all tools.
            </p>
            <button
              type="button"
              onClick={onClear}
              className="mt-6 inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
