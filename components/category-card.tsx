import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategoryIcon } from "@/lib/category-icons";
import { CategoryOverview } from "@/lib/types";

type CategoryCardProps = {
  category: CategoryOverview;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.slug);

  return (
    <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-6 shadow-card transition-all hover:border-accent/30 hover:shadow-card-hover">
      <div className="flex items-start gap-3.5">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-accent-soft text-accent"
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-text-primary">
              {category.name}
            </h2>
            <span className="shrink-0 rounded-md bg-surface-2 px-2 py-0.5 text-xs font-medium text-text-secondary">
              {category.toolCount}{" "}
              {category.toolCount === 1 ? "tool" : "tools"}
            </span>
          </div>
        </div>
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {category.topTools.map((tool) => (
          <li key={tool.id}>
            {tool.websiteUrl ? (
              <a
                href={tool.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/tool flex items-center justify-between gap-3 text-sm text-text-secondary transition-colors hover:text-accent"
              >
                <span className="truncate">{tool.name}</span>
                <ArrowRight
                  className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover/tool:opacity-100"
                  aria-hidden="true"
                />
              </a>
            ) : (
              <span className="block truncate text-sm text-text-secondary">
                {tool.name}
              </span>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6 border-t border-border pt-4">
        <Link
          href={`/ai-tools/${category.slug}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          Show all {category.name}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
