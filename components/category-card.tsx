"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { getCategoryIcon, getCategoryIconTint } from "@/lib/category-icons";
import { CategoryOverview, CategoryTopTool } from "@/lib/types";

type CategoryCardProps = {
  category: CategoryOverview;
};

const TOP_TOOL_SLOTS = 5;

function ToolMark({ tool }: { tool: CategoryTopTool }) {
  const [logoFailed, setLogoFailed] = useState(false);

  if (tool.logoUrl && !logoFailed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- arbitrary external logo hosts
      <img
        src={tool.logoUrl}
        alt=""
        width={16}
        height={16}
        className="h-4 w-4 shrink-0 rounded object-cover"
        onError={() => setLogoFailed(true)}
      />
    );
  }

  return (
    <span
      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
      aria-hidden="true"
    />
  );
}

function ToolListItem({ tool }: { tool: CategoryTopTool }) {
  const content = (
    <>
      <ToolMark tool={tool} />
      <span className="min-w-0 flex-1 truncate group-hover/tool:underline group-hover/tool:decoration-accent/70 group-hover/tool:underline-offset-2">
        {tool.name}
      </span>
    </>
  );

  const itemClass =
    "group/tool relative z-10 flex items-center gap-2.5 py-0.5 text-sm leading-snug text-text-secondary transition-colors duration-150 ease-out hover:text-accent";

  if (tool.websiteUrl) {
    return (
      <a
        href={tool.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
        onClick={(event) => event.stopPropagation()}
      >
        {content}
      </a>
    );
  }

  return <span className={itemClass}>{content}</span>;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = getCategoryIcon(category.slug);
  const iconTint = getCategoryIconTint(category.slug);
  const emptySlots = TOP_TOOL_SLOTS - category.topTools.length;
  const detailHref = `/ai-tools/${category.slug}`;

  return (
    <article className="group relative flex h-full min-h-[320px] flex-col rounded-2xl border border-border bg-white p-6 shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover">
      <Link
        href={detailHref}
        className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        aria-label={`Show all ${category.name}`}
      />

      <div className="relative z-[1] flex items-start gap-3.5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${iconTint}`}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-lg font-semibold tracking-tight text-text-primary">
              {category.name}
            </h2>
            <span className="inline-flex h-6 min-w-[4.75rem] shrink-0 items-center justify-center rounded-full bg-surface-2 px-2.5 text-xs font-medium tabular-nums text-text-secondary">
              {category.toolCount}{" "}
              {category.toolCount === 1 ? "tool" : "tools"}
            </span>
          </div>
        </div>
      </div>

      <ul className="relative z-[1] mt-5 flex min-h-[7.5rem] flex-1 flex-col gap-1.5">
        {category.topTools.map((tool) => (
          <li key={tool.id}>
            <ToolListItem tool={tool} />
          </li>
        ))}

        {emptySlots > 0 && (
          <li className="py-0.5 text-sm leading-snug text-text-muted/80">
            + more coming soon
          </li>
        )}
      </ul>

      <div className="relative z-[1] mt-auto border-t border-border pt-4">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-150 ease-out group-hover:text-accent-hover">
          Show all {category.name}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </article>
  );
}
