"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
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

function ToolLogo({ tool }: { tool: Tool }) {
  const [error, setError] = useState(false);

  if (tool.logoUrl && !error) {
    return (
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-2 p-1">
        <Image
          src={tool.logoUrl}
          alt={`${tool.name} logo`}
          width={40}
          height={40}
          className="h-9 w-9 rounded-lg object-cover"
          onError={() => setError(true)}
        />
      </div>
    );
  }

  return (
    <div
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-surface-2 text-sm font-semibold text-accent"
      aria-hidden="true"
    >
      {tool.name.charAt(0)}
    </div>
  );
}

export default function ToolCard({ tool, featured = false }: ToolCardProps) {
  return (
    <article
      className={`group flex h-full flex-col rounded-2xl border border-border bg-white shadow-card transition-all hover:border-accent/30 hover:shadow-card-hover ${
        featured ? "p-6" : "p-5"
      }`}
    >
      <div className="flex items-start gap-3.5">
        <ToolLogo tool={tool} />
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
              className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-medium ${pricingStyles(tool.pricing)}`}
            >
              {tool.pricing}
            </span>
          </div>
          <span className="mt-1 inline-block text-xs font-medium text-text-muted">
            {tool.category}
          </span>
        </div>
      </div>

      <p className="mt-3.5 min-h-[2.875rem] overflow-hidden text-sm leading-relaxed text-text-secondary [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] [overflow-wrap:anywhere]">
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

      <div className="mt-auto flex items-center justify-end border-t border-border pt-4">
        {tool.websiteUrl ? (
          <Link
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            View tool
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text-primary transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            View tool
          </button>
        )}
      </div>
    </article>
  );
}
