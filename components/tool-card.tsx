"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ToolLogo from "@/components/tool-logo";
import { Tool } from "@/lib/types";

type ToolCardProps = {
  tool: Tool;
  featured?: boolean;
};

function pricingStyles(pricing: Tool["pricing"]) {
  switch (pricing) {
    case "Free":
      return "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-100";
    case "Freemium":
      return "bg-sky-50 text-badge-blue ring-1 ring-sky-100";
    case "Free Trial":
      return "bg-violet-50 text-violet-800 ring-1 ring-violet-100";
    case "Paid":
      return "bg-amber-50 text-badge-gold ring-1 ring-amber-100";
  }
}

export default function ToolCard({ tool, featured = false }: ToolCardProps) {
  const href = tool.websiteUrl?.trim() || undefined;

  const cardClassName = `group relative flex h-full flex-col rounded-2xl border border-border bg-white shadow-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-card-hover ${
    featured ? "p-6 sm:p-7" : "p-5 sm:p-6"
  }`;

  const body = (
    <>
      <div className="flex items-start gap-3.5">
        <ToolLogo name={tool.name} logoUrl={tool.logoUrl} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`truncate font-semibold text-text-primary ${
                featured ? "text-lg" : "text-base"
              }`}
            >
              {tool.name}
            </h3>
            <span
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${pricingStyles(tool.pricing)}`}
            >
              {tool.pricing}
            </span>
          </div>
          <span className="mt-1 block truncate text-[11px] font-normal tracking-wide text-text-muted sm:text-xs">
            {tool.category}
          </span>
        </div>
      </div>

      <p className="tagline-clamp mt-4 text-sm leading-relaxed text-text-secondary">
        {tool.description}
      </p>

      {tool.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {tool.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-surface-2 px-2 py-0.5 text-xs text-text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center pt-5">
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-150 ease-out group-hover:text-accent-hover group-hover:underline group-hover:underline-offset-2">
          View tool
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-150 ease-out group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </div>
    </>
  );

  if (href) {
    return (
      <article className={cardClassName}>
        <Link
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-0 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`View ${tool.name}`}
        />
        <div className="relative z-[1] flex h-full flex-col pointer-events-none">
          {body}
        </div>
      </article>
    );
  }

  return <article className={cardClassName}>{body}</article>;
}
